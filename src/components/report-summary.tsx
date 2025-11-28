"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  FiBarChart2,
  FiLayers,
  FiRefreshCcw,
  FiFileText,
} from "react-icons/fi";

export default function AssetReport({ data }: { data: any }) {
  const summary = data?.summary ?? {};
  const statusList: any[] = data?.asset_by_status ?? [];
  const categoryList: any[] = data?.asset_by_category ?? [];
  const ageList: any[] = data?.asset_age_analysis ?? [];

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      {/* SUMMARY */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Ringkasan Aset</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <SummaryCard
            icon={<FiLayers className="text-blue-600" />}
            label="Total Aset"
            value={summary.total_asset}
            color="from-blue-50 to-white"
          />

          <SummaryCard
            icon={<FiFileText className="text-green-600" />}
            label="Disetujui"
            value={summary.disetujui}
            color="from-green-50 to-white"
          />

          <SummaryCard
            icon={<FiRefreshCcw className="text-amber-600" />}
            label="Dalam Tinjauan"
            value={summary.dalam_tinjauan}
            color="from-amber-50 to-white"
          />

          <SummaryCard
            icon={<FiBarChart2 className="text-indigo-600" />}
            label="Tingkat Kepatuhan"
            value={summary.tingkat_kepatuhan}
            color="from-indigo-50 to-white"
          />

          <SummaryCard
            icon={<FiBarChart2 className="text-red-600" />}
            label="Kadaluwarsa"
            value={summary.kadaluwarsa_total}
            color="from-red-50 to-white"
          />
        </div>
      </div>

      {/* STATUS DISTRIBUTION */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Aset Berdasarkan Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statusList.map((item: any, i: any) => (
            <Card
              key={i}
              className="rounded-xl p-4 border border-gray-100 shadow-sm transition hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600">
                  {item.status}
                </p>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
              </div>
              <p className="text-3xl font-semibold mt-2">{item.count}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CATEGORY ANALYSIS */}
      <div>
        <h2 className="text-xl font-semibold mb-3">
          Aset Berdasarkan Kategori
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryList.map((item: any, i) => (
            <Card
              key={i}
              className="rounded-xl p-4 border border-gray-100 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">{item.kategori}</p>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                Jumlah: <strong>{item.count}</strong>
              </p>

              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1 text-gray-500">
                  <span>Usage Score</span>
                  <span>{item.usage_score}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.usage_score}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AGE ANALYSIS */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Analisis Usia Aset</h2>

        <div className="flex flex-col gap-3">
          {ageList.map((item) => (
            <Card
              key={item.id}
              className="rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <p className="font-medium">{item.judul}</p>
              <p className="text-sm text-gray-500 mt-1">
                Usia: <strong>{item.usia_hari} hari</strong>
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                  item.status.includes("Kadaluwarsa")
                    ? "bg-red-100 text-red-700"
                    : item.status.includes("Perlu")
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.status}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- SUB COMPONENT --- */

function SummaryCard({
  icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: any;
  color: string;
}) {
  return (
    <Card
      className={`
        rounded-2xl shadow-sm border border-gray-100 p-4 
        bg-gradient-to-br ${color}
        hover:shadow-md transition
      `}
    >
      <CardHeader className="flex flex-row items-center gap-3 p-0 mb-2">
        <div className="p-2 bg-white rounded-xl shadow-sm">{icon}</div>
        <CardTitle className="text-sm text-gray-600">{label}</CardTitle>
      </CardHeader>

      <CardContent className="p-0 pt-1">
        <p className="text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
