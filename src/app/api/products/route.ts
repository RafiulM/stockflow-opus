import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, movements } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET /api/products — list all products with computed stock
export async function GET() {
  try {
    // Get all products
    const allProducts = db.select().from(products).all();

    // Compute stock per product from movements
    const productsWithStock = allProducts.map((product) => {
      const stockResult = db
        .select({ total: sql<number>`COALESCE(SUM(${movements.qty}), 0)` })
        .from(movements)
        .where(eq(movements.productId, product.id))
        .get();

      const totalStock = stockResult?.total ?? 0;
      const status =
        totalStock <= 0
          ? "out-of-stock"
          : totalStock <= product.minThreshold
            ? "low-stock"
            : "in-stock";

      return {
        ...product,
        totalStock,
        status,
      };
    });

    return NextResponse.json(productsWithStock);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST /api/products — create a new product (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sku, name, description, category, minThreshold } = body;

    if (!sku || !name) {
      return NextResponse.json(
        { error: "SKU and name are required" },
        { status: 400 },
      );
    }

    const result = db
      .insert(products)
      .values({
        sku,
        name,
        description: description || "",
        category: category || "General",
        minThreshold: minThreshold ?? 0,
      })
      .returning()
      .get();

    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/products error:", error);
    if (
      error instanceof Error &&
      error.message?.includes("UNIQUE constraint")
    ) {
      return NextResponse.json(
        { error: "SKU already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
