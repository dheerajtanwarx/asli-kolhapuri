"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      setSuccess("Account created! Signing you in…");

      // Auto sign in after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (result?.error) {
        router.push("/login");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "calc(var(--nav-height) + 40px)", minHeight: "100vh", backgroundColor: "var(--off-white)", display: "flex", flexDirection: "column", paddingBottom: "100px" }}>
        <div className="container-kw" style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: "100%", maxWidth: "480px", backgroundColor: "var(--warm-cream)", padding: "48px 40px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}
          >
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1 className="font-display" style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--matte-black)", marginBottom: "8px" }}>Create Account</h1>
              <p style={{ color: "var(--warm-grey)", fontSize: "0.95rem" }}>Join Kolhapuri Wala for faster checkout and exclusive artisan stories.</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#991B1B", padding: "12px 16px", borderRadius: "8px", fontSize: "0.875rem", marginBottom: "20px" }}>
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ backgroundColor: "#DCFCE7", border: "1px solid #86EFAC", color: "#166534", padding: "12px 16px", borderRadius: "8px", fontSize: "0.875rem", marginBottom: "20px" }}>
                {success}
              </motion.div>
            )}

            <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px" }}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", color: "var(--matte-black)", outline: "none", transition: "border-color 0.2s ease", fontFamily: "var(--font-body)" }}
                  onFocus={e => e.currentTarget.style.borderColor = "var(--terracotta)"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--sand-beige)"}
                />
              </div>

              <div>
                <label htmlFor="password" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px" }}>Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", color: "var(--matte-black)", outline: "none", transition: "border-color 0.2s ease", fontFamily: "var(--font-body)" }}
                  onFocus={e => e.currentTarget.style.borderColor = "var(--terracotta)"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--sand-beige)"}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: "16px", backgroundColor: loading ? "var(--warm-grey)" : "var(--terracotta)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.05em", transition: "background-color 0.3s ease", marginTop: "8px" }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "var(--terracotta-dark)"; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = "var(--terracotta)"; }}
              >
                {loading ? "Creating account…" : "Create Account"}
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
