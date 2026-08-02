export interface Product {
  id: string;
  name: string;
  category: string;
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
  {
    id: "luca-curved-sectional",
    name: "The Luca Curved Sectional Sofa",
    category: "Living Room",
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
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },
  {
    id: "kiyomi-dining-table",
    name: "Kiyomi Solid Oak Dining Table",
    category: "Dining Room",
    price: "$2,895 CAD",
    numericPrice: 2895,
    tag: "NEW RELEASE",
    description:
      "A sculptural pedestal dining table showcasing natural oak wood grain and seamless rounded joinery. Comfortably seats up to 8 guests for refined dinner gatherings.",
    dimensions: '78"L x 38"W x 30"H | Tabletop Thickness: 1.5"',
    materials: ["Solid White Oak Wood", "Natural Matte Polyurethane Sealant", "Internal Steel Support Spine"],
    colors: [
      { name: "Natural Oak", hex: "#D6C0A5" },
      { name: "Smoked Walnut", hex: "#5C4A3A" },
    ],
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533779283484-8da69483d65d?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },
  {
    id: "aura-boucle-accent-chair",
    name: "Aura Boucle Accent Chair",
    category: "Accent Seating",
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
  {
    id: "winston-dining-table-48",
    name: "Winston Dining Table - 48\"",
    category: "Dining Room",
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
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    ],
    seller: "Mumbai Warehouse",
  },
  {
    id: "dresden-sectional-sofa",
    name: "Dresden Modular Sectional Sofa",
    category: "Living Room",
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
    id: "angelo-dining-chair",
    name: "Angelo Leather Dining Chair",
    category: "Dining Room",
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
];

export function getProductById(id: string): Product {
  const found = productsData.find((p) => p.id === id);
  return found || productsData[0];
}
