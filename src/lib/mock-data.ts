// ============================================================
// MOCK DATA — StockFlow Warehouse Management System
// ============================================================

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  totalStock: number;
  minThreshold: number;
  location: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export interface Movement {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  userId: string;
  userName: string;
  type: "inbound" | "outbound" | "transfer" | "adjustment";
  qty: number;
  fromLocation: string | null;
  toLocation: string | null;
  createdAt: string;
  note: string;
}

export interface Location {
  id: string;
  name: string;
  zone: string;
  type: "shelf" | "bin" | "dock" | "floor";
  itemCount: number;
  capacity: number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: "INBOUND" | "OUTBOUND" | "TRANSFER" | "ADJUSTMENT";
  qty: number;
  path: string;
  user: string;
  productSku: string;
}

export interface Activity {
  id: string;
  message: string;
  timestamp: string;
  type: "inbound" | "outbound" | "transfer" | "adjustment";
  user: string;
}

// ── Products ──────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "p-001",
    sku: "WDG-X100",
    name: "Widget X100",
    description: "High-precision industrial widget, Grade A",
    category: "Widgets",
    totalStock: 1240,
    minThreshold: 100,
    location: "ZONE-A / Shelf A1",
    status: "in-stock",
  },
  {
    id: "p-002",
    sku: "GKT-R200",
    name: "Gasket R200",
    description: "Heat-resistant rubber gasket, 200mm",
    category: "Gaskets",
    totalStock: 45,
    minThreshold: 50,
    location: "ZONE-B / Bin 302",
    status: "low-stock",
  },
  {
    id: "p-003",
    sku: "BLT-S350",
    name: "Bolt Set S350",
    description: "Stainless steel bolt set, M8x50",
    category: "Fasteners",
    totalStock: 3200,
    minThreshold: 200,
    location: "ZONE-A / Shelf A3",
    status: "in-stock",
  },
  {
    id: "p-004",
    sku: "BRG-K450",
    name: "Bearing K450",
    description: "Sealed ball bearing, 45mm bore",
    category: "Bearings",
    totalStock: 0,
    minThreshold: 20,
    location: "ZONE-C / Shelf C1",
    status: "out-of-stock",
  },
  {
    id: "p-005",
    sku: "VLV-P600",
    name: "Valve P600",
    description: "Pneumatic control valve, ¾ inch",
    category: "Valves",
    totalStock: 180,
    minThreshold: 30,
    location: "ZONE-B / Bin 105",
    status: "in-stock",
  },
  {
    id: "p-006",
    sku: "MTR-D800",
    name: "Motor D800",
    description: "DC brushless motor, 800W",
    category: "Motors",
    totalStock: 12,
    minThreshold: 10,
    location: "ZONE-D / Floor D1",
    status: "low-stock",
  },
  {
    id: "p-007",
    sku: "SNR-T100",
    name: "Sensor T100",
    description: "Temperature sensor, -40°C to 200°C",
    category: "Sensors",
    totalStock: 560,
    minThreshold: 50,
    location: "ZONE-A / Shelf A5",
    status: "in-stock",
  },
  {
    id: "p-008",
    sku: "PMP-H250",
    name: "Pump H250",
    description: "Hydraulic pump, 250 bar max",
    category: "Pumps",
    totalStock: 28,
    minThreshold: 15,
    location: "ZONE-D / Floor D3",
    status: "in-stock",
  },
];

// ── Movements ─────────────────────────────────────────────
export const movements: Movement[] = [
  {
    id: "m-001",
    productId: "p-001",
    productSku: "WDG-X100",
    productName: "Widget X100",
    userId: "u-001",
    userName: "admin_01",
    type: "outbound",
    qty: -15,
    fromLocation: "ZONE-A",
    toLocation: "Shipping Dock",
    createdAt: "2026-02-19T14:30:05",
    note: "Order #ORD-4421",
  },
  {
    id: "m-002",
    productId: "p-002",
    productSku: "GKT-R200",
    productName: "Gasket R200",
    userId: "u-002",
    userName: "ops_sarah",
    type: "inbound",
    qty: 200,
    fromLocation: "Vendor: AcmeCorp",
    toLocation: "ZONE-B",
    createdAt: "2026-02-19T13:15:22",
    note: "PO #PO-8932",
  },
  {
    id: "m-003",
    productId: "p-003",
    productSku: "BLT-S350",
    productName: "Bolt Set S350",
    userId: "u-001",
    userName: "admin_01",
    type: "transfer",
    qty: -500,
    fromLocation: "ZONE-A",
    toLocation: "ZONE-C",
    createdAt: "2026-02-19T11:45:10",
    note: "Reorganization",
  },
  {
    id: "m-004",
    productId: "p-004",
    productSku: "BRG-K450",
    productName: "Bearing K450",
    userId: "u-003",
    userName: "mgr_dave",
    type: "adjustment",
    qty: -5,
    fromLocation: "ZONE-C",
    toLocation: null,
    createdAt: "2026-02-19T10:20:00",
    note: "Damaged in transit",
  },
  {
    id: "m-005",
    productId: "p-005",
    productSku: "VLV-P600",
    productName: "Valve P600",
    userId: "u-002",
    userName: "ops_sarah",
    type: "outbound",
    qty: -30,
    fromLocation: "ZONE-B",
    toLocation: "Shipping Dock",
    createdAt: "2026-02-19T09:50:30",
    note: "Order #ORD-4418",
  },
  {
    id: "m-006",
    productId: "p-006",
    productSku: "MTR-D800",
    productName: "Motor D800",
    userId: "u-001",
    userName: "admin_01",
    type: "inbound",
    qty: 25,
    fromLocation: "Vendor: MotorWorks",
    toLocation: "ZONE-D",
    createdAt: "2026-02-18T16:30:00",
    note: "PO #PO-8928",
  },
  {
    id: "m-007",
    productId: "p-007",
    productSku: "SNR-T100",
    productName: "Sensor T100",
    userId: "u-003",
    userName: "mgr_dave",
    type: "transfer",
    qty: -100,
    fromLocation: "ZONE-A",
    toLocation: "ZONE-B",
    createdAt: "2026-02-18T14:10:45",
    note: "Station rebalance",
  },
  {
    id: "m-008",
    productId: "p-001",
    productSku: "WDG-X100",
    productName: "Widget X100",
    userId: "u-002",
    userName: "ops_sarah",
    type: "inbound",
    qty: 500,
    fromLocation: "Vendor: WidgetCo",
    toLocation: "ZONE-A",
    createdAt: "2026-02-18T09:00:00",
    note: "PO #PO-8920",
  },
];

// ── Locations ─────────────────────────────────────────────
export const locations: Location[] = [
  {
    id: "l-001",
    name: "Shelf A1",
    zone: "ZONE-A",
    type: "shelf",
    itemCount: 1240,
    capacity: 2000,
  },
  {
    id: "l-002",
    name: "Shelf A3",
    zone: "ZONE-A",
    type: "shelf",
    itemCount: 3200,
    capacity: 5000,
  },
  {
    id: "l-003",
    name: "Shelf A5",
    zone: "ZONE-A",
    type: "shelf",
    itemCount: 560,
    capacity: 1000,
  },
  {
    id: "l-004",
    name: "Bin 105",
    zone: "ZONE-B",
    type: "bin",
    itemCount: 180,
    capacity: 300,
  },
  {
    id: "l-005",
    name: "Bin 302",
    zone: "ZONE-B",
    type: "bin",
    itemCount: 45,
    capacity: 500,
  },
  {
    id: "l-006",
    name: "Shelf C1",
    zone: "ZONE-C",
    type: "shelf",
    itemCount: 0,
    capacity: 800,
  },
  {
    id: "l-007",
    name: "Floor D1",
    zone: "ZONE-D",
    type: "floor",
    itemCount: 12,
    capacity: 50,
  },
  {
    id: "l-008",
    name: "Floor D3",
    zone: "ZONE-D",
    type: "floor",
    itemCount: 28,
    capacity: 100,
  },
  {
    id: "l-009",
    name: "Shipping Dock",
    zone: "DOCK",
    type: "dock",
    itemCount: 0,
    capacity: 500,
  },
  {
    id: "l-010",
    name: "Receiving Dock",
    zone: "DOCK",
    type: "dock",
    itemCount: 0,
    capacity: 500,
  },
];

// ── Audit Trail ───────────────────────────────────────────
export const auditEntries: AuditEntry[] = [
  {
    id: "a-001",
    timestamp: "2026-02-19 14:30:05",
    action: "OUTBOUND",
    qty: -15,
    path: "[ZONE-A] -> [Shipping Dock]",
    user: "admin_01",
    productSku: "WDG-X100",
  },
  {
    id: "a-002",
    timestamp: "2026-02-19 11:45:10",
    action: "TRANSFER",
    qty: -500,
    path: "[ZONE-A] -> [ZONE-C]",
    user: "admin_01",
    productSku: "BLT-S350",
  },
  {
    id: "a-003",
    timestamp: "2026-02-18 09:00:00",
    action: "INBOUND",
    qty: 500,
    path: "[Vendor: WidgetCo] -> [ZONE-A]",
    user: "ops_sarah",
    productSku: "WDG-X100",
  },
  {
    id: "a-004",
    timestamp: "2026-02-17 16:20:00",
    action: "OUTBOUND",
    qty: -80,
    path: "[ZONE-A] -> [Shipping Dock]",
    user: "mgr_dave",
    productSku: "WDG-X100",
  },
  {
    id: "a-005",
    timestamp: "2026-02-17 10:05:30",
    action: "TRANSFER",
    qty: -200,
    path: "[ZONE-A] -> [ZONE-B]",
    user: "admin_01",
    productSku: "WDG-X100",
  },
  {
    id: "a-006",
    timestamp: "2026-02-16 14:40:15",
    action: "INBOUND",
    qty: 1000,
    path: "[Vendor: WidgetCo] -> [ZONE-A]",
    user: "ops_sarah",
    productSku: "WDG-X100",
  },
  {
    id: "a-007",
    timestamp: "2026-02-16 09:15:00",
    action: "ADJUSTMENT",
    qty: -12,
    path: "[ZONE-A] -> [VOID]",
    user: "mgr_dave",
    productSku: "WDG-X100",
  },
  {
    id: "a-008",
    timestamp: "2026-02-15 11:30:00",
    action: "OUTBOUND",
    qty: -50,
    path: "[ZONE-A] -> [Shipping Dock]",
    user: "admin_01",
    productSku: "WDG-X100",
  },
];

// ── Recent Activity ───────────────────────────────────────
export const recentActivity: Activity[] = [
  {
    id: "act-001",
    message: "Sale: 15x WDG-X100 shipped from ZONE-A",
    timestamp: "2 min ago",
    type: "outbound",
    user: "admin_01",
  },
  {
    id: "act-002",
    message: "Restock: 200x GKT-R200 received in ZONE-B",
    timestamp: "1 hr ago",
    type: "inbound",
    user: "ops_sarah",
  },
  {
    id: "act-003",
    message: "Transfer: 500x BLT-S350 moved A → C",
    timestamp: "3 hr ago",
    type: "transfer",
    user: "admin_01",
  },
  {
    id: "act-004",
    message: "Adjustment: -5x BRG-K450 (damaged)",
    timestamp: "4 hr ago",
    type: "adjustment",
    user: "mgr_dave",
  },
  {
    id: "act-005",
    message: "Sale: 30x VLV-P600 shipped from ZONE-B",
    timestamp: "5 hr ago",
    type: "outbound",
    user: "ops_sarah",
  },
  {
    id: "act-006",
    message: "Restock: 25x MTR-D800 received in ZONE-D",
    timestamp: "yesterday",
    type: "inbound",
    user: "admin_01",
  },
  {
    id: "act-007",
    message: "Transfer: 100x SNR-T100 moved A → B",
    timestamp: "yesterday",
    type: "transfer",
    user: "mgr_dave",
  },
  {
    id: "act-008",
    message: "Restock: 500x WDG-X100 received in ZONE-A",
    timestamp: "yesterday",
    type: "inbound",
    user: "ops_sarah",
  },
];

// ── KPI Data ──────────────────────────────────────────────
export const kpiData = {
  totalStock: { value: 5265, trend: "+3.2%", trendUp: true },
  lowStockItems: { value: 2, trend: "-1", trendUp: false },
  dailyMovements: { value: 5, trend: "+25%", trendUp: true },
  activeLocations: { value: 8, trend: "0", trendUp: true },
};
