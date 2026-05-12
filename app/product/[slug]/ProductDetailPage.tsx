"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getRelatedProducts, productReviews, type Product } from "../../lib/products";

export default function ProductDetailPage({ product }: { product: Product }) {
  const [mainImg, setMainImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const related = getRelatedProducts(product);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)", backgroundColor: "var(--off-white)" }}>
        {/* Breadcrumb */}
        <div className="container-kw" style={{ padding: "20px 40px" }}>
          <div style={{ display: "flex", gap: "8px", fontSize: "0.8rem", color: "var(--warm-grey)" }}>
            <Link href="/" style={{ color: "var(--warm-grey)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href={`/${product.category}`} style={{ color: "var(--warm-grey)", textDecoration: "none", textTransform: "capitalize" }}>{product.category}</Link>
            <span>/</span>
            <span style={{ color: "var(--matte-black)" }}>{product.name}</span>
          </div>
        </div>

        {/* Section 1: Image Gallery + Product Info (Step 14) */}
        <section className="container-kw" style={{ padding: "20px 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
          {/* Left: Image Gallery */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "relative", aspectRatio: "1", borderRadius: "16px", overflow: "hidden", backgroundColor: "#F0EAD6", marginBottom: "16px" }}>
              <Image src={product.images[mainImg]} alt={product.name} fill style={{ objectFit: "cover" }} sizes="50vw" priority />
              {product.badge && <span style={{ position: "absolute", top: "20px", left: "20px", padding: "6px 18px", borderRadius: "20px", backgroundColor: "var(--terracotta)", color: "#fff", fontSize: "0.75rem", fontWeight: 600 }}>{product.badge}</span>}
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setMainImg(i)} style={{ position: "relative", aspectRatio: "1", borderRadius: "10px", overflow: "hidden", border: mainImg === i ? "3px solid var(--terracotta)" : "2px solid transparent", cursor: "pointer", padding: 0, backgroundColor: "#F0EAD6", transition: "border-color 0.2s ease" }}>
                  <Image src={img} alt={`View ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="12vw" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "var(--terracotta)" : "#ddd"} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{product.rating}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--warm-grey)" }}>({product.reviewCount} reviews)</span>
              </div>

              <h1 className="font-display" style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--matte-black)", marginBottom: "8px", lineHeight: 1.2 }}>{product.name}</h1>
              <p className="font-label" style={{ fontSize: "0.85rem", color: "var(--warm-grey)", marginBottom: "20px" }}>{product.shortDescription}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
                <span className="font-display" style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--terracotta)" }}>₹{product.price.toLocaleString()}</span>
                <span style={{ fontSize: "1rem", color: "var(--warm-grey)" }}>${product.priceUSD}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--warm-grey)", padding: "3px 10px", backgroundColor: "rgba(194,96,63,0.1)", borderRadius: "4px" }}>Incl. taxes</span>
              </div>

              <p style={{ fontSize: "0.95rem", color: "var(--warm-grey)", lineHeight: 1.8, marginBottom: "32px" }}>{product.description}</p>

              {/* Color Select */}
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Color: <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>{product.colors[selectedColor].name}</span></p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {product.colors.map((c, i) => (
                    <button key={c.name} onClick={() => setSelectedColor(i)} style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: c.hex, border: selectedColor === i ? "3px solid var(--terracotta)" : "2px solid #ddd", cursor: "pointer", outline: selectedColor === i ? "2px solid var(--off-white)" : "none", transition: "all 0.2s ease", padding: 0 }} title={c.name} />
                  ))}
                </div>
              </div>

              {/* Size Select */}
              <div style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Size (UK)</p>
                  <button style={{ fontSize: "0.78rem", color: "var(--terracotta)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", textDecoration: "underline" }}>Size Guide</button>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{ width: "48px", height: "48px", borderRadius: "10px", border: selectedSize === s ? "2px solid var(--terracotta)" : "1px solid var(--sand-beige)", backgroundColor: selectedSize === s ? "var(--terracotta)" : "transparent", color: selectedSize === s ? "#fff" : "var(--matte-black)", fontSize: "0.85rem", fontWeight: 500, fontFamily: "var(--font-body)", cursor: "pointer", transition: "all 0.2s ease" }}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Qty + Add to Cart */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--sand-beige)", borderRadius: "10px", overflow: "hidden" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: "44px", height: "50px", border: "none", backgroundColor: "transparent", fontSize: "1.2rem", cursor: "pointer", color: "var(--matte-black)" }}>−</button>
                  <span style={{ width: "44px", textAlign: "center", fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} style={{ width: "44px", height: "50px", border: "none", backgroundColor: "transparent", fontSize: "1.2rem", cursor: "pointer", color: "var(--matte-black)" }}>+</button>
                </div>
                <button style={{ flex: 1, padding: "16px", backgroundColor: "var(--terracotta)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", letterSpacing: "0.05em", transition: "background-color 0.3s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--terracotta-dark)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--terracotta)")}>
                  Add to Cart — ₹{(product.price * qty).toLocaleString()}
                </button>
                <button style={{ width: "50px", height: "50px", border: "1px solid var(--sand-beige)", borderRadius: "10px", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--matte-black)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                </button>
              </div>

              {/* Trust Points */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "20px", backgroundColor: "var(--warm-cream)", borderRadius: "12px" }}>
                {[
                  { icon: "🚚", text: "Free Shipping Worldwide" },
                  { icon: "↩️", text: "30-Day Easy Returns" },
                  { icon: "✋", text: "100% Handcrafted" },
                  { icon: "🌿", text: "Eco-Friendly Leather" },
                ].map(t => (
                  <div key={t.text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "1.1rem" }}>{t.icon}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--warm-grey)" }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: How It's Made + Meet the Artisan (Step 15) */}
        <section style={{ backgroundColor: "var(--near-black)", padding: "100px 0" }}>
          <div className="container-kw" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="font-label" style={{ fontSize: "0.85rem", color: "var(--terracotta)", letterSpacing: "0.15em", display: "block", marginBottom: "16px" }}>The Craft Behind This Pair</span>
              <h2 className="font-heading" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: "24px" }}>How It&apos;s Made</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {[
                  { num: "01", title: "Leather Selection", desc: "Premium vegetable-tanned hide, hand-selected for texture and grain." },
                  { num: "02", title: "Hand Cutting", desc: "Each piece precision-cut using traditional tools and templates." },
                  { num: "03", title: "Braiding & Assembly", desc: "Intricate leather braids woven and stitched by skilled hands." },
                  { num: "04", title: "Finishing & Polish", desc: "Oil-rubbed and sun-dried for a natural sheen that ages beautifully." },
                ].map(step => (
                  <div key={step.num} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <span className="font-display" style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--terracotta)", lineHeight: 1, minWidth: "40px" }}>{step.num}</span>
                    <div>
                      <p style={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem", marginBottom: "4px" }}>{step.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Meet the Artisan */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/5", marginBottom: "24px" }}>
                <Image src={product.artisanImage} alt={`Artisan ${product.artisan}`} fill style={{ objectFit: "cover" }} sizes="50vw" />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px", background: "linear-gradient(transparent, rgba(14,12,10,0.85))" }}>
                  <span className="font-label" style={{ fontSize: "0.75rem", color: "var(--sand-beige)", letterSpacing: "0.12em", display: "block", marginBottom: "6px" }}>Meet the Artisan</span>
                  <p className="font-heading" style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>{product.artisan}</p>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{product.artisanLocation}</p>
                </div>
              </div>
              <div style={{ padding: "24px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div><p style={{ fontSize: "0.7rem", color: "var(--warm-grey)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Material</p><p style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 500 }}>{product.material}</p></div>
                  <div><p style={{ fontSize: "0.7rem", color: "var(--warm-grey)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Style</p><p style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 500 }}>{product.style}</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Reviews + Related Products (Step 16) */}
        <section style={{ padding: "100px 0", backgroundColor: "var(--off-white)" }}>
          <div className="container-kw">
            {/* Tab Switcher */}
            <div style={{ display: "flex", gap: "32px", borderBottom: "2px solid var(--sand-beige)", marginBottom: "48px" }}>
              {[{ key: "reviews", label: `Reviews (${product.reviewCount})` }, { key: "related", label: "You May Also Like" }].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: "12px 0", border: "none", backgroundColor: "transparent", fontSize: "1rem", fontWeight: activeTab === tab.key ? 600 : 400, color: activeTab === tab.key ? "var(--terracotta)" : "var(--warm-grey)", cursor: "pointer", fontFamily: "var(--font-heading)", borderBottom: activeTab === tab.key ? "3px solid var(--terracotta)" : "3px solid transparent", marginBottom: "-2px", transition: "all 0.3s ease", letterSpacing: "0.03em" }}>{tab.label}</button>
              ))}
            </div>

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: "flex", gap: "48px", marginBottom: "48px", alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center", padding: "32px 48px", backgroundColor: "var(--warm-cream)", borderRadius: "16px" }}>
                    <span className="font-display" style={{ fontSize: "3.5rem", fontWeight: 700, color: "var(--terracotta)", display: "block", lineHeight: 1 }}>{product.rating}</span>
                    <div style={{ display: "flex", gap: "3px", justifyContent: "center", margin: "8px 0" }}>
                      {[...Array(5)].map((_, i) => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "var(--terracotta)" : "#ddd"} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--warm-grey)" }}>{product.reviewCount} reviews</span>
                  </div>
                  <div style={{ flex: 1, minWidth: "300px" }}>
                    {[5, 4, 3, 2, 1].map(star => {
                      const count = productReviews.filter(r => r.rating === star).length;
                      const pct = (count / productReviews.length) * 100;
                      return (
                        <div key={star} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                          <span style={{ fontSize: "0.8rem", width: "24px", textAlign: "right", color: "var(--warm-grey)" }}>{star}★</span>
                          <div style={{ flex: 1, height: "8px", backgroundColor: "var(--warm-cream)", borderRadius: "4px", overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", backgroundColor: "var(--terracotta)", borderRadius: "4px", transition: "width 0.5s ease" }} />
                          </div>
                          <span style={{ fontSize: "0.75rem", color: "var(--warm-grey)", width: "20px" }}>{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {productReviews.map(r => (
                    <div key={r.id} style={{ padding: "24px", backgroundColor: "var(--warm-cream)", borderRadius: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{r.name}</span>
                            {r.verified && <span style={{ fontSize: "0.65rem", padding: "2px 8px", backgroundColor: "rgba(46,139,87,0.1)", color: "#2E8B57", borderRadius: "4px", fontWeight: 600 }}>Verified</span>}
                          </div>
                          <span style={{ fontSize: "0.75rem", color: "var(--warm-grey)" }}>{r.location}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2px" }}>
                          {[...Array(r.rating)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--terracotta)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}
                        </div>
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "var(--matte-black)", lineHeight: 1.7 }}>{r.text}</p>
                      <span style={{ fontSize: "0.72rem", color: "var(--warm-grey)", marginTop: "8px", display: "block" }}>{new Date(r.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Products Tab */}
            {activeTab === "related" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "28px" }}>
                  {related.map(rp => (
                    <Link key={rp.slug} href={`/product/${rp.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ backgroundColor: "var(--warm-cream)", borderRadius: "14px", overflow: "hidden", transition: "all 0.3s ease", border: "1px solid transparent" }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(123,74,45,0.12)"; e.currentTarget.style.borderColor = "var(--sand-beige)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "transparent"; }}>
                        <div style={{ position: "relative", aspectRatio: "1", backgroundColor: "#F0EAD6" }}>
                          <Image src={rp.images[0]} alt={rp.name} fill style={{ objectFit: "cover" }} sizes="25vw" />
                        </div>
                        <div style={{ padding: "16px" }}>
                          <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 600, marginBottom: "4px" }}>{rp.name}</p>
                          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--terracotta)" }}>₹{rp.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style jsx global>{`
        @media (max-width: 900px) {
          .container-kw > section:first-of-type,
          #product-gallery-info { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
