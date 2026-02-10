import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { warehouseReturns } from "@/lib/actions";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const body = await request.json();
    const result = await warehouseReturns(body);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Qaytarishda xatolik:", error);
    return NextResponse.json(
      { error: error.message || "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
