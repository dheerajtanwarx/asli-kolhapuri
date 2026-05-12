"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 5000, suffix: "+", label: "Pairs Crafted Annually" },
  { value: 30, suffix: "+", label: "Artisan Families" },
  { value: 3, suffix: "", label: "Generations of Craft" },
  { value: 15, suffix: "+", label: "Countries Shipped" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsBanner() {
  return (
    <section id="stats-banner" style={{ padding: "80px 0", backgroundColor: "var(--warm-cream)", borderTop: "1px solid var(--sand-beige)", borderBottom: "1px solid var(--sand-beige)" }}>
      <div className="container-kw">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", textAlign: "center" }}>
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <span className="font-display" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "var(--terracotta)", display: "block", lineHeight: 1 }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--warm-grey)", letterSpacing: "0.05em", marginTop: "8px", display: "block" }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width:700px) {
          #stats-banner .container-kw > div { grid-template-columns:1fr 1fr !important; gap:30px !important; }
        }
      `}</style>
    </section>
  );
}
