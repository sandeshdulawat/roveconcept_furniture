import React from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CurrencyModal } from "@/components/CurrencyModal";
import { AuthModal } from "@/components/AuthModal";
import { UserTray } from "@/components/UserTray";
import { getProductById, productsData } from "@/data/products";
import { ProductDetailView } from "./ProductDetailView";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return productsData.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Header Overlay */}
      <Navbar />

      {/* Main Product Detail View with clear top spacing below fixed Navbar */}
      <div className="pt-32 sm:pt-36 pb-16">
        <ProductDetailView product={product} />
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
