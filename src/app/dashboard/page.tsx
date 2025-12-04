"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import HeatmapGrid from "@/components/heatmap";
import { AreaWithMeta, chartDataOriginal } from "@/components/chart-with-meta";

export default function DashboardPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />

        <div className="px-4 md:px-6 space-y-8">
          <ChartAreaInteractive />

          {/* HEATMAP GRID */}
          <section className=" rounded-xl  border p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Heatmap</h2>
            <HeatmapGrid />
          </section>

          <section className="rounded-xl border p-6 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Monthly Trend Overview
              </h2>
              <AreaWithMeta data={chartDataOriginal} bucket="month" />
            </div>
          </section>

          {/* DATA TABLE */}

          <h2 className="text-xl font-semibold mb-4">Detailed Records</h2>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
