import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { warehouseReceive } from "@/lib/actions";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const body = await request.json();
    const result = await warehouseReceive(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Mahsulotlarni qabul qilishda xatolik:", error);
    return NextResponse.json(
      { error: error.message || "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
