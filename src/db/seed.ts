import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { products, locations, movements } from "./schema";
import path from "path";

const dbPath = path.join(process.cwd(), "sqlite.db");
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
const db = drizzle(sqlite);

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  db.delete(movements).run();
  db.delete(products).run();
  db.delete(locations).run();

  // Seed products
  const productData = [
    {
      sku: "WDG-X100",
      name: "Widget X100",
      description: "High-precision industrial widget, Grade A",
      category: "Widgets",
      minThreshold: 100,
    },
    {
      sku: "GKT-R200",
      name: "Gasket R200",
      description: "Heat-resistant rubber gasket, 200mm",
      category: "Gaskets",
      minThreshold: 50,
    },
    {
      sku: "BLT-S350",
      name: "Bolt Set S350",
      description: "Stainless steel bolt set, M8x50",
      category: "Fasteners",
      minThreshold: 200,
    },
    {
      sku: "BRG-K450",
      name: "Bearing K450",
      description: "Sealed ball bearing, 45mm bore",
      category: "Bearings",
      minThreshold: 20,
    },
    {
      sku: "VLV-P600",
      name: "Valve P600",
      description: "Pneumatic control valve, 3/4 inch",
      category: "Valves",
      minThreshold: 30,
    },
    {
      sku: "MTR-D800",
      name: "Motor D800",
      description: "DC brushless motor, 800W",
      category: "Motors",
      minThreshold: 10,
    },
    {
      sku: "SNR-T100",
      name: "Sensor T100",
      description: "Temperature sensor, -40C to 200C",
      category: "Sensors",
      minThreshold: 50,
    },
    {
      sku: "PMP-H250",
      name: "Pump H250",
      description: "Hydraulic pump, 250 bar max",
      category: "Pumps",
      minThreshold: 15,
    },
  ];

  const insertedProducts = db
    .insert(products)
    .values(productData)
    .returning()
    .all();
  console.log(`  ✓ Inserted ${insertedProducts.length} products`);

  // Seed locations
  const locationData = [
    {
      name: "Shelf A1",
      zone: "ZONE-A",
      type: "shelf" as const,
      capacity: 2000,
    },
    {
      name: "Shelf A3",
      zone: "ZONE-A",
      type: "shelf" as const,
      capacity: 5000,
    },
    {
      name: "Shelf A5",
      zone: "ZONE-A",
      type: "shelf" as const,
      capacity: 1000,
    },
    { name: "Bin 105", zone: "ZONE-B", type: "bin" as const, capacity: 300 },
    { name: "Bin 302", zone: "ZONE-B", type: "bin" as const, capacity: 500 },
    { name: "Shelf C1", zone: "ZONE-C", type: "shelf" as const, capacity: 800 },
    { name: "Floor D1", zone: "ZONE-D", type: "floor" as const, capacity: 50 },
    { name: "Floor D3", zone: "ZONE-D", type: "floor" as const, capacity: 100 },
    {
      name: "Shipping Dock",
      zone: "DOCK",
      type: "dock" as const,
      capacity: 500,
    },
    {
      name: "Receiving Dock",
      zone: "DOCK",
      type: "dock" as const,
      capacity: 500,
    },
  ];

  const insertedLocations = db
    .insert(locations)
    .values(locationData)
    .returning()
    .all();
  console.log(`  ✓ Inserted ${insertedLocations.length} locations`);

  // Seed movements (use a fake userId since no real user exists yet)
  const fakeUserId = "seed-user-001";
  const movementData = [
    {
      productId: insertedProducts[0].id,
      userId: fakeUserId,
      type: "inbound" as const,
      qty: 1500,
      fromLocation: "Vendor: WidgetCo",
      toLocation: "ZONE-A",
      note: "PO #PO-8920",
      createdAt: "2026-02-15 09:00:00",
    },
    {
      productId: insertedProducts[0].id,
      userId: fakeUserId,
      type: "outbound" as const,
      qty: -80,
      fromLocation: "ZONE-A",
      toLocation: "Shipping Dock",
      note: "Order #ORD-4410",
      createdAt: "2026-02-16 10:30:00",
    },
    {
      productId: insertedProducts[0].id,
      userId: fakeUserId,
      type: "transfer" as const,
      qty: -200,
      fromLocation: "ZONE-A",
      toLocation: "ZONE-B",
      note: "Rebalance",
      createdAt: "2026-02-17 10:05:30",
    },
    {
      productId: insertedProducts[0].id,
      userId: fakeUserId,
      type: "outbound" as const,
      qty: -15,
      fromLocation: "ZONE-A",
      toLocation: "Shipping Dock",
      note: "Order #ORD-4421",
      createdAt: "2026-02-19 14:30:05",
    },
    {
      productId: insertedProducts[1].id,
      userId: fakeUserId,
      type: "inbound" as const,
      qty: 200,
      fromLocation: "Vendor: AcmeCorp",
      toLocation: "ZONE-B",
      note: "PO #PO-8932",
      createdAt: "2026-02-19 13:15:22",
    },
    {
      productId: insertedProducts[2].id,
      userId: fakeUserId,
      type: "transfer" as const,
      qty: -500,
      fromLocation: "ZONE-A",
      toLocation: "ZONE-C",
      note: "Reorganization",
      createdAt: "2026-02-19 11:45:10",
    },
    {
      productId: insertedProducts[3].id,
      userId: fakeUserId,
      type: "adjustment" as const,
      qty: -5,
      fromLocation: "ZONE-C",
      toLocation: null,
      note: "Damaged in transit",
      createdAt: "2026-02-19 10:20:00",
    },
    {
      productId: insertedProducts[4].id,
      userId: fakeUserId,
      type: "outbound" as const,
      qty: -30,
      fromLocation: "ZONE-B",
      toLocation: "Shipping Dock",
      note: "Order #ORD-4418",
      createdAt: "2026-02-19 09:50:30",
    },
    {
      productId: insertedProducts[5].id,
      userId: fakeUserId,
      type: "inbound" as const,
      qty: 25,
      fromLocation: "Vendor: MotorWorks",
      toLocation: "ZONE-D",
      note: "PO #PO-8928",
      createdAt: "2026-02-18 16:30:00",
    },
    {
      productId: insertedProducts[6].id,
      userId: fakeUserId,
      type: "transfer" as const,
      qty: -100,
      fromLocation: "ZONE-A",
      toLocation: "ZONE-B",
      note: "Station rebalance",
      createdAt: "2026-02-18 14:10:45",
    },
    {
      productId: insertedProducts[0].id,
      userId: fakeUserId,
      type: "inbound" as const,
      qty: 500,
      fromLocation: "Vendor: WidgetCo",
      toLocation: "ZONE-A",
      note: "PO #PO-8920",
      createdAt: "2026-02-18 09:00:00",
    },
    {
      productId: insertedProducts[0].id,
      userId: fakeUserId,
      type: "adjustment" as const,
      qty: -12,
      fromLocation: "ZONE-A",
      toLocation: null,
      note: "Damaged inventory write-off",
      createdAt: "2026-02-16 14:40:15",
    },
  ];

  const insertedMovements = db
    .insert(movements)
    .values(movementData)
    .returning()
    .all();
  console.log(`  ✓ Inserted ${insertedMovements.length} movements`);

  console.log("✅ Seed completed!");
  sqlite.close();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
