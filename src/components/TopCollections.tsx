"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CollectionItem {
  id: string;
  title: string;
  linkText: string;
  image: string;
}

export const collectionItems: CollectionItem[] = [
  {
    id: "1",
    title: 'Winston Dining Table - 48"',
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Dresden Sectional Sofa",
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Angelo Dining Chair",
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Norman Storage Bed",
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Kiyomi Marble Coffee Table",
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1533779283484-8da69483d65d?auto=format&fit=crop&w=800&q=80",
  },
];

export const TopCollections: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Maximum items visible per page view (3 product cards)
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, collectionItems.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Calculate carousel progress bar percentage
  const progressPercentage = ((currentIndex + 1) / (maxIndex + 1)) * 100;

  return (
    <section className="w-full bg-[#EFECE6] text-zinc-900 py-12 lg:py-16 px-4 sm:px-8">
      {/* Standard Content Width Limit (max-width: 1440px) */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* ========================================================
              LEFT BANNER CARD (Off-white background matching reference image)
             ======================================================== */}
          <div className="bg-[#EBE7E0] p-8 sm:p-10 flex flex-col justify-between rounded-xs min-h-[380px] sm:min-h-[460px]">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.18em] uppercase text-zinc-900">
                TOP COLLECTIONS
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 font-light tracking-wide">
                Shop our selection of best-sellers now
              </p>
              <div className="pt-2">
                <a
                  href="#collections"
                  className="inline-block bg-[#2A2A2A] text-white text-xs tracking-[0.2em] font-medium uppercase px-6 py-3.5 hover:bg-black transition-colors shadow-sm"
                >
                  SHOP ALL
                </a>
              </div>
            </div>

            {/* Bottom Carousel Navigation Controls & Progress Bar */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="p-2 text-zinc-700 hover:text-zinc-950 transition-colors focus:outline-none"
                  aria-label="Previous Collection Items"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 text-zinc-700 hover:text-zinc-950 transition-colors focus:outline-none"
                  aria-label="Next Collection Items"
                >
                  <ChevronRight className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Horizontal Progress Track */}
              <div className="w-full h-[2px] bg-zinc-300 relative overflow-hidden">
                <div
                  className="h-full bg-zinc-800 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* ========================================================
              PRODUCT COLLECTION CARDS (3 Visible Columns on Desktop)
             ======================================================== */}
          <div className="lg:col-span-3 overflow-hidden">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-transform duration-500 ease-out"
            >
              {collectionItems
                .slice(currentIndex, currentIndex + itemsPerPage)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group relative aspect-[3/4] min-h-[380px] sm:min-h-[460px] overflow-hidden rounded-xs cursor-pointer select-none bg-zinc-200"
                  >
                    {/* Background Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    />

                    {/* Dark Bottom Gradient Overlay for High Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                    {/* Bottom Overlay Text Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white space-y-2">
                      <h3 className="font-sans text-base sm:text-lg font-medium text-white tracking-wide drop-shadow-md">
                        {item.title}
                      </h3>
                      <a
                        href="#"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold tracking-[0.2em] text-white/90 group-hover:text-white uppercase pt-1 transition-colors"
                      >
                        <span>{item.linkText}</span>
                        <ChevronRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
