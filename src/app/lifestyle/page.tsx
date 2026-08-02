import React, { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CurrencyModal } from "@/components/CurrencyModal";
import { AuthModal } from "@/components/AuthModal";
import { UserTray } from "@/components/UserTray";
import { LifestyleCatalogView } from "./LifestyleCatalogView";

export default function LifestylePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Combined Top Overlay Header & Navbar */}
      <Navbar />

      {/* Main Lifestyle Journal Container */}
      <div className="pt-32 sm:pt-36">
        <Suspense
          fallback={
            <div className="max-w-[1600px] mx-auto px-6 py-24 text-center text-white/50 text-xs font-mono uppercase tracking-widest">
              Loading Editorial Lifestyle Journal...
            </div>
          }
        >
          <LifestyleCatalogView />
        </Suspense>
      </div>

      {/* Modals & Drawers */}
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
