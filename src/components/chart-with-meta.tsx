"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from "recharts";

// --------------------- DATA TYPES ---------------------
export interface ChartItemOriginal {
  date: string;
  desktop: number;
  mobile: number;
}

export interface ChartItemMeta extends ChartItemOriginal {
  ts: number;
  total: number;
  trend: "up" | "down" | "same";
  color?: string;
}

// --------------------- SAMPLE DATA ---------------------
export const chartDataOriginal: ChartItemOriginal[] = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

// --------------------- UTIL & HELPERS ---------------------
function getColorForTotal(total: number) {
  if (total >= 800) return "#b91c1c";
  if (total >= 400) return "#f97316";
  return "#facc15";
}

export function transformWithMeta(data: ChartItemOriginal[]): ChartItemMeta[] {
  return data
    .map((d) => ({ ...d, ts: dayjs(d.date).valueOf() }))
    .sort((a, b) => a.ts - b.ts)
    .map((d, i, arr) => {
      const total = d.desktop + d.mobile;
      if (i === 0) {
        return { ...d, total, trend: "same", color: getColorForTotal(total) };
      }
      const prev = arr[i - 1];
      const prevTotal = prev.desktop + prev.mobile;
      const trend =
        total > prevTotal ? "up" : total < prevTotal ? "down" : "same";

      return {
        ...d,
        total,
        trend,
        color: getColorForTotal(total),
      };
    });
}

// --------------------- BUCKETING ---------------------
export type BucketKey = "day" | "week" | "month" | "quarter";

export function bucketBy(data: ChartItemMeta[], bucket: BucketKey) {
  const groups: Record<
    string,
    { desktop: number; mobile: number; total: number }
  > = {};

  data.forEach((d) => {
    let key = "";
    const dt = dayjs(d.date);

    if (bucket === "day") key = dt.format("YYYY-MM-DD");
    if (bucket === "week") key = dt.format("GGGG-[W]WW");
    if (bucket === "month") key = dt.format("YYYY-MM");
    if (bucket === "quarter")
      key = `${dt.year()}-Q${Math.ceil((dt.month() + 1) / 3)}`;

    if (!groups[key]) groups[key] = { desktop: 0, mobile: 0, total: 0 };
    groups[key].desktop += d.desktop;
    groups[key].mobile += d.mobile;
    groups[key].total += d.total;
  });

  return Object.entries(groups).map(([label, item]) => ({
    label,
    ...item,
  }));
}

// --------------------- AREA CHART ---------------------
interface AreaWithMetaProps {
  data: ChartItemOriginal[];
  bucket?: BucketKey;
}

export function AreaWithMeta({ data, bucket = "day" }: AreaWithMetaProps) {
  const meta = useMemo(() => transformWithMeta(data), [data]);

  const chartSource = useMemo(() => {
    if (bucket === "day") return meta;
    const grouped = bucketBy(meta, bucket);
    return grouped.map((g) => ({
      date: g.label,
      desktop: g.desktop,
      mobile: g.mobile,
      total: g.total,
    }));
  }, [meta, bucket]);

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-md">
      <h3 className="font-semibold mb-2">Visitors ({bucket})</h3>

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartSource}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <ReTooltip />

            <Area
              type="monotone"
              dataKey="mobile"
              stackId="1"
              stroke="#60a5fa"
              fill="url(#colorMobile)"
            />
            <Area
              type="monotone"
              dataKey="desktop"
              stackId="1"
              stroke="#10b981"
              fill="url(#colorDesktop)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// --------------------- SIMPLE HEATMAP (supaya tidak error) ---------------------
interface HeatmapProps {
  data: ChartItemOriginal[];
  bucketByKey?: BucketKey;
}

export function HeatmapCanvas({ data, bucketByKey = "week" }: HeatmapProps) {
  const meta = useMemo(() => transformWithMeta(data), [data]);
  const grouped = useMemo(
    () => bucketBy(meta, bucketByKey),
    [meta, bucketByKey]
  );

  return (
    <div className="w-full grid grid-cols-7 gap-2 p-4 bg-white rounded-lg shadow-md">
      {grouped.map((item) => (
        <div
          key={item.label}
          className="w-full h-10 rounded"
          style={{ backgroundColor: getColorForTotal(item.total) }}
          title={`${item.label}: ${item.total}`}
        />
      ))}
    </div>
  );
}

// Wrapper Example
export function ChartWrapper() {
  return (
    <div className="p-6 space-y-6">
      <AreaWithMeta data={chartDataOriginal} bucket="month" />
      <HeatmapCanvas data={chartDataOriginal} bucketByKey="week" />
    </div>
  );
}
