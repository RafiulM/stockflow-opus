# StockFlow — Product Specification

## 1. Overview

**StockFlow** is a real-time warehouse management system built for tracking inventory with full traceability. It provides SKU-based stock management, movement logging, location tracking, and a complete audit trail — all driven by a transaction-based inventory model where stock levels are computed from movement history rather than stored directly.

**Tech Stack:** Next.js 16 · React 19 · TypeScript · SQLite · Drizzle ORM · Better-Auth · Tailwind CSS 4 · shadcn/ui

---

## 2. Users & Authentication

### 2.1 User Roles

| Role | Description |
|------|-------------|
| Warehouse Staff | Authenticated users who can view inventory, register movements, manage products and locations |

All authenticated users share the same permission level. There is no admin/manager distinction.

### 2.2 Authentication Flow

- **Method:** Email + password (Better-Auth)
- **Session:** Cookie-based, 7-day expiration, 1-day refresh window
- **Signup:** Name, email, password (min 6 characters), confirm password
- **Login:** Email + password with redirect to original URL via `callbackUrl`
- **Protected routes:** All routes except `/login`, `/signup`, and `/api/auth/*`
- **Unauthenticated users** are redirected to `/login`

---

## 3. Core Data Model

### 3.1 Products

| Field | Type | Constraints |
|-------|------|-------------|
| id | integer | Primary key, autoincrement |
| sku | text | Unique, required |
| name | text | Required |
| description | text | Optional |
| category | text | Optional |
| minThreshold | integer | Default: 0 |
| createdAt | timestamp | Auto-generated |

**Stock is never stored directly.** A product's current stock = `SUM(qty)` across all its movements.

### 3.2 Locations

| Field | Type | Constraints |
|-------|------|-------------|
| id | integer | Primary key, autoincrement |
| name | text | Required (e.g., "Shelf A1", "Bin 105") |
| zone | text | Required (ZONE-A, ZONE-B, ZONE-C, ZONE-D, DOCK) |
| type | text | shelf, bin, dock, floor (default: shelf) |
| capacity | integer | Default: 100 |

### 3.3 Movements

The central table — every stock change is an immutable movement record.

| Field | Type | Constraints |
|-------|------|-------------|
| id | integer | Primary key, autoincrement |
| productId | integer | FK → products.id, required |
| userId | text | FK → user.id, auto-captured from session |
| type | text | inbound, outbound, transfer, adjustment |
| qty | integer | Signed: positive for inbound, negative for outbound/adjustment |
| fromLocation | text | Optional (zone or location name) |
| toLocation | text | Optional (zone or location name) |
| note | text | Optional (PO#, Order#, reason) |
| createdAt | timestamp | Auto-generated |

### 3.4 Movement Types

| Type | Qty Sign | Description | Example |
|------|----------|-------------|---------|
| Inbound | + | Stock received into warehouse | PO delivery, returns |
| Outbound | − | Stock leaving warehouse | Sales, shipments |
| Transfer | + | Stock moved between locations | Zone A → Zone B |
| Adjustment | − | Corrections to inventory | Damage, count discrepancy |

---

## 4. Features

### 4.1 Dashboard (`/`)

The main landing page providing a real-time warehouse overview.

**KPI Cards:**
| Metric | Calculation | Accent Color |
|--------|-------------|--------------|
| Total Stock | SUM of all movement quantities across all products | Cyan |
| Low Stock Items | Count of products where stock ≤ minThreshold | Amber |
| Daily Movements | Count of movements created today | Lime |
| Active Locations | Total count of locations | Blue |

**Recent Activity Feed:**
- Shows last 10 movements
- Displays: movement type badge, product SKU, quantity (signed), path (from → to), timestamp
- Quantities color-coded: green for positive, red for negative

**Quick Actions:**
- Register Sale → navigates to `/movements`
- Receive Stock → navigates to `/movements`
- Transfer Stock → navigates to `/movements`

---

### 4.2 Products (`/products`)

Catalog view for all warehouse products.

**Table Columns:** SKU, Name, Category, Stock, Min Threshold, Status

**Stock Status Badges:**
| Status | Condition | Color |
|--------|-----------|-------|
| In Stock | stock > minThreshold | Lime |
| Low Stock | 0 < stock ≤ minThreshold | Amber |
| Out of Stock | stock ≤ 0 | Red |

**Capabilities:**
- Search by SKU or product name
- Filter by status (All, In Stock, Low Stock, Out of Stock)
- Add new product via dialog form (SKU, Name, Description, Category, Min Threshold)
- Duplicate SKU prevention (unique constraint)

---

### 4.3 Movements (`/movements`)

Complete transaction log for all stock movements.

**Table Columns:** Type, SKU, Qty, Path (from → to), User, Timestamp

**Capabilities:**
- Search across SKU, notes, and locations
- Filter by movement type (All, Inbound, Outbound, Transfer, Adjustment)
- Register new movement via dialog form:
  - Select product (dropdown)
  - Select type (inbound/outbound/transfer/adjustment)
  - Enter quantity (auto-negated for outbound/adjustment)
  - From/To location fields
  - Optional note
- Movement badge color-coding by type

---

### 4.4 Locations (`/locations`)

Warehouse zone and location management.

**Display:** Cards grouped by zone (ZONE-A through ZONE-D, DOCK)

**Per Location Card:**
- Location name and type
- Item count (computed from zone-level movements)
- Capacity and utilization percentage
- Utilization color: green (<70%), amber (70–89%), red (90%+)

**Capabilities:**
- Add new location via dialog form (Name, Zone, Type, Capacity)

---

### 4.5 Audit Trail (`/audit`)

Full traceability engine for any SKU.

**Workflow:**
1. Enter SKU in search field
2. Click "Trace" to query movement history
3. View product context card (SKU, transaction count)
4. Browse vertical timeline of all movements

**Timeline Entry Fields:**
- Timestamp
- Movement type badge
- Action description
- Quantity (color-coded: green +, red −)
- Path (source → destination)
- User who performed the action

---

## 5. API Specification

### 5.1 Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| * | `/api/auth/[...all]` | Public | Better-Auth handler (login, signup, logout, session) |

### 5.2 Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | Required | List all products with computed stock |
| POST | `/api/products` | Required | Create product (body: `sku`, `name`, `description?`, `category?`, `minThreshold?`) |

**GET response shape:**
```json
[{
  "id": 1,
  "sku": "WDG-X100",
  "name": "Widget Alpha",
  "category": "Widgets",
  "minThreshold": 20,
  "totalStock": 150
}]
```

### 5.3 Movements

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/movements?type=&productId=` | Required | List movements, optional filters |
| POST | `/api/movements` | Required | Create movement (body: `productId`, `type`, `qty`, `fromLocation?`, `toLocation?`, `note?`) |

### 5.4 Locations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/locations` | Required | List all locations with item counts |
| POST | `/api/locations` | Required | Create location (body: `name`, `zone`, `type?`, `capacity?`) |

### 5.5 Dashboard

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/dashboard` | Required | KPI aggregation + last 10 movements |

### 5.6 Audit

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/audit?sku=` | Required | Movement timeline for a specific SKU |

---

## 6. UI Architecture

### 6.1 Layout Structure

```
┌─────────────────────────────────────────────┐
│  TopNav (sticky)                            │
│  [Search] [Notifications] [User Menu]       │
├──────┬──────────────────────────────────────┤
│ Side │                                      │
│ bar  │         Page Content                 │
│ 60px │                                      │
│      │                                      │
│ Nav  │                                      │
│ Icons│                                      │
└──────┴──────────────────────────────────────┘
```

- **Desktop:** Fixed 60px sidebar + scrollable main content
- **Mobile:** Hamburger menu opens sidebar as a sheet/drawer
- **Auth pages** (`/login`, `/signup`): Centered layout, no sidebar/topnav

### 6.2 Navigation Items

| Icon | Label | Route |
|------|-------|-------|
| LayoutDashboard | Dashboard | `/` |
| Package | Products | `/products` |
| ArrowLeftRight | Movements | `/movements` |
| MapPin | Locations | `/locations` |
| Shield | Audit Trail | `/audit` |

### 6.3 Component Library

Built on **shadcn/ui** (Radix UI primitives):
Button, Card, Input, Badge, Table, Dialog, Select, Tabs, Avatar, Sheet, DropdownMenu, Separator, Tooltip, ScrollArea, Command

Custom components: KpiCard, MovementBadge, Timeline, AppShell, Sidebar, TopNav

---

## 7. Design System

### 7.1 Theme

Dark mode with an industrial-terminal aesthetic.

### 7.2 Typography

| Usage | Font | Variable |
|-------|------|----------|
| UI text, navigation, labels | Geist Mono | `--font-sans` |
| SKUs, quantities, IDs | JetBrains Mono | `--font-mono` |

Monospaced primary font prevents UI shimmer during real-time number updates.

### 7.3 Color Palette (OKLCh)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `oklch(0.13 0.005 260)` | Page background |
| Card | `oklch(0.17 0.008 260)` | Card surfaces |
| Foreground | `oklch(0.93 0.01 260)` | Primary text |
| Cyan | Accent | Interactive elements, primary actions |
| Lime | Accent | Success states, inbound movements |
| Amber | Accent | Warnings, low stock |
| Red | Accent | Critical states, outbound movements |
| Blue | Accent | Transfer movements |

### 7.4 Visual Effects

- Glow shadows on interactive elements (`glow-cyan`, `glow-lime`)
- Pulse animation for live status indicators
- Scale-on-hover for KPI cards
- Gradient connector lines in timeline

---

## 8. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Transaction-based stock** (no inventory table) | Stock = SUM(movements). Guarantees a perfect audit trail with zero drift between reported and actual history. |
| **Signed quantities** | Outbound/adjustment auto-negate qty. Simplifies aggregation to a single SUM query. |
| **Monospaced UI font** | Fixed-width characters prevent layout shift when numeric values update in real-time. |
| **Nullable from/to locations** | Adjustments may lack a physical location (abstract corrections). Flexibility over rigidity. |
| **SQLite** | Zero-config, single-file database. Suitable for single-server deployments. WAL mode enables concurrent reads. |
| **Stateless stock status** | Status badges computed client-side from `totalStock` vs `minThreshold`. No DB field needed. |
| **Immutable movements** | Movements are append-only. Corrections are new adjustment records, not edits to existing ones. |

---

## 9. Seed Data

### Products (8)
Widget Alpha, Gasket Pro, Bolt Standard, Bearing Ultra, Valve Core, Motor Drive, Sensor Net, Pump Flow

### Locations (10)
Across 5 zones: Shelf A1, Shelf A2, Bin B1, Bin B2, Shelf C1, Shelf C2, Dock In, Dock Out, Floor D1, Floor D2

### Movements (11)
Sample entries covering all four movement types with realistic notes (PO numbers, order references, damage reports, cycle count adjustments).

---

## 10. Non-Functional Requirements

| Requirement | Detail |
|-------------|--------|
| **Database** | SQLite with WAL mode for concurrent read performance |
| **Auth session** | 7-day expiration, 1-day refresh |
| **Password** | Minimum 6 characters |
| **Ordering** | All list views ordered newest-first |
| **Responsiveness** | Mobile-friendly with collapsible sidebar |
| **Runtime** | Node.js, port 3000 (development) |
