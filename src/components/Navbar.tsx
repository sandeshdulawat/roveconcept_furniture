"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogIn,
  ArrowRight,
  Globe,
} from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { LanguageModal } from "@/components/LanguageModal";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    openSearch,
    toggleCart,
    cartCount,
    currency,
    toggleCurrencyModal,
    language,
    toggleLanguageModal,
    activeNavHover,
    setActiveNavHover,
    openAuthModal,
    toggleUserTray,
    setUserTrayView,
  } = useUIStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { name: "SHOP", href: "/shop", hasMega: true, subtitle: "Full Luxury Catalog" },
    { name: "SALE", href: "/sale", badge: "NEW", subtitle: "Curated Offers & Exclusives", hasMega: false },
    { name: "LIFESTYLE", href: "/lifestyle", hasMega: true, subtitle: "Interior Inspiration & Journal" },
    { name: "DISCOVER", href: "/discover", hasMega: false, subtitle: "Interactive Atelier Experience" },
    { name: "SHOWROOM", href: "/showroom", hasMega: false, subtitle: "Visit Our Global Spaces" },
    { name: "OUTLET", href: "/outlet", badge: "VAULT", subtitle: "Certified Open-Box & Archival Vault", hasMega: false },
  ];

  const handleUserClick = () => {
    if (session?.user) {
      toggleUserTray();
    } else {
      openAuthModal();
    }
  };

  const handleMobileNavigate = (url: string) => {
    setMobileMenuOpen(false);
    router.push(url);
  };

  // Hover Handlers with Buffer Timeout to prevent premature closing
  const handleMouseEnterItem = (linkName: string, hasMega: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (hasMega) {
      setActiveNavHover(linkName);
    } else {
      timeoutRef.current = setTimeout(() => {
        setActiveNavHover(null);
      }, 150);
    }
  };

  const handleMouseLeaveNav = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveNavHover(null);
    }, 250); // 250ms buffer time for smooth mouse movement into submenu
  };

  const handleMouseEnterMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <>
      {/* Fixed Top Header Container */}
      <header
        onMouseLeave={handleMouseLeaveNav}
        className="fixed top-0 left-0 w-full z-40 text-white glass-header transition-all duration-300"
      >
        {/* DESKTOP HEADER LAYOUT (hidden md:block) */}
        <div className="hidden md:block">
          {/* Top Utility Bar */}
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8 pt-4 pb-2 flex items-center justify-between">
            {/* Left: Search Trigger */}
            <div className="flex items-center space-x-2">
              <button
                onClick={openSearch}
                className="flex items-center space-x-2 text-xs tracking-widest font-light hover:opacity-75 transition-opacity focus:outline-none group"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span className="uppercase text-[11px] lg:text-xs tracking-[0.18em] font-medium text-shadow-nav">
                  SEARCH
                </span>
              </button>
            </div>

            {/* Center: Brand Logo */}
            <div className="text-center cursor-pointer">
              <Link href="/" className="inline-block group focus:outline-none" aria-label="Go to Home Page">
                <span className="text-2xl lg:text-3xl font-light tracking-[0.25em] text-shadow-nav">
                  <strong className="font-semibold tracking-[0.25em]">ROVE</strong>
                  <span className="font-extralight tracking-[0.28em] opacity-95">CONCEPTS</span>
                </span>
              </Link>
            </div>

            {/* Right: Language, Currency, User Account, Shopping Bag */}
            <div className="flex items-center space-x-5">
              <button
                onClick={toggleLanguageModal}
                className="flex items-center space-x-1 text-xs tracking-widest font-light hover:opacity-80 transition-opacity focus:outline-none text-shadow-nav"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 opacity-80" />
                <span className="font-medium text-xs tracking-wider">{language}</span>
              </button>

              <span className="text-white/20 text-xs">|</span>

              <button
                onClick={toggleCurrencyModal}
                className="flex items-center space-x-1 text-xs tracking-widest font-light hover:opacity-80 transition-opacity focus:outline-none text-shadow-nav"
              >
                <span className="font-medium text-xs tracking-wider">{currency}</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              <button
                onClick={handleUserClick}
                className="flex items-center space-x-1.5 hover:opacity-80 transition-opacity focus:outline-none text-shadow-nav group"
                aria-label="User Account"
                title={session?.user ? `Logged in as ${session.user.name}` : "Login"}
              >
                <User className="w-5 h-5 stroke-[1.5] group-hover:scale-105 transition-transform" />
                {session?.user && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>

              <button
                onClick={toggleCart}
                className="flex items-center space-x-1.5 hover:opacity-80 transition-opacity focus:outline-none relative text-shadow-nav group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5] group-hover:scale-105 transition-transform" />
                <span className="text-xs font-light tracking-tight">{cartCount}</span>
              </button>
            </div>
          </div>

          {/* Primary Desktop Navigation Bar */}
          <nav className="flex justify-center items-center pb-4 pt-2 border-t border-white/10">
            <ul className="flex items-center space-x-8 lg:space-x-12">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  onMouseEnter={() => handleMouseEnterItem(link.name, !!link.hasMega)}
                  onMouseLeave={handleMouseLeaveNav}
                  className="relative group py-1"
                >
                  <Link
                    href={link.href}
                    className="text-[12px] lg:text-[13px] tracking-[0.22em] font-normal text-white/90 hover:text-white transition-colors duration-200 uppercase text-shadow-nav block"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-amber-400 text-black font-bold rounded-xs uppercase tracking-normal">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </nav>

          {/* MEGA MENUS FOR DESKTOP */}
          {activeNavHover === "SHOP" && (
            <div
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseLeaveNav}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/15 text-white py-10 px-8 lg:px-12 transition-all duration-300 shadow-2xl animate-fade-in z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 text-left">
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Living Room
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/shop?category=sofas-sectionals" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Sofas & Sectionals</Link></li>
                    <li><Link href="/shop?category=accent-chairs" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Accent Chairs</Link></li>
                    <li><Link href="/shop?category=coffee-tables" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Coffee Tables</Link></li>
                    <li><Link href="/shop?category=tv-units-consoles" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">TV Units & Consoles</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Dining Room
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/shop?category=dining-tables" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Dining Tables</Link></li>
                    <li><Link href="/shop?category=dining-chairs" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Dining Chairs</Link></li>
                    <li><Link href="/shop?category=sideboards" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Sideboards</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Bedroom
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/shop?category=beds-headboards" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Beds & Headboards</Link></li>
                    <li><Link href="/shop?category=beds-headboards" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Nightstands</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Office
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/shop?category=desks" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Desks & Office</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Lighting
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/shop?category=floor-lamps" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Floor Lamps</Link></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Decor
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/shop?category=rugs" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Rugs & Decor</Link></li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-xs border border-white/15 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[9px] tracking-[0.22em] uppercase font-semibold text-amber-300 block">
                      FEATURED COLLECTION
                    </span>
                    <h5 className="font-serif text-base font-normal mt-1 mb-2 text-white">
                      The Luca Curved Sofa
                    </h5>
                  </div>
                  <Link
                    href="/product/luca-curved-sectional"
                    onClick={() => setActiveNavHover(null)}
                    className="inline-flex items-center space-x-1.5 text-[10px] font-medium tracking-[0.2em] text-white uppercase hover:text-amber-200 transition-colors pt-2 border-t border-white/10"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE HEADER BAR (block md:hidden) */}
        <div className="md:hidden px-4 py-3.5 flex items-center justify-between">
          <Link href="/" className="focus:outline-none" aria-label="Go to Home Page">
            <span className="text-lg font-light tracking-[0.2em] text-shadow-nav">
              <strong className="font-semibold tracking-[0.2em]">ROVE</strong>
              <span className="font-extralight tracking-[0.22em] opacity-95">CONCEPTS</span>
            </span>
          </Link>

          <div className="flex items-center space-x-3.5">
            <button
              onClick={handleUserClick}
              className="p-1 focus:outline-none text-shadow-nav"
              aria-label="User Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={toggleCart}
              className="flex items-center space-x-1 focus:outline-none text-shadow-nav"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span className="text-xs font-light">{cartCount}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 focus:outline-none hover:opacity-80 transition-opacity"
              aria-label="Open Mobile Navigation Menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Language Modal Overlay Mount */}
      <LanguageModal />

      {/* LUXURY MOBILE MENU TRAY OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col justify-between animate-mobile-tray overflow-y-auto h-[100dvh] w-full">
          {/* Mobile Sticky Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-white/15 bg-zinc-900 sticky top-0 z-20">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-light tracking-[0.22em]"
            >
              <strong className="font-semibold tracking-[0.22em]">ROVE</strong>
              <span className="font-extralight opacity-90">CONCEPTS</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 focus:outline-none"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Body */}
          <div className="px-5 py-6 flex-1 space-y-6 max-w-[900px] mx-auto w-full">
            {/* Search Input Bar */}
            <div className="animate-link-stagger" style={{ animationDelay: "0.05s" }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSearch();
                }}
                className="w-full flex items-center justify-between p-3.5 bg-white/5 border border-white/15 rounded-sm hover:border-white/40 transition-colors group"
              >
                <div className="flex items-center space-x-3 text-white/70 group-hover:text-white">
                  <Search className="w-4 h-4" />
                  <span className="text-xs tracking-[0.18em] uppercase font-light">
                    Search luxury furniture...
                  </span>
                </div>
                <span className="text-[10px] tracking-widest text-white/40 border border-white/20 px-2 py-0.5 rounded-xs">
                  FIND
                </span>
              </button>
            </div>

            {/* Nav Items List */}
            <nav className="space-y-3 pt-2">
              <span className="text-[10px] tracking-[0.28em] uppercase font-semibold text-white/40 block mb-2">
                CATALOGUE & SECTIONS
              </span>

              {navLinks.map((link, idx) => {
                const isExpanded = mobileExpandedMenu === link.name;
                return (
                  <div
                    key={link.name}
                    className="border-b border-white/10 pb-2.5 space-y-2"
                  >
                    <div className="flex items-center justify-between py-1">
                      {/* Direct Clickable Label navigating to link.href */}
                      <button
                        onClick={() => handleMobileNavigate(link.href)}
                        className="flex-1 text-left flex items-center space-x-2 group focus:outline-none"
                      >
                        <span className="text-base sm:text-lg font-light tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors">
                          {link.name}
                        </span>
                        {link.badge && (
                          <span className="px-1.5 py-0.5 text-[9px] bg-amber-400 text-black font-bold rounded-xs uppercase">
                            {link.badge}
                          </span>
                        )}
                      </button>

                      {/* Expandable Accordion Trigger for SHOP & LIFESTYLE */}
                      {link.hasMega ? (
                        <button
                          onClick={() => setMobileExpandedMenu(isExpanded ? null : link.name)}
                          className="p-2 border border-white/15 rounded-xs text-white/60 hover:text-white hover:border-white/40 transition-all ml-2"
                          title="Toggle Subcategories"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-amber-300" : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMobileNavigate(link.href)}
                          className="p-1 text-white/40 group-hover:text-white"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* EXPANDABLE ACCORDION FOR SHOP */}
                    {link.name === "SHOP" && isExpanded && (
                      <div className="pl-3 py-2 bg-white/5 border-l-2 border-amber-400 rounded-r-xs space-y-2 text-xs animate-fade-in">
                        <button
                          onClick={() => handleMobileNavigate("/shop")}
                          className="w-full text-left font-bold text-amber-300 py-1 hover:underline tracking-wider uppercase text-[11px]"
                        >
                          → VIEW ALL SHOP CATALOG
                        </button>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-white/80 font-light pt-1">
                          <button onClick={() => handleMobileNavigate("/shop?category=sofas-sectionals")} className="text-left py-1 hover:text-amber-200">
                            • Sofas & Sectionals
                          </button>
                          <button onClick={() => handleMobileNavigate("/shop?category=accent-chairs")} className="text-left py-1 hover:text-amber-200">
                            • Accent Chairs
                          </button>
                          <button onClick={() => handleMobileNavigate("/shop?category=coffee-tables")} className="text-left py-1 hover:text-amber-200">
                            • Coffee Tables
                          </button>
                          <button onClick={() => handleMobileNavigate("/shop?category=dining-tables")} className="text-left py-1 hover:text-amber-200">
                            • Dining Tables
                          </button>
                          <button onClick={() => handleMobileNavigate("/shop?category=beds-headboards")} className="text-left py-1 hover:text-amber-200">
                            • Beds & Bedroom
                          </button>
                          <button onClick={() => handleMobileNavigate("/shop?category=desks")} className="text-left py-1 hover:text-amber-200">
                            • Office Desks
                          </button>
                          <button onClick={() => handleMobileNavigate("/shop?category=floor-lamps")} className="text-left py-1 hover:text-amber-200">
                            • Floor Lamps
                          </button>
                          <button onClick={() => handleMobileNavigate("/shop?category=rugs")} className="text-left py-1 hover:text-amber-200">
                            • Rugs & Decor
                          </button>
                        </div>
                      </div>
                    )}

                    {/* EXPANDABLE ACCORDION FOR LIFESTYLE */}
                    {link.name === "LIFESTYLE" && isExpanded && (
                      <div className="pl-3 py-2 bg-white/5 border-l-2 border-amber-400 rounded-r-xs space-y-2 text-xs animate-fade-in">
                        <button
                          onClick={() => handleMobileNavigate("/lifestyle")}
                          className="w-full text-left font-bold text-amber-300 py-1 hover:underline tracking-wider uppercase text-[11px]"
                        >
                          → VIEW ALL LIFESTYLE JOURNAL
                        </button>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-white/80 font-light pt-1">
                          <button onClick={() => handleMobileNavigate("/lifestyle?section=inspiration")} className="text-left py-1 hover:text-amber-200">
                            • Interior Trends
                          </button>
                          <button onClick={() => handleMobileNavigate("/lifestyle?section=guides")} className="text-left py-1 hover:text-amber-200">
                            • Buying Guides
                          </button>
                          <button onClick={() => handleMobileNavigate("/lifestyle?section=stories")} className="text-left py-1 hover:text-amber-200">
                            • Designer Interviews
                          </button>
                          <button onClick={() => handleMobileNavigate("/lifestyle?section=resources")} className="text-left py-1 hover:text-amber-200">
                            • Lookbooks & Samples
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Mobile Tray Footer */}
          <div className="p-5 border-t border-white/10 bg-black space-y-4">
            <div className="flex items-center justify-between text-xs tracking-wider max-w-[900px] mx-auto">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleLanguageModal();
                  }}
                  className="flex items-center space-x-1.5 text-white/80 hover:text-white border border-white/20 px-2.5 py-1.5 rounded-xs"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="font-semibold text-xs">{language}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleCurrencyModal();
                  }}
                  className="flex items-center space-x-1.5 text-white/80 hover:text-white border border-white/20 px-2.5 py-1.5 rounded-xs"
                >
                  <span className="font-semibold text-xs">{currency}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {session?.user ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setUserTrayView("profile");
                    }}
                    className="text-[11px] tracking-wider uppercase text-white hover:underline"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setUserTrayView("orders");
                    }}
                    className="text-[11px] tracking-wider uppercase text-white hover:underline"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setUserTrayView("wishlist");
                    }}
                    className="text-[11px] tracking-wider uppercase text-amber-300 hover:underline"
                  >
                    My Wishlist
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="flex items-center space-x-2 text-white/80 hover:text-white border border-white/20 px-3 py-1.5 rounded-xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="text-xs tracking-widest uppercase">Member Login</span>
                </button>
              )}
            </div>

            <p className="text-[10px] text-center text-white/40 tracking-[0.2em] font-light">
              ROVE CONCEPTS © {new Date().getFullYear()} — REFINED LUXURY LIVING
            </p>
          </div>
        </div>
      )}
    </>
  );
};
