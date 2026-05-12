"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const footerLinks = {
  Shop: [{ name: "Men's Collection", href: "#mens-collection" }, { name: "Women's Collection", href: "#womens-collection" }, { name: "New Arrivals", href: "#" }, { name: "Best Sellers", href: "#" }],
  Company: [{ name: "Our Story", href: "#artisan-story" }, { name: "Craftsmanship", href: "#how-its-made" }, { name: "Sustainability", href: "#sustainability" }, { name: "Press", href: "#" }],
  Support: [{ name: "Shipping & Returns", href: "#" }, { name: "Size Guide", href: "#" }, { name: "Care Instructions", href: "#" }, { name: "Contact Us", href: "#" }],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer id="footer" style={{ backgroundColor: "var(--near-black)", color: "#fff", overflow: "hidden" }}>
      {/* Newsletter */}
      <div style={{ padding: "80px 0", borderBottom: "1px solid rgba(212,184,150,0.15)" }}>
        <div className="container-kw" style={{ textAlign: "center" }}>
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-label" style={{ fontSize: "0.85rem", color: "var(--terracotta)", letterSpacing: "0.15em", display: "block", marginBottom: "16px" }}>Stay Connected</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 600, color: "#fff", marginBottom: "16px" }}>Join the Kolhapuri Family</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: "rgba(255,255,255,0.5)", maxWidth: "460px", margin: "0 auto 32px", fontSize: "0.95rem" }}>Get early access to new collections, artisan stories, and exclusive offers.</motion.p>
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} onSubmit={handleSubmit} style={{ display: "flex", gap: "0", maxWidth: "480px", margin: "0 auto" }}>
            {subscribed ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--sand-beige)", fontSize: "0.95rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                Thank you! You&apos;re part of the family now.
              </div>
            ) : (
              <>
                <input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required style={{ flex: 1, padding: "16px 20px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(212,184,150,0.2)", borderRight: "none", borderRadius: "4px 0 0 4px", color: "#fff", fontSize: "0.9rem", fontFamily: "var(--font-body)", outline: "none" }} />
                <button id="newsletter-submit" type="submit" style={{ padding: "16px 28px", backgroundColor: "var(--terracotta)", border: "1px solid var(--terracotta)", borderRadius: "0 4px 4px 0", color: "#fff", fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", transition: "background-color 0.3s ease", letterSpacing: "0.05em" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--terracotta-dark)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--terracotta)")}
                >Subscribe</button>
              </>
            )}
          </motion.form>
        </div>
      </div>

      {/* Footer Links */}
      <div style={{ padding: "60px 0 40px" }}>
        <div className="container-kw">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "60px", marginBottom: "60px" }}>
            {/* Brand Column */}
            <div>
              <span className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Kolhapuri Wala</span>
              <span className="font-label" style={{ fontSize: "0.65rem", color: "var(--warm-grey)", letterSpacing: "0.2em", display: "block", marginBottom: "20px" }}>Since Generations · Rajasthan</span>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "280px", marginBottom: "24px" }}>Authentic handmade Kolhapuri footwear, crafted with love by artisan families in Rajasthan.</p>
              <div style={{ display: "flex", gap: "12px" }}>
                {["Instagram", "Facebook", "Twitter"].map((social) => (
                  <a key={social} href="#" aria-label={social} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(212,184,150,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sand-beige)", fontSize: "0.8rem", textDecoration: "none", transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--terracotta)"; e.currentTarget.style.borderColor = "var(--terracotta)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(212,184,150,0.2)"; e.currentTarget.style.color = "var(--sand-beige)"; }}
                  >{social[0]}</a>
                ))}
              </div>
            </div>
            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sand-beige)", marginBottom: "20px" }}>{title}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {links.map((link) => (
                    <Link key={link.name} href={link.href} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.3s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terracotta)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                    >{link.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Bottom Bar */}
          <div style={{ borderTop: "1px solid rgba(212,184,150,0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>© 2026 Kolhapuri Wala. All rights reserved.</p>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Privacy Policy", "Terms of Service", "Shipping Policy"].map((t) => (
                <a key={t} href="#" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.3s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >{t}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width:900px) {
          #footer .container-kw > div:first-child { grid-template-columns:1fr 1fr !important; gap:40px !important; }
        }
        @media (max-width:500px) {
          #footer .container-kw > div:first-child { grid-template-columns:1fr !important; }
        }
      `}</style>
    </footer>
  );
}
