"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Calendar,
  Sparkles,
  X,
  CheckCircle2,
  Coffee,
  Navigation,
  Check,
} from "lucide-react";
import { showroomsData, Showroom } from "@/data/showrooms";

export const citiesList = ["All Locations", "Tokyo", "London", "New York", "Los Angeles", "Mumbai"];

export const ShowroomCatalogView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState("All Locations");
  const [selectedShowroomModal, setSelectedShowroomModal] = useState<Showroom | null>(null);

  // Private Tour Booking Form State
  const [tourForm, setTourForm] = useState({
    name: "",
    email: "",
    date: "",
    guests: "2 Guests",
    beverage: "Vintage Champagne",
  });
  const [tourSuccess, setTourSuccess] = useState(false);

  const filteredShowrooms = useMemo(() => {
    if (selectedCity === "All Locations") return showroomsData;
    return showroomsData.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());
  }, [selectedCity]);

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tourForm.name && tourForm.email) {
      setTourSuccess(true);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-6 pb-20 text-white space-y-12">
      {/* ========================================================
          PAGE HEADER BANNER
         ======================================================== */}
      <div className="border-b border-white/10 pb-8 pt-4 space-y-4">
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] font-semibold text-white/50 uppercase">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Global Showroom Spaces</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-wide">
              Global Architectural Flagships
            </h1>
            <p className="text-xs sm:text-sm text-white/60 font-light tracking-wide max-w-2xl">
              Experience Rove Concepts in person. Explore architectural spaces in Tokyo, London, New York, Los Angeles, and Mumbai.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center flex-wrap gap-2">
            {citiesList.map((city) => {
              const isActive = selectedCity === city;
              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-xs transition-colors border ${
                    isActive
                      ? "bg-white text-black border-white shadow-md"
                      : "bg-zinc-900 text-white/70 border-white/15 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          SHOWROOM CARDS GRID
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredShowrooms.map((showroom) => (
          <div
            key={showroom.id}
            className="bg-zinc-950 border border-white/10 hover:border-white/30 rounded-xs overflow-hidden transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4 p-4">
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 rounded-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={showroom.image}
                  alt={showroom.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <span className="absolute top-3 left-3 bg-black/80 font-mono text-[10px] font-bold text-amber-300 px-2.5 py-1 uppercase border border-amber-400/30">
                  {showroom.city} FLAGSHIP
                </span>
              </div>

              {/* Showroom Details */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-serif font-normal text-white group-hover:text-amber-200 transition-colors">
                    {showroom.name}
                  </h3>
                  <p className="text-xs text-white/60 font-light mt-1 leading-relaxed">
                    {showroom.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-white/70 font-light border-t border-white/10">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>{showroom.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{showroom.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{showroom.phone}</span>
                  </div>
                </div>

                {/* Featured Display Collection Tags */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase block">
                    ON DISPLAY:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {showroom.featuredCollections.map((col, idx) => (
                      <span
                        key={idx}
                        className="bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-white/70 font-mono rounded-xs"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/40">{showroom.mapCoordinates}</span>
              <button
                onClick={() => {
                  setSelectedShowroomModal(showroom);
                  setTourSuccess(false);
                }}
                className="bg-white text-black px-4 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-amber-300 transition-colors"
              >
                BOOK PRIVATE TOUR →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================
          PRIVATE SHOWROOM TOUR BOOKING MODAL
         ======================================================== */}
      {selectedShowroomModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-white/20 max-w-xl w-full rounded-sm text-white overflow-hidden shadow-2xl animate-fade-in my-8 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
                  PRIVATE VIP CONCIERGE TOUR
                </span>
                <h3 className="text-xl font-serif text-white">{selectedShowroomModal.name}</h3>
              </div>
              <button
                onClick={() => setSelectedShowroomModal(null)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {tourSuccess ? (
              <div className="bg-amber-400/10 border border-amber-400/40 p-6 rounded-xs space-y-2 text-center animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-amber-300 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Private Tour Reserved!</h4>
                <p className="text-xs text-white/70 font-light">
                  Our {selectedShowroomModal.city} concierge has reserved your VIP session for <strong className="text-white">{tourForm.date}</strong> with complimentary <strong className="text-amber-300">{tourForm.beverage}</strong>. Confirmation details sent to <strong className="text-white">{tourForm.email}</strong>.
                </p>
                <button
                  onClick={() => setSelectedShowroomModal(null)}
                  className="mt-4 bg-white text-black font-semibold text-xs px-6 py-2.5 uppercase tracking-widest"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <form onSubmit={handleTourSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-white/60">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={tourForm.name}
                    onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-white/60">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={tourForm.email}
                    onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-white/60">DATE OF VISIT</label>
                    <input
                      type="date"
                      required
                      value={tourForm.date}
                      onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                      className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-white/60">PARTY SIZE</label>
                    <select
                      value={tourForm.guests}
                      onChange={(e) => setTourForm({ ...tourForm, guests: e.target.value })}
                      className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3-5 Guests">3-5 Guests</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-white/60">COMPLIMENTARY CONCIERGE BEVERAGE</label>
                  <select
                    value={tourForm.beverage}
                    onChange={(e) => setTourForm({ ...tourForm, beverage: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Vintage Champagne">Vintage Champagne</option>
                    <option value="Italian Espresso">Italian Espresso</option>
                    <option value="Japanese Organic Matcha">Japanese Organic Matcha</option>
                    <option value="Sparkling Artisan Water">Sparkling Artisan Water</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-400 text-black font-bold text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-amber-300 transition-colors rounded-xs shadow-lg mt-2"
                >
                  CONFIRM VIP SHOWROOM RESERVATION
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
