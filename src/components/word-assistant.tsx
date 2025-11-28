"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FiAlertTriangle,
  FiInfo,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

export default function WordAssistant({ data }: { data: any }) {
  const ctx = data.simulasi_konteks;
  const aset = data.saran_aset_prioritas;
  const warnings = data.compliance_check_and_warnings;

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      {/* CONTEXT */}
      <Card className="rounded-2xl shadow-sm border border-gray-100 bg-white/60 backdrop-blur-xl transition hover:shadow-md">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FiFileText className="text-blue-600" />
            Context Overview
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-3 space-y-2 text-[15px] text-gray-700">
          <p>
            <span className="font-medium">ID Dokumen:</span> {ctx.dokumen_id}
          </p>
          <p>
            <span className="font-medium">Nama Proyek:</span> {ctx.nama_proyek}
          </p>
          <p>
            <span className="font-medium">Bagian Aktif:</span>{" "}
            {ctx.bagian_aktif}
          </p>
          <p>
            <span className="font-medium">Pertanyaan Terakhir:</span>{" "}
            <span className="italic text-gray-800">
              "{ctx.kueri_pengguna_terakhir}"
            </span>
          </p>
        </CardContent>
      </Card>

      {/* ASSET RECOMMENDATIONS */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Aset Prioritas
        </h2>

        <div className="flex flex-col gap-4">
          {aset.map((item: any) => (
            <Card
              key={item.id_aset}
              className="rounded-xl border border-gray-100 shadow-sm bg-white/70 backdrop-blur-xl p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-800 text-[15px]">
                  {item.judul}
                </p>
                <span
                  className={`px-2 py-1 text-xs rounded-md font-medium ${
                    item.status === "Disetujui"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Peringkat #{item.peringkat} • {item.kategori}
              </p>

              <p className="text-sm mt-3 text-gray-700 italic">
                “{item.snippet_konten}”
              </p>

              <p className="text-xs text-blue-600 mt-3 font-medium">
                {item.relevansi}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* COMPLIANCE */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Compliance Check
        </h2>

        <div className="flex flex-col gap-4">
          {warnings.map((item: any, i: number) => (
            <Card
              key={i}
              className={`rounded-xl border shadow-sm p-4 backdrop-blur-xl ${
                item.level === "Peringatan"
                  ? "border-amber-200 bg-amber-50/80"
                  : item.level === "OK"
                  ? "border-emerald-200 bg-emerald-50/80"
                  : "border-blue-200 bg-blue-50/80"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {item.level === "Peringatan" && (
                  <FiAlertTriangle className="text-amber-600" />
                )}
                {item.level === "Informasi" && (
                  <FiInfo className="text-blue-600" />
                )}
                {item.level === "OK" && (
                  <FiCheckCircle className="text-emerald-600" />
                )}
                <p className="font-semibold text-sm text-gray-800">
                  {item.jenis}
                </p>
              </div>

              <p className="text-sm text-gray-700">{item.pesan}</p>

              <p className="text-xs text-gray-500 mt-2">
                Lokasi: {item.lokasi}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
