export interface Product {
  id: string;
  name: string;
  category: string; // Display room/category (e.g. "Living Room", "Dining Room")
  categorySlug: string; // Filter slug (e.g. "sofas-sectionals", "accent-chairs", "dining-tables")
  price: string;
  numericPrice: number;
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
    price: "$4,295 CAD",
    numericPrice: 4295,
    tag: "BESTSELLER",
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
    price: "$3,895 CAD",
    numericPrice: 3895,
    tag: "BESTSELLER",
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
    price: "$4,195 CAD",
    numericPrice: 4195,
    tag: "NEW RELEASE",
    description:
      "Sculptural low-profile modular seating with pillowy deep channel quilting. Tailored in stain-resistant performance velvet.",
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
    price: "$1,495 CAD",
    numericPrice: 1495,
    tag: "LIMITED EDITION",
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

  // 3. Coffee Tables
  {
    id: "solstice-coffee-table",
    name: "Solstice Travertine Coffee Table",
    category: "Living Room",
    categorySlug: "coffee-tables",
    price: "$1,895 CAD",
    numericPrice: 1895,
    tag: "ARCHITECTURAL",
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
    price: "$2,695 CAD",
    numericPrice: 2695,
    tag: "FEATURED",
    description:
      "Slatted tambour door media credenza with integrated cable management and soft-close push drawers.",
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
    price: "$2,895 CAD",
    numericPrice: 2895,
    tag: "NEW RELEASE",
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
    price: "$2,495 CAD",
    numericPrice: 2495,
    tag: "POPULAR",
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
    price: "$895 CAD",
    numericPrice: 895,
    tag: "FEATURED",
    description:
      "Curved tub dining chair with brass accent legs and soft top-grain Italian leather cushioning.",
    dimensions: '22"W x 23"D x 31"H',
    materials: ["Top-Grain Italian Leather", "Brushed Brass Stainless Steel Legs"],
    colors: [
      { name: "Midnight Black Leather", hex: "#1A1A1A" },
      { name: "Cognac Tan Leather", hex: "#8F4E24" },
    ],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },

  // 7. Sideboards & Credenzas
  {
    id: "atelier-walnut-sideboard",
    name: "Atelier Artisanal Walnut Sideboard",
    category: "Dining Room",
    categorySlug: "sideboards",
    price: "$2,995 CAD",
    numericPrice: 2995,
    tag: "ARTISANAL",
    description:
      "Master artisanal joinery credenza featuring fluted solid wood doors and soft-close brass hinges.",
    dimensions: '72"W x 19"D x 32"H',
    materials: ["Solid American Walnut", "Brass Handles"],
    colors: [
      { name: "Natural Walnut", hex: "#4A3B32" },
    ],
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },

  // 8. Beds & Bedroom
  {
    id: "epure-boucle-bed",
    name: "Épure Bouclé Platform Bed",
    category: "Bedroom",
    categorySlug: "beds-headboards",
    price: "$3,295 CAD",
    numericPrice: 3295,
    tag: "BESTSELLER",
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

  // 9. Office Desks
  {
    id: "sculpture-oak-desk",
    name: "Sculptural Solid Oak Executive Desk",
    category: "Office",
    categorySlug: "desks",
    price: "$2,495 CAD",
    numericPrice: 2495,
    tag: "EXECUTIVE",
    description:
      "Minimalist writing desk with rounded pill-shaped oak legs, hidden wire grommet, and felt-lined drawer.",
    dimensions: '66"L x 30"W x 30"H',
    materials: ["Solid White Oak", "Felt-Lined Drawers"],
    colors: [
      { name: "Natural Oak", hex: "#D6C0A5" },
    ],
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    ],
    seller: "Mumbai Warehouse",
  },

  // 10. Lighting
  {
    id: "lumiere-travertine-floor-lamp",
    name: "Lumière Travertine Arch Floor Lamp",
    category: "Lighting",
    categorySlug: "floor-lamps",
    price: "$950 CAD",
    numericPrice: 950,
    tag: "STATEMENT",
    description:
      "Dramatic overhead brass arch lamp anchored by a solid travertine stone base with opal glass dome shade.",
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

  // 11. Decor & Rugs
  {
    id: "solstice-wool-rug",
    name: "Solstice Hand-Tufted Wool Area Rug",
    category: "Decor",
    categorySlug: "rugs",
    price: "$1,295 CAD",
    numericPrice: 1295,
    tag: "LUXURY TEXTILES",
    description:
      "Organic asymmetrical carved pile rug hand-tufted from 100% New Zealand wool.",
    dimensions: '8\' x 10\'',
    materials: ["100% New Zealand Wool", "Cotton Backing"],
    colors: [
      { name: "Ivory & Sand", hex: "#EAE5D9" },
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
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
