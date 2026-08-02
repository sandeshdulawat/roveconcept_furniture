"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { X, User, Package, LogOut, ShieldCheck, MapPin, CreditCard, ChevronRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const UserTray: React.FC = () => {
  const { data: session } = useSession();
  const { isUserTrayOpen, closeUserTray, userTrayView, setUserTrayView } = useUIStore();

  if (!isUserTrayOpen || !session?.user) return null;

  const mockOrders = [
    {
      id: "RC-98421",
      date: "August 1, 2026",
      status: "In Transit (White Glove Delivery)",
      item: "The Luca Curved Sectional Sofa",
      fabric: "Bouclé / Off-White",
      total: "$4,295 CAD",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "RC-87103",
      date: "June 14, 2026",
      status: "Delivered",
      item: "Winston Solid Oak Dining Table - 48\"",
      fabric: "Natural Walnut",
      total: "$2,895 CAD",
      img: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop Overlay */}
      <div
        onClick={closeUserTray}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        {/* User Profile Tray Panel */}
        <div className="w-screen max-w-md bg-zinc-950 text-white shadow-2xl flex flex-col justify-between border-l border-white/10 pointer-events-auto animate-cart-slide-in">
          
          {/* Header Bar */}
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/80">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-semibold text-sm">
                {session.user.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-wider text-white">
                  {session.user.name || "Valued Client"}
                </h3>
                <span className="text-[10px] text-amber-300 font-mono flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 inline" />
                  <span>VIP ARCHITECT MEMBER</span>
                </span>
              </div>
            </div>
            <button
              onClick={closeUserTray}
              className="p-1.5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 focus:outline-none"
              aria-label="Close Member Tray"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tray Tab Navigation Buttons (My Profile / My Orders) */}
          <div className="grid grid-cols-2 border-b border-white/10 text-xs font-medium tracking-[0.18em] uppercase bg-black">
            <button
              onClick={() => setUserTrayView("profile")}
              className={`py-3.5 flex items-center justify-center space-x-2 border-b-2 transition-colors ${
                userTrayView === "profile"
                  ? "border-white text-white bg-white/5 font-semibold"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span>MY PROFILE</span>
            </button>

            <button
              onClick={() => setUserTrayView("orders")}
              className={`py-3.5 flex items-center justify-center space-x-2 border-b-2 transition-colors ${
                userTrayView === "orders"
                  ? "border-white text-white bg-white/5 font-semibold"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>MY ORDERS</span>
            </button>
          </div>

          {/* Tray Content Body */}
          <div className="flex-1 px-6 py-6 overflow-y-auto space-y-6">
            {userTrayView === "profile" ? (
              /* MY PROFILE VIEW */
              <div className="space-y-6">
                <div className="space-y-3 bg-white/5 p-4 rounded-sm border border-white/10">
                  <span className="text-[10px] tracking-widest text-white/50 uppercase font-semibold block">
                    ACCOUNT DETAILS
                  </span>
                  <div className="text-xs space-y-1">
                    <p className="text-white font-medium">{session.user.name}</p>
                    <p className="text-white/60 font-mono text-[11px]">{session.user.email}</p>
                    <p className="text-white/40 text-[10px] pt-1">Client ID: RC-CLIENT-00984</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] tracking-widest text-white/50 uppercase font-semibold block">
                    SAVED ADDRESSES & PREFERENCES
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-sm text-xs">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-white/60" />
                        <div>
                          <p className="font-medium text-white">Default Shipping Address</p>
                          <p className="text-[11px] text-white/60">Vancouver, BC, Canada</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-sm text-xs">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-4 h-4 text-white/60" />
                        <div>
                          <p className="font-medium text-white">Payment Methods</p>
                          <p className="text-[11px] text-white/60">Visa ending in •••• 4242</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* MY ORDERS VIEW */
              <div className="space-y-4">
                <span className="text-[10px] tracking-widest text-white/50 uppercase font-semibold block">
                  RECENT ORDER HISTORY
                </span>

                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-white/5 border border-white/10 rounded-sm space-y-3 text-xs"
                  >
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-mono text-white/80 font-semibold">{order.id}</span>
                      <span className="text-[10px] text-amber-300 font-medium bg-amber-950/60 px-2 py-0.5 rounded-xs border border-amber-500/30">
                        {order.status}
                      </span>
                    </div>

                    <div className="flex space-x-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={order.img}
                        alt={order.item}
                        className="w-14 h-14 object-cover rounded-xs"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{order.item}</h4>
                        <p className="text-[11px] text-white/60">{order.fabric}</p>
                        <p className="text-xs font-semibold mt-1 text-white">{order.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Logout Action */}
          <div className="p-6 border-t border-white/10 bg-black">
            <button
              onClick={() => {
                closeUserTray();
                signOut({ redirect: false });
              }}
              className="w-full py-3.5 bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-200 text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>LOG OUT OF ACCOUNT</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
