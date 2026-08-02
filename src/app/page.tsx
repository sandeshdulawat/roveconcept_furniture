import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TopCollections } from "@/components/TopCollections";
import { CraftedSection } from "@/components/CraftedSection";
import { CatalogPreview } from "@/components/CatalogPreview";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CurrencyModal } from "@/components/CurrencyModal";
import { AuthModal } from "@/components/AuthModal";
import { UserTray } from "@/components/UserTray";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Combined Top Overlay Header & Navbar */}
      <Navbar />

      {/* Hero Section covering full device height (100dvh) with Video background */}
      <HeroSection />

      {/* Top Collections Showcase Section */}
      <TopCollections />

      {/* Crafted For Modern Living Showcase Section */}
      <CraftedSection />

      {/* Catalog Preview Showcase Below Hero */}
      <CatalogPreview />

      {/* Modals, Auth & Slide-over Drawers */}
      <SearchModal />
      <CartDrawer />
      <CurrencyModal />
      <AuthModal />
      <UserTray />

      {/* Footer Branding */}
      <footer className="py-12 px-6 border-t border-white/10 text-center text-xs text-white/50 space-y-2 max-w-[1440px] mx-auto">
        <p className="tracking-[0.2em] font-light">
          ROVE CONCEPTS © {new Date().getFullYear()} — ALL RIGHTS RESERVED
        </p>
      </footer>
    </main>
  );
}
