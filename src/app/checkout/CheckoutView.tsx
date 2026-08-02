"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import {
  CreditCard,
  Lock,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  LogIn,
  ShoppingBag,
  ArrowLeft,
  QrCode,
  Smartphone,
  Tag,
} from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const CheckoutView: React.FC = () => {
  const { data: session } = useSession();
  const { cartItems, cartCount, clearCart, openAuthModal, setUserTrayView } = useUIStore();

  // Authentication check
  const isLoggedIn = !!session?.user;

  // Form State
  const [addressForm, setAddressForm] = useState({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "+91 98765 43210",
    street: "42 Mount Street, Bandra West",
    apartment: "Suite 4B",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400050",
    country: "India",
  });

  // Payment Method Selection: 'card' | 'paypal' | 'cashapp' | 'upi'
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "cashapp" | "upi">("card");

  // Payment Details State
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "4532 •••• •••• 8892",
    expiry: "08/28",
    cvv: "892",
    nameOnCard: session?.user?.name || "REFINED LIVING MEMBER",
  });

  const [cashAppTag, setCashAppTag] = useState("$RoveMember");
  const [upiId, setUpiId] = useState("sandesh@okaxis");

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.1 for 10%
  const [promoMsg, setPromoMsg] = useState("");

  // Order Placement State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    orderId: string;
    total: number;
    itemsCount: number;
    deliveryDate: string;
  } | null>(null);

  // Subtotal & Grand Total
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = subtotal * appliedDiscount;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "ROVEVIP10") {
      setAppliedDiscount(0.1);
      setPromoMsg("ROVEVIP10 applied! 10% discount subtracted.");
    } else {
      setPromoMsg("Invalid promo code. Try 'ROVEVIP10'");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `ROVE-${Math.floor(100000 + Math.random() * 900000)}`;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5);

      setOrderComplete({
        orderId,
        total: grandTotal,
        itemsCount: cartCount,
        deliveryDate: deliveryDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      });

      setIsSubmitting(false);
      clearCart();
    }, 1500);
  };

  // If order complete
  if (orderComplete) {
    return (
      <div className="max-w-[900px] mx-auto px-4 py-16 text-center space-y-8 animate-fade-in">
        <div className="w-16 h-16 bg-amber-400/20 border border-amber-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-amber-300" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono tracking-[0.25em] text-amber-300 uppercase block">
            ORDER CONFIRMED · {orderComplete.orderId}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-white font-light">
            Thank You For Your Order
          </h1>
          <p className="text-sm text-white/70 font-light max-w-md mx-auto leading-relaxed">
            Your white-glove delivery order of <strong className="text-white">${orderComplete.total.toLocaleString()} CAD</strong> has been confirmed and scheduled for delivery by <strong className="text-amber-300">{orderComplete.deliveryDate}</strong>.
          </p>
        </div>

        <div className="bg-zinc-950 border border-white/15 p-6 rounded-xs max-w-md mx-auto space-y-3 text-left text-xs font-mono text-white/70">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span>ORDER REFERENCE:</span>
            <span className="text-white font-bold">{orderComplete.orderId}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span>ITEMS PURCHASED:</span>
            <span className="text-white">{orderComplete.itemsCount} Piece(s)</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span>DELIVERY ADDRESS:</span>
            <span className="text-white">{addressForm.city}, {addressForm.country}</span>
          </div>
          <div className="flex justify-between">
            <span>PAYMENT METHOD:</span>
            <span className="text-amber-300 uppercase">{paymentMethod} CONFIRMED</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setUserTrayView("orders")}
            className="bg-amber-400 text-black px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase rounded-xs hover:bg-amber-300 transition-colors w-full sm:w-auto"
          >
            VIEW MY ORDERS & TRACKING
          </button>
          <Link
            href="/shop"
            className="border border-white/30 text-white px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase rounded-xs hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 pb-24 text-white space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] font-semibold text-white/50 uppercase">
            <Link href="/shop" className="hover:text-white transition-colors flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shop</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-light text-white">
            Secure Luxury Checkout
          </h1>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-full">
          <Lock className="w-3.5 h-3.5" />
          <span>256-BIT ENCRYPTED</span>
        </div>
      </div>

      {/* Check Cart Empty */}
      {cartItems.length === 0 ? (
        <div className="bg-zinc-950 border border-white/15 p-12 text-center rounded-sm space-y-4 max-w-md mx-auto my-12">
          <ShoppingBag className="w-10 h-10 text-white/30 mx-auto" />
          <h3 className="text-lg font-medium text-white">Your Shopping Bag is Empty</h3>
          <p className="text-xs text-white/60 font-light">
            Please add luxury furniture pieces to your shopping bag before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase px-6 py-3 hover:bg-amber-300 transition-colors"
          >
            BROWSE LUXURY CATALOG
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: AUTHENTICATION + SHIPPING ADDRESS + PAYMENT (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. AUTHENTICATION BANNER */}
            {!isLoggedIn ? (
              <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-amber-400/40 p-6 rounded-xs space-y-4 shadow-xl">
                <div className="flex items-start space-x-3">
                  <LogIn className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-medium text-white">Member Login Required for Checkout</h3>
                    <p className="text-xs text-white/70 font-light mt-1">
                      Log in to your Rove Concepts account or proceed with one-click demo authorization to complete your purchase.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={openAuthModal}
                    className="bg-amber-400 text-black text-xs font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-xs hover:bg-amber-300 transition-colors"
                  >
                    SIGN IN / REGISTER
                  </button>
                  <button
                    onClick={() => signIn("credentials", { email: "demo@roveconcepts.com", redirect: false })}
                    className="border border-white/30 text-white text-xs font-medium tracking-wider uppercase px-4 py-2.5 rounded-xs hover:bg-white/10 transition-colors"
                  >
                    ONE-CLICK DEMO LOGIN
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-950 border border-white/15 p-4 rounded-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs">
                    {session?.user?.name ? session.user.name[0] : "U"}
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 uppercase font-mono block">LOGGED IN MEMBER</span>
                    <h4 className="text-xs font-semibold text-white">{session?.user?.name} ({session?.user?.email})</h4>
                  </div>
                </div>
                <span className="text-emerald-400 text-xs font-mono flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AUTHENTICATED</span>
                </span>
              </div>
            )}

            {/* FORM CONTAINER (Disabled if not logged in) */}
            <form onSubmit={handlePlaceOrder} className={`space-y-8 ${!isLoggedIn ? "opacity-50 pointer-events-none" : ""}`}>
              {/* 2. SHIPPING & DELIVERY ADDRESS */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-300 border-b border-white/10 pb-2 flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span>1. White-Glove Shipping Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-white/60">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-white/60">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={addressForm.email}
                      onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-mono uppercase text-white/60">STREET ADDRESS</label>
                    <input
                      type="text"
                      required
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-white/60">SUITE / APT</label>
                    <input
                      type="text"
                      value={addressForm.apartment}
                      onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-white/60">CITY</label>
                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-white/60">STATE / PROVINCE</label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-white/60">POSTAL CODE</label>
                    <input
                      type="text"
                      required
                      value={addressForm.postalCode}
                      onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* 3. PAYMENT METHOD SELECTION (CARDS, PAYPAL, CASHAPP, UPI) */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-300 border-b border-white/10 pb-2 flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Payment Option</span>
                </h3>

                {/* Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 border rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors flex flex-col items-center space-y-1 ${
                      paymentMethod === "card"
                        ? "bg-amber-400 text-black border-amber-400 shadow-md"
                        : "bg-zinc-900 border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-3 border rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors flex flex-col items-center space-y-1 ${
                      paymentMethod === "paypal"
                        ? "bg-amber-400 text-black border-amber-400 shadow-md"
                        : "bg-zinc-900 border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <span className="font-serif italic font-bold">PayPal</span>
                    <span>Express</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cashapp")}
                    className={`p-3 border rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors flex flex-col items-center space-y-1 ${
                      paymentMethod === "cashapp"
                        ? "bg-amber-400 text-black border-amber-400 shadow-md"
                        : "bg-zinc-900 border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Cash App</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 border rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors flex flex-col items-center space-y-1 ${
                      paymentMethod === "upi"
                        ? "bg-amber-400 text-black border-amber-400 shadow-md"
                        : "bg-zinc-900 border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI / GPay</span>
                  </button>
                </div>

                {/* TAB CONTENT: CREDIT CARD */}
                {paymentMethod === "card" && (
                  <div className="bg-zinc-950 border border-white/15 p-5 rounded-xs space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-white/60">CARD NUMBER</label>
                      <input
                        type="text"
                        required
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-white/60">EXPIRY (MM/YY)</label>
                        <input
                          type="text"
                          required
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-white/60">SECURITY CODE (CVV)</label>
                        <input
                          type="text"
                          required
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: PAYPAL */}
                {paymentMethod === "paypal" && (
                  <div className="bg-zinc-950 border border-white/15 p-6 rounded-xs text-center space-y-3 animate-fade-in">
                    <span className="text-xl font-serif italic text-amber-300 font-bold">PayPal Express</span>
                    <p className="text-xs text-white/70 font-light">
                      Click place order below to authorize payment via your PayPal account balance or linked credit cards.
                    </p>
                  </div>
                )}

                {/* TAB CONTENT: CASH APP */}
                {paymentMethod === "cashapp" && (
                  <div className="bg-zinc-950 border border-white/15 p-5 rounded-xs space-y-3 animate-fade-in">
                    <label className="text-[10px] font-mono uppercase text-white/60">ENTER YOUR $CASHTAG</label>
                    <input
                      type="text"
                      required
                      value={cashAppTag}
                      onChange={(e) => setCashAppTag(e.target.value)}
                      placeholder="$Cashtag"
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-white/50">A payment request will be sent to your Cash App for approval.</p>
                  </div>
                )}

                {/* TAB CONTENT: UPI */}
                {paymentMethod === "upi" && (
                  <div className="bg-zinc-950 border border-white/15 p-5 rounded-xs space-y-3 animate-fade-in">
                    <label className="text-[10px] font-mono uppercase text-white/60">ENTER UPI VPA ID (GPay / PhonePe / Paytm)</label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="w-full bg-black border border-white/20 px-3.5 py-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-white/50">Accept the payment notification on your UPI app to complete order.</p>
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-400 text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-300 transition-colors shadow-2xl rounded-xs flex items-center justify-center space-x-2 disabled:opacity-50 mt-8"
              >
                <span>{isSubmitting ? "PROCESSING PAYMENT..." : `PLACE ORDER & PAY ($${grandTotal.toLocaleString()} CAD)`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-950 border border-white/15 p-6 rounded-xs space-y-6 sticky top-28">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-white border-b border-white/10 pb-3 flex items-center justify-between">
              <span>ORDER SUMMARY ({cartCount})</span>
              <ShoppingBag className="w-4 h-4 text-amber-300" />
            </h3>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 dark-scrollbar">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 text-xs border-b border-white/5 pb-3">
                  <div className="w-12 h-12 bg-zinc-900 rounded-xs overflow-hidden shrink-0 border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{item.name}</h4>
                    <p className="text-[11px] text-white/50">Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ""}</p>
                  </div>
                  <span className="font-bold text-amber-300 shrink-0">{item.price}</span>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-[10px] font-mono uppercase text-white/60 flex items-center space-x-1">
                <Tag className="w-3 h-3 text-amber-300" />
                <span>PROMO CODE</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="e.g. ROVEVIP10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-black border border-white/20 px-3 py-2 text-xs text-white uppercase rounded-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/15 hover:bg-white text-white hover:text-black text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
                >
                  APPLY
                </button>
              </div>
              {promoMsg && <p className="text-[11px] text-amber-300 font-mono">{promoMsg}</p>}
            </form>

            {/* Subtotal & Taxes Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono text-white/70">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span className="text-white font-bold">${subtotal.toLocaleString()} CAD</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>PROMO DISCOUNT (10%):</span>
                  <span>-${discountAmount.toLocaleString()} CAD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>WHITE-GLOVE DELIVERY:</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>ESTIMATED TAXES:</span>
                <span className="text-white">INCLUDED</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-white/15 text-sm font-bold text-white font-sans">
                <span>GRAND TOTAL:</span>
                <span className="text-amber-300 text-base">${grandTotal.toLocaleString()} CAD</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-white/50 space-y-1 border-t border-white/10">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>30-Day In-Home Trial & 5-Year Structural Warranty</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
