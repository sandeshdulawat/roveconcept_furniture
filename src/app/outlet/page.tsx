import React, { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CurrencyModal } from "@/components/CurrencyModal";
import { AuthModal } from "@/components/AuthModal";
import { UserTray } from "@/components/UserTray";
import { OutletCatalogView } from "./OutletCatalogView";

export default function OutletPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Combined Top Overlay Header & Navbar */}
      <Navbar />

      {/* Main Outlet Container */}
      <div className="pt-24">
        <Suspense
          fallback={
            <div className="max-w-[1600px] mx-auto px-6 py-24 text-center text-amber-300 text-xs font-mono uppercase tracking-widest">
              Loading Archival Vault & Certified Open Box...
            </div>
          }
        >
          <OutletCatalogView />
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
