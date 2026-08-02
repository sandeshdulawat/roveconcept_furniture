"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { X, Lock, User, KeyRound, AlertCircle, ArrowRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, openUserTray } = useUIStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Fallback to default 'user' if inputs are empty
    const effectiveUsername = username.trim() || "user";
    const effectivePassword = password.trim() || "user";

    try {
      const res = await signIn("credentials", {
        username: effectiveUsername,
        password: effectivePassword,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password. Default is: user / user");
      } else {
        closeAuthModal();
        openUserTray();
      }
    } catch {
      setError("An unexpected authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername("user");
    setPassword("user");
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-white/15 w-full max-w-md rounded-md p-6 sm:p-8 text-white shadow-2xl relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-6">
          <span className="text-xl font-light tracking-[0.25em]">
            <strong className="font-semibold tracking-[0.25em]">ROVE</strong>
            <span className="font-extralight opacity-90">CONCEPTS</span>
          </span>
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
            MEMBER PORTAL LOGIN
          </h3>
        </div>

        {/* Default Credentials Hint Box */}
        <div className="bg-white/5 border border-white/10 p-3.5 rounded-sm mb-6 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-white/80">
            <KeyRound className="w-4 h-4 text-amber-300 shrink-0" />
            <div>
              <span className="text-[10px] text-white/50 uppercase block font-mono">
                DEFAULT CREDENTIALS
              </span>
              <span className="font-mono text-white">user / user</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-[10px] tracking-wider uppercase font-semibold bg-white/10 hover:bg-white hover:text-black px-2.5 py-1 rounded-xs transition-colors"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-950/60 border border-red-500/40 p-3 rounded-sm text-red-300 text-xs flex items-center space-x-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60 block mb-1.5">
              USERNAME
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="user"
                className="w-full bg-white/5 border border-white/15 focus:border-white pl-9 pr-4 py-2.5 text-xs text-white placeholder-white/30 rounded-xs focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60 block mb-1.5">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="user"
                className="w-full bg-white/5 border border-white/15 focus:border-white pl-9 pr-4 py-2.5 text-xs text-white placeholder-white/30 rounded-xs focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
          >
            <span>{isLoading ? "AUTHENTICATING..." : "LOG IN TO ACCOUNT"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
