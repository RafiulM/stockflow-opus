"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/timeline";

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  qty: number;
  path: string;
  user: string;
  productSku: string;
  productName: string;
  note: string;
}

export default function AuditPage() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [skuSearch, setSkuSearch] = useState("");
  const [activeSku, setActiveSku] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAudit = useCallback(async (sku: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (sku) params.set("sku", sku);
      const res = await fetch(`/api/audit?${params}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Fetch audit error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAudit("");
  }, [fetchAudit]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSku(skuSearch);
    fetchAudit(skuSearch);
  };

  const selectedProduct = activeSku
    ? entries.find((e) => e.productSku === activeSku)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Trail</h1>
        <p className="text-muted-foreground font-mono text-sm mt-1">
          Complete traceability engine — search by SKU
        </p>
      </div>

      {/* Search */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter SKU (e.g. WDG-X100)"
              className="font-mono text-sm border-none bg-transparent"
              value={skuSearch}
              onChange={(e) => setSkuSearch(e.target.value.toUpperCase())}
            />
            <Button type="submit" variant="outline" size="sm">
              Trace
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Product Context */}
      {selectedProduct && (
        <Card className="bg-card border-border border-l-4 border-l-neon-cyan">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-mono text-neon-cyan text-lg">
                  {selectedProduct.productSku}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedProduct.productName}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-mono text-sm text-muted-foreground">
                  {entries.length} transactions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ScrollText className="w-4 h-4" />
            {activeSku ? `History for ${activeSku}` : "All Transactions"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground font-mono animate-pulse">
              Loading audit trail...
            </div>
          ) : entries.length > 0 ? (
            <Timeline entries={entries} />
          ) : (
            <div className="text-center py-8 text-muted-foreground font-mono">
              {activeSku
                ? `No transactions found for SKU: ${activeSku}`
                : "No transactions recorded yet"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
