"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { DataItem, DataItemModal } from "./date-item/modal-date-item";
import { FiFileText, FiCheckCircle, FiClock } from "react-icons/fi";

interface DataLibraryProps {
  data: DataItem[];
}

export function DataLibrary({ data }: DataLibraryProps) {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const filteredData = data.filter(
    (item) =>
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      item.kategori.toLowerCase().includes(search.toLowerCase()) ||
      (item.proyek_terkait &&
        item.proyek_terkait.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
        Data Library
      </h1>

      <Input
        placeholder="Cari judul, kategori, atau proyek..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full max-w-md border-blue-300 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            }}
            whileTap={{ scale: 0.97 }}
            className="border rounded-xl p-5 shadow-md cursor-pointer transition-all duration-300 bg-white hover:shadow-lg"
            onClick={() => setSelectedItem(item)}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                <FiFileText className="text-blue-600" /> {item.kategori}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  item.status === "Disetujui"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.status === "Disetujui" ? (
                  <FiCheckCircle className="inline" />
                ) : (
                  <FiClock className="inline" />
                )}
                {item.status}
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
              {item.judul}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-4">
              {item.deskripsi}
            </p>

            {item.proyek_terkait && (
              <span className="mt-3 inline-block text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 font-medium">
                Proyek: {item.proyek_terkait}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {selectedItem && (
        <DataItemModal
          item={selectedItem}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
