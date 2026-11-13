import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND, SITE_URL } from "@/lib/seo/constants";
import { canonicalUrl } from "@/lib/seo/metadata";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `Northern Climate Lawn Care | ${BRAND}`,
    template: `%s`,
  },
  description:
    "Northern-climate lawn care for Canadian homes and businesses. Quiet mowing, aeration, fertilization, and seasonal programs. Call 1-800-CAN-LAWN.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: canonicalUrl("/") },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={jakarta.className}>
        <Header />
        <main className="w-full pt-28 min-h-screen bg-surface">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
