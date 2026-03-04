"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MovementBadge } from "@/components/movement-badge";

interface Movement {
  id: number;
  productId: number;
  productSku: string;
  productName: string;
  userId: string;
  type: "inbound" | "outbound" | "transfer" | "adjustment";
  qty: number;
  fromLocation: string | null;
  toLocation: string | null;
  note: string;
  createdAt: string;
}

interface ProductOption {
  id: number;
  sku: string;
  name: string;
}

export default function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productId: "",
    type: "inbound" as "inbound" | "outbound" | "transfer" | "adjustment",
    qty: 0,
    fromLocation: "",
    toLocation: "",
    note: "",
  });

  const fetchMovements = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (typeFilter !== "all") params.set("type", typeFilter);
      const res = await fetch(`/api/movements?${params}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMovements(data);
    } catch (err) {
      console.error("Fetch movements error:", err);
    } finally {
      setLoading(false);
    }
  }, [typeFilter]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) return;
      const data = await res.json();
      setProducts(
        data.map((p: ProductOption) => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
        })),
      );
    } catch {}
  }, []);

  useEffect(() => {
    fetchMovements();
    fetchProducts();
  }, [fetchMovements, fetchProducts]);

  const handleRegisterMovement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const qty =
        formData.type === "outbound" || formData.type === "adjustment"
          ? -Math.abs(formData.qty)
          : Math.abs(formData.qty);

      const res = await fetch("/api/movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: parseInt(formData.productId),
          type: formData.type,
          qty,
          fromLocation: formData.fromLocation || null,
          toLocation: formData.toLocation || null,
          note: formData.note,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed");
        return;
      }
      setDialogOpen(false);
      setFormData({
        productId: "",
        type: "inbound",
        qty: 0,
        fromLocation: "",
        toLocation: "",
        note: "",
      });
      fetchMovements();
    } catch {
      alert("Failed to register movement");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = movements.filter((m) => {
    const s = search.toLowerCase();
    return (
      m.productSku.toLowerCase().includes(s) ||
      m.productName.toLowerCase().includes(s) ||
      m.note.toLowerCase().includes(s)
    );
  });

  const formatTimestamp = (ts: string) => {
    return ts.replace("T", " ").slice(0, 19);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground font-mono animate-pulse">
          Loading movements...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Movements</h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            {movements.length} transactions recorded
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Register Movement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register Stock Movement</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegisterMovement} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Product
                  </label>
                  <Select
                    value={formData.productId}
                    onValueChange={(v) =>
                      setFormData({ ...formData, productId: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.sku} — {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Type
                  </label>
                  <Select
                    value={formData.type}
                    onValueChange={(v) =>
                      setFormData({
                        ...formData,
                        type: v as typeof formData.type,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Inbound</SelectItem>
                      <SelectItem value="outbound">Outbound</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="adjustment">Adjustment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Quantity
                  </label>
                  <Input
                    type="number"
                    className="font-mono"
                    value={formData.qty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qty: parseInt(e.target.value) || 0,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    From
                  </label>
                  <Input
                    placeholder="ZONE-A"
                    className="font-mono"
                    value={formData.fromLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, fromLocation: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    To
                  </label>
                  <Input
                    placeholder="ZONE-B"
                    className="font-mono"
                    value={formData.toLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, toLocation: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Note
                </label>
                <Input
                  placeholder="PO# or reason..."
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Registering..." : "Register Movement"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by SKU, product, or note..."
                className="border-none bg-transparent font-mono text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="inbound">Inbound</SelectItem>
                <SelectItem value="outbound">Outbound</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            Movement Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Type</TableHead>
                <TableHead className="font-mono text-xs">SKU</TableHead>
                <TableHead className="text-right font-mono text-xs">
                  QTY
                </TableHead>
                <TableHead className="font-mono text-xs">PATH</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="font-mono text-xs">TIMESTAMP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow
                  key={m.id}
                  className="border-border hover:bg-accent/30"
                >
                  <TableCell>
                    <MovementBadge type={m.type} />
                  </TableCell>
                  <TableCell className="font-mono text-neon-cyan text-sm">
                    {m.productSku}
                  </TableCell>
                  <TableCell
                    className={`text-right font-mono text-sm ${m.qty >= 0 ? "text-neon-lime" : "text-neon-red"}`}
                  >
                    {m.qty >= 0 ? `+${m.qty}` : m.qty}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    [{m.fromLocation || "N/A"}] → [{m.toLocation || "VOID"}]
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {m.userId}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {formatTimestamp(m.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground font-mono py-8"
                  >
                    No movements found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
