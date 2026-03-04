Excellent choice. Using **Geist Mono** and **JetBrains Mono** gives the app a high-tech, "industrial-terminal" aesthetic. In a warehouse setting, monospaced fonts are actually a functional win—they make SKUs and quantities line up perfectly in tables, making them much easier to scan at a glance.

Here is your finalized **Product Requirements Document (PRD)**, updated with the **Traceability Engine** and your **Custom Typography System**.

---

## 📦 Project Overview: "StockFlow" (Traceability + Tech-Theme)

**Purpose:** A high-precision warehouse management system tracking the full lifecycle of inventory with a developer-centric, readable UI.

---

## 🎨 1. Design & Typography System

To maintain a "Single Source of Truth" for the visual identity, the app will utilize the following CSS variables for its theme:

| Variable       | Font Stack                            | Usage                                         |
| -------------- | ------------------------------------- | --------------------------------------------- |
| `--font-sans`  | `Geist Mono, ui-monospace, monospace` | Primary UI text, buttons, and navigation.     |
| `--font-serif` | `serif`                               | Formality/Headers (minimal use).              |
| `--font-mono`  | `JetBrains Mono, monospace`           | **SKUs, Quantities, Database IDs, and Logs.** |

> **Design Note:** The use of monospaced fonts as the primary "Sans" font ensures that character widths are consistent, preventing UI "shimmer" when numbers update in real-time.

---

## 2. Functional Requirements (Traceability Focus)

| Feature             | Description                                                      | Priority |
| ------------------- | ---------------------------------------------------------------- | -------- |
| **Auth System**     | Login/Signup with session persistence.                           | P0       |
| **Product CRUD**    | Create products with SKU, Name, and Category.                    | P0       |
| **Movement Engine** | Every stock change must define a **Type** (Sale, Restock, Move). | P0       |
| **Location Logic**  | Track stock across specific zones (e.g., Aisle A, Bin 402).      | P1       |
| **Audit Trail**     | A vertical timeline showing the "Who, What, Where, and When."    | P1       |
| **Data Dashboard**  | KPI cards (Total Stock, Low Stock, Daily Movements).             | P1       |

---

## 3. The Movement & Traceability Logic

Every stock adjustment is treated as a **transaction** rather than a simple value update.

### A. Movement Types

- **Inbound (Restock):** Vendor → Warehouse Location.
- **Outbound (Sold):** Warehouse Location → Customer/Order.
- **Transfer:** Location A → Location B (Internal movement).
- **Adjustment:** Loss/Damage/Found (Corrects digital vs. physical count).

### B. The "Paper Trail" (Audit Log)

The system will generate a table for every SKU using `--font-mono`:

- **Timestamp:** `2026-02-19 14:30:05`
- **Action:** `TRANSFER`
- **Qty:** `[-20]`
- **Path:** `[ZONE-A] -> [ZONE-B]`
- **User:** `admin_01`

---

## 4. Technical Architecture

### Data Schema

- **Products Table:** `id, sku (unique), name, description, min_threshold`
- **Locations Table:** `id, name (e.g., 'Shelf A1', 'Shipping Dock')`
- **Movements Table:** `id, product_id, user_id, type, qty, from_loc, to_loc, created_at`

### Frontend Implementation

- **Framework:** Next.js or React.
- **Styling:** Tailwind CSS (configured with your custom font variables).
- **State Management:** React Query (for real-time stock updates).

---

## 5. User Flow: Recording a Sale

1. **Search:** Staff types SKU into the search bar (rendered in `JetBrains Mono`).
2. **Select:** Clicks on "Widget X."
3. **Action:** Clicks "Register Sale."
4. **Input:** Enters quantity (e.g., `15`) and selects "Shipping Dock" as the source location.
5. **Confirmation:** System updates the `total_stock` for that SKU and injects a new row into the `Movements` table.
6. **Feedback:** Dashboard "Recent Activity" feed updates instantly.

---

**Would you like me to generate the Tailwind CSS configuration file or the CSS global styles to implement these specific font stacks?**
