import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  accent?: "cyan" | "lime" | "amber" | "red" | "blue";
  accentColor?: "cyan" | "lime" | "amber" | "red" | "blue";
}

const accentMap: Record<
  string,
  { bg: string; border: string; text: string; glow: string }
> = {
  cyan: {
    bg: "bg-neon-cyan/10",
    border: "border-neon-cyan/20",
    text: "text-neon-cyan",
    glow: "glow-cyan",
  },
  lime: {
    bg: "bg-neon-lime/10",
    border: "border-neon-lime/20",
    text: "text-neon-lime",
    glow: "glow-lime",
  },
  amber: {
    bg: "bg-neon-amber/10",
    border: "border-neon-amber/20",
    text: "text-neon-amber",
    glow: "",
  },
  red: {
    bg: "bg-neon-red/10",
    border: "border-neon-red/20",
    text: "text-neon-red",
    glow: "",
  },
  blue: {
    bg: "bg-neon-blue/10",
    border: "border-neon-blue/20",
    text: "text-neon-blue",
    glow: "",
  },
};

export function KpiCard({
  title,
  value,
  trend,
  trendUp,
  icon: Icon,
  accent: accentProp,
  accentColor,
}: KpiCardProps) {
  const colorKey = accentProp || accentColor || "cyan";
  const ac = accentMap[colorKey] || accentMap.cyan;

  return (
    <Card
      className={`${ac.bg} border ${ac.border} ${ac.glow} transition-all duration-300 hover:scale-[1.02]`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {title}
            </p>
            <p className={`text-3xl font-bold font-mono ${ac.text}`}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-lg ${ac.bg} border ${ac.border} flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${ac.text}`} />
          </div>
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1.5">
            <span
              className={`text-xs font-mono ${
                trendUp ? "text-neon-lime" : "text-neon-red"
              }`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </span>
            <span className="text-xs text-muted-foreground">
              vs last period
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
