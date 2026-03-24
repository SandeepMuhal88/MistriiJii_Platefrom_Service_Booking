import React, { useEffect } from "react";
import { useBookings } from "../../booking/context/BookingContext";
import { motion } from "framer-motion";

/* ── Price estimates for revenue calc ─────────────────────────── */
const SERVICE_PRICES = {
  Electrician: 899,
  "AC Service": 1699,
  Plumber: 699,
  Mechanic: 2249,
  "Appliance Repair": 1149,
  "Deep Cleaning": 2899,
};

const STATUS_STYLES = {
  Pending:   { bg: "rgba(249,115,22,0.12)",  color: "#fb923c",  border: "rgba(249,115,22,0.25)"  },
  Confirmed: { bg: "rgba(59,130,246,0.12)",  color: "#60a5fa",  border: "rgba(59,130,246,0.25)"  },
  Completed: { bg: "rgba(34,197,94,0.12)",   color: "#4ade80",  border: "rgba(34,197,94,0.25)"   },
  Cancelled: { bg: "rgba(239,68,68,0.12)",   color: "#f87171",  border: "rgba(239,68,68,0.25)"   },
};

const Dashboard = () => {
  const { bookings, loading, fetchBookings, fetchStats, updateBookingStatus } = useBookings();

  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, []);

  // Stats derived from local state
  const total      = bookings.length;
  const pending    = bookings.filter((b) => b.status === "Pending").length;
  const confirmed  = bookings.filter((b) => b.status === "Confirmed").length;
  const completed  = bookings.filter((b) => b.status === "Completed").length;
  const revenue    = bookings
    .filter((b) => b.status === "Completed" || b.status === "Confirmed")
    .reduce((sum, b) => sum + (SERVICE_PRICES[b.service] || 799), 0);

  const STATS = [
    { label: "Total Bookings",  value: total,                          icon: "📅", color: "#60a5fa", bg: "rgba(59,130,246,0.1)"  },
    { label: "Pending",         value: pending,                        icon: "⏳", color: "#fb923c", bg: "rgba(249,115,22,0.1)"  },
    { label: "Completed",       value: completed,                      icon: "✅", color: "#4ade80", bg: "rgba(34,197,94,0.1)"   },
    { label: "Est. Revenue",    value: `₹${revenue.toLocaleString()}`, icon: "💰", color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 900,
            color: "var(--text-1)",
            marginBottom: "0.25rem",
          }}
        >
          Overview Dashboard
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
          Manage bookings and monitor platform performance.
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -3 }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--bg-border)",
              borderRadius: "1.25rem",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "0.875rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                background: stat.bg,
                border: `1px solid ${stat.color}30`,
                flexShrink: 0,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-3)", fontWeight: 600, marginBottom: "0.25rem" }}>
                {stat.label}
              </p>
              <h3 style={{ fontSize: "1.625rem", fontWeight: 900, color: "var(--text-1)" }}>
                {loading ? "—" : stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick status breakdown */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--bg-border)",
          borderRadius: "1.25rem",
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: 700, color: "var(--text-2)", fontSize: "0.875rem" }}>
          Status breakdown:
        </span>
        {[
          { label: "Pending",   count: pending,   ...STATUS_STYLES.Pending   },
          { label: "Confirmed", count: confirmed, ...STATUS_STYLES.Confirmed },
          { label: "Completed", count: completed, ...STATUS_STYLES.Completed },
          { label: "Cancelled", count: bookings.filter((b) => b.status === "Cancelled").length, ...STATUS_STYLES.Cancelled },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "0.8rem",
                fontWeight: 700,
                background: s.bg,
                color: s.color,
                border: `1px solid ${s.border}`,
              }}
            >
              {s.label}
            </span>
            <span style={{ fontWeight: 800, color: "var(--text-1)" }}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Bookings table */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--bg-border)",
          borderRadius: "1.25rem",
          overflow: "hidden",
        }}
      >
        {/* Table header row */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--bg-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontWeight: 800, color: "var(--text-1)", fontSize: "1rem" }}>
            Recent Bookings
          </h2>
          <span style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
            {total} total
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr
                style={{
                  background: "var(--bg-elevated)",
                  borderBottom: "1px solid var(--bg-border)",
                }}
              >
                {["Service", "Customer", "Date & Time", "Status", "Action"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.875rem 1.25rem",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "var(--text-3)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    style={{ padding: "3rem", textAlign: "center", color: "var(--text-4)" }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        width: "1.5rem",
                        height: "1.5rem",
                        border: "2px solid var(--bg-elevated)",
                        borderTopColor: "#f97316",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                  </td>
                </tr>
              )}

              {!loading && bookings.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{ padding: "3rem", textAlign: "center", color: "var(--text-4)" }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📭</div>
                    <p>No bookings yet. They'll appear here when customers book services.</p>
                  </td>
                </tr>
              )}

              {!loading &&
                bookings.slice(0, 15).map((booking, idx) => {
                  const styles = STATUS_STYLES[booking.status] || STATUS_STYLES.Pending;
                  return (
                    <tr
                      key={booking.id}
                      style={{
                        borderBottom: idx < bookings.length - 1 ? "1px solid var(--bg-border)" : "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Service */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div
                            style={{
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "0.5rem",
                              background: "rgba(249,115,22,0.1)",
                              border: "1px solid rgba(249,115,22,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.9rem",
                              flexShrink: 0,
                            }}
                          >
                            🛠️
                          </div>
                          <span style={{ fontWeight: 600, color: "var(--text-1)" }}>
                            {booking.service}
                          </span>
                        </div>
                      </td>

                      {/* Customer */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-1)" }}>
                          {booking.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
                          {booking.phone}
                        </div>
                      </td>

                      {/* Date */}
                      <td style={{ padding: "1rem 1.25rem", color: "var(--text-2)" }}>
                        <div>{booking.date}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-4)" }}>
                          {booking.time}
                        </div>
                      </td>

                      {/* Status badge */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <span
                          style={{
                            padding: "0.3rem 0.75rem",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            background: styles.bg,
                            color: styles.color,
                            border: `1px solid ${styles.border}`,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {booking.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          style={{
                            padding: "0.4rem 0.75rem",
                            borderRadius: "0.625rem",
                            background: "var(--bg-elevated)",
                            border: "1px solid var(--bg-border)",
                            color: "var(--text-2)",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Dashboard;
