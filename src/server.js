import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Proper __dirname for ESM (path.resolve() se CWD milta hai; file ka dir nahi)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Quick sanity logs (temporary)
console.log("ENV CHECK -> MONGO_URI present?", !!process.env.MONGO_URI);
if (!process.env.MONGO_URI) {
   console.error("❌ MONGO_URI missing. Ensure .env is at backend/.env or pass --env-file");
}

app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/dist")));
   app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
   });
}

// Start sequence: DB first, then server
const start = async () => {
   try {
      await connectDB(); // <-- yaha await zaroori hai
      app.listen(PORT, () => {
         console.log(`🚀 Server is running on port ${PORT}`);
      });
   } catch (err) {
      console.error("❌ Failed to start server:", err?.message || err);
      process.exit(1); // clear fail instead of silent crash
   }
};

start();












  
 