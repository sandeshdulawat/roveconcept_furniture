"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  price: string;
  productId: string;
}

export interface CraftedSlide {
  id: string;
  tag: string;
  titleItalic: string;
  titleBold: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

export const craftedSlides: CraftedSlide[] = [
  {
    id: "01",
    tag: "01/04 · Épure - French-inspired minimalism",
    titleItalic: "crafted",
    titleBold: "for modern living with timeless appeal.",
    description: "Innovative furniture for the future of living.",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hotspots: [
      { id: "h1", x: 42, y: 76, title: "Kiyomi Solid Oak Table", price: "$2,495 CAD", productId: "kiyomi-dining-table" },
      { id: "h2", x: 78, y: 68, title: "Lumière Modular Sofa", price: "$4,195 CAD", productId: "luca-curved-sectional" },
      { id: "h3", x: 28, y: 72, title: "Sculptural Ceramic Bowl", price: "$320 CAD", productId: "aura-boucle-accent-chair" },
    ],
  },
  {
    id: "02",
    tag: "02/04 · Solstice - Organic curvature & form",
    titleItalic: "designed",
    titleBold: "to bring harmony into your sanctuary.",
    description: "Sustainably sourced woods and hand-finished textures.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    hotspots: [
      { id: "h4", x: 50, y: 60, title: "Aura Boucle Lounge Chair", price: "$1,495 CAD", productId: "aura-boucle-accent-chair" },
      { id: "h5", x: 30, y: 45, title: "Travertine Floor Lamp", price: "$850 CAD", productId: "winston-dining-table-48" },
    ],
  },
  {
    id: "03",
    tag: "03/04 · Minimal - Architectural elegance",
    titleItalic: "curated",
    titleBold: "with precision for refined interiors.",
    description: "Tailored Italian upholstery with FSC® certified hardwood frames.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    hotspots: [
      { id: "h6", x: 65, y: 70, title: "Milo Velvet Sectional", price: "$3,895 CAD", productId: "dresden-sectional-sofa" },
    ],
  },
  {
    id: "04",
    tag: "04/04 · Atelier - Bespoke artisan crafting",
    titleItalic: "tailored",
    titleBold: "for extraordinary architectural spaces.",
    description: "Master artisanal joinery handcrafted in small batches.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    hotspots: [
      { id: "h7", x: 45, y: 65, title: "Walnut Dining Credenza", price: "$2,995 CAD", productId: "kiyomi-dining-table" },
    ],
  },
];

export const CraftedSection: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const currentSlide = craftedSlides[activeSlideIndex];

  return (
    <section className="w-full bg-[#ECE9E2] text-zinc-900 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden select-none">
      {/* Standard Content Width Limit (max-width: 1440px) */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">

          {/* LEFT COLUMN: Editorial Typography & Links */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-center pb-4">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-zinc-900 tracking-tight">
                <span className="font-serif italic font-light text-[#B38E3D] block text-4xl sm:text-5xl lg:text-6xl mb-1">
                  {currentSlide.titleItalic}
                </span>
                {/* Google Font Montserrat with Weight 500 Applied */}
                <span className="font-[family-name:var(--font-montserrat)] font-medium tracking-tight text-[#22201D] block">
                  {currentSlide.titleBold}
                </span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 font-light tracking-wide max-w-sm">
              {currentSlide.description}
            </p>

            <div className="pt-4">
              <Link
                href={`/product/luca-curved-sectional`}
                className="inline-flex items-center space-x-2 text-xs font-medium tracking-widest text-zinc-900 hover:text-[#B38E3D] transition-colors border-b border-zinc-900 hover:border-[#B38E3D] pb-1 uppercase group"
              >
                <span className="w-2 h-2 rounded-full border border-zinc-900 group-hover:border-[#B38E3D] group-hover:bg-[#B38E3D] transition-all" />
                <span>Explore new collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* CENTER COLUMN: Main Interactive Showcase Image + Hotspots */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xs shadow-sm bg-zinc-300 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.tag}
                className="w-full h-full object-cover object-center transition-all duration-700 scale-100 group-hover:scale-102"
              />

              <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xs text-[10px] sm:text-xs font-mono text-white/90 tracking-wider">
                {currentSlide.tag}
              </div>

              {currentSlide.hotspots.map((hs) => {
                const isOpen = activeHotspot === hs.id;
                return (
                  <div
                    key={hs.id}
                    className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  >
                    <button
                      onClick={() => setActiveHotspot(isOpen ? null : hs.id)}
                      className="relative flex items-center justify-center focus:outline-none group/pin"
                      aria-label={`View product details for ${hs.title}`}
                    >
                      <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-white/60 opacity-75" />
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-white/90 border border-black/20 shadow-lg items-center justify-center text-black hover:scale-110 transition-transform">
                        <Plus className="w-3 h-3" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-zinc-950/95 text-white p-3 rounded-sm shadow-2xl border border-white/15 text-left z-40 animate-fade-in">
                        <h4 className="text-xs font-medium tracking-wide text-white">
                          {hs.title}
                        </h4>
                        <p className="text-[11px] text-amber-300 font-semibold mt-0.5">
                          {hs.price}
                        </p>
                        <Link
                          href={`/product/${hs.productId}`}
                          className="inline-block mt-2 text-[10px] tracking-widest text-white/70 hover:text-white uppercase underline"
                        >
                          View Piece Details
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Vertical Thumbnail Selector */}
          <div className="lg:col-span-1 flex lg:flex-col gap-2.5 justify-end items-end h-full">
            {craftedSlides.map((slide, idx) => {
              const isActive = activeSlideIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlideIndex(idx);
                    setActiveHotspot(null);
                  }}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 shrink-0 overflow-hidden rounded-xs border-2 transition-all duration-300 focus:outline-none ${isActive
                      ? "border-zinc-900 scale-105 shadow-md z-10"
                      : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.id}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/70 text-white px-1 py-0.2 rounded-xs">
                    {slide.id}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
