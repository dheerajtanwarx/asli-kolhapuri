import type { Metadata } from "next";
import MensCollectionPage from "./MensCollectionPage";

export const metadata: Metadata = {
  title: "Men's Kolhapuri Collection — Kolhapuri Wala",
  description: "Shop authentic handmade Kolhapuri chappals for men. Traditional braided, cross-strap, T-strap, slides, and festive juttis. Crafted by Rajasthani artisans.",
};

export default function MenPage() {
  return <MensCollectionPage />;
}
