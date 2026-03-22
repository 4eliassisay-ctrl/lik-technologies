export default function FloatingTelegramButton({ dark }: { dark: boolean }) {
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

  return (
    <a
      href="https://t.me/ecomercetest"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        right: 20,
        bottom: 50,
        zIndex: 999,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#229ED9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 24,
        textDecoration: "none",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
      }}
      aria-label="Contact on Telegram"
      title="Contact on Telegram"
    >
      <TelegramIcon size={60} />
    </a>
  );
}