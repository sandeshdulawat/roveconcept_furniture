import { create } from "zustand";

export interface UIState {
  // Search
  isSearchOpen: boolean;
  searchQuery: string;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;

  // Cart
  isCartOpen: boolean;
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: () => void;

  // Currency
  currency: string;
  setCurrency: (currency: string) => void;
  isCurrencyModalOpen: boolean;
  toggleCurrencyModal: () => void;
  closeCurrencyModal: () => void;

  // Auth & User Profile Tray
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isUserTrayOpen: boolean;
  openUserTray: () => void;
  closeUserTray: () => void;
  toggleUserTray: () => void;
  userTrayView: "profile" | "orders";
  setUserTrayView: (view: "profile" | "orders") => void;

  // Hero Active Feature Tab (0: Luxury Eco Materials, 1: Handcrafted, 2: Curated Designs)
  activeTab: number;
  setActiveTab: (index: number) => void;

  // Video Background Controls
  customVideoUrl: string | null;
  setCustomVideoUrl: (url: string | null) => void;
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  setIsPlaying: (playing: boolean) => void;

  // Navigation Mega Menu active state
  activeNavHover: string | null;
  setActiveNavHover: (menu: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Search
  isSearchOpen: false,
  searchQuery: "",
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Cart
  isCartOpen: false,
  cartCount: 0,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: () => set((state) => ({ cartCount: state.cartCount + 1, isCartOpen: true })),

  // Currency
  currency: "CAN",
  setCurrency: (currency) => set({ currency, isCurrencyModalOpen: false }),
  isCurrencyModalOpen: false,
  toggleCurrencyModal: () => set((state) => ({ isCurrencyModalOpen: !state.isCurrencyModalOpen })),
  closeCurrencyModal: () => set({ isCurrencyModalOpen: false }),

  // Auth & User Tray
  isAuthModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  isUserTrayOpen: false,
  openUserTray: () => set({ isUserTrayOpen: true }),
  closeUserTray: () => set({ isUserTrayOpen: false }),
  toggleUserTray: () => set((state) => ({ isUserTrayOpen: !state.isUserTrayOpen })),
  userTrayView: "profile",
  setUserTrayView: (view) => set({ userTrayView: view, isUserTrayOpen: true }),

  // Hero Active Feature Tab
  activeTab: 0,
  setActiveTab: (index) => set({ activeTab: index }),

  // Video Background Controls
  customVideoUrl: null,
  setCustomVideoUrl: (url) => set({ customVideoUrl: url }),
  isPlaying: true,
  isMuted: true,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  // Navigation Mega Menu
  activeNavHover: null,
  setActiveNavHover: (menu) => set({ activeNavHover: menu }),
}));
