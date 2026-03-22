import { useState } from "react";
import { Link } from "react-router-dom";


export default function Header ({
  dark,
  toggleDark,
}: {
  dark: boolean;
  toggleDark: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: dark ? "#020617" : "#f8fafc",
        borderBottom: dark ? "1px solid #1e293b" : "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* MOBILE MENU */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: dark ? "#e5e7eb" : "#020617",
            }}
            className="mobile-menu-btn"
          >
            ☰
          </button>

          <h2 style={{ margin: 0 }}>📢 Telegram Web</h2>
        </div>

        {/* DESKTOP NAV */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <a href="#about" style={navLink(dark)}>About</a>
          <a href="#contact" style={navLink(dark)}>Contact</a>

          <button
            onClick={toggleDark}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              background: dark ? "#e5e7eb" : "#020617",
              color: dark ? "#020617" : "#e5e7eb",
            }}
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div
          className="mobile-nav"
          style={{
            padding: "10px 20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <a href="#about" style={navLink(dark)}>About</a>
          <a href="#contact" style={navLink(dark)}>Contact</a>

          <button
            onClick={toggleDark}
            style={{
              padding: "8px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: dark ? "#e5e7eb" : "#020617",
              color: dark ? "#020617" : "#e5e7eb",
            }}
          >
            {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}

      {/* RESPONSIVE CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
     `}</style>
     
      <nav>
        <Link to="/">Home</Link>
        <Link to="/app">App</Link>
      </nav>

    </header>
  )};

  function navLink(dark: boolean) {
  return {
    textDecoration: "none",
    fontWeight: 500,
    color: dark ? "#e5e7eb" : "#020617",
  };
}