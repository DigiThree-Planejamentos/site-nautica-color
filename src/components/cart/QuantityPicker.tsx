"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityPicker({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-flex h-11 items-center rounded-full border border-navy/15 bg-white">
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-l-full text-navy hover:bg-off-white"
        aria-label="Diminuir quantidade"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <input
        aria-label="Quantidade"
        className="h-10 w-12 border-0 bg-transparent text-center font-semibold text-ink"
        min={1}
        type="number"
        value={value}
        onChange={(event) => onChange(Math.max(1, Number(event.target.value) || 1))}
      />
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-r-full text-navy hover:bg-off-white"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
