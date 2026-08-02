"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  BookOpen,
  Sparkles,
  SlidersHorizontal,
  X,
  Clock,
  User,
  Calendar,
  Check,
  ArrowRight,
  RotateCcw,
  Share2,
} from "lucide-react";
import { lifestyleArticles, LifestyleArticle } from "@/data/lifestyle";

export const sectionsList = [
  { label: "All Editorial Journal", slug: "all" },
  { label: "Inspiration", slug: "inspiration" },
  { label: "Guides & Styling", slug: "guides" },
  { label: "Designer Stories", slug: "stories" },
  { label: "Resources & Lookbooks", slug: "resources" },
  { label: "Community & Spaces", slug: "community" },
];

export const topicsList = [
  "All Topics",
  "Interior Trends",
  "Room Makeovers",
  "Color Palettes",
  "Buying Guides",
  "Furniture Care",
  "Size & Layout Guide",
  "Behind the Craft",
  "Designer Interviews",
  "Lookbooks",
  "Customer Homes",
  "Featured Spaces",
];

export const LifestyleCatalogView: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sectionParam = searchParams.get("section") || "all";
  const topicParam = searchParams.get("topic") || "All Topics";
  const articleParam = searchParams.get("article") || "";

  const [selectedSection, setSelectedSection] = useState(sectionParam);
  const [selectedTopic, setSelectedTopic] = useState(topicParam);
  const [activeArticleModal, setActiveArticleModal] = useState<LifestyleArticle | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    if (sectionParam) setSelectedSection(sectionParam);
    if (topicParam) setSelectedTopic(topicParam);

    if (articleParam) {
      const found = lifestyleArticles.find((a) => a.id === articleParam);
      if (found) setActiveArticleModal(found);
    }
  }, [sectionParam, topicParam, articleParam]);

  const updateUrlParams = (newSection: string, newTopic: string) => {
    const params = new URLSearchParams();
    if (newSection && newSection !== "all") params.set("section", newSection);
    if (newTopic && newTopic !== "All Topics") params.set("topic", newTopic);

    const queryString = params.toString();
    router.push(`/lifestyle${queryString ? `?${queryString}` : ""}`);
  };

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return lifestyleArticles.filter((article) => {
      // Section Filter
      if (selectedSection !== "all" && article.section !== selectedSection) {
        return false;
      }
      // Topic Filter
      if (selectedTopic !== "All Topics" && article.topic.toLowerCase() !== selectedTopic.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [selectedSection, selectedTopic]);

  const featuredArticle = useMemo(() => {
    return lifestyleArticles.find((a) => a.featured) || lifestyleArticles[0];
  }, []);

  const activeSectionObj = sectionsList.find((s) => s.slug === selectedSection);
  const pageTitle = activeSectionObj ? activeSectionObj.label : "Lifestyle & Design Journal";

  const clearAllFilters = () => {
    setSelectedSection("all");
    setSelectedTopic("All Topics");
    router.push("/lifestyle");
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
          <Link href="/lifestyle" className="hover:text-white transition-colors">Lifestyle Journal</Link>
          {selectedSection !== "all" && (
            <>
              <span>/</span>
              <span className="text-white">{pageTitle}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-wide">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-white/60 font-light tracking-wide">
              Curated architectural stories, interior styling guides, and artisan journals.
            </p>
          </div>

          {/* Mobile Filter Drawer Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 rounded-xs text-xs font-semibold tracking-wider uppercase text-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>FILTER TOPICS ({filteredArticles.length})</span>
          </button>
        </div>

        {/* Active Filter Chips */}
        {(selectedSection !== "all" || selectedTopic !== "All Topics") && (
          <div className="flex items-center flex-wrap gap-2 pt-3">
            <span className="text-[10px] text-white/40 tracking-wider uppercase font-mono">Active Filters:</span>
            {selectedSection !== "all" && (
              <span className="inline-flex items-center space-x-1.5 bg-white/10 text-white px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-widest border border-white/15">
                <span>Section: {pageTitle}</span>
                <button onClick={() => { setSelectedSection("all"); updateUrlParams("all", selectedTopic); }} className="hover:text-amber-300">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedTopic !== "All Topics" && (
              <span className="inline-flex items-center space-x-1.5 bg-white/10 text-white px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-widest border border-white/15">
                <span>Topic: {selectedTopic}</span>
                <button onClick={() => { setSelectedTopic("All Topics"); updateUrlParams(selectedSection, "All Topics"); }} className="hover:text-amber-300">
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
          FEATURED HERO JOURNAL BANNER (When All or Stories selected)
         ======================================================== */}
      {(selectedSection === "all" || selectedSection === "stories") && selectedTopic === "All Topics" && (
        <div
          onClick={() => setActiveArticleModal(featuredArticle)}
          className="my-8 relative group rounded-xs overflow-hidden border border-white/15 cursor-pointer bg-zinc-950"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto overflow-hidden bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black">
              <div className="space-y-3">
                <span className="inline-flex items-center space-x-2 text-[10px] font-semibold tracking-[0.25em] text-amber-300 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>FEATURED EDITORIAL</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-white leading-tight group-hover:text-amber-200 transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-[11px] text-white/50 font-mono">
                  <span>{featuredArticle.author}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <span className="inline-flex items-center space-x-1.5 text-xs font-semibold tracking-widest uppercase text-white group-hover:text-amber-200">
                  <span>READ STORY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN LIFESTYLE GRID LAYOUT (Sticky Sidebar + Articles Grid)
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
        {/* DESKTOP STICKY SIDEBAR FILTERS (3 Cols) - Custom Dark Scrollbar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4 border-r border-white/10 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto dark-scrollbar">
          {/* Sections List */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase border-b border-white/10 pb-2">
              EDITORIAL SECTION
            </h3>
            <ul className="space-y-1.5 text-xs text-white/70">
              {sectionsList.map((sec) => {
                const isActive = selectedSection === sec.slug;
                return (
                  <li key={sec.slug}>
                    <button
                      onClick={() => {
                        setSelectedSection(sec.slug);
                        updateUrlParams(sec.slug, selectedTopic);
                      }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-xs transition-colors flex items-center justify-between font-light tracking-wide ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-sm"
                          : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{sec.label}</span>
                      {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Topics List */}
          <div className="space-y-3 pb-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase border-b border-white/10 pb-2">
              SUB-TOPIC
            </h3>
            <ul className="space-y-1.5 text-xs text-white/70">
              {topicsList.map((topic) => {
                const isActive = selectedTopic === topic;
                return (
                  <li key={topic}>
                    <button
                      onClick={() => {
                        setSelectedTopic(topic);
                        updateUrlParams(selectedSection, topic);
                      }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-xs transition-colors flex items-center justify-between font-light tracking-wide ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-sm"
                          : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{topic}</span>
                      {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* ARTICLES GRID (9 Cols) */}
        <main className="lg:col-span-9">
          {filteredArticles.length === 0 ? (
            <div className="bg-zinc-950 border border-white/15 p-12 text-center rounded-sm space-y-4 max-w-md mx-auto my-12">
              <BookOpen className="w-8 h-8 text-amber-300 mx-auto" />
              <h3 className="text-lg font-medium text-white">No Articles Found</h3>
              <p className="text-xs text-white/60 font-light">
                Try selecting another editorial section or resetting topic filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-block bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase px-6 py-3 hover:bg-zinc-200 transition-colors"
              >
                VIEW ALL JOURNAL STORIES
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setActiveArticleModal(article)}
                  className="group cursor-pointer bg-zinc-950/80 border border-white/10 hover:border-white/30 rounded-xs overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3 p-3">
                    {/* Image Wrapper */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 rounded-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-semibold tracking-widest text-white uppercase border border-white/15">
                        {article.topic}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center space-x-2 text-[10px] text-white/50 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-base font-serif font-normal text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs text-white/60 font-light line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-3 border-t border-white/10 flex items-center justify-between bg-black/40 text-[10px] font-mono text-white/50">
                    <span>{article.author}</span>
                    <span className="text-white group-hover:text-amber-200 flex items-center space-x-1 font-sans font-semibold tracking-widest uppercase">
                      <span>READ</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ========================================================
          ARTICLE READER MODAL
         ======================================================== */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-white/20 max-w-3xl w-full rounded-sm text-white overflow-hidden shadow-2xl animate-fade-in my-8">
            {/* Header Image */}
            <div className="relative aspect-[16/9] bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeArticleModal.image}
                alt={activeArticleModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-semibold tracking-widest text-amber-300 uppercase border border-amber-400/30">
                {activeArticleModal.topic}
              </span>
            </div>

            {/* Article Body */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="space-y-2 border-b border-white/10 pb-6">
                <div className="flex items-center space-x-4 text-xs font-mono text-white/50">
                  <span className="flex items-center space-x-1"><User className="w-3.5 h-3.5" /> <span>{activeArticleModal.author}</span></span>
                  <span>•</span>
                  <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /> <span>{activeArticleModal.date}</span></span>
                  <span>•</span>
                  <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /> <span>{activeArticleModal.readTime}</span></span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-light text-white">
                  {activeArticleModal.title}
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-white/80 font-light leading-relaxed">
                {activeArticleModal.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <button
                  onClick={() => setActiveArticleModal(null)}
                  className="bg-white text-black font-semibold px-6 py-2.5 tracking-widest uppercase text-xs hover:bg-zinc-200 transition-colors"
                >
                  CLOSE JOURNAL
                </button>
                <button
                  onClick={() => alert("Story link copied to clipboard!")}
                  className="flex items-center space-x-1.5 hover:text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>SHARE STORY</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="bg-zinc-950 border-l border-white/20 w-full max-w-sm h-full p-6 text-white overflow-y-auto space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase">FILTER JOURNAL</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Sections */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white/60">EDITORIAL SECTION</h4>
              <div className="space-y-1">
                {sectionsList.map((sec) => (
                  <button
                    key={sec.slug}
                    onClick={() => {
                      setSelectedSection(sec.slug);
                      updateUrlParams(sec.slug, selectedTopic);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left py-2 px-3 text-xs rounded-xs ${
                      selectedSection === sec.slug ? "bg-white text-black font-semibold" : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase mt-4"
            >
              SHOW STORIES ({filteredArticles.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
