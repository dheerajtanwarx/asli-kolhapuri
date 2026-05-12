import type { Metadata } from "next";
import WomensCollectionPage from "./WomensCollectionPage";

export const metadata: Metadata = {
  title: "Women's Kolhapuri Collection — Kolhapuri Wala",
  description: "Shop authentic handmade Kolhapuri chappals for women. Embroidered, beaded, flats, slides, mojari, and wedges. Crafted by Rajasthani artisans.",
};

export default function WomenPage() {
  return <WomensCollectionPage />;
}
