"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const CurrencyModal: React.FC = () => {
  const { isCurrencyModalOpen, closeCurrencyModal, currency, setCurrency } = useUIStore();

  if (!isCurrencyModalOpen) return null;

  const currencies = [
    { code: "CAN", label: "CAD ($) - Canada" },
    { code: "USD", label: "USD ($) - United States" },
    { code: "EUR", label: "EUR (€) - Europe" },
    { code: "GBP", label: "GBP (£) - United Kingdom" },
    { code: "AUD", label: "AUD ($) - Australia" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-white/15 w-full max-w-sm rounded-md p-6 text-white shadow-2xl relative">
        <button
          onClick={closeCurrencyModal}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-sm font-semibold tracking-[0.2em] uppercase mb-4 text-white/90">
          SELECT REGION / CURRENCY
        </h3>

        <div className="space-y-2">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => setCurrency(c.code)}
              className={`w-full text-left px-4 py-3 text-xs tracking-wider rounded-sm flex items-center justify-between border transition-all ${
                currency === c.code
                  ? "bg-white text-black border-white font-medium"
                  : "border-white/10 hover:border-white/40 text-white/80 hover:bg-white/5"
              }`}
            >
              <span>{c.label}</span>
              {currency === c.code && <Check className="w-4 h-4 text-black" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
