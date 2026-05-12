"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "calc(var(--nav-height) + 40px)", minHeight: "100vh", backgroundColor: "var(--off-white)", display: "flex", flexDirection: "column", paddingBottom: "100px" }}>
        <div className="container-kw" style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: "100%", maxWidth: "480px", backgroundColor: "var(--warm-cream)", padding: "48px 40px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>

            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1 className="font-display" style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--matte-black)", marginBottom: "8px" }}>Create Account</h1>
              <p style={{ color: "var(--warm-grey)", fontSize: "0.95rem" }}>Join Kolhapuri Wala for faster checkout and exclusive artisan stories.</p>
            </div>

            <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={e => e.preventDefault()}>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="firstName" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px" }}>First Name</label>
                  <input type="text" id="firstName" placeholder="Jane" style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", color: "var(--matte-black)", outline: "none", transition: "border-color 0.2s ease", fontFamily: "var(--font-body)" }} onFocus={e => e.currentTarget.style.borderColor = "var(--terracotta)"} onBlur={e => e.currentTarget.style.borderColor = "var(--sand-beige)"} />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="lastName" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px" }}>Last Name</label>
                  <input type="text" id="lastName" placeholder="Doe" style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", color: "var(--matte-black)", outline: "none", transition: "border-color 0.2s ease", fontFamily: "var(--font-body)" }} onFocus={e => e.currentTarget.style.borderColor = "var(--terracotta)"} onBlur={e => e.currentTarget.style.borderColor = "var(--sand-beige)"} />
                </div>
              </div>

              <div>
                <label htmlFor="email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px" }}>Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", color: "var(--matte-black)", outline: "none", transition: "border-color 0.2s ease", fontFamily: "var(--font-body)" }} onFocus={e => e.currentTarget.style.borderColor = "var(--terracotta)"} onBlur={e => e.currentTarget.style.borderColor = "var(--sand-beige)"} />
              </div>

              <div>
                <label htmlFor="password" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px" }}>Password</label>
                <input type="password" id="password" placeholder="••••••••" style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", color: "var(--matte-black)", outline: "none", transition: "border-color 0.2s ease", fontFamily: "var(--font-body)" }} onFocus={e => e.currentTarget.style.borderColor = "var(--terracotta)"} onBlur={e => e.currentTarget.style.borderColor = "var(--sand-beige)"} />
              </div>

              <button type="submit" style={{ width: "100%", padding: "16px", backgroundColor: "var(--terracotta)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", letterSpacing: "0.05em", transition: "background-color 0.3s ease", marginTop: "8px" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--terracotta-dark)")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--terracotta)")}>
                Create Account
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "32px", paddingTop: "24px", borderTop: "1px solid var(--sand-beige)" }}>
              <p style={{ fontSize: "0.9rem", color: "var(--warm-grey)" }}>
                Already have an account? <Link href="/login" style={{ color: "var(--terracotta)", fontWeight: 600, textDecoration: "none" }}>Log in</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
