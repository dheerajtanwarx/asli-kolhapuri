import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Kolhapuri Wala — Authentic Handmade Kolhapuri Footwear | Since Generations",
  description:
    "Real craft. Real leather. Real Rajasthan. Discover authentic handmade Kolhapuri footwear crafted by artisans using techniques passed through generations. Shop men's and women's Kolhapuri chappals.",
  keywords: [
    "Kolhapuri sandals",
    "handmade footwear",
    "leather sandals India",
    "Rajasthan craft",
    "artisan footwear",
    "Kolhapuri chappals",
  ],
  openGraph: {
    title: "Kolhapuri Wala — Authentic Handmade Kolhapuri Footwear",
    description:
      "Real craft. Real leather. Real Rajasthan. Handmade Kolhapuri footwear since generations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
