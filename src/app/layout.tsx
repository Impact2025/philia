import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import PhilChat from "@/components/PhilChat";
import ConditionalNav from "@/components/layout/ConditionalNav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Philia | The Human Curator",
    template: "%s | Stichting Philia",
  },
  description:
    "Stichting Philia verbindt mensen die anders langs elkaar heen leven. Via technologie, vrijwilligerswerk en gedeelde beleving creëren we geluksmomenten voor iedereen die dat steuntje in de rug nodig heeft.",
  keywords: [
    "stichting philia",
    "verbinding",
    "eenzaamheid",
    "vrijwilligers",
    "pootgelukkig",
    "samenvaren",
    "sociaal",
    "non-profit",
  ],
  authors: [{ name: "Stichting Philia" }],
  creator: "Stichting Philia",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://stichtingphilia.nl",
    siteName: "Stichting Philia",
    title: "Philia | The Human Curator",
    description:
      "Al meer dan 10 jaar creëren we geluksmomenten voor mensen die anders langs elkaar heen leven.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philia | The Human Curator",
    description: "Verbinding voor iedereen die dat steuntje in de rug nodig heeft.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${playfair.variable} ${inter.variable} ${caveat.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-background text-on-surface antialiased">
        <ConditionalNav />
        {children}
        <PhilChat />
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "#1a1c1c",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
