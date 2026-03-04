import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, movements, locations } from "@/db/schema";
import { eq, sql, gte } from "drizzle-orm";

// GET /api/dashboard — KPI aggregation
export async function GET() {
  try {
    // Total stock across all products
    const allProducts = await db.select().from(products);
    let totalStock = 0;
    let lowStockItems = 0;

    for (const product of allProducts) {
      const stockResult = await db
        .select({ total: sql<number>`COALESCE(SUM(${movements.qty}), 0)` })
        .from(movements)
        .where(eq(movements.productId, product.id))
        .get();

      const stock = stockResult?.total ?? 0;
      totalStock += stock;

      if (stock <= product.minThreshold && stock > 0) lowStockItems++;
      if (stock <= 0) lowStockItems++; // out of stock counts as low
    }

    // Today's movements count
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const dailyMovementsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(movements)
      .where(gte(movements.createdAt, today))
      .get();

    const dailyMovements = dailyMovementsResult?.count ?? 0;

    // Active locations
    const activeLocationsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(locations)
      .get();

    const activeLocations = activeLocationsResult?.count ?? 0;

    // Recent activity (last 10 movements)
    const recentActivity = await db
      .select({
        id: movements.id,
        type: movements.type,
        qty: movements.qty,
        productSku: products.sku,
        productName: products.name,
        fromLocation: movements.fromLocation,
        toLocation: movements.toLocation,
        userId: movements.userId,
        createdAt: movements.createdAt,
        note: movements.note,
      })
      .from(movements)
      .innerJoin(products, eq(movements.productId, products.id))
      .orderBy(sql`${movements.createdAt} DESC`)
      .limit(10);

    return NextResponse.json({
      kpi: {
        totalStock,
        lowStockItems,
        dailyMovements,
        activeLocations,
      },
      recentActivity,
    });
  } catch (error) {
    console.error("GET /api/dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 },
    );
  }
}
