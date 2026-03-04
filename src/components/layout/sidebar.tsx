"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  MapPin,
  ScrollText,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/movements", label: "Movements", icon: ArrowLeftRight },
  { href: "/locations", label: "Locations", icon: MapPin },
  { href: "/audit", label: "Audit Trail", icon: ScrollText },
];

function NavContent({ onSelect }: { onSelect?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2" onClick={onSelect}>
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center glow-cyan">
            <Package className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-foreground">
              StockFlow
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
              Warehouse OS
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onSelect}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 glow-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }
              `}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse-glow" />
          <span className="text-xs text-muted-foreground font-mono">
            System Online
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground/50 mt-1">v1.0.0</p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 border-r border-border bg-sidebar flex-col h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-60 p-0 bg-sidebar">
          <NavContent onSelect={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
