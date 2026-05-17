"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "../lib/store";


export default function SearchDrawer() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/product?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          const formatted = data.products.map((p: any) => ({
            ...p,
            slug: p._id,
            images: [p.image]
          }));
          setResults(formatted);
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex" }}>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            style={{ position: "absolute", inset: 0, backgroundColor: "rgba(14, 12, 10, 0.6)", backdropFilter: "blur(4px)" }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "relative",
              marginLeft: "auto",
              width: "100%",
              maxWidth: "500px",
              height: "100%",
              backgroundColor: "var(--off-white)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(212,184,150,0.3)", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--warm-cream)" }}>
              <h2 className="font-heading" style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--matte-black)", margin: 0 }}>Search</h2>
              <button
                onClick={() => setSearchOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--warm-grey)", padding: "4px", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--terracotta)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--warm-grey)"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Search Input Area */}
            <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(212,184,150,0.3)" }}>
              <div style={{ position: "relative" }}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for sandals, categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px 20px 16px 48px",
                    borderRadius: "8px",
                    border: "1px solid var(--sand-beige)",
                    backgroundColor: "#fff",
                    fontSize: "1rem",
                    fontFamily: "var(--font-body)",
                    outline: "none",
                  }}
                />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warm-grey)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                {loading && (
                  <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: "20px", height: "20px", border: "2px solid var(--sand-beige)", borderTopColor: "var(--terracotta)", borderRadius: "50%" }} />
                  </div>
                )}
              </div>
            </div>

            {/* Results Area */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
              {query.trim() === "" ? (
                <div style={{ textAlign: "center", paddingTop: "40px", color: "var(--warm-grey)" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: "0 auto 16px", opacity: 0.5 }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <p style={{ fontFamily: "var(--font-body)" }}>Start typing to discover our collections</p>
                </div>
              ) : results.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--warm-grey)", marginBottom: "8px" }}>Found {results.length} results for "{query}"</p>
                  {results.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/product/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "12px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(212,184,150,0.2)",
                        transition: "border-color 0.2s, box-shadow 0.2s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--sand-beige)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,184,150,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "6px", overflow: "hidden", backgroundColor: "var(--warm-cream)", flexShrink: 0 }}>
                        <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "4px" }}>{product.name}</h3>
                        <p style={{ fontSize: "0.85rem", color: "var(--warm-grey)", marginBottom: "6px" }}>{product.category}</p>
                        <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--terracotta)" }}>₹{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : !loading ? (
                <div style={{ textAlign: "center", paddingTop: "40px", color: "var(--warm-grey)" }}>
                  <p style={{ fontFamily: "var(--font-body)" }}>No products found for "{query}"</p>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
