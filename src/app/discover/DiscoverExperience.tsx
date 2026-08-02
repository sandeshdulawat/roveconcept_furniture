"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Palette,
  Sun,
  Moon,
  Sunset,
  Layers,
  Compass,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const materialsData = [
  {
    id: "boucle",
    name: "Italian Textured Bouclé",
    hex: "#F3EFEA",
    texture: "Plush, tactile 600g/m² looped yarn woven in Como, Italy.",
    previewImg: "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?q=80&w=600&auto=format&fit=crop",
    harmonyBoost: 25,
  },
  {
    id: "travertine",
    name: "Roman Unfilled Travertine",
    hex: "#D6C7B2",
    texture: "Honed natural stone hand-carved in Tivoli quarries.",
    previewImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    harmonyBoost: 30,
  },
  {
    id: "smoked-oak",
    name: "Smoked American White Oak",
    hex: "#5C4A3A",
    texture: "FSC® certified timber cured with natural organic oils.",
    previewImg: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=600&auto=format&fit=crop",
    harmonyBoost: 20,
  },
  {
    id: "cognac-leather",
    name: "Top-Grain Cognac Leather",
    hex: "#8F4E24",
    texture: "Aniline leather that develops a rich, supple patina over time.",
    previewImg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    harmonyBoost: 15,
  },
  {
    id: "brushed-brass",
    name: "Brushed Champagne Brass",
    hex: "#D4AF37",
    texture: "Solid brass accents finished with a protective satin lacquer.",
    previewImg: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80",
    harmonyBoost: 10,
  },
];

export const storyChapters = [
  {
    num: "01",
    title: "Sourcing Tivoli Travertine",
    location: "Tivoli, Italy",
    desc: "Every slab of stone is hand-selected directly from historic Italian quarries, chosen for its unique porous veining and tactile warmth.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "02",
    title: "Architectural Precision Curves",
    location: "Atelier Woodshop",
    desc: "Kiln-dried hardwood frames are CNC-milled and steam-bent into fluid, seamless architectural profiles built to last generations.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "03",
    title: "Tactile Italian Weaving",
    location: "Lombardy Mills",
    desc: "Our signature high-density bouclé fabric is woven on traditional looms, combining natural wool fibers for unparalleled softness.",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&auto=format&fit=crop&q=60",
  },
];

export const DiscoverExperience: React.FC = () => {
  // Moodboard Synthesizer State
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(["boucle", "travertine"]);
  const [activeLighting, setActiveLighting] = useState<"daylight" | "sunset" | "midnight">("sunset");

  // Silhouette Visualizer State
  const [activeSilhouette, setActiveSilhouette] = useState<"curved" | "geometric">("curved");

  // Consultation Booking State
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    date: "",
    style: "Warm Minimalist",
  });

  const toggleMaterial = (id: string) => {
    if (selectedMaterials.includes(id)) {
      if (selectedMaterials.length > 1) {
        setSelectedMaterials(selectedMaterials.filter((m) => m !== id));
      }
    } else {
      if (selectedMaterials.length < 3) {
        setSelectedMaterials([...selectedMaterials, id]);
      }
    }
  };

  // Calculate dynamic harmony score
  const harmonyScore = useMemo(() => {
    const base = 65;
    const added = selectedMaterials.reduce((acc, id) => {
      const found = materialsData.find((m) => m.id === id);
      return acc + (found ? found.harmonyBoost : 0);
    }, 0);
    return Math.min(100, base + added);
  }, [selectedMaterials]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingForm.name && bookingForm.email) {
      setBookedSuccess(true);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-6 pb-24 text-white space-y-24">
      {/* ========================================================
          1. EXPERIENTIAL ATELIER HERO BANNER
         ======================================================== */}
      <section className="relative rounded-xs overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-white/15 p-8 sm:p-16 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[11px] font-semibold tracking-[0.25em] text-amber-300 uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>ROVE DESIGN ATELIER · INTERACTIVE DISCOVERY</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-wide max-w-4xl mx-auto leading-tight">
          Where Architectural Form Meets Tactile Harmony
        </h1>

        <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
          Step inside our interactive design atelier. Synthesize raw material swatches, explore architectural profiles, and experience the journey of form and craft.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-6 text-xs font-mono text-white/50 uppercase tracking-widest">
          <span>01 Synthesize Swatches</span>
          <span>•</span>
          <span>02 Craft Journey</span>
          <span>•</span>
          <span>03 Silhouette Studio</span>
        </div>
      </section>

      {/* ========================================================
          2. INTERACTIVE MATERIAL & LIGHTING SYNTHESIZER
         ======================================================== */}
      <section className="space-y-8">
        <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase block">
              INTERACTIVE STUDIO 01
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light">
              Material Swatch & Room Synthesizer
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
              Select up to 3 raw material textures and toggle ambient room lighting to test design synergy.
            </p>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex items-center space-x-2 bg-zinc-900 border border-white/15 p-1 rounded-xs">
            <button
              onClick={() => setActiveLighting("daylight")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xs text-xs font-medium transition-colors ${
                activeLighting === "daylight" ? "bg-white text-black font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Daylight</span>
            </button>
            <button
              onClick={() => setActiveLighting("sunset")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xs text-xs font-medium transition-colors ${
                activeLighting === "sunset" ? "bg-amber-400 text-black font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
              <span>Golden Sunset</span>
            </button>
            <button
              onClick={() => setActiveLighting("midnight")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xs text-xs font-medium transition-colors ${
                activeLighting === "midnight" ? "bg-indigo-600 text-white font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Midnight</span>
            </button>
          </div>
        </div>

        {/* Synthesizer Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Swatch Selection Palette (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
              SELECT MATERIAL COMBINATION (MAX 3)
            </h3>

            <div className="space-y-3">
              {materialsData.map((material) => {
                const isSelected = selectedMaterials.includes(material.id);
                return (
                  <div
                    key={material.id}
                    onClick={() => toggleMaterial(material.id)}
                    className={`p-4 rounded-xs border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? "bg-zinc-900 border-amber-400/80 shadow-lg"
                        : "bg-zinc-950/60 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span
                        className="w-8 h-8 rounded-full border border-white/20 shrink-0 shadow-inner"
                        style={{ backgroundColor: material.hex }}
                      />
                      <div>
                        <h4 className="text-sm font-medium text-white">{material.name}</h4>
                        <p className="text-[11px] text-white/60 font-light mt-0.5 line-clamp-1">
                          {material.texture}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">ADD</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Canvas Visualizer (7 Cols) */}
          <div
            className={`lg:col-span-7 rounded-xs border border-white/15 p-8 flex flex-col justify-between space-y-8 transition-all duration-700 relative overflow-hidden ${
              activeLighting === "daylight"
                ? "bg-gradient-to-br from-stone-900 via-zinc-950 to-zinc-900"
                : activeLighting === "sunset"
                ? "bg-gradient-to-br from-amber-950/40 via-zinc-950 to-black border-amber-500/20"
                : "bg-gradient-to-br from-slate-950 via-zinc-950 to-black border-indigo-500/20"
            }`}
          >
            {/* Header Status */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono tracking-widest text-white/60 uppercase flex items-center space-x-2">
                <Palette className="w-4 h-4 text-amber-300" />
                <span>LIVE ROOM CANVAS · {activeLighting.toUpperCase()} MODE</span>
              </span>

              {/* Dynamic Synergy Gauge */}
              <div className="flex items-center space-x-2 bg-black/80 px-3 py-1.5 rounded-full border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs font-mono font-bold text-amber-300">
                  HARMONY SCORE: {harmonyScore}%
                </span>
              </div>
            </div>

            {/* Live Material Swatch Composition Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 z-10 py-6">
              {selectedMaterials.map((matId) => {
                const mat = materialsData.find((m) => m.id === matId)!;
                return (
                  <div
                    key={mat.id}
                    className="bg-black/60 backdrop-blur-md p-4 rounded-xs border border-white/15 space-y-3 group hover:border-amber-400 transition-colors"
                  >
                    <div className="aspect-[4/3] rounded-xs overflow-hidden bg-zinc-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mat.previewImg}
                        alt={mat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-amber-300 tracking-widest uppercase font-semibold block">
                        ACTIVE SWATCH
                      </span>
                      <h5 className="text-xs font-medium text-white line-clamp-1">{mat.name}</h5>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Synthesizer Verdict */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between z-10">
              <p className="text-xs text-white/70 font-light">
                This material palette balances organic warmth with structural architectural elegance.
              </p>
              <Link
                href="/shop"
                className="bg-white text-black px-4 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-amber-300 transition-colors shrink-0"
              >
                EXPLORE MATCHING PIECES →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. STORY CHAPTER TIMELINE ("GENESIS OF FORM")
         ======================================================== */}
      <section className="space-y-8">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase block">
            STORY JOURNEY 02
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light">
            The Genesis of Form & Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {storyChapters.map((chapter) => (
            <div
              key={chapter.num}
              className="bg-zinc-950 border border-white/10 hover:border-white/30 rounded-xs overflow-hidden transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4 p-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 rounded-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 font-mono text-[10px] font-bold text-amber-300 px-2.5 py-1 uppercase border border-amber-400/30">
                    CHAPTER {chapter.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase block">
                    {chapter.location}
                  </span>
                  <h3 className="text-lg font-serif font-normal text-white group-hover:text-amber-200 transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {chapter.desc}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-white/10 bg-black/40 text-[10px] font-mono text-white/40 flex items-center justify-between">
                <span>AUTHENTIC ORIGIN</span>
                <span className="text-white group-hover:text-amber-200 font-sans font-semibold tracking-widest">
                  LEARN MORE →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. ARCHITECTURAL SILHOUETTE COMPARATOR
         ======================================================== */}
      <section className="space-y-8">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase block">
            SILHOUETTE STUDIO 03
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light">
            Architectural Profile Visualizer
          </h2>
        </div>

        <div className="bg-zinc-950 border border-white/15 p-8 rounded-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-serif text-white">Compare Design Geometries</h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Toggle between organic fluid curves and geometric linear profiles to discover the optimal seating proportion for your floor plan.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setActiveSilhouette("curved")}
                className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-xs transition-all ${
                  activeSilhouette === "curved"
                    ? "bg-amber-400 text-black shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                ORGANIC CURVED PROFILE
              </button>
              <button
                onClick={() => setActiveSilhouette("geometric")}
                className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-xs transition-all ${
                  activeSilhouette === "geometric"
                    ? "bg-amber-400 text-black shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                GEOMETRIC LINEAR PROFILE
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs font-mono text-white/70 border-t border-white/10">
              <div className="flex justify-between">
                <span>SEAT DEPTH COMFORT:</span>
                <span className="text-amber-300 font-bold">
                  {activeSilhouette === "curved" ? '24" Deep Sink-In' : '20" Upright Structural'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ROOM FLOW INDEX:</span>
                <span className="text-amber-300 font-bold">
                  {activeSilhouette === "curved" ? "98% Fluid Circulation" : "90% Structured Axis"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-black p-8 rounded-xs border border-white/10 flex flex-col items-center justify-center space-y-4">
            <div className="w-full aspect-[16/9] rounded-xs overflow-hidden bg-zinc-900 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  activeSilhouette === "curved"
                    ? "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?q=80&w=1200&auto=format&fit=crop"
                    : "https://images.unsplash.com/photo-1519961655809-34fa156820ff?q=80&w=1200&auto=format&fit=crop"
                }
                alt="Silhouette Comparison"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <span className="absolute top-4 left-4 bg-black/80 text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-white/20">
                {activeSilhouette === "curved" ? "Curved Organic Silhouette" : "Linear Geometric Profile"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. VIRTUAL ATELIER CONSULTATION SCHEDULER
         ======================================================== */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/15 p-8 sm:p-12 rounded-xs">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase block">
            CONCIERGE STYLING 04
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-white">
            Book a 1-on-1 Virtual Atelier Consultation
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Collaborate directly with our senior interior designers to curate floor plans, custom fabric selections, and spatial lighting.
          </p>

          {bookedSuccess ? (
            <div className="bg-amber-400/10 border border-amber-400/40 p-6 rounded-xs space-y-2 text-center animate-fade-in">
              <ShieldCheck className="w-8 h-8 text-amber-300 mx-auto" />
              <h4 className="text-sm font-semibold text-white">Consultation Reserved Successfully!</h4>
              <p className="text-xs text-white/70 font-light">
                Our interior atelier concierge will send your meeting confirmation link to <strong className="text-white">{bookingForm.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 text-left pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="bg-black border border-white/20 px-4 py-3 text-xs text-white placeholder-white/40 rounded-xs focus:outline-none focus:border-amber-400"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="bg-black border border-white/20 px-4 py-3 text-xs text-white placeholder-white/40 rounded-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  required
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="bg-black border border-white/20 px-4 py-3 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                />
                <select
                  value={bookingForm.style}
                  onChange={(e) => setBookingForm({ ...bookingForm, style: e.target.value })}
                  className="bg-black border border-white/20 px-4 py-3 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Warm Minimalist">Warm Organic Minimalist</option>
                  <option value="Brutalism">Architectural Brutalism</option>
                  <option value="Japandi Luxury">Japandi Luxury</option>
                  <option value="Modern Classic">Modern Classic</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 text-black font-bold text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-amber-300 transition-colors rounded-xs shadow-lg"
              >
                RESERVE VIRTUAL CONSULTATION
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
