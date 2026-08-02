export interface LifestyleArticle {
  id: string;
  title: string;
  section: "inspiration" | "guides" | "stories" | "resources" | "community";
  topic: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
  image: string;
  excerpt: string;
  content: string[];
}

export const lifestyleArticles: LifestyleArticle[] = [
  // FEATURED HERO ARTICLE
  {
    id: "architectural-sanctuary",
    title: "Architectural Sanctuary: Minimalist Villa in Kyoto",
    section: "stories",
    topic: "Customer Homes",
    readTime: "7 MIN READ",
    date: "AUG 2026",
    author: "Elena Rostova",
    featured: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    excerpt:
      "Step inside an extraordinary modern Kyoto residence where raw concrete, natural travertine, and handcrafted Rove Concepts furniture harmoniously coexist.",
    content: [
      "Nestled among the forested hills surrounding Kyoto, this modern architectural sanctuary balances raw industrial brutalism with tranquil organic warm minimalism.",
      "The open-plan living pavilion centers around the iconic Luca Curved Sectional, wrapped in tactile off-white Italian bouclé. Light filters through floor-to-ceiling wooden shoji slats, casting soft geometric shadows across the polished concrete floor.",
      "Every piece was selected for its sculptural silhouette and timeless durability, creating a serene sanctuary away from modern urban life.",
    ],
  },

  // INSPIRATION
  {
    id: "interior-trends-2026",
    title: "2026 Interior Trends: Warm Tactile Minimalism",
    section: "inspiration",
    topic: "Interior Trends",
    readTime: "5 MIN READ",
    date: "JUL 2026",
    author: "Marcus Vance",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Discover the shift from stark minimalism toward warm textures, rounded organic joinery, and earthy terra-cotta palettes.",
    content: [
      "Interior design in 2026 embraces rich tactile warmth over cold sterile lines.",
      "Tactile bouclé, raw travertine marble, and fluted solid walnut dominate high-end living spaces.",
    ],
  },
  {
    id: "room-makeover-coastal-loft",
    title: "Room Makeover: Coastal Loft Transformation",
    section: "inspiration",
    topic: "Room Makeovers",
    readTime: "4 MIN READ",
    date: "JUN 2026",
    author: "Sophie Laurent",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "How we transformed an industrial waterfront loft into an airy, light-filled modern sanctuary using low-profile modular seating.",
    content: [
      "High ceilings and exposed brick can feel cold without the right furniture scale.",
      "Using the Dresden Modular Sectional paired with warm oak accents created distinct conversational zones.",
    ],
  },
  {
    id: "color-palettes-monochrome-warmth",
    title: "Color Palettes: Mastering Warm Monochromatics",
    section: "inspiration",
    topic: "Color Palettes",
    readTime: "6 MIN READ",
    date: "JUN 2026",
    author: "Elena Rostova",
    image: "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Learn how layering subtle ivory, sand, cognac leather, and brushed brass creates depth without clutter.",
    content: [
      "Monochromatic spaces fail when texture is ignored.",
      "By contrasting smooth travertine stone with nubby bouclé fabric and matte wood grains, tone-on-tone interiors feel layered and inviting.",
    ],
  },

  // GUIDES
  {
    id: "buying-guide-dining-table-size",
    title: "Dining Table Size & Layout Guide",
    section: "guides",
    topic: "Size & Layout Guide",
    readTime: "6 MIN READ",
    date: "JUL 2026",
    author: "Rove Design Studio",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Ensure effortless entertaining with our comprehensive guide to spatial clearance, seating capacity, and table geometry.",
    content: [
      "Allow at least 36 inches of clearance between table edges and walls for comfortable chair movement.",
      "Round pedestal tables maximize seating capacity in compact open-concept dining nooks.",
    ],
  },
  {
    id: "furniture-care-boucle-and-leather",
    title: "Material Care Guide: Italian Leather & Bouclé",
    section: "guides",
    topic: "Furniture Care",
    readTime: "5 MIN READ",
    date: "MAY 2026",
    author: "Craftsmanship Lab",
    image: "https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?q=80&w=800&auto=format&fit=crop",
    excerpt:
      "Essential maintenance tips to preserve the pristine tactile beauty of your top-grain leather and textured wool bouclé.",
    content: [
      "Dust bouclé regularly with a soft upholstery brush attachment.",
      "Condition top-grain Italian leather twice yearly to maintain supple elasticity and patina.",
    ],
  },

  // STORIES
  {
    id: "behind-the-craft-solid-oak-joinery",
    title: "Behind the Craft: Master Woodworking in Solid Oak",
    section: "stories",
    topic: "Behind the Craft",
    readTime: "8 MIN READ",
    date: "MAY 2026",
    author: "Kenji Takahashi",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "An insider look at how our master artisans hand-carve and join sustainable white oak dining tables without visible hardware.",
    content: [
      "Traditional mortise-and-tenon joinery ensures structural stability for generations.",
      "Each tabletop is hand-selected for continuous wood grain harmony.",
    ],
  },
  {
    id: "designer-interview-studio-vance",
    title: "Designer Interview: Studio Vance on Architectural Seating",
    section: "stories",
    topic: "Designer Interviews",
    readTime: "6 MIN READ",
    date: "APR 2026",
    author: "Editorial Team",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=60",
    excerpt:
      "Renowned interior designer Julian Vance discusses how fluid curved seating breaks the rigidity of modern glass architecture.",
    content: [
      "Low-profile silhouettes preserve unobstructed city views while creating intimate conversation circles.",
    ],
  },

  // RESOURCES
  {
    id: "digital-lookbook-summer-2026",
    title: "2026 Summer Lookbook: Organic Modernism",
    section: "resources",
    topic: "Lookbooks",
    readTime: "10 MIN READ",
    date: "JUL 2026",
    author: "Curatorial Board",
    image: "https://images.unsplash.com/photo-1519961655809-34fa156820ff?q=80&w=800&auto=format&fit=crop",
    excerpt:
      "Explore 48 pages of curated interior photography featuring our newest travertine and Italian bouclé releases.",
    content: [
      "Download our high-resolution digital lookbook featuring 3D floor plan layouts and material swatches.",
    ],
  },

  // COMMUNITY
  {
    id: "featured-spaces-milan-design-week",
    title: "Featured Spaces: Rove Pavilion at Milan Design Week",
    section: "community",
    topic: "Featured Spaces",
    readTime: "5 MIN READ",
    date: "APR 2026",
    author: "Global Events Team",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "A look back at our immersive architectural installation at Palazzo Serbelloni during Milan Design Week.",
    content: [
      "Over 12,000 visitors experienced our sensory installation pairing travertine stone monoliths with ambient arch lighting.",
    ],
  },
];
