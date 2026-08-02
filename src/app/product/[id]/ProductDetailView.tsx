"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Truck,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
  Building2,
  ChevronRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Product } from "@/data/products";
import { useUIStore } from "@/store/useUIStore";

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const { addItemToCart } = useUIStore();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");

  // Delivery Pincode state
  const [pincode, setPincode] = useState("400001");
  const [deliveryResult, setDeliveryResult] = useState<{
    days: number;
    formattedDate: string;
    seller: string;
    checkedCode: string;
  } | null>(null);
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);

  // Handle Pincode Delivery Check
  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) return;

    setIsCheckingDelivery(true);

    setTimeout(() => {
      // Random days between 4 and 7 days
      const days = Math.floor(Math.random() * 4) + 4; // 4, 5, 6, or 7 days
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + days);

      const formattedDate = deliveryDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      setDeliveryResult({
        days,
        formattedDate,
        seller: product.seller || "Mumbai Warehouse",
        checkedCode: pincode.trim(),
      });
      setIsCheckingDelivery(false);
    }, 400);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-white/50 mb-6 font-light tracking-wider">
        <Link href="/" className="hover:text-white transition-colors flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-white/70">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-white font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* ========================================================
            LEFT COLUMN: High-Resolution Product Image Gallery (7 Cols)
           ======================================================== */}
        <div className="lg:col-span-7 space-y-4">
          {/* Featured Main Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xs bg-zinc-900 border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-semibold tracking-widest uppercase border border-white/10">
              {product.tag}
            </span>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 shrink-0 rounded-xs border-2 overflow-hidden transition-all ${
                    selectedImage === img
                      ? "border-white scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} preview ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================
            RIGHT COLUMN: Product Info, Delivery Checker & CTA (5 Cols)
           ======================================================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div className="space-y-2 border-b border-white/10 pb-6">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-white/50 uppercase">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-light text-white tracking-wide">
              {product.name}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-wide text-white pt-1">
              {product.price}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 border-t border-b border-white/10 py-4">
              <label className="text-xs tracking-wider uppercase text-white/70 font-medium block">
                Finish / Color: <strong className="text-white">{selectedColor}</strong>
              </label>
              <div className="flex space-x-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all focus:outline-none ${
                      selectedColor === c.name ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    title={c.name}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add To Cart CTA Button */}
          <div>
            <button
              onClick={() =>
                addItemToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  numericPrice: product.numericPrice,
                  image: selectedImage || product.images[0],
                  selectedColor,
                })
              }
              className="w-full py-4 bg-white text-black text-xs font-semibold tracking-[0.22em] uppercase hover:bg-amber-300 transition-all shadow-xl flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO SHOPPING BAG</span>
            </button>
          </div>

          {/* ========================================================
              DELIVERY CHECKER BY PINCODE SECTION
              - Random 4-7 Days Delivery Estimate
              - Seller: Mumbai Warehouse
             ======================================================== */}
          <div className="bg-zinc-950 border border-white/15 p-5 rounded-sm space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-white uppercase border-b border-white/10 pb-3">
              <Truck className="w-4 h-4 text-amber-300" />
              <span>CHECK DELIVERY & AVAILABILITY</span>
            </div>

            {/* Pincode Input Form */}
            <form onSubmit={handleCheckDelivery} className="flex space-x-2">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode (e.g. 400001)"
                  maxLength={10}
                  className="w-full bg-white/5 border border-white/20 focus:border-white pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 rounded-xs focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isCheckingDelivery}
                className="px-4 py-2 bg-white/15 hover:bg-white text-white hover:text-black text-xs font-medium tracking-wider uppercase rounded-xs transition-colors shrink-0 disabled:opacity-50"
              >
                {isCheckingDelivery ? "CHECKING..." : "CHECK"}
              </button>
            </form>

            {/* Delivery Check Result */}
            {deliveryResult && (
              <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-3 animate-fade-in text-xs">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">
                      Estimated Delivery in <span className="text-emerald-400">{deliveryResult.days} Days</span>
                    </p>
                    <p className="text-[11px] text-white/70">
                      Expected by <strong>{deliveryResult.formattedDate}</strong> for Pincode {deliveryResult.checkedCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-white/70 pt-2 border-t border-white/10">
                  <Building2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>
                    Seller: <strong className="text-white font-medium">{deliveryResult.seller}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Default Seller & Service Guarantees */}
            {!deliveryResult && (
              <div className="space-y-2 pt-1 text-[11px] text-white/60">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                  <span>Seller: <strong>Mumbai Warehouse</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-white/40 shrink-0" />
                  <span>Includes White-Glove In-Home Assembly & 30-Day Trial</span>
                </div>
              </div>
            )}
          </div>

          {/* Product Specifications & Dimensions */}
          <div className="space-y-3 border-t border-white/10 pt-6">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
              SPECIFICATIONS & DIMENSIONS
            </h4>
            <div className="text-xs space-y-2 text-white/70 font-light">
              <p><strong>Dimensions:</strong> {product.dimensions}</p>
              <div>
                <strong className="block mb-1">Materials & Crafting:</strong>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-white/60">
                  {product.materials.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
