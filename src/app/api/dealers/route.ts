import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const dealers = await prisma.dealer.findMany({
      include: {
        _count: {
          select: {
            stocks: true,
            clients: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(dealers);
  } catch (error) {
    console.error("Dillerlarni olishda xatolik:", error);
    return NextResponse.json(
      { error: "Dillerlarni olishda xatolik yuz berdi" },
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
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Ruxsat berilmagan" }, { status: 403 });
    }

    const body = await request.json();
    const { name, contactPerson, phone, address, region } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Nomi majburiy maydon" }, { status: 400 });
    }

    const dealer = await prisma.dealer.create({
      data: {
        name: name.trim(),
        contactPerson: contactPerson?.trim() || null,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        region: region?.trim() || null,
      },
    });

    return NextResponse.json(dealer, { status: 201 });
  } catch (error) {
    console.error("Diller yaratishda xatolik:", error);
    return NextResponse.json(
      { error: "Diller yaratishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
