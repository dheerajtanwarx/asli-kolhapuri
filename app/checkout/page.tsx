"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "calc(var(--nav-height) + 40px)", minHeight: "100vh", backgroundColor: "var(--off-white)", display: "flex", flexDirection: "column" }}>
        <div className="container-kw" style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "80px 20px" }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", maxWidth: "500px", backgroundColor: "var(--warm-cream)", padding: "48px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: "24px" }}>🛠️</span>
            <h1 className="font-display" style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--matte-black)", marginBottom: "16px" }}>Checkout Coming Soon</h1>
            <p style={{ color: "var(--warm-grey)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "32px" }}>
              This is a dummy checkout page for the frontend build of Kolhapuri Wala. In a real application, this would connect to a payment gateway like Stripe or Razorpay.
            </p>
            <Link href="/" style={{ padding: "16px 32px", backgroundColor: "var(--terracotta)", color: "#fff", textDecoration: "none", borderRadius: "8px", fontWeight: 600, fontFamily: "var(--font-body)", display: "inline-block" }}>
              Return to Home
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
