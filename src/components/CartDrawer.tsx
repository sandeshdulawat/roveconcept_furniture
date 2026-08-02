"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus, CheckCircle2, ShieldCheck } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cartCount,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateCartQuantity,
    clearCart,
  } = useUIStore();

  const [shouldRender, setShouldRender] = useState(isCartOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setShouldRender(true);
      setIsClosing(false);
      setCheckoutSuccess(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen, shouldRender]);

  // Subtotal Calculation
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setCheckoutSuccess(true);
      setTimeout(() => {
        clearCart();
      }, 2500);
    }
  };

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
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between bg-black">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase">
                YOUR SHOPPING BAG ({cartCount})
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
          <div className="flex-1 px-6 py-6 overflow-y-auto space-y-4">
            {checkoutSuccess ? (
              <div className="text-center py-16 space-y-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-serif text-white">Order Placed Successfully!</h4>
                <p className="text-xs text-white/70 font-light">
                  Thank you for shopping with Rove Concepts. White-glove shipping confirmation sent to your email.
                </p>
                <button
                  onClick={closeCart}
                  className="inline-block px-6 py-2.5 bg-white text-black text-xs font-semibold tracking-widest uppercase"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-10 h-10 text-white/30 mx-auto" />
                <p className="text-sm text-white/60 font-light tracking-wide">
                  Your shopping bag is currently empty.
                </p>
                <button
                  onClick={() =>
                    addItemToCart({
                      productId: "luca-curved-sectional",
                      name: "The Luca Curved Sectional Sofa",
                      price: "$3,695 CAD",
                      numericPrice: 3695,
                      image: "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?q=80&w=1417&auto=format&fit=crop",
                      selectedColor: "Cream Bouclé",
                    })
                  }
                  className="inline-block px-6 py-3 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-amber-300 transition-colors rounded-xs shadow-md"
                >
                  ADD DEMO LUXURY PIECE
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 bg-white/5 border border-white/10 rounded-xs group hover:border-amber-400/40 transition-colors"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-zinc-900 rounded-xs overflow-hidden shrink-0 border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/product/${item.productId}`}
                        onClick={closeCart}
                        className="text-xs font-semibold tracking-wider text-white hover:text-amber-200 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.selectedColor && (
                        <p className="text-[11px] text-white/60 font-light">
                          Finish: <span className="text-white">{item.selectedColor}</span>
                        </p>
                      )}
                      <p className="text-xs font-bold text-amber-300">{item.price}</p>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="text-white/40 hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center space-x-2 bg-black border border-white/20 px-2 py-0.5 rounded-xs text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="text-white/60 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="text-white/60 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && !checkoutSuccess && (
            <div className="px-6 py-6 border-t border-white/10 space-y-4 bg-black">
              <div className="flex justify-between text-xs tracking-wider">
                <span className="text-white/60">Estimated Subtotal</span>
                <span className="font-bold text-amber-300 text-sm">
                  ${subtotal.toLocaleString()} CAD
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-white/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>White-glove in-home delivery & 30-day trial included.</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-amber-400 text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-300 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>PROCEED TO CHECKOUT (${subtotal.toLocaleString()} CAD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
