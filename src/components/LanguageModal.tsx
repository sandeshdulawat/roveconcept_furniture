"use client";

import React from "react";
import { X, Globe, Check } from "lucide-react";
import { useUIStore, SupportedLanguage } from "@/store/useUIStore";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
}

export const languageOptions: LanguageOption[] = [
  { code: "EN", name: "English", nativeName: "English", region: "North America / International", flag: "🇺🇸" },
  { code: "FR", name: "French", nativeName: "Français", region: "Europe / France & Canada", flag: "🇫🇷" },
  { code: "JA", name: "Japanese", nativeName: "日本語", region: "Asia / Japan Flagship", flag: "🇯🇵" },
  { code: "DE", name: "German", nativeName: "Deutsch", region: "Europe / Germany & DACH", flag: "🇩🇪" },
];

export const LanguageModal: React.FC = () => {
  const { isLanguageModalOpen, closeLanguageModal, language, setLanguage } = useUIStore();

  if (!isLanguageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-white/20 max-w-md w-full rounded-sm text-white p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase">
              SELECT REGION & LANGUAGE
            </h3>
          </div>
          <button
            onClick={closeLanguageModal}
            className="p-1 text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {languageOptions.map((option) => {
            const isSelected = language === option.code;
            return (
              <button
                key={option.code}
                onClick={() => setLanguage(option.code)}
                className={`w-full p-4 rounded-xs border text-left transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? "bg-amber-400 text-black border-amber-400 font-bold shadow-md"
                    : "bg-zinc-900/80 border-white/15 text-white hover:border-white/40"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{option.flag}</span>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider">
                      {option.nativeName} ({option.code})
                    </h4>
                    <p className={`text-[10px] ${isSelected ? "text-black/70 font-medium" : "text-white/50 font-light"}`}>
                      {option.region}
                    </p>
                  </div>
                </div>

                {isSelected && <Check className="w-5 h-5 text-black shrink-0" />}
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-center text-white/40 font-mono tracking-wider">
          Prices and currency formats update automatically according to regional preferences.
        </p>
      </div>
    </div>
  );
};
