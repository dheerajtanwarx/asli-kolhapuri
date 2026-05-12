"use client";

import { motion } from "framer-motion";

const trustItems = [
  "✦ 100% Genuine Leather",
  "✦ Handcrafted by Artisans",
  "✦ Free Shipping Worldwide",
  "✦ 30-Day Returns",
  "✦ Since 3 Generations",
  "✦ Rajasthan Heritage",
  "✦ Eco-Friendly Process",
  "✦ Fair Trade Certified",
];

export default function Marquee() {
  const items = [...trustItems, ...trustItems]; // Doubled for seamless loop

  return (
    <section
      id="trust-ticker"
      style={{
        backgroundColor: "var(--near-black)",
        borderTop: "1px solid rgba(212,184,150,0.15)",
        borderBottom: "1px solid rgba(212,184,150,0.15)",
        padding: "18px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: "60px",
            whiteSpace: "nowrap",
            width: "fit-content",
          }}
        >
          {items.map((item, i) => (
            <span
              key={i}
              className="font-label"
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                color: "var(--sand-beige)",
                opacity: 0.8,
                flexShrink: 0,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
