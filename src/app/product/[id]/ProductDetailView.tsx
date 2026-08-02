"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Truck,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
  Building2,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Star,
  MessageSquarePlus,
  X,
  ThumbsUp,
  Heart,
} from "lucide-react";
import { Product, productsData } from "@/data/products";
import { useUIStore } from "@/store/useUIStore";

interface ProductDetailViewProps {
  product: Product;
}

interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  likes: number;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    author: "Elena Rostova",
    location: "Tokyo, Japan",
    rating: 5,
    date: "July 24, 2026",
    title: "Absolute architectural showstopper",
    comment:
      "The bouclé fabric texture is exquisite and white-glove delivery was seamless. The deep seating geometry fits our living space naturally.",
    verified: true,
    likes: 14,
  },
  {
    id: "r2",
    author: "Marcus Vance",
    location: "London, UK",
    rating: 5,
    date: "June 18, 2026",
    title: "Stunning craftsmanship & solid hardwood frame",
    comment:
      "Extremely sturdy construction. The finish and joinery exceed expectation. White glove delivery team assembled everything perfectly.",
    verified: true,
    likes: 9,
  },
  {
    id: "r3",
    author: "Aria Takahashi",
    location: "New York, USA",
    rating: 5,
    date: "May 12, 2026",
    title: "Minimalist Japandi elegance",
    comment:
      "Subtle curved curves and premium cushioning fill. Everyone who enters our loft asks where we got this piece.",
    verified: true,
    likes: 21,
  },
];

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const router = useRouter();
  const { addItemToCart, toggleWishlistItem, isInWishlist } = useUIStore();
  const isFav = isInWishlist(product.id);

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");

  // Delivery Pincode state
  const [pincode, setPincode] = useState("400001");
  const [deliveryResult, setDeliveryResult] = useState<{
    days: number;
    formattedDate: string;
    seller: string;
    checkedCode: string;
  } | null>(null);
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);

  // Reviews State & Modal
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: "",
    title: "",
    comment: "",
    rating: 5,
  });

  // Similar Products Calculation
  const similarProducts = useMemo(() => {
    const sameCategory = productsData.filter(
      (p) => p.id !== product.id && p.categorySlug === product.categorySlug
    );
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);
    const fallback = productsData.filter((p) => p.id !== product.id);
    return fallback.slice(0, 3);
  }, [product]);

  // Handle Pincode Delivery Check
  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) return;

    setIsCheckingDelivery(true);

    setTimeout(() => {
      const days = Math.floor(Math.random() * 4) + 4; // 4 to 7 days
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + days);

      const formattedDate = deliveryDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      setDeliveryResult({
        days,
        formattedDate,
        seller: product.seller || "Mumbai Warehouse",
        checkedCode: pincode.trim(),
      });
      setIsCheckingDelivery(false);
    }, 400);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.comment) return;

    const created: ReviewItem = {
      id: `r-${Date.now()}`,
      author: newReview.author,
      location: "Verified Buyer",
      rating: newReview.rating,
      date: "Just Now",
      title: newReview.title,
      comment: newReview.comment,
      verified: true,
      likes: 0,
    };

    setReviews([created, ...reviews]);
    setIsReviewModalOpen(false);
    setNewReview({ author: "", title: "", comment: "", rating: 5 });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-16 pb-20">
      {/* ========================================================
          TOP NAVIGATION BAR & BACK BUTTON
         ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white text-white hover:text-black px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO CATALOG</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-white/50 font-light tracking-wider">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-white transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* PRODUCT DETAIL HERO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xs bg-zinc-900 border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-semibold tracking-widest uppercase border border-white/10">
              {product.tag}
            </span>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 shrink-0 rounded-xs border-2 overflow-hidden transition-all ${
                    selectedImage === img
                      ? "border-white scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} preview ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Info & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-white/50 uppercase">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-light text-white tracking-wide">
              {product.name}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-wide text-amber-300 pt-1">
              {product.price}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 border-t border-b border-white/10 py-4">
              <label className="text-xs tracking-wider uppercase text-white/70 font-medium block">
                Finish / Color: <strong className="text-white">{selectedColor}</strong>
              </label>
              <div className="flex space-x-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all focus:outline-none ${
                      selectedColor === c.name ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    title={c.name}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add To Cart & Wishlist Heart CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                addItemToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  numericPrice: product.numericPrice,
                  image: selectedImage || product.images[0],
                  selectedColor,
                })
              }
              className="flex-1 py-4 bg-amber-400 text-black text-xs font-bold tracking-[0.22em] uppercase hover:bg-amber-300 transition-all shadow-xl flex items-center justify-center space-x-2 rounded-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO SHOPPING BAG</span>
            </button>

            <button
              onClick={() => toggleWishlistItem(product)}
              className={`p-4 border rounded-xs transition-colors focus:outline-none ${
                isFav
                  ? "bg-red-500/20 border-red-500 text-red-400"
                  : "bg-zinc-900 border-white/20 text-white hover:border-white"
              }`}
              title={isFav ? "Remove from Wishlist" : "Save to Wishlist"}
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-red-400 text-red-400" : ""}`} />
            </button>
          </div>

          {/* Delivery Checker */}
          <div className="bg-zinc-950 border border-white/15 p-5 rounded-sm space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-white uppercase border-b border-white/10 pb-3">
              <Truck className="w-4 h-4 text-amber-300" />
              <span>CHECK DELIVERY & AVAILABILITY</span>
            </div>

            <form onSubmit={handleCheckDelivery} className="flex space-x-2">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode (e.g. 400001)"
                  maxLength={10}
                  className="w-full bg-white/5 border border-white/20 focus:border-white pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 rounded-xs focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isCheckingDelivery}
                className="px-4 py-2 bg-white/15 hover:bg-white text-white hover:text-black text-xs font-medium tracking-wider uppercase rounded-xs transition-colors shrink-0 disabled:opacity-50"
              >
                {isCheckingDelivery ? "CHECKING..." : "CHECK"}
              </button>
            </form>

            {deliveryResult && (
              <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-3 animate-fade-in text-xs">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">
                      Estimated Delivery in <span className="text-emerald-400">{deliveryResult.days} Days</span>
                    </p>
                    <p className="text-[11px] text-white/70">
                      Expected by <strong>{deliveryResult.formattedDate}</strong> for Pincode {deliveryResult.checkedCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-white/70 pt-2 border-t border-white/10">
                  <Building2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>
                    Seller: <strong className="text-white font-medium">{deliveryResult.seller}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <section className="space-y-8 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase block">
              CURATED SELECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-white">
              Pairs Wonderfully With
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold tracking-[0.2em] text-white hover:text-amber-200 uppercase"
          >
            VIEW FULL CATALOG →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {similarProducts.map((sp) => (
            <Link
              key={sp.id}
              href={`/product/${sp.id}`}
              className="bg-zinc-950 border border-white/10 hover:border-amber-400/50 rounded-xs overflow-hidden transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-3 p-3">
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 rounded-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sp.images[0]}
                    alt={sp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5">
                    {sp.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-white/50 uppercase font-mono">{sp.category}</span>
                  <h4 className="text-xs font-medium text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                    {sp.name}
                  </h4>
                </div>
              </div>

              <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-bold text-amber-300">
                <span>{sp.price}</span>
                <span className="text-[10px] tracking-widest text-white uppercase font-sans">EXPLORE →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VERIFIED CLIENT REVIEWS */}
      <section className="space-y-8 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase block">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-white flex items-center space-x-3">
              <span>Verified Client Reviews</span>
              <span className="text-xs font-sans font-normal text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9 / 5.0 Rating</span>
              </span>
            </h2>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-amber-400 text-black px-4 py-2.5 text-xs font-bold tracking-[0.18em] uppercase rounded-xs hover:bg-amber-300 transition-colors shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-950 border border-white/10 p-6 rounded-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED CLIENT</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white">{rev.title}</h4>
                  <p className="text-xs text-white/70 font-light mt-1 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                <div>
                  <span className="font-semibold text-white block">{rev.author}</span>
                  <span className="text-[10px]">{rev.location} · {rev.date}</span>
                </div>
                <button className="flex items-center space-x-1 hover:text-amber-300 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WRITE A REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/20 max-w-lg w-full rounded-sm text-white p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
                  CLIENT EXPERIENCE
                </span>
                <h3 className="text-xl font-serif text-white">Write a Client Review</h3>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/60">YOUR NAME & CITY</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins (Mumbai)"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/60">REVIEW HEADLINE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional Quality & Fast Assembly"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/60">YOUR VERIFIED FEEDBACK</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details about comfort, material quality, and delivery experience..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 text-black font-bold text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-amber-300 transition-colors rounded-xs shadow-lg mt-2"
              >
                SUBMIT VERIFIED REVIEW
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
