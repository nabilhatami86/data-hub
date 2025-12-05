"use client";

import { PieChart, Pie, Cell, Legend, Tooltip as ReTooltip } from "recharts";

interface PieChartProps {
  pieData: { name: string; value: number }[];
}

export default function DevicePieChart({ pieData }: PieChartProps) {
  const COLORS = ["#ff6b6b", "#1e90ff"];

  return (
    <PieChart width={280} height={280}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {pieData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <ReTooltip />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}
