"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  ShoppingBag,
  ArrowUpDown,
  Sparkles,
  Check,
  RotateCcw,
} from "lucide-react";
import { productsData, Product } from "@/data/products";

export const categoriesList = [
  { label: "All Catalog", slug: "all" },
  { label: "Sofas & Sectionals", slug: "sofas-sectionals" },
  { label: "Accent Chairs", slug: "accent-chairs" },
  { label: "Coffee Tables", slug: "coffee-tables" },
  { label: "TV Units & Consoles", slug: "tv-units-consoles" },
  { label: "Dining Tables", slug: "dining-tables" },
  { label: "Dining Chairs", slug: "dining-chairs" },
  { label: "Sideboards", slug: "sideboards" },
  { label: "Beds & Headboards", slug: "beds-headboards" },
  { label: "Office Desks", slug: "desks" },
  { label: "Floor Lamps", slug: "floor-lamps" },
  { label: "Rugs & Decor", slug: "rugs" },
];

export const roomsList = ["All Rooms", "Living Room", "Dining Room", "Bedroom", "Office", "Lighting", "Decor"];

export const sortOptions = [
  { label: "Bestsellers", value: "bestsellers" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest Releases", value: "newest" },
  { label: "Name: A to Z", value: "name-asc" },
];

export const ShopCatalogView: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial filter values from URL params
  const categoryParam = searchParams.get("category") || "all";
  const roomParam = searchParams.get("room") || "All Rooms";
  const tagParam = searchParams.get("tag") || "";
  const sortParam = searchParams.get("sort") || "bestsellers";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedRoom, setSelectedRoom] = useState(roomParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [maxPriceFilter, setMaxPriceFilter] = useState(5000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (roomParam) setSelectedRoom(roomParam);
    if (sortParam) setSelectedSort(sortParam);
  }, [categoryParam, roomParam, sortParam]);

  // Update URL parameters dynamically when filters change
  const updateUrlParams = (newCat: string, newRoom: string, newSort: string) => {
    const params = new URLSearchParams();
    if (newCat && newCat !== "all") params.set("category", newCat);
    if (newRoom && newRoom !== "All Rooms") params.set("room", newRoom);
    if (newSort && newSort !== "bestsellers") params.set("sort", newSort);

    const queryString = params.toString();
    router.push(`/shop${queryString ? `?${queryString}` : ""}`);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Category Filter
        if (selectedCategory !== "all") {
          const catMatch =
            product.categorySlug === selectedCategory ||
            product.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory.toLowerCase();
          if (!catMatch) return false;
        }

        // Room Filter
        if (selectedRoom !== "All Rooms") {
          if (product.category.toLowerCase() !== selectedRoom.toLowerCase()) return false;
        }

        // Tag Filter (e.g. SALE or OUTLET)
        if (tagParam) {
          if (product.tag.toUpperCase() !== tagParam.toUpperCase()) return false;
        }

        // Max Price Filter
        if (product.numericPrice > maxPriceFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === "price-asc") return a.numericPrice - b.numericPrice;
        if (selectedSort === "price-desc") return b.numericPrice - a.numericPrice;
        if (selectedSort === "name-asc") return a.name.localeCompare(b.name);
        if (selectedSort === "newest") return b.id.localeCompare(a.id);
        return 0; // Default Bestsellers
      });
  }, [selectedCategory, selectedRoom, tagParam, maxPriceFilter, selectedSort]);

  // Active Category Label
  const activeCategoryObj = categoriesList.find((c) => c.slug === selectedCategory);
  const pageTitle = activeCategoryObj ? activeCategoryObj.label : "All Luxury Catalog";

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedRoom("All Rooms");
    setMaxPriceFilter(5000);
    setSelectedSort("bestsellers");
    router.push("/shop");
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-6 pb-20">
      {/* ========================================================
          PAGE HEADER BANNER
         ======================================================== */}
      <div className="border-b border-white/10 pb-8 pt-4 space-y-3">
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] font-semibold text-white/50 uppercase">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">Shop Catalog</Link>
          {selectedCategory !== "all" && (
            <>
              <span>/</span>
              <span className="text-white">{pageTitle}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-wide">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/60 font-light tracking-wide mt-1">
              Showing <strong className="text-white">{filteredProducts.length}</strong> handcrafted pieces curated for modern luxury spaces.
            </p>
          </div>

          {/* Desktop Controls: Sort Dropdown & Filter Count */}
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 rounded-xs text-xs font-semibold tracking-wider uppercase text-white"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>FILTERS ({filteredProducts.length})</span>
            </button>

            {/* Sort Selector */}
            <div className="relative flex items-center space-x-2 bg-zinc-900 border border-white/15 px-3 py-2 rounded-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-white/50" />
              <label className="text-[11px] text-white/50 uppercase font-medium">SORT BY:</label>
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  updateUrlParams(selectedCategory, selectedRoom, e.target.value);
                }}
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

        {/* Active Filter Chips */}
        {(selectedCategory !== "all" || selectedRoom !== "All Rooms" || maxPriceFilter < 5000 || tagParam) && (
          <div className="flex items-center flex-wrap gap-2 pt-3">
            <span className="text-[10px] text-white/40 tracking-wider uppercase font-mono">Active Filters:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center space-x-1.5 bg-white/10 text-white px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-widest border border-white/15">
                <span>Category: {pageTitle}</span>
                <button onClick={() => { setSelectedCategory("all"); updateUrlParams("all", selectedRoom, selectedSort); }} className="hover:text-amber-300">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedRoom !== "All Rooms" && (
              <span className="inline-flex items-center space-x-1.5 bg-white/10 text-white px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-widest border border-white/15">
                <span>Room: {selectedRoom}</span>
                <button onClick={() => { setSelectedRoom("All Rooms"); updateUrlParams(selectedCategory, "All Rooms", selectedSort); }} className="hover:text-amber-300">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxPriceFilter < 5000 && (
              <span className="inline-flex items-center space-x-1.5 bg-white/10 text-white px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-widest border border-white/15">
                <span>Under ${maxPriceFilter} CAD</span>
                <button onClick={() => setMaxPriceFilter(5000)} className="hover:text-amber-300">
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
          MAIN CATALOG LAYOUT (Sticky Sidebar + Products Grid)
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
        {/* ========================================================
            DESKTOP STICKY SIDEBAR FILTER COLUMN (3 Cols)
            - Pinned during scroll, custom dark theme scrollbar
           ======================================================== */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4 border-r border-white/10 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto dark-scrollbar">
          {/* Categories Filter list */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase border-b border-white/10 pb-2">
              CATEGORIES
            </h3>
            <ul className="space-y-1.5 text-xs text-white/70">
              {categoriesList.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <li key={cat.slug}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        updateUrlParams(cat.slug, selectedRoom, selectedSort);
                      }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-xs transition-colors flex items-center justify-between font-light tracking-wide ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-sm"
                          : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Room Filter list */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase border-b border-white/10 pb-2">
              ROOM / DEPARTMENT
            </h3>
            <ul className="space-y-1.5 text-xs text-white/70">
              {roomsList.map((room) => {
                const isActive = selectedRoom === room;
                return (
                  <li key={room}>
                    <button
                      onClick={() => {
                        setSelectedRoom(room);
                        updateUrlParams(selectedCategory, room, selectedSort);
                      }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-xs transition-colors flex items-center justify-between font-light tracking-wide ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-sm"
                          : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{room}</span>
                      {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Price Range Filter Slider */}
          <div className="space-y-3 pt-2 pb-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase border-b border-white/10 pb-2">
              MAX PRICE: <strong className="text-amber-300">${maxPriceFilter} CAD</strong>
            </h3>
            <input
              type="range"
              min="500"
              max="5000"
              step="250"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-full accent-white cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/40 font-mono">
              <span>$500</span>
              <span>$2,500</span>
              <span>$5,000+</span>
            </div>
          </div>
        </aside>

        {/* ========================================================
            PRODUCTS GRID CONTAINER (9 Cols)
           ======================================================== */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-zinc-950 border border-white/15 p-12 text-center rounded-sm space-y-4 max-w-md mx-auto my-12">
              <Sparkles className="w-8 h-8 text-amber-300 mx-auto" />
              <h3 className="text-lg font-medium text-white">No Pieces Match Your Selection</h3>
              <p className="text-xs text-white/60 font-light">
                Try selecting another category, adjusting your price filter, or resetting all filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-block bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase px-6 py-3 hover:bg-zinc-200 transition-colors"
              >
                VIEW ALL PRODUCTS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group relative bg-zinc-950/80 border border-white/10 hover:border-white/30 rounded-xs overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3 p-3">
                    {/* Product Image Wrapper */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 rounded-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-semibold tracking-widest text-white uppercase border border-white/15">
                        {product.tag}
                      </span>
                    </div>

                    {/* Product Metadata */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] text-white/50 tracking-widest uppercase font-mono block">
                        {product.category}
                      </span>
                      <h3 className="text-sm font-medium text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="p-3 border-t border-white/10 flex items-center justify-between bg-black/40">
                    <span className="text-xs font-semibold tracking-wide text-white">
                      {product.price}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase font-medium text-white/70 group-hover:text-white flex items-center space-x-1">
                      <span>EXPLORE</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ========================================================
          MOBILE FILTER DRAWER MODAL
         ======================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="bg-zinc-950 border-l border-white/20 w-full max-w-sm h-full p-6 text-white overflow-y-auto space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase">FILTER CATALOG</h3>
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
                      updateUrlParams(cat.slug, selectedRoom, selectedSort);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left py-2 px-3 text-xs rounded-xs ${
                      selectedCategory === cat.slug ? "bg-white text-black font-semibold" : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase mt-4"
            >
              APPLY FILTERS ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
