"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "../lib/products";

// Mock cart data
const mockCartItems = [
  { ...allProducts[0], qty: 1, selectedSize: 8, selectedColor: "Natural Tan" },
  { ...allProducts[8], qty: 2, selectedSize: 6, selectedColor: "Tan with Red" },
];

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const subtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(14,12,10,0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "420px",
              backgroundColor: "var(--off-white)",
              zIndex: 1001,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--sand-beige)", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "var(--warm-cream)" }}>
              <h2 className="font-heading" style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--matte-black)" }}>Your Cart (3)</h2>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--warm-grey)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {mockCartItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px" }}>
                    <div style={{ position: "relative", width: "90px", height: "90px", backgroundColor: "#F0EAD6", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                      <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                        <Link href={`/product/${item.slug}`} onClick={onClose} style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 600, color: "var(--matte-black)", textDecoration: "none" }}>{item.name}</Link>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--warm-grey)" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--warm-grey)", marginBottom: "8px" }}>Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--sand-beige)", borderRadius: "6px", overflow: "hidden" }}>
                          <button style={{ width: "28px", height: "28px", border: "none", backgroundColor: "transparent", cursor: "pointer" }}>-</button>
                          <span style={{ width: "28px", textAlign: "center", fontSize: "0.85rem", fontWeight: 500 }}>{item.qty}</span>
                          <button style={{ width: "28px", height: "28px", border: "none", backgroundColor: "transparent", cursor: "pointer" }}>+</button>
                        </div>
                        <span style={{ fontWeight: 600, color: "var(--terracotta)", fontSize: "0.95rem" }}>₹{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: "32px", borderTop: "1px solid var(--sand-beige)", backgroundColor: "var(--warm-cream)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "1.1rem" }}>
                <span style={{ fontWeight: 500, color: "var(--matte-black)" }}>Subtotal</span>
                <span style={{ fontWeight: 700, color: "var(--terracotta)" }}>₹{subtotal.toLocaleString()}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--warm-grey)", marginBottom: "24px", textAlign: "center" }}>Taxes and shipping calculated at checkout</p>
              <button style={{ width: "100%", padding: "16px", backgroundColor: "var(--terracotta)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", letterSpacing: "0.05em", transition: "background-color 0.3s ease" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--terracotta-dark)")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--terracotta)")}>
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
