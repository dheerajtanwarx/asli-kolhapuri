"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import mensCollectionImg from "../public/images/mens-collection.png";

import { useEffect, useState } from "react";

export default function MensCollection() {
  const [mensProducts, setMensProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        if (data.success) {
          // Sort newest first so recently added products appear at top
          const sorted = [...data.products].sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          const men = sorted.filter((p: any) => p.category?.toLowerCase() === "men").slice(0, 4);
          setMensProducts(men);
        }
      } catch (error) {
        console.error("Failed to fetch mens products", error);
      }
    }
    fetchProducts();
  }, []);
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
            className="collection-hero-img"
            style={{
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              minHeight: "500px",
            }}
          >
            <Image
              src={mensCollectionImg}
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
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <motion.div
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
                    height: "100%",
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
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100%", height: "180px", objectFit: "cover", transition: "transform 0.4s ease", borderRadius: "8px" }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
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
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--warm-grey)",
                        }}
                      >
                        ${Math.round(product.price / 83)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
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
        @media (max-width: 500px) {
          #mens-collection .container-kw > div:last-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #mens-collection .collection-hero-img {
            min-height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
