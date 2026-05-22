"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { type Product } from "../../lib/products";
import { useStore } from "../../lib/store";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)", minHeight: "100vh", backgroundColor: "var(--off-white)", paddingBottom: "100px" }}>
        <div className="container-kw" style={{ padding: "60px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--matte-black)", marginBottom: "16px" }}>Your Wishlist</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ color: "var(--warm-grey)" }}>{wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved</motion.p>
          </div>

          {wishlist.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <p className="font-heading" style={{ fontSize: "1.5rem", color: "var(--matte-black)", marginBottom: "8px" }}>Your wishlist is empty</p>
              <p style={{ color: "var(--warm-grey)", fontSize: "0.9rem", marginBottom: "32px" }}>Save your favorite items here to find them easily later.</p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <Link href="/men" style={{ padding: "12px 28px", backgroundColor: "var(--terracotta)", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Shop Men</Link>
                <Link href="/women" style={{ padding: "12px 28px", backgroundColor: "transparent", border: "2px solid var(--terracotta)", color: "var(--terracotta)", textDecoration: "none", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Shop Women</Link>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px" }}>
              <AnimatePresence mode="popLayout">
                {wishlist.map((product, i) => (
                  <WishlistCard key={product.slug} product={product} index={i} onRemove={() => removeFromWishlist(product.slug)} onAddToCartClick={() => setShowLoginModal(true)} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowLoginModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🔐</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--matte-black)", marginBottom: "12px" }}>
              Login Required
            </h2>
            <p style={{ color: "var(--warm-grey)", fontSize: "0.95rem", marginBottom: "24px", lineHeight: 1.6 }}>
              You must be logged in to add items to your cart. Sign in to your account or create a new one to continue shopping.
            </p>
            <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
              <Link href="/login" style={{ padding: "14px", backgroundColor: "var(--terracotta)", color: "#fff", textDecoration: "none", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", display: "block", transition: "background-color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--terracotta-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--terracotta)")}
              >
                Go to Login
              </Link>
              <Link href="/register" style={{ padding: "14px", backgroundColor: "var(--warm-cream)", color: "var(--terracotta)", textDecoration: "none", border: "2px solid var(--terracotta)", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", display: "block", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--terracotta)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--warm-cream)";
                  e.currentTarget.style.color = "var(--terracotta)";
                }}
              >
                Create New Account
              </Link>
              <button
                onClick={() => setShowLoginModal(false)}
                style={{
                  padding: "12px",
                  backgroundColor: "transparent",
                  color: "var(--warm-grey)",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--matte-black)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-grey)")}
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function WishlistCard({ product, index, onRemove, onAddToCartClick }: { product: Product; index: number; onRemove: () => void; onAddToCartClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const { status } = useSession();
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    if (status !== "authenticated") {
      onAddToCartClick();
      return;
    }
    addToCart({
      ...product,
      qty: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0].name,
    });
  };
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }} transition={{ delay: index * 0.05 }} style={{ position: "relative" }}>
      {/* Remove Button */}
      <button onClick={onRemove} style={{ position: "absolute", top: "12px", right: "12px", zIndex: 10, width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#fff", border: "1px solid var(--sand-beige)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--matte-black)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} aria-label="Remove from wishlist">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>

      <Link href={`/product/${product.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: "var(--warm-cream)", borderRadius: "14px", overflow: "hidden", transition: "all 0.4s ease", transform: hovered ? "translateY(-8px)" : "translateY(0)", boxShadow: hovered ? "0 16px 48px rgba(123,74,45,0.15)" : "0 2px 12px rgba(0,0,0,0.04)", border: hovered ? "1px solid var(--sand-beige)" : "1px solid transparent", cursor: "pointer" }}>
          <div style={{ position: "relative", aspectRatio: "1", backgroundColor: "#F0EAD6", overflow: "hidden" }}>
            <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: "cover", transition: "transform 0.6s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 33vw" />
            <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", opacity: hovered ? 1 : 0, transition: "all 0.3s ease", width: "calc(100% - 28px)" }}>
              <button style={{ width: "100%", padding: "10px", backgroundColor: "var(--terracotta)", border: "none", color: "#fff", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer" }} onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}>Add to Cart</button>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "4px" }}>{product.name}</p>
            <p style={{ fontSize: "0.78rem", color: "var(--warm-grey)", marginBottom: "10px", lineHeight: 1.5 }}>{product.shortDescription}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 700, color: "var(--terracotta)" }}>₹{product.price.toLocaleString()}</span>
              <span style={{ fontSize: "0.78rem", color: "var(--warm-grey)" }}>${product.priceUSD}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
