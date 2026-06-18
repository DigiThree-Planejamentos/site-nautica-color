import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/layout/AppShell";
import { Footer } from "@/components/layout/Footer";
import { storeConfig } from "@/config/store";
import { getSettings } from "@/lib/catalog/get-settings";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: "Náutica Color | Tintas e Produtos Náuticos em Angra dos Reis",
  description: storeConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Náutica Color | Tintas e Produtos Náuticos em Angra dos Reis",
    description: storeConfig.description,
    url: storeConfig.siteUrl,
    siteName: "Náutica Color",
    locale: "pt_BR",
    type: "website"
  },
  icons: { icon: "/favicon.svg" }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Náutica Color",
    description: storeConfig.description,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Angra dos Reis",
      addressRegion: "RJ",
      addressCountry: "BR"
    },
    url: storeConfig.siteUrl
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <AppShell settings={settings}>
          {children}
          <Footer settings={settings} />
        </AppShell>
        <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
