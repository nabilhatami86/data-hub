"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import data from "./data.json";

// Dynamic import untuk client-only rendering
const LeafletMap = dynamic(() => import("@/components/heatmap-map"), {
  ssr: false,
});
const DevicePieChart = dynamic(() => import("@/components/DevicePieChart"), {
  ssr: false,
});

export default function Page() {
  const [search, setSearch] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("all");

  const filteredData = useMemo(() => {
    return data.filter((v) => {
      const matchName = v.name.toLowerCase().includes(search.toLowerCase());
      const matchDevice = deviceFilter === "all" || v.device === deviceFilter;
      return matchName && matchDevice;
    });
  }, [search, deviceFilter]);

  const pieData = useMemo(() => {
    const count: Record<string, number> = {};
    filteredData.forEach((v) => {
      count[v.device] = (count[v.device] || 0) + 1;
    });
    return Object.entries(count).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-80 w-full p-4 border-b md:border-b-0 md:border-r overflow-auto">
        <h3 className="font-semibold mb-2">Filter</h3>
        <label htmlFor="searchInput" className="block mb-1 text-sm">
          Search Name
        </label>
        <input
          id="searchInput"
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label htmlFor="deviceFilter" className="block mb-1 text-sm">
          Device
        </label>
        <select
          id="deviceFilter"
          value={deviceFilter}
          onChange={(e) => setDeviceFilter(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="all">All Devices</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>

        <h3 className="font-semibold mt-4 mb-2">Device Distribution</h3>
        <DevicePieChart pieData={pieData} />
      </div>

      {/* Map */}
      <div className="flex-1 h-full">
        <LeafletMap filteredData={filteredData} />
      </div>
    </div>
  );
}
