import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";
import path from "path";
import userRoutes from "./src/routes/users_routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

// CORS (fixed properly)
app.use(cors({
  origin: "https://samwad-jb33.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Handle preflight requests manually (VERY IMPORTANT)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://samwad-jb33.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Body parsers
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Start server
const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hariomgupta8057_db_user:zqfxvuRVNKxi0d8O@cluster0.f3idmhy.mongodb.net/?appName=Cluster0"
    );
    console.log("DB Connected");

    server.listen(app.get("port"), () => {
      console.log(`Server running on port ${app.get("port")}`);
    });

  } catch (error) {
    console.log("DB Error:", error);
  }
};

start();

// Catch-all (ONLY GET)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});