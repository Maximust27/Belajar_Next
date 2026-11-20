
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  jumlah: {
    label: "Jenis Barang",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartData {
  status: string;
  jumlah: number;
}

export function ChartStatusBarang({
  data,
}: {
  data: ChartData[];
}) {
  const reducedMotion = useReducedMotion();

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[260px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: -15, right: 10 }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="status"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />

        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
        />

        <ChartTooltip
          content={<ChartTooltipContent />}
        />

        <Bar
          dataKey="jumlah"
          fill="var(--color-jumlah)"
          radius={[6, 6, 0, 0]}
          isAnimationActive={!reducedMotion}
          animationDuration={1050}
          animationEasing="ease-out"
        />
      </BarChart>
    </ChartContainer>
  );
}
