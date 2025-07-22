"use client";
import { useState } from "react";

export type PackageKind =
  | "box"
  | "bigbag"
  | "sack"
  | "barrel"
  | "roll"
  | "pipes"
  | "bulk";

const KINDS: { id: PackageKind; label: string; icon: string }[] = [
  { id: "box", label: "Caixa", icon: "/icons/warehouse.svg" },
  { id: "bigbag", label: "Big-Bag", icon: "/icons/warehouse.svg" },
  { id: "sack", label: "Saco", icon: "/icons/warehouse.svg" },
  { id: "barrel", label: "Barril", icon: "/icons/warehouse.svg" },
  { id: "roll", label: "Rolo", icon: "/icons/warehouse.svg" },
  { id: "pipes", label: "Tubos", icon: "/icons/warehouse.svg" },
  { id: "bulk", label: "Granel", icon: "/icons/warehouse.svg" },
];

export default function PackageTypeSelector({
  value,
  onChange,
}: {
  value: PackageKind | "";
  onChange: (k: PackageKind) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="flex gap-3 flex-wrap mb-4">
      {KINDS.map((k) => {
        const active = value === k.id;
        const glow = hover === k.id;
        return (
          <button
            key={k.id}
            onMouseEnter={() => setHover(k.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(k.id)}
            className={`flex flex-col items-center justify-center w-20 h-20 border rounded-lg shadow-sm transition-all ${
              active ? "border-accent bg-accent/10" : "bg-gray-50 dark:bg-gray-800"
            } ${glow && !active ? "ring-2 ring-accent/50" : ""}`}
          >
            <img src={k.icon} alt={k.label} className="w-6 h-6 mb-1" />
            <span className="text-[11px] leading-none">{k.label}</span>
          </button>
        );
      })}
    </div>
  );
} 