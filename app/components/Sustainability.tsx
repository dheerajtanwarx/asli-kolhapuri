"use client";
import { motion } from "framer-motion";

export default function Sustainability() {
  const items = [
    { icon: "🌿", title: "Eco-Friendly Leather", desc: "Vegetable-tanned using natural bark extracts — no chrome, no chemicals." },
    { icon: "♻️", title: "Zero Waste Workshop", desc: "Every scrap is repurposed into keychains, bookmarks, and small crafts." },
    { icon: "🤝", title: "Fair Trade Wages", desc: "Artisans receive 3x the industry standard, paid directly without middlemen." },
    { icon: "📦", title: "Sustainable Packaging", desc: "Shipped in recycled kraft paper and reusable cotton dust bags." },
  ];

  return (
    <section id="sustainability" style={{ padding: "80px 0", backgroundColor: "var(--leather-brown)", overflow: "hidden" }}>
      <div className="container-kw">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "50px" }}>
          <span className="font-label" style={{ fontSize: "0.8rem", color: "var(--sand-beige)", letterSpacing: "0.15em", display: "block", marginBottom: "12px" }}>Our Promise</span>
          <h2 className="font-heading" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>Crafted Responsibly</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
          {items.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: "center", padding: "32px 20px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "16px" }}>{item.icon}</span>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width:900px) {
          #sustainability .container-kw > div:last-child { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width:500px) {
          #sustainability .container-kw > div:last-child { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
