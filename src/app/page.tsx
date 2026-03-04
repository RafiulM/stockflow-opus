"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Package,
  ArrowLeftRight,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/kpi-card";
import { MovementBadge } from "@/components/movement-badge";
import { MovementTrendsChart } from "@/components/movement-trends-chart";
import { StockByCategoryChart } from "@/components/stock-by-category-chart";

interface KpiData {
  totalStock: number;
  lowStockItems: number;
  dailyMovements: number;
  activeLocations: number;
}

interface Activity {
  id: number;
  type: "inbound" | "outbound" | "transfer" | "adjustment";
  qty: number;
  productSku: string;
  productName: string;
  fromLocation: string | null;
  toLocation: string | null;
  userId: string;
  createdAt: string;
  note: string;
}

interface TrendPoint {
  date: string;
  inbound: number;
  outbound: number;
  transfer: number;
  adjustment: number;
}

interface CategoryStock {
  category: string;
  totalStock: number;
}

export default function DashboardPage() {
  const [kpi, setKpi] = useState<KpiData | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [movementTrends, setMovementTrends] = useState<TrendPoint[]>([]);
  const [stockByCategory, setStockByCategory] = useState<CategoryStock[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setKpi(data.kpi);
      setRecentActivity(data.recentActivity);
      setMovementTrends(data.movementTrends);
      setStockByCategory(data.stockByCategory);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatTime = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr ago`;
    return `${Math.floor(hrs / 24)} days ago`;
  };

  const getActivityMessage = (a: Activity) => {
    const typeLabelMap: Record<string, string> = {
      inbound: "Restock",
      outbound: "Sale",
      transfer: "Transfer",
      adjustment: "Adjustment",
    };
    const label = typeLabelMap[a.type] || a.type;
    const qty = Math.abs(a.qty);
    return `${label}: ${a.qty >= 0 ? "" : "-"}${qty}x ${a.productSku} ${a.fromLocation ? `from ${a.fromLocation}` : ""}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground font-mono animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground font-mono text-sm mt-1">
          Real-time warehouse overview •{" "}
          {new Date().toISOString().replace("T", " ").slice(0, 19)} UTC
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="TOTAL STOCK"
          value={kpi?.totalStock.toLocaleString() ?? "—"}
          icon={Package}
          accent="cyan"
        />
        <KpiCard
          title="LOW STOCK ITEMS"
          value={String(kpi?.lowStockItems ?? "—")}
          icon={AlertTriangle}
          accent="amber"
        />
        <KpiCard
          title="DAILY MOVEMENTS"
          value={String(kpi?.dailyMovements ?? "—")}
          icon={ArrowLeftRight}
          accent="lime"
        />
        <KpiCard
          title="ACTIVE LOCATIONS"
          value={String(kpi?.activeLocations ?? "—")}
          icon={TrendingDown}
          accent="blue"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MovementTrendsChart data={movementTrends} />
        <StockByCategoryChart data={stockByCategory} />
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.length === 0 && (
              <p className="text-sm text-muted-foreground font-mono">
                No recent activity
              </p>
            )}
            {recentActivity.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 p-2 rounded hover:bg-accent/30 transition-colors"
              >
                <MovementBadge type={a.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono truncate">
                    {getActivityMessage(a)}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {formatTime(a.createdAt)} • {a.userId}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start border-neon-red/30 text-neon-red hover:bg-neon-red/10"
            >
              <ArrowLeftRight className="w-4 h-4 mr-2 rotate-180" />
              Register Sale
              <span className="ml-auto text-xs text-muted-foreground">
                Outbound movement
              </span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-neon-lime/30 text-neon-lime hover:bg-neon-lime/10"
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Receive Stock
              <span className="ml-auto text-xs text-muted-foreground">
                Inbound movement
              </span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10"
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Transfer Stock
              <span className="ml-auto text-xs text-muted-foreground">
                Internal movement
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
