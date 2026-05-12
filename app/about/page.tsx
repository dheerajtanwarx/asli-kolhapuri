"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)", backgroundColor: "var(--off-white)" }}>

        {/* Hero Section */}
        <section style={{ padding: "80px 40px", textAlign: "center" }}>
          <div className="container-kw" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-label" style={{ fontSize: "0.85rem", color: "var(--terracotta)", letterSpacing: "0.15em", display: "block", marginBottom: "16px" }}>Our Heritage</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "var(--matte-black)", lineHeight: 1.1, marginBottom: "24px" }}>Three Generations of Authentic Craftsmanship</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontSize: "1.1rem", color: "var(--warm-grey)", lineHeight: 1.8 }}>We don&apos;t just make shoes; we preserve a legacy. Kolhapuri Wala represents the soul of Rajasthan, brought to life through the hands of master artisans whose skills have been refined over decades.</motion.p>
          </div>
        </section>

        {/* Story Content Split */}
        <section style={{ padding: "0 0 100px", overflow: "hidden" }}>
          <div className="container-kw" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "4/5" }}>
              <Image src="/images/artisan-story.png" alt="Master artisan at work" fill style={{ objectFit: "cover" }} sizes="50vw" />
            </motion.div>

            {/* Text */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="font-heading" style={{ fontSize: "2.5rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "24px" }}>From the Desert to the World</h2>
              <p style={{ fontSize: "1rem", color: "var(--warm-grey)", lineHeight: 1.8, marginBottom: "24px" }}>
                What began as a small workshop in a dusty village of Rajasthan has grown into a beacon of traditional Indian footwear. Our founder learned the art of leather-crafting under a banyan tree, mastering the intricate braids and durable stitching that characterize authentic Kolhapuri chappals.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--warm-grey)", lineHeight: 1.8, marginBottom: "40px" }}>
                Today, we partner directly with over 50 artisan families across Jodhpur, Jaipur, and Udaipur. We provide fair wages, safe working conditions, and a global platform for their incredible talent, ensuring this ancient craft not only survives but thrives in the modern world.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                <div>
                  <h3 className="font-display" style={{ fontSize: "3rem", fontWeight: 700, color: "var(--terracotta)", marginBottom: "8px", lineHeight: 1 }}>50+</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--matte-black)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Artisan Families</p>
                </div>
                <div>
                  <h3 className="font-display" style={{ fontSize: "3rem", fontWeight: 700, color: "var(--terracotta)", marginBottom: "8px", lineHeight: 1 }}>100%</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--matte-black)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Handcrafted</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Materials Banner */}
        <section style={{ backgroundColor: "var(--near-black)", padding: "100px 0", color: "#fff", textAlign: "center" }}>
          <div className="container-kw" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="font-label" style={{ fontSize: "0.85rem", color: "var(--sand-beige)", letterSpacing: "0.15em", display: "block", marginBottom: "16px" }}>The Materials</span>
            <h2 className="font-heading" style={{ fontSize: "2.5rem", fontWeight: 600, marginBottom: "24px" }}>Vegetable Tanned Leather</h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "40px" }}>
              We use only premium, chemical-free, vegetable-tanned leather sourced responsibly. This traditional tanning process uses natural tree bark and leaves, making the leather biodegradable, incredibly durable, and capable of developing a rich patina unique to the wearer.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "2rem" }}>🌿</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.05em" }}>Chemical Free</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "2rem" }}>⏳</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.05em" }}>Ages Beautifully</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "2rem" }}>♻️</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.05em" }}>Biodegradable</span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx global>{`
        @media (max-width: 900px) {
          main > section:nth-of-type(2) .container-kw { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
