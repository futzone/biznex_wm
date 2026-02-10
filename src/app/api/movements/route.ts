import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getMovements } from "@/lib/actions";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Avtorizatsiyadan o'tilmagan" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filters: any = {};

    const dealerId = searchParams.get("dealerId");
    const type = searchParams.get("type");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (dealerId) filters.dealerId = dealerId;
    if (type) filters.type = type;
    if (from) filters.from = from;
    if (to) filters.to = to;
    if (page) filters.page = parseInt(page);
    if (limit) filters.limit = parseInt(limit);

    const result = await getMovements(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Harakatlarni olishda xatolik:", error);
    return NextResponse.json(
      { error: "Harakatlarni olishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
