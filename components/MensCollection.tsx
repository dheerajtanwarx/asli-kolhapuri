"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const mensProducts = [
  {
    name: "Classic Braided Chappal",
    price: "₹1,499",
    priceUSD: "$18",
    image: "/images/hero-sandal.png",
  },
  {
    name: "Traditional Cross Strap",
    price: "₹1,799",
    priceUSD: "$22",
    image: "/images/hero-sandal.png",
  },
  {
    name: "Heritage T-Strap",
    price: "₹1,999",
    priceUSD: "$24",
    image: "/images/hero-sandal.png",
  },
  {
    name: "Artisan Slide",
    price: "₹1,299",
    priceUSD: "$16",
    image: "/images/hero-sandal.png",
  },
];

export default function MensCollection() {
  return (
    <section
      id="mens-collection"
      style={{
        padding: "var(--section-padding) 0",
        backgroundColor: "var(--off-white)",
        overflow: "hidden",
      }}
    >
      <div className="container-kw">
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-label"
              style={{
                fontSize: "0.85rem",
                color: "var(--terracotta)",
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: "12px",
              }}
            >
              For Him
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 600,
                color: "var(--matte-black)",
                lineHeight: 1.2,
              }}
            >
              Men&apos;s Collection
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/men"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--terracotta)",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                transition: "gap 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
            >
              View All
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Collection Image + Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "stretch" }}>
          {/* Left — Large Collection Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              minHeight: "500px",
            }}
          >
            <Image
              src="/images/mens-collection.png"
              alt="Men's Kolhapuri sandal collection"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "40px",
                background: "linear-gradient(transparent, rgba(14,12,10,0.8))",
              }}
            >
              <p
                className="font-label"
                style={{
                  color: "var(--sand-beige)",
                  fontSize: "0.85rem",
                  marginBottom: "8px",
                }}
              >
                Crafted for the modern man
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.9rem",
                  maxWidth: "300px",
                  lineHeight: 1.6,
                }}
              >
                Every pair tells a story of generations of craftsmanship, designed
                for comfort and timeless style.
              </p>
            </div>
          </motion.div>

          {/* Right — Product Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {mensProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  backgroundColor: "var(--warm-cream)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(123,74,45,0.12)";
                  e.currentTarget.style.borderColor = "var(--sand-beige)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "1",
                    backgroundColor: "#F0EAD6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                    style={{ objectFit: "contain", transition: "transform 0.4s ease" }}
                  />
                </div>
                <div style={{ padding: "16px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "var(--matte-black)",
                      marginBottom: "4px",
                    }}
                  >
                    {product.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--terracotta)",
                      }}
                    >
                      {product.price}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--warm-grey)",
                      }}
                    >
                      {product.priceUSD}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          #mens-collection .container-kw > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #mens-collection .container-kw > div:last-child > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
