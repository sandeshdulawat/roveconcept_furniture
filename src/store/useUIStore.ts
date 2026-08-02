import { create } from "zustand";
import { Product } from "@/data/products";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: string;
  numericPrice: number;
  image: string;
  selectedColor?: string;
  quantity: number;
}

export type SupportedLanguage = "EN" | "FR" | "JA" | "DE";

export interface UIState {
  // Search
  isSearchOpen: boolean;
  searchQuery: string;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;

  // Cart & Shopping Bag System
  isCartOpen: boolean;
  cartCount: number;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: () => void;
  addItemToCart: (item: {
    id?: string;
    productId: string;
    name: string;
    price: string;
    numericPrice: number;
    image: string;
    selectedColor?: string;
  }) => void;
  removeItemFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;

  // Saved Wishlist / Favorites System
  wishlist: Product[];
  isWishlistOpen: boolean;
  toggleWishlistModal: () => void;
  closeWishlistModal: () => void;
  toggleWishlistItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Multi-Language Regional Switcher (EN / FR / JA / DE)
  language: SupportedLanguage;
  isLanguageModalOpen: boolean;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguageModal: () => void;
  closeLanguageModal: () => void;

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
  userTrayView: "profile" | "orders" | "wishlist";
  setUserTrayView: (view: "profile" | "orders" | "wishlist") => void;

  // Hero Active Feature Tab
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

const DEFAULT_DEMO_ITEM: CartItem = {
  id: "luca-curved-sectional-Cream Bouclé",
  productId: "luca-curved-sectional",
  name: "The Luca Curved Sectional Sofa",
  price: "$3,695 CAD",
  numericPrice: 3695,
  image: "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?q=80&w=1417&auto=format&fit=crop",
  selectedColor: "Cream Bouclé",
  quantity: 1,
};

export const useUIStore = create<UIState>((set, get) => ({
  // Search
  isSearchOpen: false,
  searchQuery: "",
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Cart & Shopping Bag System
  isCartOpen: false,
  cartCount: 1,
  cartItems: [DEFAULT_DEMO_ITEM],
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addToCart: () => {
    const state = get();
    state.addItemToCart({
      productId: "luca-curved-sectional",
      name: "The Luca Curved Sectional Sofa",
      price: "$3,695 CAD",
      numericPrice: 3695,
      image: "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?q=80&w=1417&auto=format&fit=crop",
      selectedColor: "Cream Bouclé",
    });
  },

  addItemToCart: (item) => {
    set((state) => {
      const itemId = item.id || `${item.productId}-${item.selectedColor || "default"}`;
      const existingIndex = state.cartItems.findIndex((ci) => ci.id === itemId);

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = state.cartItems.map((ci, idx) =>
          idx === existingIndex ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        newItems = [
          ...state.cartItems,
          {
            id: itemId,
            productId: item.productId,
            name: item.name,
            price: item.price,
            numericPrice: item.numericPrice,
            image: item.image,
            selectedColor: item.selectedColor,
            quantity: 1,
          },
        ];
      }

      const totalCount = newItems.reduce((acc, ci) => acc + ci.quantity, 0);
      return { cartItems: newItems, cartCount: totalCount, isCartOpen: true };
    });
  },

  removeItemFromCart: (id) => {
    set((state) => {
      const newItems = state.cartItems.filter((ci) => ci.id !== id);
      const totalCount = newItems.reduce((acc, ci) => acc + ci.quantity, 0);
      return { cartItems: newItems, cartCount: totalCount };
    });
  },

  updateCartQuantity: (id, delta) => {
    set((state) => {
      const newItems = state.cartItems
        .map((ci) => {
          if (ci.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];

      const totalCount = newItems.reduce((acc, ci) => acc + ci.quantity, 0);
      return { cartItems: newItems, cartCount: totalCount };
    });
  },

  clearCart: () => set({ cartItems: [], cartCount: 0 }),

  // Saved Wishlist / Favorites System
  wishlist: [],
  isWishlistOpen: false,
  toggleWishlistModal: () => set((state) => ({ isWishlistOpen: !state.isWishlistOpen })),
  closeWishlistModal: () => set({ isWishlistOpen: false }),
  toggleWishlistItem: (product) => {
    set((state) => {
      const exists = state.wishlist.some((p) => p.id === product.id);
      let newWishlist: Product[];
      if (exists) {
        newWishlist = state.wishlist.filter((p) => p.id !== product.id);
      } else {
        newWishlist = [...state.wishlist, product];
      }
      return { wishlist: newWishlist };
    });
  },
  isInWishlist: (productId) => {
    return get().wishlist.some((p) => p.id === productId);
  },

  // Multi-Language Regional Switcher
  language: "EN",
  isLanguageModalOpen: false,
  setLanguage: (lang) => set({ language: lang, isLanguageModalOpen: false }),
  toggleLanguageModal: () => set((state) => ({ isLanguageModalOpen: !state.isLanguageModalOpen })),
  closeLanguageModal: () => set({ isLanguageModalOpen: false }),

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
