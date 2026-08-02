import React from "react";
import Link from "next/link";

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  price: string;
  tag: string;
  img: string;
}

export const catalogItems: CatalogItem[] = [
  {
    id: "luca-curved-sectional",
    name: "The Luca Curved Sectional",
    category: "Living Room",
    price: "$4,295 CAD",
    tag: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1664711942326-2c3351e215e6?q=80&w=1417&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "kiyomi-dining-table",
    name: "Kiyomi Dining Table",
    category: "Dining Room",
    price: "$2,895 CAD",
    tag: "NEW RELEASE",
    img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "aura-boucle-accent-chair",
    name: "Aura Boucle Accent Chair",
    category: "Accent Seating",
    price: "$1,45 CAD",
    tag: "LIMITED EDITION",
    img: "https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?q=80&w=1440&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const CatalogPreview: React.FC = () => {
  return (
    <section id="shop" className="py-24 px-6 sm:px-12 max-w-[1440px] mx-auto space-y-16 border-t border-white/10">
      <div className="text-center space-y-4 max-w-[900px] mx-auto">
        <span className="text-[11px] tracking-[0.28em] font-semibold text-white/50 uppercase">
          ARCHITECTURAL COLLECTION
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
          Curated For Modern Living
        </h2>
        <p className="text-xs sm:text-sm text-white/70 font-light tracking-wide leading-relaxed">
          Discover iconic sculptural forms, soft organic textures, and precision-engineered craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {catalogItems.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.id}`}
            className="group cursor-pointer space-y-3 bg-zinc-950/50 p-4 border border-white/5 hover:border-white/20 transition-all duration-300 rounded-sm block"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 rounded-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 text-[9px] font-semibold tracking-widest text-white uppercase border border-white/10">
                {item.tag}
              </span>
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <span className="text-[10px] text-white/50 tracking-widest uppercase">
                  {item.category}
                </span>
                <h3 className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                  {item.name}
                </h3>
              </div>
              <span className="text-xs font-semibold tracking-wide text-white/90">
                {item.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
