"use server";

import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { Prisma } from "@prisma/client";

async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  return session.user as {
    id: string;
    role: "ADMIN" | "WAREHOUSE_MANAGER" | "DEALER";
    dealerId: string | null;
  };
}

// ============ DASHBOARD ============

export async function getDashboardStats() {
  const [products, warehouseStocks, dealerStocks, recentMovements] =
    await Promise.all([
      prisma.product.findMany({
        select: { id: true, category: true, name: true, minStock: true },
      }),
      prisma.stock.findMany({
        where: { locationType: "WAREHOUSE" },
        include: { product: { select: { category: true, name: true } } },
      }),
      prisma.stock.findMany({
        where: { locationType: "DEALER" },
        include: {
          product: { select: { category: true, name: true } },
          dealer: { select: { name: true } },
        },
      }),
      prisma.stockMovement.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          product: { select: { name: true, category: true } },
          dealer: { select: { name: true } },
          supplier: { select: { name: true } },
          performedBy: { select: { name: true } },
        },
      }),
    ]);

  const totalWarehouseQty = warehouseStocks.reduce((sum, s) => sum + s.quantity, 0);
  const totalDealerQty = dealerStocks.reduce((sum, s) => sum + s.quantity, 0);

  const byCategory: Record<string, number> = {};
  for (const s of warehouseStocks) {
    byCategory[s.product.category] = (byCategory[s.product.category] || 0) + s.quantity;
  }

  const lowStockProducts = warehouseStocks
    .filter((s) => {
      const product = products.find((p) => p.id === s.productId);
      return product && product.minStock > 0 && s.quantity < product.minStock;
    })
    .map((s) => {
      const product = products.find((p) => p.id === s.productId)!;
      return {
        id: s.productId,
        name: product.name,
        category: product.category,
        minStock: product.minStock,
        warehouseQty: s.quantity,
      };
    });

  return {
    totalProducts: products.length,
    totalWarehouseQty,
    totalDealerQty,
    byCategory,
    lowStockProducts,
    recentMovements: recentMovements.map((m) => ({
      id: m.id,
      productName: m.product.name,
      productCategory: m.product.category,
      type: m.type,
      quantity: m.quantity,
      dealerName: m.dealer?.name || null,
      supplierName: m.supplier?.name || null,
      performedByName: m.performedBy.name,
      createdAt: m.createdAt.toISOString(),
    })),
  };
}

// ============ SUPPLIERS ============

export async function getSuppliers() {
  return prisma.supplier.findMany({
    include: { _count: { select: { stockMovements: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createSupplier(data: {
  name: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
}) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  return prisma.supplier.create({ data });
}

export async function updateSupplier(
  id: string,
  data: { name?: string; contactPerson?: string; phone?: string; address?: string }
) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  return prisma.supplier.update({ where: { id }, data });
}

export async function deleteSupplier(id: string) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  const supplier = await prisma.supplier.findUnique({
    where: { id },
    include: { _count: { select: { stockMovements: true } } },
  });
  if (supplier && supplier._count.stockMovements > 0) {
    throw new Error("Bu yetkazib beruvchiga bog'langan harakatlar mavjud");
  }
  return prisma.supplier.delete({ where: { id } });
}

// ============ DEALERS ============

export async function getDealers() {
  return prisma.dealer.findMany({
    include: { _count: { select: { stocks: true, clients: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDealer(id: string) {
  return prisma.dealer.findUnique({
    where: { id },
    include: {
      stocks: {
        include: { product: true },
        where: { quantity: { gt: 0 } },
      },
      clients: {
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { stocks: true, clients: true } },
    },
  });
}

export async function createDealer(data: {
  name: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
  region?: string;
}) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  return prisma.dealer.create({ data });
}

export async function updateDealer(
  id: string,
  data: { name?: string; contactPerson?: string; phone?: string; address?: string; region?: string }
) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  return prisma.dealer.update({ where: { id }, data });
}

export async function deleteDealer(id: string) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  const dealer = await prisma.dealer.findUnique({
    where: { id },
    include: { _count: { select: { stocks: true, clients: true } } },
  });
  if (dealer && (dealer._count.stocks > 0 || dealer._count.clients > 0)) {
    throw new Error("Bu dillerga bog'langan zaxiralar yoki mijozlar mavjud");
  }
  return prisma.dealer.delete({ where: { id } });
}

// ============ CLIENTS ============

export async function getClients(dealerId?: string) {
  const user = await getSession();
  const where: Prisma.ClientWhereInput = {};
  if (user.role === "DEALER" && user.dealerId) {
    where.dealerId = user.dealerId;
  } else if (dealerId) {
    where.dealerId = dealerId;
  }
  return prisma.client.findMany({
    where,
    include: {
      dealer: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createClient(data: {
  name: string;
  businessName?: string;
  phone?: string;
  address?: string;
  dealerId: string;
}) {
  const user = await getSession();
  if (user.role === "DEALER" && user.dealerId !== data.dealerId) {
    throw new Error("Forbidden");
  }
  return prisma.client.create({ data });
}

export async function updateClient(
  id: string,
  data: { name?: string; businessName?: string; phone?: string; address?: string; dealerId?: string }
) {
  return prisma.client.update({ where: { id }, data });
}

export async function deleteClient(id: string) {
  return prisma.client.delete({ where: { id } });
}

// ============ PRODUCTS ============

export async function getProducts(filters?: { category?: string; search?: string }) {
  const where: Prisma.ProductWhereInput = {};
  if (filters?.category) where.category = filters.category;
  if (filters?.search) {
    where.name = { contains: filters.search, mode: "insensitive" };
  }
  return prisma.product.findMany({
    where,
    include: {
      stocks: {
        where: { locationType: "WAREHOUSE" },
        select: { quantity: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductCategories() {
  const products = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  return products.map((p) => p.category);
}

export async function createProduct(data: {
  category: string;
  name: string;
  description?: string;
  minStock?: number;
}) {
  const user = await getSession();
  if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
    throw new Error("Ruxsat yo'q");
  }
  return prisma.product.create({ data });
}

export async function updateProduct(
  id: string,
  data: { category?: string; name?: string; description?: string; minStock?: number }
) {
  const user = await getSession();
  if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
    throw new Error("Ruxsat yo'q");
  }
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  const user = await getSession();
  if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
    throw new Error("Ruxsat yo'q");
  }
  const hasStock = await prisma.stock.findFirst({
    where: { productId: id, quantity: { gt: 0 } },
  });
  if (hasStock) {
    throw new Error("Bu mahsulotning zaxirasi mavjud, avval nolga tushiring");
  }
  await prisma.stockMovement.deleteMany({ where: { productId: id } });
  await prisma.stock.deleteMany({ where: { productId: id } });
  return prisma.product.delete({ where: { id } });
}

// ============ STOCK ============

export async function getStock(filters?: {
  productId?: string;
  locationType?: "WAREHOUSE" | "DEALER";
  locationId?: string;
}) {
  const where: Prisma.StockWhereInput = {};
  if (filters?.productId) where.productId = filters.productId;
  if (filters?.locationType) where.locationType = filters.locationType;
  if (filters?.locationId) where.locationId = filters.locationId;
  if (!filters?.locationId && filters?.locationType === "WAREHOUSE") {
    where.locationId = null;
  }
  return prisma.stock.findMany({
    where,
    include: {
      product: true,
      dealer: { select: { id: true, name: true } },
    },
    orderBy: { product: { name: "asc" } },
  });
}

// ============ WAREHOUSE ============

export async function warehouseReceive(data: {
  supplierId: string;
  productId: string;
  quantity: number;
  note?: string;
}) {
  const user = await getSession();
  if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
    throw new Error("Forbidden");
  }
  if (data.quantity <= 0) throw new Error("Miqdor musbat bo'lishi kerak");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) throw new Error("Foydalanuvchi topilmadi. Iltimos, qayta kiring.");

  return prisma.$transaction(async (tx) => {
    const existing = await tx.stock.findFirst({
      where: {
        productId: data.productId,
        locationType: "WAREHOUSE",
        locationId: null,
      },
    });

    if (existing) {
      await tx.stock.update({
        where: { id: existing.id },
        data: { quantity: { increment: data.quantity } },
      });
    } else {
      await tx.stock.create({
        data: {
          productId: data.productId,
          locationType: "WAREHOUSE",
          locationId: null,
          quantity: data.quantity,
        },
      });
    }

    await tx.stockMovement.create({
      data: {
        productId: data.productId,
        type: "RECEIVE",
        quantity: data.quantity,
        supplierId: data.supplierId,
        performedById: user.id,
        note: data.note?.trim() || null,
      },
    });

    return { quantity: data.quantity };
  });
}

export async function warehouseSend(data: {
  dealerId: string;
  productId: string;
  quantity: number;
  note?: string;
}) {
  const user = await getSession();
  if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
    throw new Error("Forbidden");
  }
  if (data.quantity <= 0) throw new Error("Miqdor musbat bo'lishi kerak");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) throw new Error("Foydalanuvchi topilmadi. Iltimos, qayta kiring.");

  return prisma.$transaction(async (tx) => {
    const warehouseStock = await tx.stock.findFirst({
      where: {
        productId: data.productId,
        locationType: "WAREHOUSE",
        locationId: null,
      },
    });

    if (!warehouseStock || warehouseStock.quantity < data.quantity) {
      throw new Error("Omborxonada yetarli mahsulot mavjud emas");
    }

    await tx.stock.update({
      where: { id: warehouseStock.id },
      data: { quantity: { decrement: data.quantity } },
    });

    const dealerStock = await tx.stock.findFirst({
      where: {
        productId: data.productId,
        locationType: "DEALER",
        locationId: data.dealerId,
      },
    });

    if (dealerStock) {
      await tx.stock.update({
        where: { id: dealerStock.id },
        data: { quantity: { increment: data.quantity } },
      });
    } else {
      await tx.stock.create({
        data: {
          productId: data.productId,
          locationType: "DEALER",
          locationId: data.dealerId,
          quantity: data.quantity,
        },
      });
    }

    await tx.stockMovement.create({
      data: {
        productId: data.productId,
        type: "SEND",
        quantity: data.quantity,
        dealerId: data.dealerId,
        performedById: user.id,
        note: data.note?.trim() || null,
      },
    });

    return { quantity: data.quantity };
  });
}

export async function warehouseReturns(data: {
  dealerId?: string;
  productId: string;
  quantity: number;
  clientName?: string;
  clientPhone?: string;
  clientAddress?: string;
  note?: string;
}) {
  const user = await getSession();
  if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
    throw new Error("Forbidden");
  }
  if (data.quantity <= 0) throw new Error("Miqdor musbat bo'lishi kerak");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) throw new Error("Foydalanuvchi topilmadi. Iltimos, qayta kiring.");

  return prisma.$transaction(async (tx) => {
    // Agar diller tanlansa — diler stockidan ayirish
    if (data.dealerId) {
      const dealerStock = await tx.stock.findFirst({
        where: {
          productId: data.productId,
          locationType: "DEALER",
          locationId: data.dealerId,
        },
      });

      if (!dealerStock || dealerStock.quantity < data.quantity) {
        throw new Error("Dillerda yetarli mahsulot mavjud emas");
      }

      await tx.stock.update({
        where: { id: dealerStock.id },
        data: { quantity: { decrement: data.quantity } },
      });
    }

    // Omborxona stockiga qo'shish
    const warehouseStock = await tx.stock.findFirst({
      where: {
        productId: data.productId,
        locationType: "WAREHOUSE",
        locationId: null,
      },
    });

    if (warehouseStock) {
      await tx.stock.update({
        where: { id: warehouseStock.id },
        data: { quantity: { increment: data.quantity } },
      });
    } else {
      await tx.stock.create({
        data: {
          productId: data.productId,
          locationType: "WAREHOUSE",
          locationId: null,
          quantity: data.quantity,
        },
      });
    }

    await tx.stockMovement.create({
      data: {
        productId: data.productId,
        type: "RETURN",
        quantity: data.quantity,
        dealerId: data.dealerId || null,
        performedById: user.id,
        clientName: data.clientName?.trim() || null,
        clientPhone: data.clientPhone?.trim() || null,
        clientAddress: data.clientAddress?.trim() || null,
        note: data.note?.trim() || null,
      },
    });

    return { quantity: data.quantity };
  });
}

// ============ USERS ============

export async function getUsers() {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      login: true,
      role: true,
      phone: true,
      dealerId: true,
      dealer: { select: { id: true, name: true } },
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(data: {
  name: string;
  login: string;
  password: string;
  role: "ADMIN" | "WAREHOUSE_MANAGER" | "DEALER";
  phone?: string;
  dealerId?: string;
}) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");

  const existing = await prisma.user.findUnique({ where: { login: data.login } });
  if (existing) throw new Error("Bu login allaqachon mavjud");

  if (data.role === "DEALER" && !data.dealerId) {
    throw new Error("Diller roli uchun dillerni tanlash majburiy");
  }

  const bcrypt = (await import("bcryptjs")).default;
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      name: data.name,
      login: data.login,
      password: hashedPassword,
      role: data.role,
      phone: data.phone?.trim() || null,
      dealerId: data.role === "DEALER" ? data.dealerId : null,
    },
  });
}

export async function updateUser(
  id: string,
  data: {
    name?: string;
    login?: string;
    password?: string;
    role?: "ADMIN" | "WAREHOUSE_MANAGER" | "DEALER";
    phone?: string;
    dealerId?: string | null;
  }
) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");

  if (data.login) {
    const existing = await prisma.user.findFirst({
      where: { login: data.login, NOT: { id } },
    });
    if (existing) throw new Error("Bu login allaqachon mavjud");
  }

  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.login) updateData.login = data.login;
  if (data.phone !== undefined) updateData.phone = data.phone?.trim() || null;
  if (data.role) {
    updateData.role = data.role;
    updateData.dealerId = data.role === "DEALER" ? data.dealerId : null;
  }

  if (data.password && data.password.trim()) {
    const bcrypt = (await import("bcryptjs")).default;
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({ where: { id }, data: updateData });
}

export async function deleteUser(id: string) {
  const user = await getSession();
  if (user.role !== "ADMIN") throw new Error("Forbidden");

  if (user.id === id) throw new Error("O'zingizni o'chira olmaysiz");

  const target = await prisma.user.findUnique({
    where: { id },
    include: { _count: { select: { stockMovements: true } } },
  });
  if (target && target._count.stockMovements > 0) {
    throw new Error("Bu foydalanuvchi harakatlar tarixida mavjud, o'chirib bo'lmaydi");
  }

  return prisma.user.delete({ where: { id } });
}

// ============ MOVEMENTS ============

export async function getMovements(filters?: {
  productId?: string;
  type?: string;
  dealerId?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}) {
  const page = filters?.page || 1;
  const limit = filters?.limit || 20;
  const where: Prisma.StockMovementWhereInput = {};

  if (filters?.productId) where.productId = filters.productId;
  if (filters?.type) where.type = filters.type as any;
  if (filters?.dealerId) where.dealerId = filters.dealerId;
  if (filters?.from || filters?.to) {
    where.createdAt = {};
    if (filters?.from) where.createdAt.gte = new Date(filters.from);
    if (filters?.to) {
      const toDate = new Date(filters.to);
      toDate.setHours(23, 59, 59, 999);
      where.createdAt.lte = toDate;
    }
  }

  const [data, total] = await Promise.all([
    prisma.stockMovement.findMany({
      where,
      include: {
        product: { select: { id: true, name: true, category: true } },
        dealer: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true } },
        performedBy: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.stockMovement.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}
