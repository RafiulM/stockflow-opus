import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { movements, products } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET /api/movements — list movements with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const productId = searchParams.get("productId");

    let query = db
      .select({
        id: movements.id,
        productId: movements.productId,
        productSku: products.sku,
        productName: products.name,
        userId: movements.userId,
        type: movements.type,
        qty: movements.qty,
        fromLocation: movements.fromLocation,
        toLocation: movements.toLocation,
        note: movements.note,
        createdAt: movements.createdAt,
      })
      .from(movements)
      .innerJoin(products, eq(movements.productId, products.id))
      .orderBy(desc(movements.createdAt))
      .$dynamic();

    const conditions = [];
    if (type && type !== "all") {
      conditions.push(
        eq(
          movements.type,
          type as "inbound" | "outbound" | "transfer" | "adjustment",
        ),
      );
    }
    if (productId) {
      conditions.push(eq(movements.productId, parseInt(productId)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query;
    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/movements error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movements" },
      { status: 500 },
    );
  }
}

// POST /api/movements — create a new movement (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, type, qty, fromLocation, toLocation, note } = body;

    if (!productId || !type || qty === undefined) {
      return NextResponse.json(
        { error: "productId, type, and qty are required" },
        { status: 400 },
      );
    }

    const [result] = await db
      .insert(movements)
      .values({
        productId,
        userId: session.user.id,
        type,
        qty,
        fromLocation: fromLocation || null,
        toLocation: toLocation || null,
        note: note || "",
      })
      .returning();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/movements error:", error);
    return NextResponse.json(
      { error: "Failed to create movement" },
      { status: 500 },
    );
  }
}
