"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, ChevronRight, Sparkles, LogIn, ArrowRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const {
    openSearch,
    toggleCart,
    cartCount,
    currency,
    toggleCurrencyModal,
    activeNavHover,
    setActiveNavHover,
    openAuthModal,
    toggleUserTray,
    setUserTrayView,
  } = useUIStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { name: "SHOP", hasMega: true, subtitle: "Full Luxury Catalog" },
    { name: "SALE", badge: "NEW", subtitle: "Curated Offers", hasMega: false },
    { name: "LIFESTYLE", hasMega: true, subtitle: "Interior Inspiration" },
    { name: "DISCOVER", hasMega: false, subtitle: "Brand Philosophy" },
    { name: "SHOWROOM", hasMega: false, subtitle: "Visit Our Spaces" },
    { name: "OUTLET", hasMega: false, subtitle: "Exclusive Archival Pieces" },
  ];

  const handleUserClick = () => {
    if (session?.user) {
      toggleUserTray();
    } else {
      openAuthModal();
    }
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
        {/* ========================================================
            DESKTOP HEADER LAYOUT (hidden md:block)
            Large Desktop Width Constraint (max-width: 1600px)
           ======================================================== */}
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

            {/* Center: Brand Logo - Redirects to Home Page (/) */}
            <div className="text-center cursor-pointer">
              <Link href="/" className="inline-block group focus:outline-none" aria-label="Go to Home Page">
                <span className="text-2xl lg:text-3xl font-light tracking-[0.25em] text-shadow-nav">
                  <strong className="font-semibold tracking-[0.25em]">ROVE</strong>
                  <span className="font-extralight tracking-[0.28em] opacity-95">CONCEPTS</span>
                </span>
              </Link>
            </div>

            {/* Right: Currency, User Account, Shopping Bag */}
            <div className="flex items-center space-x-6">
              {/* Currency Switcher */}
              <button
                onClick={toggleCurrencyModal}
                className="flex items-center space-x-1 text-xs tracking-widest font-light hover:opacity-80 transition-opacity focus:outline-none text-shadow-nav"
              >
                <span className="font-medium text-xs tracking-wider">{currency}</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {/* User Account / Profile Icon */}
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

              {/* Cart Icon with badge count */}
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
                    href="/"
                    className="text-[12px] lg:text-[13px] tracking-[0.22em] font-normal text-white/90 hover:text-white transition-colors duration-200 uppercase text-shadow-nav block"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-white text-black font-semibold rounded-xs uppercase tracking-normal">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </nav>

          {/* ========================================================
              DESKTOP MEGA MENU DROPDOWNS (SHOP & LIFESTYLE)
             ======================================================== */}
          {activeNavHover === "SHOP" && (
            <div
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseLeaveNav}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/15 text-white py-10 px-8 lg:px-12 transition-all duration-300 shadow-2xl animate-fade-in z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 text-left">
                {/* 1. Living Room */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Living Room
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/product/luca-curved-sectional" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Sofas & Sectionals</Link></li>
                    <li><Link href="/product/aura-boucle-accent-chair" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Accent Chairs</Link></li>
                    <li><Link href="/product/kiyomi-dining-table" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Coffee Tables</Link></li>
                    <li><Link href="/product/winston-dining-table-48" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">TV Units & Consoles</Link></li>
                    <li><Link href="/product/dresden-sectional-sofa" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Ottomans & Benches</Link></li>
                  </ul>
                </div>

                {/* 2. Dining Room */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Dining Room
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/product/kiyomi-dining-table" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Dining Tables</Link></li>
                    <li><Link href="/product/angelo-dining-chair" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Dining Chairs</Link></li>
                    <li><Link href="/product/kiyomi-dining-table" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Sideboards</Link></li>
                    <li><Link href="/product/winston-dining-table-48" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Bar Stools</Link></li>
                    <li><Link href="/product/luca-curved-sectional" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Display Cabinets</Link></li>
                  </ul>
                </div>

                {/* 3. Bedroom */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Bedroom
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/product/luca-curved-sectional" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Beds & Headboards</Link></li>
                    <li><Link href="/product/aura-boucle-accent-chair" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Nightstands</Link></li>
                    <li><Link href="/product/winston-dining-table-48" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Dressers</Link></li>
                    <li><Link href="/product/kiyomi-dining-table" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Wardrobes</Link></li>
                    <li><Link href="/product/dresden-sectional-sofa" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Benches</Link></li>
                  </ul>
                </div>

                {/* 4. Office */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Office
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/product/kiyomi-dining-table" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Desks</Link></li>
                    <li><Link href="/product/angelo-dining-chair" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Office Chairs</Link></li>
                    <li><Link href="/product/winston-dining-table-48" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Bookcases</Link></li>
                    <li><Link href="/product/luca-curved-sectional" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Storage Cabinets</Link></li>
                    <li><Link href="/product/dresden-sectional-sofa" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Shelving</Link></li>
                  </ul>
                </div>

                {/* 5. Lighting */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Lighting
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/product/aura-boucle-accent-chair" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Floor Lamps</Link></li>
                    <li><Link href="/product/kiyomi-dining-table" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Table Lamps</Link></li>
                    <li><Link href="/product/winston-dining-table-48" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Pendant Lights</Link></li>
                    <li><Link href="/product/angelo-dining-chair" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Wall Lights</Link></li>
                    <li><Link href="/product/luca-curved-sectional" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Chandeliers</Link></li>
                  </ul>
                </div>

                {/* 6. Decor */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Decor
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/product/aura-boucle-accent-chair" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Mirrors</Link></li>
                    <li><Link href="/product/luca-curved-sectional" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Rugs</Link></li>
                    <li><Link href="/product/dresden-sectional-sofa" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Cushions</Link></li>
                    <li><Link href="/product/kiyomi-dining-table" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Vases</Link></li>
                    <li><Link href="/product/winston-dining-table-48" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Wall Art</Link></li>
                  </ul>
                </div>

                {/* 7. Featured Collection Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-xs border border-white/15 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[9px] tracking-[0.22em] uppercase font-semibold text-amber-300 block">
                      FEATURED COLLECTION
                    </span>
                    <h5 className="font-serif text-base font-normal mt-1 mb-2 text-white">
                      The Luca Curved Sofa
                    </h5>
                    <p className="text-[11px] text-white/70 font-light leading-relaxed">
                      Handcrafted with premium boucle fabric and solid hardwood frame.
                    </p>
                  </div>
                  <Link
                    href="/product/luca-curved-sectional"
                    onClick={() => setActiveNavHover(null)}
                    className="inline-flex items-center space-x-1.5 text-[10px] font-medium tracking-[0.2em] text-white uppercase hover:text-amber-200 transition-colors pt-2 border-t border-white/10"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeNavHover === "LIFESTYLE" && (
            <div
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseLeaveNav}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/15 text-white py-10 px-8 lg:px-12 transition-all duration-300 shadow-2xl animate-fade-in z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 text-left">
                {/* 1. Inspiration */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Inspiration
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Interior Trends</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Room Makeovers</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Design Inspiration</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Seasonal Collections</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Color Palettes</Link></li>
                  </ul>
                </div>

                {/* 2. Guides */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Guides
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Buying Guides</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Furniture Care</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Material Guide</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Size & Layout Guide</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Styling Tips</Link></li>
                  </ul>
                </div>

                {/* 3. Stories */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Stories
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Designer Interviews</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Customer Homes</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Behind the Craft</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Artisan Stories</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Brand Journal</Link></li>
                  </ul>
                </div>

                {/* 4. Resources */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Resources
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Lookbooks</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Room Planner</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Catalog Download</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Fabric Swatches</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Finish Samples</Link></li>
                  </ul>
                </div>

                {/* 5. Community */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase border-b border-white/10 pb-1.5">
                    Community
                  </h4>
                  <ul className="space-y-2 text-[11px] lg:text-xs tracking-wider font-light text-white/80">
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">New Arrivals</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Featured Spaces</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Events</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Collaborations</Link></li>
                    <li><Link href="/" onClick={() => setActiveNavHover(null)} className="hover:text-amber-200 transition-colors block py-0.5">Press</Link></li>
                  </ul>
                </div>

                {/* 6. Featured Story Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-xs border border-white/15 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[9px] tracking-[0.22em] uppercase font-semibold text-amber-300 block">
                      FEATURED STORY
                    </span>
                    <h5 className="font-serif text-base font-normal mt-1 mb-2 text-white">
                      Architectural Sanctuary
                    </h5>
                    <p className="text-[11px] text-white/70 font-light leading-relaxed">
                      Explore beautifully curated living spaces designed for timeless modern luxury.
                    </p>
                  </div>
                  <Link
                    href="/product/luca-curved-sectional"
                    onClick={() => setActiveNavHover(null)}
                    className="inline-flex items-center space-x-1.5 text-[10px] font-medium tracking-[0.2em] text-white uppercase hover:text-amber-200 transition-colors pt-2 border-t border-white/10"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            MOBILE HEADER BAR (block md:hidden)
           ======================================================== */}
        <div className="md:hidden px-4 py-3.5 flex items-center justify-between">
          {/* Mobile Logo Link to Home Page (/) */}
          <Link href="/" className="focus:outline-none" aria-label="Go to Home Page">
            <span className="text-lg font-light tracking-[0.2em] text-shadow-nav">
              <strong className="font-semibold tracking-[0.2em]">ROVE</strong>
              <span className="font-extralight tracking-[0.22em] opacity-95">CONCEPTS</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
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

      {/* ========================================================
          LUXURY MOBILE MENU TRAY OVERLAY
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col justify-between animate-mobile-tray overflow-y-auto h-[100dvh] w-full">
          <div className="px-5 py-4 flex items-center justify-between border-b border-white/15 bg-zinc-900 sticky top-0 z-20">
            {/* Logo inside tray linking to Home Page (/) */}
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

          <div className="px-5 py-6 flex-1 space-y-6 max-w-[900px] mx-auto w-full">
            <div
              className="animate-link-stagger"
              style={{ animationDelay: "0.05s" }}
            >
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

            <nav className="space-y-3 pt-2">
              <span className="text-[10px] tracking-[0.28em] uppercase font-semibold text-white/40 block mb-2">
                CATALOGUE & SECTIONS
              </span>

              {navLinks.map((link, idx) => (
                <div
                  key={link.name}
                  className="animate-link-stagger border-b border-white/10 pb-2.5"
                  style={{ animationDelay: `${0.08 + idx * 0.04}s` }}
                >
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between group py-1"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-base sm:text-lg font-light tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors">
                          {link.name}
                        </span>
                        {link.badge && (
                          <span className="px-1.5 py-0.5 text-[9px] bg-white text-black font-semibold rounded-xs uppercase">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-white/50 font-extralight tracking-wider block">
                        {link.subtitle}
                      </span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              ))}
            </nav>

            <div
              className="animate-link-stagger bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-sm border border-white/15 flex items-center space-x-3"
              style={{ animationDelay: "0.38s" }}
            >
              <Sparkles className="w-5 h-5 text-amber-200 shrink-0" />
              <div>
                <h5 className="text-xs font-medium tracking-wider text-white">
                  Virtual Concierge Styling
                </h5>
                <p className="text-[11px] text-white/60 font-light mt-0.5">
                  Book a 1-on-1 interior design consultation.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-white/10 bg-black space-y-4">
            <div className="flex items-center justify-between text-xs tracking-wider max-w-[900px] mx-auto">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  toggleCurrencyModal();
                }}
                className="flex items-center space-x-2 text-white/80 hover:text-white border border-white/20 px-3 py-1.5 rounded-xs"
              >
                <span className="text-[10px] text-white/50 uppercase">Region:</span>
                <span className="font-semibold text-xs">{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

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
