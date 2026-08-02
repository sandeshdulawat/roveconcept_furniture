"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, cartCount, addToCart } = useUIStore();
  const [shouldRender, setShouldRender] = useState(isCartOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
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
  }, [isCartOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Overlay Backdrop with Fade In / Fade Out */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/65 backdrop-blur-sm ${
          isClosing ? "animate-backdrop-out" : "animate-backdrop-in"
        }`}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        {/* Cart Drawer Panel with Slide In / Slide Out */}
        <div
          className={`w-screen max-w-md bg-zinc-950 text-white shadow-2xl flex flex-col justify-between border-l border-white/10 pointer-events-auto ${
            isClosing ? "animate-cart-slide-out" : "animate-cart-slide-in"
          }`}
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase">
                YOUR CART ({cartCount})
              </h3>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 focus:outline-none"
              aria-label="Close Cart Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 px-6 py-8 overflow-y-auto">
            {cartCount === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-sm text-white/60 font-light tracking-wide">
                  Your shopping bag is currently empty.
                </p>
                <button
                  onClick={addToCart}
                  className="inline-block px-6 py-3 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
                >
                  ADD DEMO LUXURY ITEM
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-3 bg-white/5 border border-white/10 rounded-sm">
                  <div className="w-16 h-16 bg-zinc-800 rounded-sm flex items-center justify-center font-serif text-xs text-white/60">
                    LUCA
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold tracking-wider">The Luca Curved Sofa</h4>
                    <p className="text-[11px] text-white/60">Bouclé Fabric / Cream</p>
                    <p className="text-xs font-medium mt-1">$3,495 CAD</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout */}
          <div className="px-6 py-6 border-t border-white/10 space-y-4 bg-zinc-900/60">
            <div className="flex justify-between text-xs tracking-wider">
              <span className="text-white/60">Subtotal</span>
              <span className="font-semibold">{cartCount > 0 ? "$3,495 CAD" : "$0 CAD"}</span>
            </div>
            <p className="text-[10px] text-white/50">
              Shipping & taxes calculated at checkout. Free white-glove delivery available.
            </p>
            <button className="w-full py-4 bg-white text-black text-xs font-medium tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2">
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
