"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import CartDrawer from "./CartDrawer";
import SearchDrawer from "./SearchDrawer";
import { useStore } from "../lib/store";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Our Story", href: "/#artisan-story" },
  { name: "Craftsmanship", href: "/#how-its-made" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cart, cartOpen, setCartOpen, setSearchOpen } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const isHome = pathname === "/";
  const showSolidNav = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = () => setUserMenuOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [userMenuOpen]);

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: showSolidNav ? "rgba(250, 247, 242, 0.97)" : "transparent",
          backdropFilter: showSolidNav ? "blur(20px)" : "none",
          borderBottom: showSolidNav ? "1px solid #D4B896" : "1px solid transparent",
        }}
      >
        <div
          className="container-kw"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span
                className="font-display"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: showSolidNav ? "var(--matte-black)" : "#fff",
                  transition: "color 0.3s ease",
                  lineHeight: 1.1,
                }}
              >
                Kolhapuri Wala
              </span>
              <span
                className="font-label"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: showSolidNav ? "var(--warm-grey)" : "rgba(255,255,255,0.7)",
                  transition: "color 0.4s ease",
                  marginTop: "-2px",
                }}
              >
                Since Generations · Rajasthan
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: showSolidNav ? "var(--matte-black)" : "#fff",
                  transition: "color 0.3s ease",
                  position: "relative",
                  fontFamily: "var(--font-body)",
                }}
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Search */}
            <button
              id="nav-search"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: showSolidNav ? "var(--matte-black)" : "#fff",
                transition: "color 0.3s ease",
                fontSize: "1.2rem",
                padding: "4px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* User Account / Session Menu */}
            <div style={{ position: "relative" }} className="desktop-icon">
              {status === "loading" ? (
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "rgba(130,120,110,0.2)" }} />
              ) : session ? (
                <button
                  id="nav-user"
                  aria-label="Account Menu"
                  onClick={e => { e.stopPropagation(); setUserMenuOpen(o => !o); }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: showSolidNav ? "var(--matte-black)" : "#fff",
                    transition: "color 0.3s ease",
                    fontSize: "1.2rem",
                    padding: "4px",
                  }}
                >
                  {/* Avatar circle */}
                  <span style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    backgroundColor: "var(--terracotta)", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 700, fontFamily: "var(--font-body)",
                  }}>
                    {session.user?.email?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </button>
              ) : (
                <Link
                  href="/login"
                  id="nav-user"
                  aria-label="Login"
                  style={{
                    display: "inline-flex",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: showSolidNav ? "var(--matte-black)" : "#fff",
                    transition: "color 0.3s ease",
                    fontSize: "1.2rem",
                    padding: "4px",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Link>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && session && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={e => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      right: 0,
                      backgroundColor: "#fff",
                      border: "1px solid var(--sand-beige)",
                      borderRadius: "12px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                      minWidth: "220px",
                      overflow: "hidden",
                      zIndex: 2000,
                    }}
                  >
                    {/* User info */}
                    <div style={{ padding: "16px", borderBottom: "1px solid var(--sand-beige)", backgroundColor: "var(--warm-cream)" }}>
                      <p style={{ fontSize: "0.75rem", color: "var(--warm-grey)", marginBottom: "2px", fontFamily: "var(--font-body)" }}>Signed in as</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", fontFamily: "var(--font-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {session.user?.email}
                      </p>
                    </div>

                    {/* Menu items */}
                    <div style={{ padding: "8px" }}>
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "10px 12px", borderRadius: "8px",
                          textDecoration: "none", color: "var(--matte-black)",
                          fontSize: "0.875rem", fontFamily: "var(--font-body)",
                          fontWeight: 500, transition: "background 0.15s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--off-white)"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Admin Panel
                      </Link>

                      <button
                        id="nav-logout"
                        onClick={handleLogout}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "10px 12px", borderRadius: "8px",
                          background: "none", border: "none", cursor: "pointer",
                          color: "#DC2626", fontSize: "0.875rem",
                          fontFamily: "var(--font-body)", fontWeight: 500,
                          transition: "background 0.15s", width: "100%", textAlign: "left",
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FEE2E2"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              id="nav-wishlist"
              aria-label="Wishlist"
              style={{
                display: "inline-flex",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: showSolidNav ? "var(--matte-black)" : "#fff",
                transition: "color 0.3s ease",
                fontSize: "1.2rem",
                padding: "4px",
              }}
              className="desktop-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>

            {/* Cart */}
            <button
              id="nav-cart"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Cart"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: showSolidNav ? "var(--matte-black)" : "#fff",
                transition: "color 0.3s ease",
                fontSize: "1.2rem",
                padding: "4px",
                position: "relative",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cart.length > 0 && (
                <span style={{
                  position: "absolute", top: "-2px", right: "-6px",
                  width: "16px", height: "16px", borderRadius: "50%",
                  backgroundColor: "var(--terracotta)", color: "#fff",
                  fontSize: "0.6rem", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {cart.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              id="nav-hamburger"
              aria-label="Toggle Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-hamburger"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: showSolidNav ? "var(--matte-black)" : "#fff",
                transition: "color 0.3s ease",
                display: "none",
                flexDirection: "column",
                gap: "5px",
                padding: "4px",
              }}
            >
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "currentColor", transition: "all 0.3s ease", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "currentColor", transition: "all 0.3s ease", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "currentColor", transition: "all 0.3s ease", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "80%", maxWidth: "360px",
              backgroundColor: "var(--off-white)",
              zIndex: 999, padding: "100px 40px 40px",
              display: "flex", flexDirection: "column", gap: "0",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block", textDecoration: "none",
                    fontFamily: "var(--font-heading)", fontSize: "1.5rem",
                    fontWeight: 500, color: "var(--matte-black)",
                    padding: "16px 0", borderBottom: "1px solid rgba(212,184,150,0.3)",
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile auth actions */}
            <div style={{ marginTop: "32px" }}>
              {session ? (
                <>
                  <p style={{ fontSize: "0.8rem", color: "var(--warm-grey)", marginBottom: "12px", fontFamily: "var(--font-body)" }}>
                    {session.user?.email}
                  </p>
                  <Link href="/admin" onClick={() => setMobileOpen(false)}
                    style={{ display: "block", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--terracotta)", padding: "10px 0" }}>
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "#DC2626", padding: "10px 0" }}>
                    Log Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  style={{ display: "block", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--terracotta)", padding: "10px 0" }}>
                  Log In / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(14,12,10,0.5)", zIndex: 998 }}
          />
        )}
      </AnimatePresence>

      {/* Search Drawer */}
      <SearchDrawer />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Navbar styles */}
      <style jsx global>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--terracotta);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-icon { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
