"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--near-black)",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <Image
          src="/images/hero-bg.png"
          alt="Artisan crafting leather in a traditional Rajasthani workshop"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(14,12,10,0.85) 0%, rgba(14,12,10,0.6) 40%, rgba(14,12,10,0.4) 70%, rgba(14,12,10,0.7) 100%)",
          }}
        />
      </div>

      {/* Watermark Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="font-display"
          style={{
            fontSize: "clamp(6rem, 15vw, 18rem)",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          KOLHAPURI
        </motion.span>
      </div>

      {/* Content Container */}
      <div
        className="container-kw"
        style={{
          position: "relative",
          zIndex: 3,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "60px",
          height: "100%",
          paddingTop: "var(--nav-height)",
        }}
      >
        {/* Left Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span
              className="font-label"
              style={{
                display: "inline-block",
                padding: "8px 20px",
                border: "1px solid rgba(212,184,150,0.4)",
                borderRadius: "30px",
                color: "var(--sand-beige)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
              }}
            >
              Handcrafted in Rajasthan
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#fff",
            }}
          >
            Real craft.
            <br />
            <span style={{ color: "var(--sand-beige)" }}>Real leather.</span>
            <br />
            Real Rajasthan.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "480px",
              fontWeight: 300,
            }}
          >
            Authentic handmade Kolhapuri footwear crafted by artisans using
            techniques passed through generations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
          >
            <Link
              href="#mens-collection"
              id="hero-cta-men"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                backgroundColor: "var(--terracotta)",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                border: "2px solid var(--terracotta)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--terracotta-dark)";
                e.currentTarget.style.borderColor = "var(--terracotta-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--terracotta)";
                e.currentTarget.style.borderColor = "var(--terracotta)";
              }}
            >
              Shop Men
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="#womens-collection"
              id="hero-cta-women"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                backgroundColor: "transparent",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                borderRadius: "4px",
                border: "2px solid rgba(255,255,255,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#fff";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Shop Women
            </Link>
          </motion.div>
        </div>

        {/* Right — Floating Product Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="hero-product-area"
        >
          <div className="animate-float" style={{ position: "relative" }}>
            <Image
              src="/images/hero-sandal.png"
              alt="Handcrafted Kolhapuri leather sandal"
              width={520}
              height={520}
              priority
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <motion.circle
            cx="8"
            cy="8"
            r="2"
            fill="currentColor"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Hero responsive styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
          #hero > div:last-of-type:not(.scroll-indicator) {
            grid-template-columns: 1fr !important;
          }
          .hero-product-area {
            display: none !important;
          }
          #hero .container-kw {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
          }
          #hero h1 {
            font-size: clamp(2rem, 8vw, 3.5rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
