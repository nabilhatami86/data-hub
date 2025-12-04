"use client";

import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import HeatmapGrid from "@/components/heatmap";
import { AreaWithMeta, chartDataOriginal } from "@/components/chart-with-meta";

export default function AnalyticsPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <div className="px-4 lg:px-6">
          <section className=" rounded-xl  border p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Heatmap</h2>
            <HeatmapGrid />
          </section>
        </div>
        <div className="px-4 lg:px-6">
          <section className="rounded-xl border p-6 space-y-8">
            <h2 className="text-xl font-semibold mb-4">
              Monthly Trend Overview
            </h2>
            <AreaWithMeta data={chartDataOriginal} bucket="month" />
          </section>
        </div>
      </div>
    </div>
  );
}
