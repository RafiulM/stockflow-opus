"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface CategoryStock {
  category: string;
  totalStock: number;
}

const NEON_COLORS = [
  "var(--neon-cyan)",
  "var(--neon-lime)",
  "var(--neon-amber)",
  "var(--neon-blue)",
  "var(--neon-red)",
];

const chartConfig = {
  totalStock: {
    label: "Stock",
    color: "var(--neon-cyan)",
  },
} satisfies ChartConfig;

export function StockByCategoryChart({ data }: { data: CategoryStock[] }) {
  const coloredData = data.map((item, i) => ({
    ...item,
    fill: NEON_COLORS[i % NEON_COLORS.length],
  }));

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-amber animate-pulse" />
          Stock by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground font-mono text-center py-8">
            No stock data yet
          </p>
        ) : (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart
              data={coloredData}
              layout="vertical"
              margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="var(--border)" />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                width={80}
              />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="totalStock"
                radius={[0, 4, 4, 0]}
                fill="var(--color-totalStock)"
                barSize={20}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
