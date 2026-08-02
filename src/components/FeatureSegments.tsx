"use client";

import React, { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";

export interface FeatureSegment {
  title: string;
  subtitle: string;
  details: string;
}

export const featureItems: FeatureSegment[] = [
  {
    title: "LUXURY ECO MATERIALS",
    subtitle: "Sustainably Crafted & Ethically Sourced",
    details: "Premium boucle, Italian full-grain leathers, and FSC®-certified kiln-dried hardwoods designed to last generations.",
  },
  {
    title: "HANDCRAFTED",
    subtitle: "Artisanal Excellence in Every Detail",
    details: "Meticulously built by master craftsmen with hand-stitched upholstery, seamless joinery, and custom luxury finishes.",
  },
  {
    title: "CURATED DESIGNS",
    subtitle: "Architectural & Contemporary Forms",
    details: "Exclusive fluid silhouettes inspired by modern Italian architecture and minimalist Scandinavian design philosophy.",
  },
];

export const FeatureSegments: React.FC = () => {
  const { activeTab, setActiveTab } = useUIStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((activeTab + 1) % featureItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeTab, setActiveTab]);

  return (
    <div className="w-full glass-bottom z-30 pb-6 pt-8 px-4 sm:px-8 lg:px-16 transition-all duration-300">
      {/* Large Desktop Width Limit (max-width: 1600px) */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
        {featureItems.map((item, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={item.title}
              onClick={() => setActiveTab(idx)}
              className="group text-left focus:outline-none flex flex-col justify-end"
            >
              {/* Top Progress Line Indicator */}
              <div className="w-full h-[1.5px] bg-white/30 relative overflow-hidden mb-3">
                <div
                  className={`h-full bg-white transition-all duration-500 ${
                    isActive ? "w-full animate-tab-progress" : "w-0 group-hover:w-1/3"
                  }`}
                />
              </div>

              {/* Title label */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] sm:text-[11px] lg:text-[12px] tracking-[0.2em] font-normal uppercase transition-all duration-300 ${
                    isActive
                      ? "text-white opacity-100 font-semibold drop-shadow-md"
                      : "text-white/70 group-hover:text-white group-hover:opacity-90"
                  }`}
                >
                  {item.title}
                </span>

                <span
                  className={`text-[10px] font-mono transition-opacity duration-300 ${
                    isActive ? "text-white opacity-90" : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  0{idx + 1}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
