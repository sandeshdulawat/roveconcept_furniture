"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Tag,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Percent,
  Check,
  RotateCcw,
  Sparkles,
  Flame,
} from "lucide-react";
import { getSaleProducts, Product } from "@/data/products";

export const categoriesList = [
  { label: "All Sale Items", slug: "all" },
  { label: "Sofas & Sectionals", slug: "sofas-sectionals" },
  { label: "Accent Chairs", slug: "accent-chairs" },
  { label: "Coffee Tables", slug: "coffee-tables" },
  { label: "Dining Tables", slug: "dining-tables" },
  { label: "Dining Chairs", slug: "dining-chairs" },
  { label: "Beds & Bedroom", slug: "beds-headboards" },
  { label: "Office Desks", slug: "desks" },
  { label: "Lighting", slug: "floor-lamps" },
  { label: "Rugs & Textiles", slug: "rugs" },
];

export const discountRanges = [
  { label: "All Discounts", value: 0 },
  { label: "20% OFF or More", value: 20 },
  { label: "25% OFF or More", value: 25 },
  { label: "30% OFF or More", value: 30 },
];

export const sortOptions = [
  { label: "Highest Discount", value: "discount-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Bestsellers", value: "bestsellers" },
];

export const SaleCatalogView: React.FC = () => {
  const saleProducts = useMemo(() => getSaleProducts(), []);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMinDiscount, setSelectedMinDiscount] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(5000);
  const [selectedSort, setSelectedSort] = useState("discount-desc");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return saleProducts
      .filter((product) => {
        // Category Filter
        if (selectedCategory !== "all") {
          const match =
            product.categorySlug === selectedCategory ||
            product.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory.toLowerCase();
          if (!match) return false;
        }

        // Min Discount Filter
        if (selectedMinDiscount > 0 && product.discountBadge) {
          const pct = parseInt(product.discountBadge.replace(/[^0-9]/g, ""), 10) || 0;
          if (pct < selectedMinDiscount) return false;
        }

        // Max Price Filter
        if (product.numericPrice > maxPriceFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === "price-asc") return a.numericPrice - b.numericPrice;
        if (selectedSort === "price-desc") return b.numericPrice - a.numericPrice;
        if (selectedSort === "discount-desc") {
          const pctA = parseInt(a.discountBadge?.replace(/[^0-9]/g, "") || "0", 10);
          const pctB = parseInt(b.discountBadge?.replace(/[^0-9]/g, "") || "0", 10);
          return pctB - pctA;
        }
        return 0;
      });
  }, [saleProducts, selectedCategory, selectedMinDiscount, maxPriceFilter, selectedSort]);

  const activeCategoryObj = categoriesList.find((c) => c.slug === selectedCategory);
  const categoryLabel = activeCategoryObj ? activeCategoryObj.label : "All Sale Exclusives";

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedMinDiscount(0);
    setMaxPriceFilter(5000);
    setSelectedSort("discount-desc");
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-6 pb-20">
      {/* ========================================================
          PROMOTIONAL BANNER & HEADER
         ======================================================== */}
      <div className="border-b border-white/10 pb-8 pt-4 space-y-4">
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] font-semibold text-white/50 uppercase">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-amber-400">Curated Sale Exclusives</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 px-3 py-1 rounded-full text-[11px] font-semibold text-amber-300 tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>LIMITED TIME · SAVINGS UP TO 40% OFF</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-wide">
              {categoryLabel}
            </h1>
            <p className="text-xs sm:text-sm text-white/60 font-light tracking-wide">
              Showing <strong className="text-amber-300">{filteredProducts.length}</strong> exclusive promotional offers ready for immediate dispatch.
            </p>
          </div>

          {/* Controls: Sort & Mobile Filter Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 bg-amber-400 text-black px-4 py-2.5 rounded-xs text-xs font-bold tracking-wider uppercase"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>FILTERS ({filteredProducts.length})</span>
            </button>

            <div className="relative flex items-center space-x-2 bg-zinc-900 border border-white/15 px-3 py-2 rounded-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-white/50" />
              <label className="text-[11px] text-white/50 uppercase font-medium">SORT BY:</label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-4 font-medium"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-zinc-950 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {(selectedCategory !== "all" || selectedMinDiscount > 0 || maxPriceFilter < 5000) && (
          <div className="flex items-center flex-wrap gap-2 pt-3">
            <span className="text-[10px] text-white/40 tracking-wider uppercase font-mono">Active Filters:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-widest border border-amber-400/30">
                <span>Category: {categoryLabel}</span>
                <button onClick={() => setSelectedCategory("all")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedMinDiscount > 0 && (
              <span className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-widest border border-amber-400/30">
                <span>{selectedMinDiscount}% OFF or More</span>
                <button onClick={() => setSelectedMinDiscount(0)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxPriceFilter < 5000 && (
              <span className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-widest border border-amber-400/30">
                <span>Under ${maxPriceFilter} CAD</span>
                <button onClick={() => setMaxPriceFilter(5000)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-[10px] tracking-widest uppercase text-amber-300 hover:underline flex items-center space-x-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================
          MAIN SALE GRID LAYOUT (Sticky Sidebar + Products Grid)
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
        {/* DESKTOP STICKY SIDEBAR FILTERS (3 Cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4 border-r border-white/10 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
          {/* Sale Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase border-b border-white/10 pb-2 flex items-center justify-between">
              <span>SALE CATEGORY</span>
              <Tag className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <ul className="space-y-1.5 text-xs text-white/70">
              {categoriesList.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <li key={cat.slug}>
                    <button
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-xs transition-colors flex items-center justify-between font-light tracking-wide ${
                        isActive
                          ? "bg-amber-400 text-black font-bold shadow-sm"
                          : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isActive && <Check className="w-3.5 h-3.5 shrink-0 text-black" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Minimum Discount Range */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase border-b border-white/10 pb-2 flex items-center justify-between">
              <span>MIN DISCOUNT</span>
              <Percent className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <ul className="space-y-1.5 text-xs text-white/70">
              {discountRanges.map((disc) => {
                const isActive = selectedMinDiscount === disc.value;
                return (
                  <li key={disc.value}>
                    <button
                      onClick={() => setSelectedMinDiscount(disc.value)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-xs transition-colors flex items-center justify-between font-light tracking-wide ${
                        isActive
                          ? "bg-amber-400 text-black font-bold shadow-sm"
                          : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{disc.label}</span>
                      {isActive && <Check className="w-3.5 h-3.5 shrink-0 text-black" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Max Price Filter Slider */}
          <div className="space-y-3 pt-2 pb-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase border-b border-white/10 pb-2">
              MAX SALE PRICE: <strong className="text-amber-300">${maxPriceFilter} CAD</strong>
            </h3>
            <input
              type="range"
              min="500"
              max="5000"
              step="250"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/40 font-mono">
              <span>$500</span>
              <span>$2,500</span>
              <span>$5,000+</span>
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID (9 Cols) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-zinc-950 border border-white/15 p-12 text-center rounded-sm space-y-4 max-w-md mx-auto my-12">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="text-lg font-medium text-white">No Sale Items Match Your Criteria</h3>
              <p className="text-xs text-white/60 font-light">
                Try lowering your discount threshold or resetting filters to browse all promotional offers.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-block bg-amber-400 text-black text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-amber-300 transition-colors"
              >
                VIEW ALL SALE EXCLUSIVES
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group relative bg-zinc-950/80 border border-white/10 hover:border-amber-400/50 rounded-xs overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3 p-3">
                    {/* Image Wrapper with Red/Amber Discount Badge */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 rounded-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      {product.discountBadge && (
                        <span className="absolute top-3 left-3 bg-amber-400 text-black font-extrabold px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-xs shadow-md">
                          SAVE {product.discountBadge}
                        </span>
                      )}
                      <span className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-semibold tracking-widest text-white uppercase border border-white/15">
                        {product.tag}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] text-white/50 tracking-widest uppercase font-mono block">
                        {product.category}
                      </span>
                      <h3 className="text-sm font-medium text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* Pricing Footer with Strikethrough Original Price */}
                  <div className="p-3 border-t border-white/10 flex items-center justify-between bg-black/40">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-sm font-bold tracking-wide text-amber-300">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-white/40 line-through font-mono">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] tracking-widest uppercase font-medium text-amber-300 group-hover:text-amber-200 flex items-center space-x-1">
                      <span>SHOP SALE</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="bg-zinc-950 border-l border-white/20 w-full max-w-sm h-full p-6 text-white overflow-y-auto space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-amber-300">FILTER SALE ITEMS</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category List */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white/60">CATEGORY</h4>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left py-2 px-3 text-xs rounded-xs ${
                      selectedCategory === cat.slug ? "bg-amber-400 text-black font-bold" : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-amber-400 text-black text-xs font-bold tracking-[0.2em] uppercase mt-4"
            >
              APPLY FILTERS ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
