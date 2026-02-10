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

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        dealer: {
          select: { id: true, name: true },
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Mijoz topilmadi" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Mijozni olishda xatolik:", error);
    return NextResponse.json(
      { error: "Mijozni olishda xatolik yuz berdi" },
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

    const { id } = await params;
    const body = await request.json();
    const { name, businessName, phone, address, dealerId } = body;

    const existing = await prisma.client.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Mijoz topilmadi" }, { status: 404 });
    }

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
      return NextResponse.json({ error: "Nomi bo'sh bo'lishi mumkin emas" }, { status: 400 });
    }

    if (dealerId !== undefined) {
      const dealer = await prisma.dealer.findUnique({ where: { id: dealerId } });
      if (!dealer) {
        return NextResponse.json({ error: "Diller topilmadi" }, { status: 404 });
      }
    }

    const client = await prisma.client.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(businessName !== undefined && { businessName: businessName?.trim() || null }),
        ...(phone !== undefined && { phone: phone?.trim() || null }),
        ...(address !== undefined && { address: address?.trim() || null }),
        ...(dealerId !== undefined && { dealerId }),
      },
      include: {
        dealer: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Mijozni yangilashda xatolik:", error);
    return NextResponse.json(
      { error: "Mijozni yangilashda xatolik yuz berdi" },
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

    const { id } = await params;

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return NextResponse.json({ error: "Mijoz topilmadi" }, { status: 404 });
    }

    await prisma.client.delete({ where: { id } });

    return NextResponse.json({ message: "Mijoz muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("Mijozni o'chirishda xatolik:", error);
    return NextResponse.json(
      { error: "Mijozni o'chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
