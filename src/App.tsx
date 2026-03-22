import { useEffect, useRef, useState } from "react";
import Header from "./header.tsx";
import Footer from "./footer.tsx";
import FloatingTelegramButton from "./FTbtn.tsx";
import Hero from "./Hero.tsx";

type Post = {
  id: number;
  text: string;
  image: string | null;
  telegramPostId: number;
};

const LIMIT = 10;
const CHANNEL_USERNAME = "ecomercetest";

/* ================= SKELETON ================= */
function SkeletonCard() {
  return (
    <div
      style={{
        breakInside: "avoid",
        marginBottom: 20,
        borderRadius: 12,
        overflow: "hidden",
        background: "#e5e7eb",
        animation: "pulse 1.5s infinite",
      }}
    >
      <div style={{ height: 200, background: "#d1d5db" }} />
      <div style={{ padding: 14 }}>
        <div style={{ height: 12, background: "#d1d5db", marginBottom: 8 }} />
        <div style={{ height: 12, background: "#d1d5db", width: "80%" }} />
      </div>
    </div>
  );
}


export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  /* ================= FETCH POSTS ================= */
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/posts?page=${page}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((data: Post[]) => {
        if (data.length < LIMIT) setHasMore(false);
        setPosts((prev) => [...prev, ...data]);
      })
      .finally(() => setLoading(false));
  }, [page]);

  /* ================= INFINITE SCROLL ================= */
  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPage((p) => p + 1);
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  /* ================= IMAGE MODAL KEYS ================= */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex]);

  const images = posts.filter(p => p.image).map(p => p.image!);

  const nextImage = () =>
    setActiveIndex((i) => (i! + 1) % images.length);

  const prevImage = () =>
    setActiveIndex((i) => (i! - 1 + images.length) % images.length);

  const getForwardUrl = (telegramPostId: number) =>
    `https://t.me/share/url?url=https://t.me/${CHANNEL_USERNAME}/${telegramPostId}`;

  /* ================= UI ================= */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#020617" : "#f8fafc",
        color: dark ? "#e5e7eb" : "#020617",
      }}
    >
      {/* ================= HEADER ================= */}
     <Header dark={dark} toggleDark={() => setDark(!dark)} />
     <Hero />
      {/* ================= POSTS ================= */}
      <main
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: 20,
          columnCount:
            window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3,
          columnGap: 20,
        }}
      >
        {posts.map((p) => (
          <div
            key={p.id}
            style={{
              breakInside: "avoid",
              marginBottom: 20,
              background: dark ? "#020617" : "#ffffff",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: dark ? "none" : "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            {p.image && (
              <img
                src={p.image}
                loading="lazy"
                onClick={() => setActiveIndex(images.indexOf(p.image!))}
                style={{ width: "100%", cursor: "zoom-in" }}
              />
            )}

            {p.text && (
              <div style={{ padding: "14px 14px 6px" }}>
                <p style={{ lineHeight: 1.6 }}>{p.text}</p>
              </div>
            )}

            {/* EXACT POST FORWARD */}
            <div style={{ padding: "10px 14px 14px" }}>
              <a
                  href={getForwardUrl(p.telegramPostId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: 10,
                    borderRadius: 10,
                    fontWeight: 600,
                    textDecoration: "none",
                    background: "#22c55e",
                    color: "#fff",
                  }}
                  >
                  📤 Forward this post
                </a>
            </div>
          </div>
        ))}

        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </main>

      {hasMore && <div ref={loaderRef} style={{ height: 40 }} />}

      {/* ================= IMAGE MODAL ================= */}
      {activeIndex !== null && (
        <div
          onClick={() => setActiveIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} style={navBtn("left")}>‹</button>
          <img src={images[activeIndex]} style={{ maxWidth: "95%", maxHeight: "95%" }} />
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} style={navBtn("right")}>›</button>
          <button onClick={() => setActiveIndex(null)} style={closeBtn}>✕</button>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: .5; }
          100% { opacity: 1; }
        }
      `}</style>
      <Footer dark={dark} />
      <FloatingTelegramButton dark={dark} />
    </div>
  );
}

/* ================= STYLES ================= */
const navBtn = (side: "left" | "right") => ({
  position: "absolute" as const,
  [side]: 20,
  fontSize: 40,
  color: "#fff",
  background: "none",
  border: "none",
  cursor: "pointer",
});

const closeBtn = {
  position: "absolute" as const,
  top: 20,
  right: 20,
  fontSize: 28,
  background: "none",
  border: "none",
  color: "#fff",
  cursor: "pointer",
};