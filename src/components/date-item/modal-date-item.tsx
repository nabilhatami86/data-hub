"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { FiCheckCircle, FiClock } from "react-icons/fi";

export interface DataItem {
  id: number;
  kategori: string;
  judul: string;
  deskripsi: string;
  konten: string;
  proyek_terkait?: string;
  stack?: string;
  pemilik: string;
  status: string;
  tanggal_update: string;
}

interface DataItemModalProps {
  item: DataItem;
  open: boolean;
  onClose: () => void;
}

export function DataItemModal({ item, open, onClose }: DataItemModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item.judul}</DialogTitle>
          <DialogDescription className="text-gray-500">
            {item.kategori}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {item.proyek_terkait && (
            <p>
              <strong>Proyek Terkait:</strong> {item.proyek_terkait}
            </p>
          )}
          {item.stack && (
            <p>
              <strong>Stack:</strong> {item.stack || "Tidak ada stack"}
            </p>
          )}
          <p>
            <strong>Pemilik:</strong> {item.pemilik}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === "Disetujui"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {item.status === "Disetujui" ? (
                <FiCheckCircle className="inline" />
              ) : (
                <FiClock className="inline" />
              )}{" "}
              {item.status}
            </span>
          </p>
          <p>
            <strong>Tanggal Update:</strong> {item.tanggal_update}
          </p>

          <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200 text-gray-700 whitespace-pre-wrap shadow-inner">
            {item.konten}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Tutup</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
