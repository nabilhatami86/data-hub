"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import { MapPin } from "lucide-react";
import ReactDOMServer from "react-dom/server";

interface Action {
  type: string;
  productId?: string;
  ts: string;
}

interface MarkerData {
  id: string;
  name: string;
  device: string;
  lat: number;
  lng: number;
  actions: Action[];
}

interface LeafletMapProps {
  filteredData: MarkerData[];
}

// Buat icon Lucide
function createLucideIcon(color = "#0070f3", size = 32) {
  const svgString = ReactDOMServer.renderToStaticMarkup(
    <MapPin color={color} size={size} />
  );
  const url = `data:image/svg+xml;base64,${btoa(svgString)}`;
  return new Icon({
    iconUrl: url,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

// Warna marker berdasarkan device
function getColor(device: string) {
  switch (device) {
    case "mobile":
      return "#ff6b6b";
    case "desktop":
      return "#1e90ff";
    default:
      return "#888888";
  }
}

export default function LeafletMap({ filteredData }: LeafletMapProps) {
  return (
    <MapContainer
      center={[-7.25, 112.75]}
      zoom={9}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {filteredData.map((v) => (
        <Marker
          key={v.id}
          position={[v.lat, v.lng]}
          icon={createLucideIcon(getColor(v.device))}
        >
          <Popup>
            <div className="min-w-[150px] p-2 rounded">
              <h3 className="font-semibold">{v.name}</h3>
              <p className="text-sm mt-1">Device: {v.device}</p>
              <ul className="text-sm list-disc ml-4">
                {v.actions.map((a, i) => (
                  <li key={i}>
                    {a.type} {a.productId ? `(${a.productId})` : ""} <br />
                    <span className="text-xs text-gray-500">{a.ts}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Popup>
          <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
            {v.name} ({v.device})
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
