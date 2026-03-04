"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface TrendPoint {
  date: string;
  inbound: number;
  outbound: number;
  transfer: number;
  adjustment: number;
}

const chartConfig = {
  inbound: {
    label: "Inbound",
    color: "var(--neon-lime)",
  },
  outbound: {
    label: "Outbound",
    color: "var(--neon-red)",
  },
  transfer: {
    label: "Transfer",
    color: "var(--neon-blue)",
  },
  adjustment: {
    label: "Adjustment",
    color: "var(--neon-amber)",
  },
} satisfies ChartConfig;

export function MovementTrendsChart({ data }: { data: TrendPoint[] }) {
  return (
    <Card className="lg:col-span-2 bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          Movement Trends
          <span className="text-xs text-muted-foreground font-mono ml-auto">
            Last 30 days
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground font-mono text-center py-8">
            No movement data yet
          </p>
        ) : (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <filter id="glow-lime">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--neon-lime)" floodOpacity="0.5" />
                </filter>
                <filter id="glow-red">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--neon-red)" floodOpacity="0.5" />
                </filter>
                <filter id="glow-blue">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--neon-blue)" floodOpacity="0.5" />
                </filter>
                <filter id="glow-amber">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--neon-amber)" floodOpacity="0.5" />
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => new Date(v).toLocaleDateString("en", { month: "short", day: "numeric" })}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(v) =>
                  new Date(v).toLocaleDateString("en", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="inbound"
                type="monotone"
                fill="var(--color-inbound)"
                fillOpacity={0.15}
                stroke="var(--color-inbound)"
                strokeWidth={2}
                filter="url(#glow-lime)"
                stackId="a"
              />
              <Area
                dataKey="outbound"
                type="monotone"
                fill="var(--color-outbound)"
                fillOpacity={0.15}
                stroke="var(--color-outbound)"
                strokeWidth={2}
                filter="url(#glow-red)"
                stackId="a"
              />
              <Area
                dataKey="transfer"
                type="monotone"
                fill="var(--color-transfer)"
                fillOpacity={0.15}
                stroke="var(--color-transfer)"
                strokeWidth={2}
                filter="url(#glow-blue)"
                stackId="a"
              />
              <Area
                dataKey="adjustment"
                type="monotone"
                fill="var(--color-adjustment)"
                fillOpacity={0.15}
                stroke="var(--color-adjustment)"
                strokeWidth={2}
                filter="url(#glow-amber)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
