export interface Showroom {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  featuredCollections: string[];
  description: string;
  mapCoordinates: string;
}

export const showroomsData: Showroom[] = [
  {
    id: "tokyo-omotesando",
    city: "Tokyo",
    name: "Omotesando Architectural Flagship",
    address: "5-7-22 Minamiaoyama, Minato-ku, Tokyo 107-0062",
    phone: "+81 3 5413 8800",
    hours: "Mon – Sun: 11:00 AM – 8:00 PM JST",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    featuredCollections: ["Luca Curved Collection", "Kyomi Oak Dining", "Lumière Lighting"],
    description:
      "A 3-story concrete and glass architectural sanctuary in the heart of Tokyo's design district, showcasing organic modernism and serene courtyard installations.",
    mapCoordinates: "35.6652° N, 139.7123° E",
  },
  {
    id: "london-mayfair",
    city: "London",
    name: "Mayfair Cultural Atelier",
    address: "42 Mount Street, Mayfair, London W1K 2RX",
    phone: "+44 20 7946 0912",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM | Sun: 12:00 PM – 5:00 PM GMT",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Housed within a restored 19th-century Georgian townhouse, our London atelier blends classical heritage architecture with cutting-edge Italian craftsmanship.",
    featuredCollections: ["Dresden Sectional", "Aura Boucle Swivel", "Solstice Travertine"],
    mapCoordinates: "51.5098° N, 0.1504° W",
  },
  {
    id: "newyork-soho",
    city: "New York",
    name: "SoHo Architectural Pavilion",
    address: "128 Spring Street, SoHo, New York, NY 10012",
    phone: "+1 212 555 0198",
    hours: "Mon – Sat: 11:00 AM – 7:00 PM | Sun: 12:00 PM – 6:00 PM EST",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    description:
      "Spanning 8,000 square feet of cast-iron SoHo industrial loft space with soaring 16-foot ceilings and natural skylight illumination.",
    featuredCollections: ["The Luca Sectional", "Atelier Walnut Sideboard", "Épure Bed"],
    mapCoordinates: "40.7246° N, 74.0018° W",
  },
  {
    id: "losangeles-melrose",
    city: "Los Angeles",
    name: "West Hollywood Gallery",
    address: "8520 Melrose Avenue, West Hollywood, CA 90069",
    phone: "+1 310 555 0142",
    hours: "Mon – Sun: 10:00 AM – 6:00 PM PST",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&auto=format&fit=crop&q=60",
    description:
      "Sun-drenched indoor-outdoor pavilion featuring olive trees, reflecting pools, and warm Californian minimalism.",
    featuredCollections: ["Outdoor Modular Seating", "Travertine Arch Lamps", "Kiyomi Dining"],
    mapCoordinates: "34.0818° N, 118.3789° W",
  },
  {
    id: "mumbai-bkc",
    city: "Mumbai",
    name: "BKC Experience Store",
    address: "G-Block, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
    phone: "+91 22 6123 4567",
    hours: "Mon – Sun: 11:00 AM – 9:00 PM IST",
    image: "https://images.unsplash.com/photo-1519961655809-34fa156820ff?q=80&w=1200&auto=format&fit=crop",
    description:
      "Our flagship South Asia experience space with dedicated design consultation suites and express warehouse dispatch.",
    featuredCollections: ["Luca Curved Sectional", "Winston Dining Table", "Angelo Leather Chair"],
    mapCoordinates: "19.0657° N, 72.8687° E",
  },
];
