"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  { num: "01", title: "Selecting the Hide", desc: "Premium vegetable-tanned leather is carefully chosen for texture, flexibility, and durability.", image: "/images/process-cutting.png" },
  { num: "02", title: "Hand Cutting", desc: "Each piece is precisely hand-cut using traditional tools passed down through generations.", image: "/images/process-cutting.png" },
  { num: "03", title: "Braiding & Weaving", desc: "Intricate leather braids are woven by skilled artisan hands, creating signature Kolhapuri patterns.", image: "/images/hero-bg.png" },
  { num: "04", title: "Final Finishing", desc: "Oil-polished and sun-dried for a natural sheen that only gets better with age.", image: "/images/hero-sandal.png" },
];

export default function HowItsMade() {
  return (
    <section id="how-its-made" style={{ padding: "var(--section-padding) 0", backgroundColor: "var(--near-black)", overflow: "hidden" }}>
      <div className="container-kw">
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-label" style={{ fontSize: "0.85rem", color: "var(--terracotta)", letterSpacing: "0.15em", display: "block", marginBottom: "16px" }}>The Process</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: "16px" }}>How It&apos;s Made</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto" }}>From raw hide to finished footwear — a journey of patience, precision, and pride.</motion.p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} style={{ position: "relative" }}>
              <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: "12px", overflow: "hidden", marginBottom: "24px" }}>
                <Image src={step.image} alt={step.title} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} sizes="(max-width:900px)50vw,25vw" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 50%, rgba(14,12,10,0.8))" }} />
                <span className="font-display" style={{ position: "absolute", top: "16px", left: "16px", fontSize: "3rem", fontWeight: 800, color: "rgba(255,255,255,0.08)" }}>{step.num}</span>
              </div>
              <span className="font-display" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--terracotta)", letterSpacing: "0.15em", display: "block", marginBottom: "8px" }}>STEP {step.num}</span>
              <h3 className="font-heading" style={{ fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>{step.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width:900px) {
          #how-its-made .container-kw > div:last-child { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width:500px) {
          #how-its-made .container-kw > div:last-child { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
