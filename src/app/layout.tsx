import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dileepp.vercel.app"),
  title: "Dileep P | Flutter Developer",
  description: "Senior Flutter Developer specializing in high-performance cross-platform applications.",
  verification: {
    google: '_c6QmI6PJt8a1x0ZruLZUEp34f9czajiI_UQTF4bboY'
  },
  openGraph: {
    title: "Dileep P | Flutter Developer",
    description: "Senior Flutter Developer specializing in high-performance cross-platform applications.",
    url: "https://dileepp.vercel.app",
    siteName: "Dileep P | Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dileep P | Flutter Developer",
    description: "Senior Flutter Developer specializing in high-performance cross-platform applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} bg-[#0a0a0a] text-white antialiased font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
