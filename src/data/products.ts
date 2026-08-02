export interface Product {
  id: string;
  name: string;
  category: string; // Display room/category (e.g. "Living Room", "Dining Room")
  categorySlug: string; // Filter slug (e.g. "sofas-sectionals", "accent-chairs", "dining-tables")
  price: string;
  numericPrice: number;
  originalPrice?: string;
  numericOriginalPrice?: number;
  isOnSale?: boolean;
  isOutlet?: boolean;
  condition?: "Mint Open-Box" | "Showroom Display" | "Archival Vault";
  stockCount?: number;
  discountBadge?: string;
  tag: string;
  description: string;
  dimensions: string;
  materials: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  seller: string;
}

export const productsData: Product[] = [
  // 1. Sofas & Sectionals
  {
    id: "luca-curved-sectional",
    name: "The Luca Curved Sectional Sofa",
    category: "Living Room",
    categorySlug: "sofas-sectionals",
    price: "$3,695 CAD",
    numericPrice: 3695,
    originalPrice: "$4,295 CAD",
    numericOriginalPrice: 4295,
    isOnSale: true,
    discountBadge: "14% OFF",
    tag: "CURATED SALE",
    description:
      "Fluid, architectural curves meet sink-in luxury. Handcrafted with high-density foam cushioning, kiln-dried FSC® certified hardwood frame, and premium textured bouclé upholstery.",
    dimensions: '118"W x 64"D x 29"H | Seat Height: 16.5"',
    materials: ["FSC® Certified Kiln-Dried Hardwood", "High-Resilience Polyurethane Foam", "Textured Italian Bouclé Fabric"],
    colors: [
      { name: "Cream Bouclé", hex: "#F3EFEA" },
      { name: "Olive Velvet", hex: "#4A5240" },
      { name: "Charcoal Linen", hex: "#2C2D31" },
    ],
    images: [
      "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?q=80&w=1417&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },
  {
    id: "dresden-sectional-sofa",
    name: "Dresden Modular Sectional Sofa",
    category: "Living Room",
    categorySlug: "sofas-sectionals",
    price: "$2,995 CAD",
    numericPrice: 2995,
    originalPrice: "$3,895 CAD",
    numericOriginalPrice: 3895,
    isOnSale: true,
    discountBadge: "23% OFF",
    tag: "LIMITED SALE",
    description:
      "Deep-seated modern sectional featuring integrated solid walnut side shelf tables and feather-down blend cushions.",
    dimensions: '132"W x 70"D x 28"H',
    materials: ["American Walnut Side Table", "Feather & Down Cushion Fill", "High-Performance Velvet Upholstery"],
    colors: [
      { name: "Emerald Green Velvet", hex: "#1D3B2E" },
      { name: "Sand Performance Fabric", hex: "#D8CFBE" },
    ],
    images: [
      "https://images.unsplash.com/photo-1519961655809-34fa156820ff?q=80&w=687&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },
  {
    id: "lumiere-modular-sofa",
    name: "Lumière Velvet Modular Sofa",
    category: "Living Room",
    categorySlug: "sofas-sectionals",
    price: "$2,495 CAD",
    numericPrice: 2495,
    originalPrice: "$4,195 CAD",
    numericOriginalPrice: 4195,
    isOutlet: true,
    condition: "Showroom Display",
    stockCount: 1,
    discountBadge: "40% OFF",
    tag: "OUTLET VAULT",
    description:
      "Sculptural low-profile modular seating with pillowy deep channel quilting. Tailored in stain-resistant performance velvet. Showroom floor display in pristine condition.",
    dimensions: '124"W x 42"D x 27"H',
    materials: ["Italian Performance Velvet", "Kiln-Dried Hardwood", "Memory Foam Layer"],
    colors: [
      { name: "Ivory Velvet", hex: "#F5F3EF" },
      { name: "Midnight Navy", hex: "#1B263B" },
    ],
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60",
    ],
    seller: "Mumbai Warehouse",
  },

  // 2. Accent Chairs
  {
    id: "aura-boucle-accent-chair",
    name: "Aura Boucle Accent Chair",
    category: "Accent Seating",
    categorySlug: "accent-chairs",
    price: "$1,095 CAD",
    numericPrice: 1095,
    originalPrice: "$1,495 CAD",
    numericOriginalPrice: 1495,
    isOnSale: true,
    discountBadge: "27% OFF",
    tag: "FLASH SALE",
    description:
      "An iconic cocoon silhouette designed for supreme lounge comfort. Features a 360-degree smooth swivel base and plush tactile bouclé fabric.",
    dimensions: '34"W x 33"D x 28"H | Seat Depth: 22"',
    materials: ["Bouclé Fabric", "Reinforced Steel Swivel Base", "Concealed Memory Foam Layers"],
    colors: [
      { name: "Off-White Bouclé", hex: "#FAF8F5" },
      { name: "Terracotta Linen", hex: "#B85B43" },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?q=80&w=1440&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },
  {
    id: "aura-boucle-chair-outlet",
    name: "Aura Boucle Swivel Chair - Open Box",
    category: "Accent Seating",
    categorySlug: "accent-chairs",
    price: "$795 CAD",
    numericPrice: 795,
    originalPrice: "$1,495 CAD",
    numericOriginalPrice: 1495,
    isOutlet: true,
    condition: "Mint Open-Box",
    stockCount: 2,
    discountBadge: "47% OFF",
    tag: "OPEN BOX",
    description:
      "Inspected and certified mint open-box return in original packaging. Features full 360-degree swivel.",
    dimensions: '34"W x 33"D x 28"H',
    materials: ["Bouclé Fabric", "Steel Base"],
    colors: [{ name: "Off-White Bouclé", hex: "#FAF8F5" }],
    images: [
      "https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?q=80&w=1440&auto=format&fit=crop",
    ],
    seller: "Mumbai Warehouse",
  },

  // 3. Coffee Tables
  {
    id: "solstice-coffee-table",
    name: "Solstice Travertine Coffee Table",
    category: "Living Room",
    categorySlug: "coffee-tables",
    price: "$1,495 CAD",
    numericPrice: 1495,
    originalPrice: "$1,895 CAD",
    numericOriginalPrice: 1895,
    isOnSale: true,
    discountBadge: "21% OFF",
    tag: "CURATED SALE",
    description:
      "Hand-carved Italian travertine coffee table with soft rounded bullnose edges and honed matte finish.",
    dimensions: '54"L x 32"W x 14"H',
    materials: ["Natural Italian Roman Travertine", "Honed Protective Coating"],
    colors: [
      { name: "Beige Travertine", hex: "#D6C7B2" },
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    seller: "Mumbai Warehouse",
  },

  // 4. TV Units & Consoles
  {
    id: "palisade-media-console",
    name: "Palisade Solid Walnut Media Console",
    category: "Living Room",
    categorySlug: "tv-units-consoles",
    price: "$1,495 CAD",
    numericPrice: 1495,
    originalPrice: "$2,695 CAD",
    numericOriginalPrice: 2695,
    isOutlet: true,
    condition: "Archival Vault",
    stockCount: 1,
    discountBadge: "45% OFF",
    tag: "ARCHIVAL VAULT",
    description:
      "Discontinued prototype walnut credenza featuring fluted tambour doors.",
    dimensions: '76"W x 18"D x 22"H',
    materials: ["Solid American Walnut", "Brushed Brass Legs"],
    colors: [
      { name: "Walnut", hex: "#5C4A3A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },

  // 5. Dining Tables
  {
    id: "kiyomi-dining-table",
    name: "Kiyomi Solid Oak Dining Table",
    category: "Dining Room",
    categorySlug: "dining-tables",
    price: "$2,195 CAD",
    numericPrice: 2195,
    originalPrice: "$2,895 CAD",
    numericOriginalPrice: 2895,
    isOnSale: true,
    discountBadge: "24% OFF",
    tag: "SPECIAL EVENT",
    description:
      "A sculptural pedestal dining table showcasing natural oak wood grain and seamless rounded joinery. Comfortably seats up to 8 guests.",
    dimensions: '78"L x 38"W x 30"H | Tabletop Thickness: 1.5"',
    materials: ["Solid White Oak Wood", "Natural Matte Polyurethane Sealant"],
    colors: [
      { name: "Natural Oak", hex: "#D6C0A5" },
      { name: "Smoked Walnut", hex: "#5C4A3A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=687&auto=format&fit=crop",
    ],
    seller: "Mumbai Warehouse",
  },
  {
    id: "winston-dining-table-48",
    name: "Winston Dining Table - 48\"",
    category: "Dining Room",
    categorySlug: "dining-tables",
    price: "$1,895 CAD",
    numericPrice: 1895,
    originalPrice: "$2,495 CAD",
    numericOriginalPrice: 2495,
    isOnSale: true,
    discountBadge: "24% OFF",
    tag: "MEMBER DEAL",
    description:
      "Mid-century modern round pedestal table with a slatted solid wood cone base and durable matte ceramic white tabletop.",
    dimensions: '48" Diameter x 30"H',
    materials: ["Solid Ash Wood Slats", "Stain-Resistant Matte Ceramic Top"],
    colors: [
      { name: "Walnut & White", hex: "#4E3629" },
      { name: "Black & Marble", hex: "#1A1A1A" },
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1675744019321-f90d6d719da7?q=80&w=687&auto=format&fit=crop",
    ],
    seller: "Mumbai Warehouse",
  },

  // 6. Dining Chairs
  {
    id: "angelo-dining-chair",
    name: "Angelo Leather Dining Chair",
    category: "Dining Room",
    categorySlug: "dining-chairs",
    price: "$495 CAD",
    numericPrice: 495,
    originalPrice: "$895 CAD",
    numericOriginalPrice: 895,
    isOutlet: true,
    condition: "Showroom Display",
    stockCount: 4,
    discountBadge: "45% OFF",
    tag: "OUTLET EXCLUSIVE",
    description:
      "Showroom floor sample chair wrapped in top-grain Italian leather with brass legs.",
    dimensions: '22"W x 23"D x 31"H',
    materials: ["Top-Grain Italian Leather", "Brushed Brass Stainless Steel Legs"],
    colors: [
      { name: "Midnight Black Leather", hex: "#1A1A1A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },

  // 7. Beds & Bedroom
  {
    id: "epure-boucle-bed",
    name: "Épure Bouclé Platform Bed",
    category: "Bedroom",
    categorySlug: "beds-headboards",
    price: "$2,495 CAD",
    numericPrice: 2495,
    originalPrice: "$3,295 CAD",
    numericOriginalPrice: 3295,
    isOnSale: true,
    discountBadge: "24% OFF",
    tag: "CURATED SALE",
    description:
      "Low-profile padded platform bed with an oversized wingback headboard wrapped in plush textured bouclé fabric.",
    dimensions: '88"W x 92"L x 44"H (Queen)',
    materials: ["Textured Bouclé Fabric", "Solid Hardwood Slat Base"],
    colors: [
      { name: "Warm Cream", hex: "#F3EFEA" },
    ],
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],
    seller: "Mumbai Warehouse",
  },

  // 8. Lighting
  {
    id: "lumiere-travertine-floor-lamp",
    name: "Lumière Travertine Arch Floor Lamp",
    category: "Lighting",
    categorySlug: "floor-lamps",
    price: "$495 CAD",
    numericPrice: 495,
    originalPrice: "$950 CAD",
    numericOriginalPrice: 950,
    isOutlet: true,
    condition: "Mint Open-Box",
    stockCount: 2,
    discountBadge: "48% OFF",
    tag: "OPEN BOX",
    description:
      "Certified open-box arch lamp anchored by a solid travertine stone base with opal glass dome shade.",
    dimensions: '82"H x 48" Reach | Base: 14" Diameter',
    materials: ["Travertine Marble Base", "Brushed Brass Arm", "Hand-Blown Glass Dome"],
    colors: [
      { name: "Brass & Beige", hex: "#D4AF37" },
    ],
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },
];

export function getProductById(id: string): Product {
  const found = productsData.find((p) => p.id === id);
  return found || productsData[0];
}

export function getProductsByCategorySlug(slug: string): Product[] {
  if (!slug || slug === "all") return productsData;
  return productsData.filter(
    (p) =>
      p.categorySlug === slug ||
      p.category.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );
}

export function getSaleProducts(): Product[] {
  return productsData.filter((p) => p.isOnSale);
}

export function getOutletProducts(): Product[] {
  return productsData.filter((p) => p.isOutlet);
}
