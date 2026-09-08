"use client";

import { useEffect, useRef, useState } from "react";
import type {
  LayerGroup,
  Map as LeafletMap,
  Marker,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import type {
  CoveragePoint,
  CoverageStatus,
} from "@/lib/coverage";

export interface CoverageMapLabels {
  available: string;
  partial: string;
  planned: string;
  pop: string;
}

const STATUS_ORDER: CoverageStatus[] = ["available", "partial", "planned"];

const STATUS_COLORS: Record<CoverageStatus, string> = {
  available: "#16a34a",
  partial: "#d97706",
  planned: "#64748b",
};

const DEFAULT_LABELS: CoverageMapLabels = {
  available: "Fully Served",
  partial: "Partial Coverage",
  planned: "Planned Expansion",
  pop: "Network PoP",
};

interface CoverageMapProps {
  points: CoveragePoint[];
  activePincode?: string | null;
  labels?: Partial<CoverageMapLabels>;
}

function pinSvg(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="${color}" stroke="#fff" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.6" fill="#fff"/></svg>`;
}

function popupHtml(point: CoveragePoint, labels: CoverageMapLabels) {
  const statusLabel =
    point.status === "available"
      ? labels.available
      : point.status === "partial"
      ? labels.partial
      : labels.planned;
  return [
    `<div class="p-1 min-w-[10rem]">`,
    `<p class="font-semibold text-sm" style="margin:0">${point.city}</p>`,
    `<p class="text-xs text-muted-foreground" style="margin:0">${point.state}</p>`,
    `<p class="text-xs font-medium" style="margin:0.25rem 0 0;color:${STATUS_COLORS[point.status]}">${statusLabel}</p>`,
    point.pincode ? `<p class="text-xs" style="margin:0.25rem 0 0">Pincode: ${point.pincode}</p>` : "",
    `</div>`,
  ].join("");
}

export function CoverageMap({
  points,
  activePincode = null,
  labels = {},
}: CoverageMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const groupsRef = useRef<Partial<Record<CoverageStatus, LayerGroup>>>({});
  const markersRef = useRef<Record<string, Marker>>({});
  const [visible, setVisible] = useState<Record<CoverageStatus, boolean>>({
    available: true,
    partial: true,
    planned: true,
  });

  const mergedLabels: CoverageMapLabels = { ...DEFAULT_LABELS, ...labels };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let map: LeafletMap | null = null;

    import("leaflet").then(({ default: L }) => {
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: [23.4, 79.2],
        zoom: 6,
        attributionControl: true,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
      }).addTo(map);

      const bounds = L.latLngBounds([]);
      const markerByPincode: Record<string, Marker> = {};

      for (const status of STATUS_ORDER) {
        const group = L.layerGroup().addTo(map);
        const color = STATUS_COLORS[status];

        for (const point of points.filter((p) => p.status === status)) {
          bounds.extend([point.lat, point.lng]);

          L.circle([point.lat, point.lng], {
            radius: 45000,
            stroke: status === "planned" ? false : true,
            color,
            weight: 1,
            opacity: 0.5,
            dashArray: status === "planned" ? "4 4" : undefined,
            fillColor: color,
            fillOpacity: status === "available" ? 0.14 : 0.08,
          }).addTo(group);

          const marker = L.marker([point.lat, point.lng], {
            icon: L.divIcon({
              className: "bg-transparent border-0",
              html: pinSvg(color),
              iconAnchor: [15, 30],
              popupAnchor: [0, -26],
            }),
          }).bindPopup(popupHtml(point, mergedLabels));
          marker.addTo(group);

          if (point.pincode) markerByPincode[point.pincode] = marker;
        }

        groupsRef.current[status] = group;
      }

      markersRef.current = markerByPincode;

      if (!bounds.isValid()) {
        map.setView([23.4, 79.2], 6);
      } else {
        map.fitBounds(bounds.pad(0.2));
      }
    });

    return () => {
      cancelled = true;
      markersRef.current = {};
      groupsRef.current = {};
      if (map) map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const status of STATUS_ORDER) {
      const group = groupsRef.current[status];
      if (!group) continue;
      if (visible[status]) {
        if (!map.hasLayer(group)) group.addTo(map);
      } else if (map.hasLayer(group)) {
        map.removeLayer(group);
      }
    }
  }, [visible]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activePincode) return;
    const marker = markersRef.current[activePincode];
    if (!marker) return;
    map.flyTo(marker.getLatLng(), 11, { duration: 0.8 });
    marker.openPopup();
  }, [activePincode]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border shadow-apple">
      <div ref={containerRef} className="h-[420px] md:h-[560px] w-full" aria-label="Interactive coverage map" role="application" />

      <div className="absolute bottom-4 left-4 z-[1000] rounded-xl border border-border bg-background/95 px-3 py-2.5 shadow-lg backdrop-blur text-xs">
        <p className="mb-1.5 font-medium text-foreground">Coverage layers</p>
        <div className="space-y-1.5">
          {STATUS_ORDER.map((status) => (
            <button
              key={status}
              type="button"
              aria-pressed={visible[status]}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setVisible((v) => ({ ...v, [status]: !v[status] }))}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: STATUS_COLORS[status],
                  opacity: visible[status] ? 1 : 0.3,
                }}
              />
              <span className={visible[status] ? "" : "line-through opacity-60"}>
                {mergedLabels[status]}
              </span>
            </button>
          ))}
          <div className="flex items-center gap-2 text-muted-foreground pt-1 border-t border-border">
            <span className="h-3 w-3" aria-hidden="true" dangerouslySetInnerHTML={{ __html: pinSvg("#3b82f6").replace("width=\"30\" height=\"30\"", "width=\"11\" height=\"11\"") }} />
            <span>{mergedLabels.pop}</span>
          </div>
        </div>
      </div>

      <p className="absolute bottom-4 right-4 z-[1000] hidden sm:block text-xs text-muted-foreground bg-background/90 rounded-lg px-2 py-1">
        Scroll to zoom disabled · drag to pan
      </p>
    </div>
  );
}