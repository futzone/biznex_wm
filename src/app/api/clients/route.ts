import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const user = session.user as any;
    const { searchParams } = new URL(request.url);
    const dealerId = searchParams.get("dealerId");

    const where: any = {};

    if (user.role === "DEALER") {
      if (!user.dealerId) {
        return NextResponse.json({ error: "Diller topilmadi" }, { status: 400 });
      }
      where.dealerId = user.dealerId;
    } else if (dealerId) {
      where.dealerId = dealerId;
    }

    const clients = await prisma.client.findMany({
      where,
      include: {
        dealer: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Mijozlarni olishda xatolik:", error);
    return NextResponse.json(
      { error: "Mijozlarni olishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const user = session.user as any;
    const body = await request.json();
    const { name, businessName, phone, address, dealerId } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Nomi majburiy maydon" }, { status: 400 });
    }

    if (!dealerId || typeof dealerId !== "string") {
      return NextResponse.json({ error: "Diller ID majburiy maydon" }, { status: 400 });
    }

    // DEALER can only create clients for their own dealer
    if (user.role === "DEALER") {
      if (user.dealerId !== dealerId) {
        return NextResponse.json(
          { error: "Siz faqat o'z dilleringiz uchun mijoz yaratishingiz mumkin" },
          { status: 403 }
        );
      }
    }

    // Verify dealer exists
    const dealer = await prisma.dealer.findUnique({ where: { id: dealerId } });
    if (!dealer) {
      return NextResponse.json({ error: "Diller topilmadi" }, { status: 404 });
    }

    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        businessName: businessName?.trim() || null,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        dealerId,
      },
      include: {
        dealer: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Mijoz yaratishda xatolik:", error);
    return NextResponse.json(
      { error: "Mijoz yaratishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
