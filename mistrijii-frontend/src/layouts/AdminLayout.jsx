import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/admin", icon: "📊" },
  { name: "Bookings",  path: "/admin/bookings",  icon: "📅" },
  { name: "Services",  path: "/admin/services",  icon: "🛠️" },
  { name: "Customers", path: "/admin/customers", icon: "👥" },
  { name: "Settings",  path: "/admin/settings",  icon: "⚙️" },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => setSidebarOpen(false), [location.pathname]);

  const isActive = (path) =>
    path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(path);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-base)",
        color: "var(--text-1)",
      }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
          className="lg:hidden"
        />
      )}

      {/* ── SIDEBAR ───────────────────────────────────────── */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : undefined }}
        style={{
          width: "260px",
          flexShrink: 0,
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--bg-border)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 50,
        }}
        className={`
          fixed inset-y-0 left-0 lg:static
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          transition-transform duration-300
        `}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(249,115,22,0.06)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Brand */}
        <div
          style={{
            padding: "1.5rem 1.25rem",
            borderBottom: "1px solid var(--bg-border)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              boxShadow: "0 0 16px rgba(249,115,22,0.35)",
            }}
          >
            🔧
          </div>
          <div>
            <Link
              to="/"
              style={{
                fontWeight: 900,
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #f97316, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textDecoration: "none",
              }}
            >
              MistriJii
            </Link>
            <p style={{ fontSize: "0.7rem", color: "var(--text-4)", fontWeight: 600 }}>
              ADMIN PANEL
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "1rem", flex: 1, overflowY: "auto" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", paddingLeft: "0.5rem" }}>
            Navigation
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.875rem",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    transition: "all 0.2s",
                    background: active ? "rgba(249,115,22,0.12)" : "transparent",
                    color: active ? "#fb923c" : "var(--text-2)",
                    border: active ? "1px solid rgba(249,115,22,0.2)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "var(--bg-hover)";
                      e.currentTarget.style.color = "var(--text-1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-2)";
                    }
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  <span>{item.name}</span>
                  {active && (
                    <div
                      style={{
                        marginLeft: "auto",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#f97316",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom actions */}
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid var(--bg-border)",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {user?.email && (
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.875rem",
                background: "var(--bg-elevated)",
                marginBottom: "0.5rem",
              }}
            >
              <p style={{ fontSize: "0.7rem", color: "var(--text-4)", marginBottom: "0.15rem" }}>
                Logged in as
              </p>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-2)" }}>
                {user.email}
              </p>
            </div>
          )}

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.875rem",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "var(--text-2)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-hover)";
              e.currentTarget.style.color = "var(--text-1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-2)";
            }}
          >
            <span>🏡</span>
            <span>Back to Website</span>
          </Link>

          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.875rem",
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "#f87171",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.1)";
              e.currentTarget.style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#f87171";
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        {/* Top bar */}
        <header
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--bg-border)",
            flexShrink: 0,
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-2)",
              fontSize: "1.25rem",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            ☰
          </button>

          <div style={{ fontWeight: 700, color: "var(--text-1)", fontSize: "1rem" }}>
            Admin Dashboard
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: "0.8rem",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div
          style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
