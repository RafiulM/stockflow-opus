import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { movements, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

// GET /api/audit?sku=WDG-X100 — audit trail for a specific SKU
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get("sku");

    let query = db
      .select({
        id: movements.id,
        timestamp: movements.createdAt,
        action: movements.type,
        qty: movements.qty,
        fromLocation: movements.fromLocation,
        toLocation: movements.toLocation,
        user: movements.userId,
        productSku: products.sku,
        productName: products.name,
        note: movements.note,
      })
      .from(movements)
      .innerJoin(products, eq(movements.productId, products.id))
      .orderBy(desc(movements.createdAt))
      .$dynamic();

    if (sku) {
      query = query.where(eq(products.sku, sku));
    }

    const results = query.all();

    // Format for the timeline component
    const entries = results.map((r) => ({
      id: String(r.id),
      timestamp: r.timestamp,
      action: r.action.toUpperCase(),
      qty: r.qty,
      path: `[${r.fromLocation || "N/A"}] -> [${r.toLocation || "VOID"}]`,
      user: r.user,
      productSku: r.productSku,
      productName: r.productName,
      note: r.note,
    }));

    return NextResponse.json(entries);
  } catch (error) {
    console.error("GET /api/audit error:", error);
    return NextResponse.json(
      { error: "Failed to fetch audit data" },
      { status: 500 },
    );
  }
}
