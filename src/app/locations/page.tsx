"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, MapPin, LayoutGrid, Box, Truck, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Location {
  id: number;
  name: string;
  zone: string;
  type: "shelf" | "bin" | "dock" | "floor";
  capacity: number;
  itemCount: number;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    zone: "",
    type: "shelf" as "shelf" | "bin" | "dock" | "floor",
    capacity: 100,
  });

  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch("/api/locations");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      console.error("Fetch locations error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed");
        return;
      }
      setDialogOpen(false);
      setFormData({ name: "", zone: "", type: "shelf", capacity: 100 });
      fetchLocations();
    } catch {
      alert("Failed to create location");
    } finally {
      setSubmitting(false);
    }
  };

  const typeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      shelf: <LayoutGrid className="w-4 h-4" />,
      bin: <Box className="w-4 h-4" />,
      dock: <Truck className="w-4 h-4" />,
      floor: <Square className="w-4 h-4" />,
    };
    return icons[type] || <MapPin className="w-4 h-4" />;
  };

  // Group by zone
  const zones = [...new Set(locations.map((l) => l.zone))];

  const getUtilColor = (pct: number) => {
    if (pct >= 90) return "bg-neon-red";
    if (pct >= 70) return "bg-neon-amber";
    return "bg-neon-lime";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground font-mono animate-pulse">
          Loading locations...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Locations</h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            {locations.length} storage locations across {zones.length} zones
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddLocation} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Name
                  </label>
                  <Input
                    placeholder="Shelf A7"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Zone
                  </label>
                  <Input
                    placeholder="ZONE-A"
                    className="font-mono"
                    value={formData.zone}
                    onChange={(e) =>
                      setFormData({ ...formData, zone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="shelf">Shelf</SelectItem>
                      <SelectItem value="bin">Bin</SelectItem>
                      <SelectItem value="dock">Dock</SelectItem>
                      <SelectItem value="floor">Floor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Capacity
                  </label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: parseInt(e.target.value) || 100,
                      })
                    }
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Creating..." : "Create Location"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Zone groups */}
      {zones.map((zone) => {
        const zoneLocations = locations.filter((l) => l.zone === zone);
        return (
          <div key={zone}>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neon-cyan" />
              {zone}
              <span className="text-xs text-muted-foreground font-mono ml-2">
                {zoneLocations.length} locations
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {zoneLocations.map((loc) => {
                const utilPct =
                  loc.capacity > 0
                    ? Math.round((loc.itemCount / loc.capacity) * 100)
                    : 0;
                return (
                  <Card
                    key={loc.id}
                    className="bg-card border-border hover:border-primary/30 transition-colors"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {typeIcon(loc.type)}
                        </span>
                        {loc.name}
                        <span className="ml-auto text-xs font-mono text-muted-foreground capitalize">
                          {loc.type}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm font-mono">
                        <span className="text-muted-foreground">
                          {loc.itemCount} items
                        </span>
                        <span className="text-muted-foreground">
                          / {loc.capacity} capacity
                        </span>
                      </div>
                      <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${getUtilColor(utilPct)}`}
                          style={{ width: `${Math.min(utilPct, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs font-mono text-muted-foreground text-right">
                        {utilPct}% utilized
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
