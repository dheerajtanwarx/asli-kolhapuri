"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { mensProducts, styleFilters, priceRanges, sortOptions, type Product } from "../../lib/products";

export default function MensCollectionPage() {
  const [activeStyle, setActiveStyle] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [activeSort, setActiveSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...mensProducts];
    if (activeStyle !== "All") result = result.filter(p => p.style === activeStyle);
    const range = priceRanges[activePriceRange];
    result = result.filter(p => p.price >= range.min && p.price <= range.max);
    switch (activeSort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "reviews": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return result;
  }, [activeStyle, activePriceRange, activeSort]);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", backgroundColor: "var(--off-white)" }}>
        {/* Hero Banner */}
        <section style={{ position: "relative", height: "340px", overflow: "hidden", backgroundColor: "var(--near-black)" }}>
          <Image src="/images/mens-collection.png" alt="Men's Kolhapuri Collection" fill style={{ objectFit: "cover", opacity: 0.35 }} sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent, rgba(14,12,10,0.7))" }} />
          <div className="container-kw" style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "48px" }}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-label" style={{ fontSize: "0.85rem", color: "var(--sand-beige)", letterSpacing: "0.15em", marginBottom: "12px" }}>Kolhapuri Wala</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>Men&apos;s Collection</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginTop: "12px", maxWidth: "500px" }}>{mensProducts.length} handcrafted styles for the modern man</motion.p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="container-kw" style={{ padding: "48px 40px 120px" }}>
          {/* Filter Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            {/* Style Tabs */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {styleFilters.men.map(style => (
                <button key={style} onClick={() => setActiveStyle(style)} style={{ padding: "8px 20px", borderRadius: "30px", border: activeStyle === style ? "2px solid var(--terracotta)" : "1px solid var(--sand-beige)", backgroundColor: activeStyle === style ? "var(--terracotta)" : "transparent", color: activeStyle === style ? "#fff" : "var(--matte-black)", fontSize: "0.8rem", fontWeight: 500, fontFamily: "var(--font-body)", cursor: "pointer", transition: "all 0.3s ease", letterSpacing: "0.03em" }}>{style}</button>
              ))}
            </div>
            {/* Sort & Filter Toggle */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button onClick={() => setShowFilters(!showFilters)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "transparent", fontSize: "0.8rem", fontFamily: "var(--font-body)", cursor: "pointer", color: "var(--matte-black)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="10" y2="18" /></svg>
                Filters
              </button>
              <select value={activeSort} onChange={e => setActiveSort(e.target.value)} style={{ padding: "8px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "transparent", fontSize: "0.8rem", fontFamily: "var(--font-body)", cursor: "pointer", color: "var(--matte-black)", outline: "none" }}>
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Expandable Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", marginBottom: "32px" }}>
                <div style={{ padding: "24px", backgroundColor: "var(--warm-cream)", borderRadius: "12px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
                  <div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--warm-grey)", marginBottom: "12px" }}>Price Range</p>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {priceRanges.map((r, i) => (
                        <button key={r.label} onClick={() => setActivePriceRange(i)} style={{ padding: "6px 14px", borderRadius: "6px", border: activePriceRange === i ? "2px solid var(--terracotta)" : "1px solid var(--sand-beige)", backgroundColor: activePriceRange === i ? "rgba(194,96,63,0.1)" : "transparent", color: activePriceRange === i ? "var(--terracotta)" : "var(--matte-black)", fontSize: "0.78rem", fontFamily: "var(--font-body)", cursor: "pointer", fontWeight: activePriceRange === i ? 600 : 400, transition: "all 0.2s ease" }}>{r.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <p style={{ fontSize: "0.85rem", color: "var(--warm-grey)", marginBottom: "24px" }}>Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}</p>

          {/* Product Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px" }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <p className="font-heading" style={{ fontSize: "1.5rem", color: "var(--matte-black)", marginBottom: "8px" }}>No products found</p>
              <p style={{ color: "var(--warm-grey)", fontSize: "0.9rem" }}>Try adjusting your filters</p>
              <button onClick={() => { setActiveStyle("All"); setActivePriceRange(0); }} style={{ marginTop: "20px", padding: "12px 28px", backgroundColor: "var(--terracotta)", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer" }}>Clear Filters</button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: index * 0.05 }}>
      <Link href={`/product/${product.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: "var(--warm-cream)", borderRadius: "14px", overflow: "hidden", transition: "all 0.4s ease", transform: hovered ? "translateY(-8px)" : "translateY(0)", boxShadow: hovered ? "0 16px 48px rgba(123,74,45,0.15)" : "0 2px 12px rgba(0,0,0,0.04)", border: hovered ? "1px solid var(--sand-beige)" : "1px solid transparent", cursor: "pointer" }}>
          {/* Image */}
          <div style={{ position: "relative", aspectRatio: "1", backgroundColor: "#F0EAD6", overflow: "hidden" }}>
            <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: "cover", transition: "transform 0.6s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 33vw" />
            {product.badge && (
              <span style={{ position: "absolute", top: "14px", left: "14px", padding: "5px 14px", borderRadius: "20px", backgroundColor: product.badge === "Best Seller" ? "var(--terracotta)" : product.badge === "Premium" ? "var(--near-black)" : product.badge === "New Arrival" ? "var(--leather-brown)" : "var(--matte-black)", color: "#fff", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", fontFamily: "var(--font-body)" }}>{product.badge}</span>
            )}
            {/* Quick action on hover */}
            <div style={{ position: "absolute", bottom: "14px", right: "14px", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "all 0.3s ease" }}>
              <span style={{ padding: "10px 20px", backgroundColor: "rgba(14,12,10,0.85)", backdropFilter: "blur(10px)", color: "#fff", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>View Details →</span>
            </div>
          </div>
          {/* Info */}
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--terracotta)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--matte-black)" }}>{product.rating}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--warm-grey)" }}>({product.reviewCount})</span>
            </div>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "4px" }}>{product.name}</p>
            <p style={{ fontSize: "0.78rem", color: "var(--warm-grey)", marginBottom: "10px", lineHeight: 1.5 }}>{product.shortDescription}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 700, color: "var(--terracotta)" }}>₹{product.price.toLocaleString()}</span>
              <span style={{ fontSize: "0.78rem", color: "var(--warm-grey)" }}>${product.priceUSD}</span>
            </div>
            {/* Color swatches */}
            <div style={{ display: "flex", gap: "6px", marginTop: "12px" }}>
              {product.colors.map(c => (
                <span key={c.name} title={c.name} style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: c.hex, border: "2px solid rgba(255,255,255,0.8)", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
