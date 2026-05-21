"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CldUploadWidget } from "next-cloudinary";
import Navbar from "@/components/Navbar";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  createdAt: string;
}

interface Order {
  _id: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  createdAt: string;
  customer?: { name: string; email: string };
}

const CATEGORIES = ["Men", "Women", "Unisex"];

const emptyForm = { name: "", price: "", image: "/images/artisan-story.png", category: "Men", description: "" };

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "add" | "orders">("products");
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mock orders data (replace with real API call when orders API is ready)
  const [orders] = useState<Order[]>([
    { _id: "1", status: "pending", total: 2999, createdAt: new Date().toISOString(), customer: { name: "Priya Sharma", email: "priya@example.com" } },
    { _id: "2", status: "completed", total: 1799, createdAt: new Date(Date.now() - 86400000).toISOString(), customer: { name: "James Mitchell", email: "james@example.com" } },
    { _id: "3", status: "pending", total: 3598, createdAt: new Date(Date.now() - 172800000).toISOString(), customer: { name: "Ananya Patel", email: "ananya@example.com" } },
    { _id: "4", status: "completed", total: 2199, createdAt: new Date(Date.now() - 259200000).toISOString(), customer: { name: "Sarah Chen", email: "sarah@example.com" } },
    { _id: "5", status: "processing", total: 4498, createdAt: new Date(Date.now() - 345600000).toISOString(), customer: { name: "Vikram Joshi", email: "vikram@example.com" } },
  ]);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(null), 3500);
  }

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated") {
      const userRole = (session?.user as any)?.role;
      const userEmail = session?.user?.email;
      
      if (userRole !== "admin" && userEmail !== "dheeraj@gmail.com") {
        router.replace("/");
      }
    }
  }, [status, router, session]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch {
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") fetchProducts();
  }, [status]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Product added successfully!");
        setForm(emptyForm);
        setActiveTab("products");
        fetchProducts();
      } else {
        showToast(data.message || "Failed to add product", "error");
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Product deleted");
        setProducts(p => p.filter(x => x._id !== id));
      } else {
        showToast("Failed to delete", "error");
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setDeleteId(null);
    }
  }

  if (status === "loading" || (status === "unauthenticated")) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--off-white)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid var(--sand-beige)", borderTopColor: "var(--terracotta)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "var(--warm-grey)", fontFamily: "var(--font-body)" }}>Loading…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "calc(var(--nav-height) + 32px)", minHeight: "100vh", backgroundColor: "var(--off-white)", paddingBottom: "80px" }}>
        <div className="container-kw">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "40px" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="font-display" style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--matte-black)", marginBottom: "4px" }}>Admin Panel</h1>
                <p style={{ color: "var(--warm-grey)", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
                  Welcome, <strong>{session?.user?.email}</strong>
                </p>
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                {(["products", "orders", "add"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer",
                      fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem",
                      backgroundColor: activeTab === tab ? "var(--terracotta)" : "var(--warm-cream)",
                      color: activeTab === tab ? "#fff" : "var(--matte-black)",
                      transition: "all 0.2s",
                    }}
                    className="flex-1 sm:flex-none text-center"
                  >
                    {tab === "products" ? `📦 Products (${products.length})` : tab === "orders" ? `🛒 Orders (${orders.length})` : "＋ Add Product"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "40px" }}>
            {[
              { label: "Total Products", value: products.length, icon: "📦" },
              { label: "Men's", value: products.filter(p => p.category?.toLowerCase() === "men").length, icon: "👞" },
              { label: "Women's", value: products.filter(p => p.category?.toLowerCase() === "women").length, icon: "👡" },
              { label: "Total Orders", value: orders.length, icon: "🛒" },
              { label: "Pending Orders", value: orders.filter(o => o.status === "pending" || o.status === "processing").length, icon: "⏳" },
              { label: "Completed Orders", value: orders.filter(o => o.status === "completed").length, icon: "✅" },
              {
                label: "Catalog Value",
                value: "₹" + products.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString(),
                icon: "💰"
              },
              {
                label: "Avg. Price",
                value: products.length ? "₹" + Math.round(products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length).toLocaleString() : "₹0",
                icon: "📊"
              },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                style={{ backgroundColor: "var(--warm-cream)", borderRadius: "12px", padding: "20px", border: "1px solid rgba(212,184,150,0.4)" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{stat.icon}</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--matte-black)", fontFamily: "var(--font-display)" }}>{stat.value}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--warm-grey)", fontFamily: "var(--font-body)" }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Products List Tab */}
          {activeTab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {loading ? (
                <div style={{ textAlign: "center", padding: "60px", color: "var(--warm-grey)", fontFamily: "var(--font-body)" }}>
                  <div style={{ width: "36px", height: "36px", border: "3px solid var(--sand-beige)", borderTopColor: "var(--terracotta)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
                  Loading products…
                </div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 40px", backgroundColor: "var(--warm-cream)", borderRadius: "16px", border: "1px dashed var(--sand-beige)" }}>
                  <p style={{ fontSize: "3rem", marginBottom: "16px" }}>🥿</p>
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--warm-grey)", fontSize: "1rem" }}>No products yet.</p>
                  <button onClick={() => setActiveTab("add")}
                    style={{ marginTop: "16px", padding: "10px 24px", backgroundColor: "var(--terracotta)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600 }}>
                    Add First Product
                  </button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                  {products.map((product, i) => (
                    <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(212,184,150,0.3)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)")}>
                      {/* Image */}
                      <div style={{ height: "180px", overflow: "hidden", backgroundColor: "var(--warm-cream)", position: "relative" }}>
                        <img src={product.image} alt={product.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={e => { e.currentTarget.style.display = "none"; }}
                        />
                        <span style={{
                          position: "absolute", top: "10px", right: "10px",
                          padding: "3px 10px", borderRadius: "20px", fontSize: "0.7rem",
                          fontWeight: 700, fontFamily: "var(--font-body)",
                          backgroundColor: product.category?.toLowerCase() === "men" ? "#1E3A5F" : product.category?.toLowerCase() === "women" ? "#7C3D5F" : "#2D5F3F",
                          color: "#fff", letterSpacing: "0.05em",
                        }}>
                          {product.category}
                        </span>
                      </div>
                      {/* Info */}
                      <div style={{ padding: "16px" }}>
                        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "4px" }}>{product.name}</h3>
                        <p style={{ fontSize: "0.8rem", color: "var(--warm-grey)", fontFamily: "var(--font-body)", marginBottom: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.description}</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "var(--terracotta)" }}>₹{product.price.toLocaleString()}</span>
                          <button
                            onClick={() => setDeleteId(product._id)}
                            style={{ padding: "6px 14px", backgroundColor: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-body)", transition: "background 0.15s" }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FECACA"}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#FEE2E2"}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                {[
                  { label: "Total Orders", value: orders.length, icon: "🛒", color: "#1E3A5F" },
                  { label: "Pending", value: orders.filter(o => o.status === "pending").length, icon: "⏳", color: "#92400E" },
                  { label: "Processing", value: orders.filter(o => o.status === "processing").length, icon: "🔄", color: "#1E4D8C" },
                  { label: "Completed", value: orders.filter(o => o.status === "completed").length, icon: "✅", color: "#166534" },
                  { label: "Cancelled", value: orders.filter(o => o.status === "cancelled").length, icon: "❌", color: "#991B1B" },
                ].map(stat => (
                  <div key={stat.label} style={{ backgroundColor: "var(--warm-cream)", borderRadius: "12px", padding: "24px", border: "1px solid rgba(212,184,150,0.4)" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{stat.icon}</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, color: stat.color, fontFamily: "var(--font-display)" }}>{stat.value}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--warm-grey)", fontFamily: "var(--font-body)", fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Orders Table */}
              <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid rgba(212,184,150,0.3)", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(212,184,150,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 600, color: "var(--matte-black)" }}>Recent Orders</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--warm-grey)", fontFamily: "var(--font-body)" }}>Showing latest {orders.length} orders</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)" }}>
                    <thead>
                      <tr style={{ backgroundColor: "var(--off-white)" }}>
                        {["Order ID", "Customer", "Amount", "Status", "Date"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "var(--warm-grey)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, i) => (
                        <tr key={order._id}
                          style={{ borderTop: "1px solid rgba(212,184,150,0.15)", transition: "background 0.15s" }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--off-white)")}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
                          <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "var(--warm-grey)", fontWeight: 500 }}>#{order._id.slice(-6).toUpperCase()}</td>
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--matte-black)" }}>{order.customer?.name || "Guest"}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--warm-grey)" }}>{order.customer?.email || ""}</div>
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: "0.95rem", fontWeight: 700, color: "var(--terracotta)" }}>₹{order.total.toLocaleString()}</td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{
                              padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 700, textTransform: "capitalize",
                              backgroundColor:
                                order.status === "completed" ? "rgba(22,101,52,0.1)" :
                                  order.status === "pending" ? "rgba(146,64,14,0.1)" :
                                    order.status === "processing" ? "rgba(30,77,140,0.1)" : "rgba(153,27,27,0.1)",
                              color:
                                order.status === "completed" ? "#166534" :
                                  order.status === "pending" ? "#92400E" :
                                    order.status === "processing" ? "#1E4D8C" : "#991B1B",
                            }}>{order.status}</span>
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: "0.8rem", color: "var(--warm-grey)" }}>
                            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Add Product Tab */}
          {activeTab === "add" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ maxWidth: "640px", margin: "0 auto", backgroundColor: "var(--warm-cream)", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
              <h2 className="font-display" style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--matte-black)", marginBottom: "32px" }}>Add New Product</h2>
              <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Name */}
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Product Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Classic Kolhapuri Chappal" required
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", fontFamily: "var(--font-body)", outline: "none" }} />
                </div>

                {/* Price + Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Price (₹) *</label>
                    <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="1299" type="number" min="1" required
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", fontFamily: "var(--font-body)", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Category *</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", fontFamily: "var(--font-body)", outline: "none", cursor: "pointer" }}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Cloudinary Image Upload */}
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Product Image *</label>
                  <CldUploadWidget
                    signatureEndpoint="/api/admin/cloudinary-sign"
                    options={{ folder: "kolhapuri-wala", resourceType: "image" }}
                    onSuccess={(result) => {
                      if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
                        setForm(f => ({ ...f, image: (result.info as { secure_url: string }).secure_url }));
                        showToast("Image uploaded successfully!");
                      }
                    }}
                    onError={() => showToast("Image upload failed. Try pasting URL below.", "error")}
                  >
                    {({ open }) => (
                      <div>
                        <button type="button" onClick={() => open()}
                          style={{
                            width: "100%", padding: "14px", border: "2px dashed var(--sand-beige)", borderRadius: "8px",
                            backgroundColor: form.image ? "var(--off-white)" : "#fff", cursor: "pointer",
                            fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--warm-grey)",
                            transition: "border-color 0.2s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = "var(--terracotta)"}
                          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--sand-beige)"}>
                          {form.image ? "✅ Image uploaded — click to change" : "☁️ Upload image via Cloudinary"}
                        </button>
                        {form.image && (
                          <img src={form.image} alt="Preview" style={{ marginTop: "12px", width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--sand-beige)" }} />
                        )}
                      </div>
                    )}
                  </CldUploadWidget>
                  {/* Manual URL fallback */}
                  <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="Or paste image URL directly…"
                    style={{ marginTop: "10px", width: "100%", padding: "10px 14px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "0.875rem", fontFamily: "var(--font-body)", outline: "none", color: "var(--matte-black)" }} />
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--matte-black)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Description *</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe this product…" required rows={3}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--sand-beige)", borderRadius: "8px", backgroundColor: "#fff", fontSize: "1rem", fontFamily: "var(--font-body)", outline: "none", resize: "vertical" }} />
                </div>

                <button type="submit" disabled={submitting}
                  style={{
                    padding: "15px", backgroundColor: submitting ? "var(--warm-grey)" : "var(--terracotta)", color: "#fff",
                    border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 700,
                    fontFamily: "var(--font-body)", cursor: submitting ? "not-allowed" : "pointer",
                    letterSpacing: "0.05em", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.backgroundColor = "var(--terracotta-dark)"; }}
                  onMouseLeave={e => { if (!submitting) e.currentTarget.style.backgroundColor = "var(--terracotta)"; }}>
                  {submitting ? "Adding…" : "Add Product"}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </main>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(14,12,10,0.6)", zIndex: 3000 }} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                backgroundColor: "#fff", borderRadius: "16px", padding: "32px", maxWidth: "360px",
                width: "90%", zIndex: 3001, boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--matte-black)", marginBottom: "12px" }}>Delete Product?</h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--warm-grey)", fontSize: "0.9rem", marginBottom: "24px" }}>This action cannot be undone.</p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={() => setDeleteId(null)}
                  style={{ flex: 1, padding: "12px", backgroundColor: "var(--warm-cream)", border: "1px solid var(--sand-beige)", borderRadius: "8px", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600 }}>
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteId)}
                  style={{ flex: 1, padding: "12px", backgroundColor: "#DC2626", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600 }}>
                  Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            style={{
              position: "fixed", bottom: "32px", left: "50%", transform: "translateX(-50%)",
              backgroundColor: toast.type === "success" ? "#166534" : "#991B1B",
              color: "#fff", padding: "14px 24px", borderRadius: "10px",
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)", zIndex: 4000,
            }}>
            {toast.type === "success" ? "✓ " : "✗ "}{toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
