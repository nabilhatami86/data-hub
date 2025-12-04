"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { chartData } from "@/lib/db";

interface DataItem {
  date: string;
  desktop: number;
  mobile: number;
}

interface BucketItem {
  label: string;
  desktop: number;
  mobile: number;
}

export default function HeatmapAutoBucket() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  const bucketData = useCallback((data: DataItem[]): BucketItem[] => {
    if (data.length <= 60) {
      return data.map((d) => ({
        label: d.date.slice(5),
        desktop: d.desktop,
        mobile: d.mobile,
      }));
    }

    if (data.length <= 500) {
      const bucket: BucketItem[] = [];
      for (let i = 0; i < data.length; i += 7) {
        const chunk = data.slice(i, i + 7);
        bucket.push({
          label: `${chunk[0].date.slice(5)}-${chunk[
            chunk.length - 1
          ].date.slice(5)}`,
          desktop: chunk.reduce((s, d) => s + d.desktop, 0),
          mobile: chunk.reduce((s, d) => s + d.mobile, 0),
        });
      }
      return bucket;
    }

    const bucket: BucketItem[] = [];
    for (let i = 0; i < data.length; i += 30) {
      const chunk = data.slice(i, i + 30);
      bucket.push({
        label: chunk[0].date.slice(0, 7),
        desktop: chunk.reduce((s, d) => s + d.desktop, 0),
        mobile: chunk.reduce((s, d) => s + d.mobile, 0),
      });
    }
    return bucket;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bucket = bucketData(chartData);

    // Canvas size
    const parentWidth = canvas.parentElement?.clientWidth ?? 800;
    const width = parentWidth - 20; // padding kanan 20px
    const height = 360; // ditambah padding atas-bawah

    canvas.width = width;
    canvas.height = height;

    const rows = 2;
    const cols = bucket.length;
    const cellWidth = Math.max(40, width / (cols + 2)); // padding kiri-kanan
    const cellHeight = (height - 50) / (rows + 1); // padding atas-bawah

    const maxValue = Math.max(
      ...bucket.map((d) => Math.max(d.desktop, d.mobile))
    );

    const devices: (keyof BucketItem)[] = ["desktop", "mobile"];
    let animationProgress = 0;
    let rafId = 0;

    const render = () => {
      animationProgress = Math.min(animationProgress + 0.04, 1);

      ctx.clearRect(0, 0, width, height);
      ctx.font = "12px sans-serif";

      // X LABEL
      bucket.forEach((d, i) => {
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText(d.label, cellWidth * (i + 1.3), cellHeight * 0.7);
      });

      // CELLS
      devices.forEach((dev, row) => {
        bucket.forEach((d, col) => {
          const val = Number(d[dev]);
          const intensity = val / maxValue;
          const opacity = intensity * animationProgress;

          const x = cellWidth * (col + 1.1);
          const y = cellHeight * (row + 1.2);

          ctx.fillStyle = `rgba(255, ${Math.floor(
            255 * (1 - intensity)
          )}, 0, ${opacity})`;

          ctx.fillRect(x, y, cellWidth, cellHeight);

          if (animationProgress === 1) {
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.fillText(val.toString(), x + cellWidth / 2, y + cellHeight / 2);
          }
        });

        // Y LABEL
        ctx.fillStyle = "#000";
        ctx.textAlign = "right";
        ctx.fillText(dev, cellWidth * 0.9, cellHeight * (row + 1.8));
      });

      if (animationProgress < 1) {
        rafId = requestAnimationFrame(render);
      }
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found = false;

      devices.forEach((dev, row) => {
        bucket.forEach((d, col) => {
          const x = cellWidth * (col + 1.1);
          const y = cellHeight * (row + 1.2);

          if (
            mx >= x &&
            mx <= x + cellWidth &&
            my >= y &&
            my <= y + cellHeight
          ) {
            found = true;
            setTooltip({
              x: mx + 15,
              y: my + 15,
              text: `${dev.toUpperCase()} | ${d.label} | ${d[dev]}`,
            });
          }
        });
      });

      if (!found) setTooltip(null);
    };

    const handleMouseLeave = () => setTooltip(null);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // CLEANUP AMAN ESLINT
    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [bucketData]);

  return (
    <Card className="w-full overflow-x-auto relative">
      <CardContent className="relative p-6">
        <canvas ref={canvasRef} className="rounded-lg shadow-md bg-white" />

        {/* TOOLTIP */}
        {tooltip && (
          <div
            style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y,
              background: "rgba(0,0,0,0.9)",
              color: "white",
              padding: "8px 12px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              pointerEvents: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {tooltip.text}
          </div>
        )}

        {/* LEGEND */}
        <div className="mt-6 flex items-center gap-6">
          <span className="text-xs font-medium text-gray-600">Intensity:</span>
          <Legend color="bg-yellow-200" label="Low" />
          <Legend color="bg-orange-400" label="Medium" />
          <Legend color="bg-red-500" label="High" />
        </div>
      </CardContent>
    </Card>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-4 border rounded-sm ${color}`} />
      <span className="text-sm">{label}</span>
    </div>
  );
}
