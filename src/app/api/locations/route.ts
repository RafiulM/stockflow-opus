import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { locations, movements } from "@/db/schema";
import { eq, sql, or } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET /api/locations — list all locations with item counts
export async function GET() {
  try {
    const allLocations = await db.select().from(locations);

    // Compute item count per location by summing inbound movements to that zone
    const locationsWithCounts = await Promise.all(
      allLocations.map(async (loc) => {
        const countResult = await db
          .select({
            total: sql<number>`COALESCE(SUM(ABS(${movements.qty})), 0)`,
          })
          .from(movements)
          .where(
            or(
              eq(movements.toLocation, loc.zone),
              eq(movements.toLocation, loc.name),
            ),
          )
          .get();

        // Simple approximation — distribute across locations in same zone
        const zoneLocations = allLocations.filter((l) => l.zone === loc.zone);
        const itemCount = Math.round(
          (countResult?.total ?? 0) / zoneLocations.length,
        );

        return {
          ...loc,
          itemCount: Math.min(itemCount, loc.capacity),
        };
      }),
    );

    return NextResponse.json(locationsWithCounts);
  } catch (error) {
    console.error("GET /api/locations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 },
    );
  }
}

// POST /api/locations — create a new location (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, zone, type, capacity } = body;

    if (!name || !zone) {
      return NextResponse.json(
        { error: "Name and zone are required" },
        { status: 400 },
      );
    }

    const [result] = await db
      .insert(locations)
      .values({
        name,
        zone,
        type: type || "shelf",
        capacity: capacity ?? 100,
      })
      .returning();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/locations error:", error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 },
    );
  }
}
