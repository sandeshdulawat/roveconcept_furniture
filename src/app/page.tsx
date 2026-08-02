import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TopCollections } from "@/components/TopCollections";
import { CraftedSection } from "@/components/CraftedSection";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CurrencyModal } from "@/components/CurrencyModal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Combined Top Overlay Header & Navbar */}
      <Navbar />

      {/* Hero Section covering full device height (100dvh) with Video background */}
      <HeroSection />

      {/* Top Collections Showcase Section */}
      <TopCollections />

      {/* Crafted For Modern Living Showcase Section (New Requested Section) */}
      <CraftedSection />

      {/* Modals & Slide-over Drawers */}
      <SearchModal />
      <CartDrawer />
      <CurrencyModal />

      {/* Catalog Preview Showcase Below Hero */}
      <section id="shop" className="py-24 px-6 sm:px-12 max-w-[1440px] mx-auto space-y-16 border-t border-white/10">
        <div className="text-center space-y-4 max-w-[900px] mx-auto">
          <span className="text-[11px] tracking-[0.28em] font-semibold text-white/50 uppercase">
            ARCHITECTURAL COLLECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Curated For Modern Living
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light tracking-wide leading-relaxed">
            Discover iconic sculptural forms, soft organic textures, and precision-engineered craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "The Luca Curved Sectional",
              category: "Living Room",
              price: "$4,295 CAD",
              tag: "BESTSELLER",
              img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Kiyomi Dining Table",
              category: "Dining Room",
              price: "$2,895 CAD",
              tag: "NEW RELEASE",
              img: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Aura Boucle Accent Chair",
              category: "Accent Seating",
              price: "$1,495 CAD",
              tag: "LIMITED EDITION",
              img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="group cursor-pointer space-y-3 bg-zinc-950/50 p-4 border border-white/5 hover:border-white/20 transition-all duration-300 rounded-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 rounded-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 text-[9px] font-semibold tracking-widest text-white uppercase border border-white/10">
                  {item.tag}
                </span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <span className="text-[10px] text-white/50 tracking-widest uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                    {item.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold tracking-wide text-white/90">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 px-6 border-t border-white/10 text-center text-xs text-white/50 space-y-2 max-w-[1440px] mx-auto">
        <p className="tracking-[0.2em] font-light">
          ROVE CONCEPTS © {new Date().getFullYear()} — ALL RIGHTS RESERVED
        </p>
      </footer>
    </main>
  );
}
