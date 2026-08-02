"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    closeWishlistModal,
    wishlist,
    toggleWishlistItem,
    addItemToCart,
  } = useUIStore();

  const [shouldRender, setShouldRender] = useState(isWishlistOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isWishlistOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isWishlistOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeWishlistModal}
        className={`absolute inset-0 bg-black/65 backdrop-blur-sm ${
          isClosing ? "animate-backdrop-out" : "animate-backdrop-in"
        }`}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        {/* Drawer Panel */}
        <div
          className={`w-screen max-w-md bg-zinc-950 text-white shadow-2xl flex flex-col justify-between border-l border-white/10 pointer-events-auto ${
            isClosing ? "animate-cart-slide-out" : "animate-cart-slide-in"
          }`}
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between bg-black">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase">
                SAVED FAVORITES ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={closeWishlistModal}
              className="p-1.5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 px-6 py-6 overflow-y-auto space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Heart className="w-10 h-10 text-white/30 mx-auto" />
                <p className="text-sm text-white/60 font-light tracking-wide">
                  Your saved wishlist is currently empty.
                </p>
                <Link
                  href="/shop"
                  onClick={closeWishlistModal}
                  className="inline-block px-6 py-3 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-amber-300 transition-colors rounded-xs shadow-md"
                >
                  DISCOVER LUXURY PIECES
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 bg-white/5 border border-white/10 rounded-xs group hover:border-amber-400/40 transition-colors"
                  >
                    <div className="w-16 h-16 bg-zinc-900 rounded-xs overflow-hidden shrink-0 border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/product/${item.id}`}
                        onClick={closeWishlistModal}
                        className="text-xs font-semibold tracking-wider text-white hover:text-amber-200 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs font-bold text-amber-300">{item.price}</p>
                      <button
                        onClick={() => {
                          addItemToCart({
                            productId: item.id,
                            name: item.name,
                            price: item.price,
                            numericPrice: item.numericPrice,
                            image: item.images[0],
                          });
                          closeWishlistModal();
                        }}
                        className="inline-flex items-center space-x-1 text-[10px] font-bold tracking-widest text-white uppercase hover:text-amber-300 pt-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>

                    <button
                      onClick={() => toggleWishlistItem(item)}
                      className="text-white/40 hover:text-red-400 transition-colors p-1"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="px-6 py-6 border-t border-white/10 bg-black">
              <Link
                href="/shop"
                onClick={closeWishlistModal}
                className="w-full py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-300 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>EXPLORE MORE PIECES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
