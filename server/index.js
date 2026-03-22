import express from "express";
import cors from "cors";
import fs from "fs";
import fetch from "node-fetch";
import input from "input";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";

const app = express();
app.use(cors());

/* ================== CONFIG ================== */
const apiId = 37041539; // <-- PUT YOUR API ID
const apiHash = "6d3eeaab27d37915ee7da0f5ce702bb2"; // <-- PUT YOUR API HASH
const channelUsername = "ecomercetest";
const PORT = 5000;

/* ================== SESSION ================== */
const SESSION_FILE = "./session.txt";
const sessionString = fs.existsSync(SESSION_FILE)
  ? fs.readFileSync(SESSION_FILE, "utf8")
  : "";

const stringSession = new StringSession(sessionString);

/* ================== TELEGRAM CLIENT ================== */
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

await client.start({
  phoneNumber: async () => await input.text("📱 Phone number: "),
  password: async () => await input.text("🔒 2FA password (if any): "),
  phoneCode: async () => await input.text("📩 Code from Telegram: "),
  onError: (err) => console.log(err),
});

fs.writeFileSync(SESSION_FILE, client.session.save());
console.log("✅ Telegram connected");

/* ================== HELPER: DOWNLOAD IMAGE ================== */
async function getImageUrl(message) {
  if (!message.photo) return null;

  const buffer = await client.downloadMedia(message.photo);
  if (!buffer) return null;

  const fileName = `image_${message.id}.jpg`;
  fs.writeFileSync(`./${fileName}`, buffer);

  return `http://localhost:${PORT}/${fileName}`;
}

/* ================== API ================== */
app.get("/posts", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;

    const messages = await client.getMessages(channelUsername, {
      limit,
      offsetId: offset,
    });

    const posts = [];

    for (const m of messages) {
      if (!m.message && !m.photo) continue;

      const image = await getImageUrl(m);

      posts.push({
        id: m.id,
        telegramPostId: m.id, // 🔥 THIS IS THE KEY
        text: m.message || "",
        image,
      });
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

/* ================== STATIC FILES ================== */
app.use(express.static("."));

/* ================== START SERVER ================== */
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});