import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const { id } = await params;

    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        stockMovements: {
          take: 10,
          orderBy: { createdAt: "desc" },
          include: { product: { select: { name: true, category: true } } },
        },
      },
    });

    if (!supplier) {
      return NextResponse.json({ error: "Yetkazib beruvchi topilmadi" }, { status: 404 });
    }

    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Yetkazib beruvchini olishda xatolik:", error);
    return NextResponse.json(
      { error: "Yetkazib beruvchini olishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const user = session.user as any;
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, contactPerson, phone, address } = body;

    const existing = await prisma.supplier.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Yetkazib beruvchi topilmadi" }, { status: 404 });
    }

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
      return NextResponse.json({ error: "Nomi bo'sh bo'lishi mumkin emas" }, { status: 400 });
    }

    const supplier = await prisma.supplier.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(contactPerson !== undefined && { contactPerson: contactPerson?.trim() || null }),
        ...(phone !== undefined && { phone: phone?.trim() || null }),
        ...(address !== undefined && { address: address?.trim() || null }),
      },
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Yetkazib beruvchini yangilashda xatolik:", error);
    return NextResponse.json(
      { error: "Yetkazib beruvchini yangilashda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const user = session.user as any;
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
    }

    const { id } = await params;

    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: { _count: { select: { stockMovements: true } } },
    });

    if (!supplier) {
      return NextResponse.json({ error: "Yetkazib beruvchi topilmadi" }, { status: 404 });
    }

    if (supplier._count.stockMovements > 0) {
      return NextResponse.json(
        { error: "Yetkazib beruvchiga bog'langan harakatlar mavjud. O'chirib bo'lmaydi" },
        { status: 400 }
      );
    }

    await prisma.supplier.delete({ where: { id } });

    return NextResponse.json({ message: "Yetkazib beruvchi muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("Yetkazib beruvchini o'chirishda xatolik:", error);
    return NextResponse.json(
      { error: "Yetkazib beruvchini o'chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
