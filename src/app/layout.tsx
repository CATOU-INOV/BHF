import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { COMPANY } from "@/lib/constants";
import { graphSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-barlow" });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: "Scierie Bois du Haut Forez | Bois de charpente et bois ronds fraisés dans la Loire",
    template: "%s | Bois du Haut Forez",
  },
  description: COMPANY.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: COMPANY.name,
    images: [{ url: "/images/scierie-parc-grumes.jpg", alt: "Parc à grumes de la scierie Bois du Haut Forez à Chalmazel" }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${barlow.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema(localBusinessSchema(), websiteSchema())) }}
        />
        <Header />
        <main className="pb-14 lg:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
