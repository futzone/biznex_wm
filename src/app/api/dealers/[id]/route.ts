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

    const dealer = await prisma.dealer.findUnique({
      where: { id },
      include: {
        stocks: {
          include: {
            product: true,
          },
        },
        clients: {
          orderBy: { createdAt: "desc" },
        },
        users: {
          select: {
            id: true,
            name: true,
            login: true,
            role: true,
            phone: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!dealer) {
      return NextResponse.json({ error: "Diller topilmadi" }, { status: 404 });
    }

    return NextResponse.json(dealer);
  } catch (error) {
    console.error("Dillerni olishda xatolik:", error);
    return NextResponse.json(
      { error: "Dillerni olishda xatolik yuz berdi" },
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
    const { name, contactPerson, phone, address, region } = body;

    const existing = await prisma.dealer.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Diller topilmadi" }, { status: 404 });
    }

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
      return NextResponse.json({ error: "Nomi bo'sh bo'lishi mumkin emas" }, { status: 400 });
    }

    const dealer = await prisma.dealer.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(contactPerson !== undefined && { contactPerson: contactPerson?.trim() || null }),
        ...(phone !== undefined && { phone: phone?.trim() || null }),
        ...(address !== undefined && { address: address?.trim() || null }),
        ...(region !== undefined && { region: region?.trim() || null }),
      },
    });

    return NextResponse.json(dealer);
  } catch (error) {
    console.error("Dillerni yangilashda xatolik:", error);
    return NextResponse.json(
      { error: "Dillerni yangilashda xatolik yuz berdi" },
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

    const dealer = await prisma.dealer.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            stocks: true,
            clients: true,
          },
        },
      },
    });

    if (!dealer) {
      return NextResponse.json({ error: "Diller topilmadi" }, { status: 404 });
    }

    if (dealer._count.stocks > 0 || dealer._count.clients > 0) {
      return NextResponse.json(
        { error: "Dillerga bog'langan mahsulotlar yoki mijozlar mavjud. Avval ularni o'chiring" },
        { status: 400 }
      );
    }

    await prisma.dealer.delete({ where: { id } });

    return NextResponse.json({ message: "Diller muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("Dillerni o'chirishda xatolik:", error);
    return NextResponse.json(
      { error: "Dillerni o'chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
