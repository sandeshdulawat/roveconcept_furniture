import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROVE CONCEPTS | Refined Luxury Living",
  description: "Modern, handcrafted luxury furniture and luxury living spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-white selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
