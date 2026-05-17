import ProductDetailPage from "./ProductDetailPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import ProductModel from "@/models/Product.model";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  
  try {
    const product = await ProductModel.findById(slug);
    if (!product) return { title: "Product Not Found" };
    return {
      title: `${product.name} — Kolhapuri Wala`,
      description: product.description.substring(0, 100) + "... Authentic handmade Kolhapuri footwear.",
    };
  } catch (error) {
    return { title: "Product Not Found" };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  
  try {
    const p = await ProductModel.findById(slug);
    if (!p) notFound();

    const plain = p.toObject();
    
    // Format to match the Product interface
    const formattedProduct = {
      ...plain,
      _id: plain._id.toString(), // needed for Next.js serialization
      slug: plain._id.toString(),
      images: [plain.image],
      shortDescription: plain.description.substring(0, 60) + "...",
      sizes: plain.category === "Men" ? [6, 7, 8, 9, 10, 11] : [4, 5, 6, 7, 8, 9],
      colors: [{ name: "Default", hex: "#5C3A1E" }],
      style: "Traditional",
      material: "Leather",
      artisan: "Local Artisan",
      artisanLocation: "Kolhapur, India",
      artisanImage: "/images/artisan-story.png",
      rating: 4.8,
      reviewCount: 15,
      inStock: true,
      priceUSD: Math.round(plain.price / 83)
    };

    return <ProductDetailPage product={formattedProduct as any} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
