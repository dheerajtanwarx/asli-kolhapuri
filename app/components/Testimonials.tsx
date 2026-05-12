"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const testimonials = [
  { name: "Priya Sharma", location: "Mumbai, India", text: "The quality is unmatched. I've been wearing my Kolhapuri chappals for 2 years and they've only gotten more beautiful with time. The leather has a gorgeous patina now.", rating: 5 },
  { name: "James Mitchell", location: "London, UK", text: "Ordered these as a gift and was blown away by the craftsmanship. You can feel the artisan's touch in every stitch. Shipping to the UK was fast too!", rating: 5 },
  { name: "Ananya Patel", location: "Jaipur, India", text: "As someone from Rajasthan, I can tell these are the real deal. The leather is soft, the braiding is perfect, and they're incredibly comfortable from day one.", rating: 5 },
  { name: "Sarah Chen", location: "New York, USA", text: "I discovered Kolhapuri Wala at a pop-up and fell in love. Now I own three pairs. The beaded women's collection is absolutely stunning.", rating: 5 },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" style={{ padding: "var(--section-padding) 0", backgroundColor: "var(--off-white)", overflow: "hidden" }}>
      <div className="container-kw">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-label" style={{ fontSize: "0.85rem", color: "var(--terracotta)", letterSpacing: "0.15em", display: "block", marginBottom: "16px" }}>Voices of Trust</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 600, color: "var(--matte-black)", lineHeight: 1.2 }}>What Our Customers Say</motion.h2>
        </div>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", minHeight: "240px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "24px" }}>
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--terracotta)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ))}
              </div>
              <p className="font-heading" style={{ fontSize: "1.3rem", lineHeight: 1.8, color: "var(--matte-black)", fontWeight: 400, fontStyle: "italic", marginBottom: "28px" }}>&ldquo;{testimonials[active].text}&rdquo;</p>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--matte-black)" }}>{testimonials[active].name}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--warm-grey)" }}>{testimonials[active].location}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "40px" }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} style={{ width: i === active ? "32px" : "10px", height: "10px", borderRadius: "5px", border: "none", backgroundColor: i === active ? "var(--terracotta)" : "var(--sand-beige)", cursor: "pointer", transition: "all 0.3s ease" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
