"use client";

import React from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useUIStore();

  if (!isSearchOpen) return null;

  const popularSearches = [
    "Bouclé Sofas",
    "Marble Dining Tables",
    "Modular Sectionals",
    "Curved Accent Chairs",
    "King Storage Beds",
    "Outdoor Dining Sets",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex flex-col justify-start pt-16 px-4 sm:px-8 transition-all duration-300">
      {/* Blog/Content Width Boundary (max-width: 900px) */}
      <div className="max-w-[900px] mx-auto w-full relative">
        {/* Close Button */}
        <button
          onClick={closeSearch}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors focus:outline-none flex items-center space-x-1 text-xs tracking-widest uppercase"
        >
          <span>CLOSE</span>
          <X className="w-5 h-5" />
        </button>

        {/* Input Bar */}
        <div className="relative border-b-2 border-white/40 focus-within:border-white transition-colors pb-3">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search luxury furniture, collections, materials..."
            className="w-full bg-transparent pl-10 pr-4 text-lg sm:text-2xl font-light text-white placeholder-white/40 focus:outline-none tracking-wide"
            autoFocus
          />
        </div>

        {/* Popular Trending Searches */}
        <div className="mt-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-white/50 tracking-[0.2em] uppercase mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Popular Searches</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black text-xs tracking-wider rounded-full transition-all duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
