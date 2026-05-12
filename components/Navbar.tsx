"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useStore } from "../app/lib/store";

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
  const { cart, cartOpen, setCartOpen } = useStore();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const showSolidNav = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
            }}
            className="desktop-nav"
          >
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

            {/* User Account */}
            <Link
              href="/login"
              id="nav-user"
              aria-label="User Account"
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

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
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-6px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: "var(--terracotta)",
                    color: "#fff",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "currentColor",
                  transition: "all 0.3s ease",
                  transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "currentColor",
                  transition: "all 0.3s ease",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "currentColor",
                  transition: "all 0.3s ease",
                  transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                }}
              />
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
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "80%",
              maxWidth: "360px",
              backgroundColor: "var(--off-white)",
              zIndex: 999,
              padding: "100px 40px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "var(--matte-black)",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(212,184,150,0.3)",
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(14,12,10,0.5)",
              zIndex: 998,
            }}
          />
        )}
      </AnimatePresence>

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
          .desktop-nav {
            display: none !important;
          }
          .desktop-icon {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
