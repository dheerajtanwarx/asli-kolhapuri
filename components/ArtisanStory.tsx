"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ArtisanStory() {
  const points = [
    { label: "Pure Leather", desc: "Vegetable-tanned, chemical-free" },
    { label: "Hand Stitched", desc: "Every stitch by artisan hands" },
    { label: "Fair Wages", desc: "Direct-to-artisan payment" },
    { label: "Zero Waste", desc: "Scraps repurposed into art" },
  ];

  return (
    <section id="artisan-story" style={{ padding: "var(--section-padding) 0", backgroundColor: "var(--off-white)", overflow: "hidden" }}>
      <div className="container-kw">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: "relative" }}>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/5" }}>
              <Image src="/images/artisan-story.png" alt="Rajasthani artisan crafting Kolhapuri sandals" fill style={{ objectFit: "cover" }} sizes="(max-width:900px)100vw,50vw" />
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} style={{ position: "absolute", bottom: "-30px", right: "-30px", backgroundColor: "var(--near-black)", borderRadius: "16px", padding: "28px 32px", color: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
              <span className="font-display" style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--terracotta)", display: "block", lineHeight: 1 }}>3+</span>
              <span style={{ fontSize: "0.8rem", color: "var(--sand-beige)", letterSpacing: "0.1em", marginTop: "4px", display: "block" }}>Generations of<br />Craftsmanship</span>
            </motion.div>
          </motion.div>

          <div>
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-label" style={{ fontSize: "0.85rem", color: "var(--terracotta)", letterSpacing: "0.15em", display: "block", marginBottom: "16px" }}>Our Heritage</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 600, color: "var(--matte-black)", lineHeight: 1.2, marginBottom: "28px" }}>Where Every Stitch<br />Tells a Story</motion.h2>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--warm-grey)" }}>In the golden lanes of Rajasthan, our family has been crafting Kolhapuri footwear for over three generations. What began as a humble workshop under a banyan tree has become a legacy of artisanal excellence.</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--warm-grey)" }}>Each pair is hand-cut, hand-stitched, and hand-finished using techniques unchanged for centuries. We use only the finest vegetable-tanned leather, sourced responsibly from local tanneries.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "36px" }}>
              {points.map((item) => (
                <div key={item.label} style={{ padding: "16px", backgroundColor: "var(--warm-cream)", borderRadius: "10px", borderLeft: "3px solid var(--terracotta)" }}>
                  <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--matte-black)", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--warm-grey)" }}>{item.desc}</p>
                </div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "20px", borderTop: "1px solid rgba(212,184,150,0.3)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "var(--leather-brown)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>K</div>
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>The Kolhapuri Wala Family</p>
                <p style={{ fontSize: "0.8rem", color: "var(--warm-grey)" }}>Master Artisans, Rajasthan</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width:900px) {
          #artisan-story .container-kw > div { grid-template-columns:1fr !important; gap:60px !important; }
        }
      `}</style>
    </section>
  );
}
