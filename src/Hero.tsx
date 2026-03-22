import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatItem {
  number: string;
  label: string;
}

interface FeatureCard {
  icon: string;
  title: string;
  text: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS: StatItem[] = [
  { number: "57K+", label: "Telegram Subscribers" },
  { number: "2 Types", label: "New & Dubai Used Laptops" },
  { number: "Bole", label: "Addis Ababa Location" },
];

const FEATURES: FeatureCard[] = [
  {
    icon: "💻",
    title: "Wide Laptop Selection",
    text: "Both brand-new and certified Dubai-used laptops across all budgets — from students to professionals.",
  },
  {
    icon: "💵",
    title: "ዝቅተኛ ዋጋ — Low Prices",
    text: "We keep prices as low as possible without compromising on quality. Great deals, honest sales, no hidden fees.",
  },
  {
    icon: "👌",
    title: "ከፍተኛ ጥራት — High Quality",
    text: "Every laptop is inspected before sale. We stand behind the quality of what we sell — always.",
  },
  {
    icon: "📲",
    title: "57K+ Community",
    text: "Join tens of thousands of satisfied customers on our Telegram channel for the latest deals and updates.",
  },
  {
    icon: "🏪",
    title: "Physical Store",
    text: "Visit us in person at Reality Building, Bole — 3rd floor, Room B-303, next to Yigu Church.",
  },
  {
    icon: "☎️",
    title: "Direct Support",
    text: "Call or message us directly. Reachable on Telegram and by phone at 09-11-67-59-21.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.026 9.549c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.278 13.98l-2.946-.919c-.64-.2-.653-.64.136-.948l11.5-4.433c.533-.194 1 .131.594 1.568z" />
    </svg>
  );
}

function LaptopDeco() {
  return (
    <svg
      viewBox="0 0 340 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        right: 48,
        top: "50%",
        transform: "translateY(-50%)",
        width: 340,
        height: 340,
        opacity: 0.18,
        pointerEvents: "none",
      }}
    >
      <rect x="40" y="60" width="260" height="170" rx="12" stroke="#00e5ff" strokeWidth="2" />
      <rect
        x="60" y="80" width="220" height="130" rx="4"
        stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 4"
      />
      <line x1="20" y1="235" x2="320" y2="235" stroke="#00e5ff" strokeWidth="2" />
      <path d="M20 235 L80 270 H260 L320 235" stroke="#00e5ff" strokeWidth="2" />
      <circle cx="170" cy="252" r="6" stroke="#00e5ff" strokeWidth="1.5" />
      {[105, 120, 135, 150, 165, 180, 195].map((y) => (
        <line key={y} x1="60" y1={y} x2="280" y2={y} stroke="#00e5ff" strokeWidth="0.5" opacity="0.4" />
      ))}
      <text
        x="170" y="162"
        textAnchor="middle"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="28"
        fill="#00e5ff"
        opacity="0.6"
      >
        ሊቅ TECH
      </text>
    </svg>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "40px 48px",
        display: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,229,255,0.15)",
        background: scrolled ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.7)",
        transition: "background 0.4s",
      }}
    >
      {/* Logo */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Noto Sans Ethiopic', sans-serif", fontWeight: 900, fontSize: "1.3rem", color: "#00e5ff" }}>
          <BlinkDot />
          ሊቅ Technologies
        </div>
        <div style={{ fontSize: "0.75rem", color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px" }}>
          Addis Ababa · Laptop Store
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: "0.8rem", color: "#00e5ff", border: "1px solid rgba(0,229,255,0.15)", padding: "6px 14px", borderRadius: 20, letterSpacing: "0.05em" }}>
          57K+ Subscribers
        </div>
        <PrimaryButton href="https://t.me/liqtechnologies" style={{ padding: "10px 22px", fontSize: "0.78rem" }}>
          <TelegramIcon size={16} /> Join Channel
        </PrimaryButton>
      </div>
    </nav>
  );
}

function BlinkDot() {
  return (
    <span
      style={{
        width: 8, height: 8,
        background: "#00e5ff",
        borderRadius: "50%",
        display: "inline-block",
        animation: "blink 2s ease-in-out infinite",
      }}
    />
  );
}

function PrimaryButton({
  href, children, style,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: hovered ? "#fff" : "#00e5ff",
        color: "#000",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: "0.9rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "16px 32px",
        borderRadius: 2,
        textDecoration: "none",
        transition: "all 0.3s",
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
        boxShadow: hovered ? "0 0 40px rgba(0,229,255,0.4)" : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        ...style,
      }}
    >
      {children}
    </a>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "transparent",
        color: hovered ? "#00e5ff" : "#f0f0f5",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "0.9rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "16px 32px",
        border: `1px solid ${hovered ? "#00e5ff" : "rgba(0,229,255,0.15)"}`,
        borderRadius: 2,
        textDecoration: "none",
        transition: "all 0.3s",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      {children}
    </a>
  );
}

function StatCard({ number, label }: StatItem) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0a0a0f",
        padding: "40px 36px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "3.5rem",
          color: "#00e5ff",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {number}
      </div>
      <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6b80" }}>
        {label}
      </div>
      {/* Hover underline */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 2,
          background: "#00e5ff",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.5s",
        }}
      />
    </div>
  );
}

function FeatureCardItem({ icon, title, text }: FeatureCard) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#16161f",
        border: `1px solid ${hovered ? "rgba(0,229,255,0.35)" : "rgba(0,229,255,0.15)"}`,
        padding: "36px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s",
        transform: hovered ? "translateY(-4px)" : "none",
        cursor: "default",
      }}
    >
      {/* Top shimmer line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
          transform: hovered ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s",
        }}
      />
      <div style={{ fontSize: "2rem", marginBottom: 20 }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 10, letterSpacing: "0.02em", color: "#f0f0f5" }}>
        {title}
      </div>
      <div style={{ fontSize: "0.88rem", color: "#6b6b80", lineHeight: 1.6 }}>
        {text}
      </div>
    </div>
  );
}

// ─── Fade-up animation hook ───────────────────────────────────────────────────
function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.8s ${delay}s, transform 0.8s ${delay}s`;
    const timer = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 50);
    return () => clearTimeout(timer);
  }, [delay]);

  return ref;
}

// ─── Main Hero Component ──────────────────────────────────────────────────────
export default function Hero() {
  const eyebrowRef = useFadeUp(0.2);
  const titleRef = useFadeUp(0.4);
  const amharicRef = useFadeUp(0.6);
  const descRef = useFadeUp(0.8);
  const actionsRef = useFadeUp(1.0);
  const statsRef = useFadeUp(1.2);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=Noto+Sans+Ethiopic:wght@400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0f;
          color: #f0f0f5;
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(60px, 40px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, -60px); }
        }

        .grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 0;
          animation: gridPulse 8s ease-in-out infinite;
          pointer-events: none;
        }
        .blob-1 {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          background: radial-gradient(circle, rgba(0,229,255,0.12), transparent 70%);
          top: -200px; left: -100px;
          animation: float1 12s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        .blob-2 {
          position: fixed;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          background: radial-gradient(circle, rgba(255,107,0,0.1), transparent 70%);
          bottom: -150px; right: -100px;
          animation: float2 14s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        .noise {
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.4;
        }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .location-strip { flex-direction: column !important; }
          .laptop-deco { display: none !important; }
          nav { padding: 16px 24px !important; }
        }
      `}</style>

      {/* Background layers */}
      <div className="grid-bg" />
      <div className="blob-1" />
      <div className="blob-2" />
      <div className="noise" />

      {/* Navbar */}
      <Navbar />

      {/* ── Hero Section ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "140px 48px 80px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div ref={eyebrowRef} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#00e5ff", marginBottom: 28 }}>
          <span style={{ width: 32, height: 1, background: "#00e5ff", display: "inline-block" }} />
          Addis Ababa · Ethiopia · Tech Store
        </div>

        <div ref={titleRef}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px, 10vw, 160px)", lineHeight: 0.9, letterSpacing: "0.02em", color: "#f0f0f5" }}>
            <span style={{ display: "block" }}>Premium</span>
            <span style={{ display: "block", WebkitTextStroke: "2px #00e5ff", color: "transparent" }}>Laptops</span>
            <span style={{ display: "block" }}>Delivered</span>
          </h1>
        </div>

        <div ref={amharicRef} style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif", fontSize: "clamp(36px, 5vw, 72px)", color: "#ff6b00", fontWeight: 900, lineHeight: 1.1, marginBottom: 36, marginTop: 8 }}>
          ሊቅ Technologies
        </div>

        <p ref={descRef} style={{ fontSize: "1.1rem", color: "#6b6b80", maxWidth: 520, lineHeight: 1.7, marginBottom: 48 }}>
          Get <strong style={{ color: "#f0f0f5" }}>brand-new &amp; Dubai-used laptops</strong> at unbeatable prices.
          Top quality, honest deals — all found on our Telegram channel.
          <br /><br />
          ዝቅተኛ ዋጋ · ከፍተኛ ጥራት 👌
        </p>

        <div ref={actionsRef} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <PrimaryButton href="https://t.me/liqtechnologies">
            <TelegramIcon /> Join on Telegram
          </PrimaryButton>
          <SecondaryButton href="tel:+251911675921">
            ☎️ &nbsp;091-167-5921
          </SecondaryButton>
        </div>

        {/* Decorative laptop */}
        <div className="laptop-deco">
          <LaptopDeco />
        </div>
      </section>

      {/* ── Stats ── */}
      <div
        ref={statsRef}
        style={{
          position: "relative", zIndex: 1,
          maxWidth: 1400, margin: "0 auto",
          padding: "0 48px 80px",
        }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "rgba(0,229,255,0.15)",
            border: "1px solid rgba(0,229,255,0.15)",
          }}
        >
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "#f0f0f5", letterSpacing: "0.05em", marginBottom: 8 }}>
          Why Choose Us?
        </div>
        <div style={{ fontSize: "0.85rem", color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 48 }}>
          ለምን ሊቅ ቴክኖሎጂስ?
        </div>
        <div
          className="features-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
        >
          {FEATURES.map((f) => (
            <FeatureCardItem key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ── Location + CTA Strip ── */}
      <div
        className="location-strip"
        style={{
          position: "relative", zIndex: 1,
          maxWidth: 1400, margin: "0 auto",
          padding: "0 48px 80px",
          display: "flex",
          alignItems: "stretch",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {/* Address */}
        <div style={{ flex: 1, width: "100%", background: "#16161f", border: "1px solid rgba(0,229,255,0.15)", padding: "32px 36px", display: "flex", gap: 20 }}>
          <div style={{ fontSize: "2rem", flexShrink: 0, marginTop: 4 }}>📍</div>
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00e5ff", marginBottom: 8 }}>Store Location</div>
            <div style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif", fontSize: "0.95rem", color: "#f0f0f5", lineHeight: 1.6 }}>
              ቦሌ ዪጐ ቸርች አጠገብ<br />
              Reality Building 3ኛ ፎቅ<br />
              ሱቅ ቁጥር B-303<br />
              Addis Ababa, Ethiopia
            </div>
          </div>
        </div>

        {/* Phone */}
        <div style={{ flex: 1, width: "100%", background: "#16161f", border: "1px solid rgba(0,229,255,0.15)", padding: "32px 36px", display: "flex", gap: 20 }}>
          <div style={{ fontSize: "2rem", flexShrink: 0, marginTop: 4 }}>📞</div>
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00e5ff", marginBottom: 8 }}>Call / Message</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 800, color: "#00e5ff" }}>09-11-67-59-21</div>
            <div style={{ fontSize: "0.8rem", color: "#6b6b80", marginTop: 8 }}>Available on Telegram &amp; Phone</div>
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 12 }}>
          <PrimaryButton href="https://t.me/liqtechnologies" style={{ justifyContent: "center"  , width: "85%" }}>
            <TelegramIcon /> Join @liqtechnologies
          </PrimaryButton>
          <SecondaryButton href="https://t.me/s/liqtechnologies">
            Preview Latest Posts
          </SecondaryButton>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          position: "relative", zIndex: 1,
          borderTop: "1px solid rgba(0,229,255,0.15)",
          padding: "32px 48px",
          maxWidth: 1400, margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif", fontWeight: 900, color: "#00e5ff", fontSize: "1.1rem" }}>
          ሊቅ Technologies
        </div>
        <div style={{ fontSize: "0.75rem", color: "#6b6b80", letterSpacing: "0.05em" }}>
          Addis Ababa · Bole · Reality Building B-303 · t.me/liqtechnologies
        </div>
      </footer>
    </>
  );
}
