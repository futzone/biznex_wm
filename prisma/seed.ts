import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { login: "admin" },
    update: {},
    create: {
      name: "Administrator",
      login: "admin",
      password: adminPassword,
      role: "ADMIN",
      phone: "+998901234567",
    },
  });

  // Create warehouse manager
  const whManagerPassword = await bcrypt.hash("warehouse123", 10);
  await prisma.user.upsert({
    where: { login: "omborchi" },
    update: {},
    create: {
      name: "Omborchi Anvar",
      login: "omborchi",
      password: whManagerPassword,
      role: "WAREHOUSE_MANAGER",
      phone: "+998901111111",
    },
  });

  // Create suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: "TechSupply LLC",
      contactPerson: "Sardor Karimov",
      phone: "+998902222222",
      address: "Toshkent, Chilonzor tumani",
    },
  });

  await prisma.supplier.create({
    data: {
      name: "POS Solutions",
      contactPerson: "Nodira Xolmatova",
      phone: "+998903333333",
      address: "Toshkent, Mirzo Ulug'bek tumani",
    },
  });

  // Create dealers
  const dealer1 = await prisma.dealer.create({
    data: {
      name: "Biznex Toshkent",
      contactPerson: "Jasur Aliyev",
      phone: "+998904444444",
      address: "Toshkent, Yunusobod tumani",
      region: "Toshkent",
    },
  });

  const dealer2 = await prisma.dealer.create({
    data: {
      name: "Biznex Samarqand",
      contactPerson: "Bobur Rahimov",
      phone: "+998905555555",
      address: "Samarqand, Registon ko'chasi",
      region: "Samarqand",
    },
  });

  // Create dealer users
  const dealerPassword = await bcrypt.hash("dealer123", 10);
  await prisma.user.upsert({
    where: { login: "dealer1" },
    update: {},
    create: {
      name: "Jasur Aliyev",
      login: "dealer1",
      password: dealerPassword,
      role: "DEALER",
      phone: "+998904444444",
      dealerId: dealer1.id,
    },
  });

  await prisma.user.upsert({
    where: { login: "dealer2" },
    update: {},
    create: {
      name: "Bobur Rahimov",
      login: "dealer2",
      password: dealerPassword,
      role: "DEALER",
      phone: "+998905555555",
      dealerId: dealer2.id,
    },
  });

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: { category: "Printer", name: "HP LaserJet 1102", minStock: 5 },
    }),
    prisma.product.create({
      data: { category: "Printer", name: "Epson L3150", minStock: 3 },
    }),
    prisma.product.create({
      data: { category: "Router", name: "TP-Link Archer C6", minStock: 10 },
    }),
    prisma.product.create({
      data: { category: "Router", name: "Huawei AX3", minStock: 5 },
    }),
    prisma.product.create({
      data: { category: "Monoblok", name: "Lenovo ThinkCentre M70a", minStock: 2 },
    }),
  ]);

  // Create warehouse stock
  for (const product of products) {
    await prisma.stock.create({
      data: {
        productId: product.id,
        locationType: "WAREHOUSE",
        locationId: null,
        quantity: 20,
      },
    });
  }

  // Create dealer stock for dealer1
  await prisma.stock.create({
    data: {
      productId: products[0].id,
      locationType: "DEALER",
      locationId: dealer1.id,
      quantity: 5,
    },
  });
  await prisma.stock.create({
    data: {
      productId: products[2].id,
      locationType: "DEALER",
      locationId: dealer1.id,
      quantity: 3,
    },
  });

  // Create sample stock movements
  await prisma.stockMovement.create({
    data: {
      productId: products[0].id,
      type: "RECEIVE",
      quantity: 25,
      supplierId: supplier1.id,
      performedById: admin.id,
      note: "Dastlabki partiya",
    },
  });
  await prisma.stockMovement.create({
    data: {
      productId: products[0].id,
      type: "SEND",
      quantity: 5,
      dealerId: dealer1.id,
      performedById: admin.id,
      note: "Toshkent filialiga yuborildi",
    },
  });

  console.log("Seed data created successfully!");
  console.log("Admin login: admin / admin123");
  console.log("Warehouse manager: omborchi / warehouse123");
  console.log("Dealer 1: dealer1 / dealer123");
  console.log("Dealer 2: dealer2 / dealer123");
  console.log(`Products created: ${products.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
