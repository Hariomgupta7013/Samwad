import express from "express";
import cors from "cors";
import { createServer } from "node:http";
// import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";
import path from "path"
import userRoutes from "./src/routes/users_routes.js"


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use("/api/users", userRoutes);
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "../frontend/build")));


const start = async () => {
  server.listen(app.get("port"), () => {
    console.log(`Server in listenin on post 8000`);
  });
  const connectionDB = await mongoose.connect(
    "mongodb+srv://hariomgupta8057_db_user:zqfxvuRVNKxi0d8O@cluster0.f3idmhy.mongodb.net/?appName=Cluster0",
  );
  console.log(`connected to DB Host : ${connectionDB.connection.host}`);
};

start();

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

