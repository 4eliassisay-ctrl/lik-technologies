export default function Footer({ dark }: { dark: boolean }) {
  return (
    <footer
      style={{
        marginTop: 40,
        padding: "20px 10px",
        textAlign: "center",
        fontSize: 14,
        background: dark ? "#020617" : "#f8fafc",
        color: dark ? "#94a3b8" : "#475569",
        borderTop: dark ? "1px solid #1e293b" : "1px solid #e5e7eb",
      }}
    >
      <div style={{ marginBottom: 8 }}>
        Contact:
        {" "}
        <a
          href="https://t.me/ecomercetest"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: dark ? "#38bdf8" : "#0284c7",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Telegram
        </a>
        {" | "}
        <a
          href="mailto:owner@email.com"
          style={{
            color: dark ? "#38bdf8" : "#0284c7",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Email
        </a>
      </div>

      © {new Date().getFullYear()} Telegram Web
    </footer>
  );
}