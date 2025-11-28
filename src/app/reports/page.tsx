"use client";

import data from "./data.json";
import AssetReport from "@/components/report-summary";

export default function Page() {
  return (
    <div className="@container/main flex flex-1 gap-2 p-4">
      <AssetReport data={data} />
    </div>
  );
}
