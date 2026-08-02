"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CollectionItem {
  id: string;
  title: string;
  linkText: string;
  image: string;
}

export const collectionItems: CollectionItem[] = [
  {
    id: "winston-dining-table-48",
    title: 'Winston Dining Table - 48"',
    linkText: "SHOP NOW",
    image: "https://plus.unsplash.com/premium_photo-1675744019321-f90d6d719da7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "dresden-sectional-sofa",
    title: "Dresden Sectional Sofa",
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1519961655809-34fa156820ff?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "angelo-dining-chair",
    title: "Angelo Dining Chair",
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kiyomi-dining-table",
    title: "Kiyomi Solid Oak Table",
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "luca-curved-sectional",
    title: "The Luca Curved Sofa",
    linkText: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8Mg%3D%3D",
  },
];

export const TopCollections: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Responsive visible items count: 3 on desktop, 2 on tablet, 1 on mobile
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, collectionItems.length - visibleItems);

  const triggerAnimation = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const handlePrev = () => {
    triggerAnimation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    triggerAnimation();
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const progressPercentage = ((currentIndex + 1) / (maxIndex + 1)) * 100;

  return (
    <section className="w-full bg-[#FFFFFF] text-zinc-900 py-12 lg:py-16 px-4 sm:px-8">
      {/* Standard Content Width Limit (max-width: 1440px) */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* LEFT BANNER CARD */}
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
                  href="#shop"
                  className="inline-block bg-[#2A2A2A] text-white text-xs tracking-[0.2em] font-medium uppercase px-6 py-3.5 hover:bg-black transition-colors shadow-sm"
                >
                  SHOP ALL
                </a>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="p-2.5 text-zinc-700 hover:text-zinc-950 transition-all hover:scale-110 focus:outline-none"
                  aria-label="Previous Collection Items"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-2.5 text-zinc-700 hover:text-zinc-950 transition-all hover:scale-110 focus:outline-none"
                  aria-label="Next Collection Items"
                >
                  <ChevronRight className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              <div className="w-full h-[2px] bg-zinc-300 relative overflow-hidden">
                <div
                  className="h-full bg-zinc-800 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* ANIMATED CAROUSEL SLIDER CONTAINER */}
          <div className="lg:col-span-3 overflow-hidden relative">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              }}
            >
              {collectionItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-3"
                >
                  <Link
                    href={`/product/${item.id}`}
                    className="group relative aspect-[3/4] min-h-[380px] sm:min-h-[460px] overflow-hidden rounded-xs cursor-pointer select-none bg-zinc-200 block shadow-sm"
                  >
                    {/* Image with zoom and smooth crossfade transition */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover object-center group-hover:scale-108 transition-all duration-700 ease-out brightness-95 group-hover:brightness-100 ${
                        isTransitioning ? "scale-105 opacity-90 filter blur-[1px]" : "scale-100 opacity-100 blur-0"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white space-y-2">
                      <h3 className="font-sans text-base sm:text-lg font-medium text-white tracking-wide drop-shadow-md">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center space-x-1.5 text-xs font-semibold tracking-[0.2em] text-white/90 group-hover:text-white uppercase pt-1 transition-colors">
                        <span>{item.linkText}</span>
                        <ChevronRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
