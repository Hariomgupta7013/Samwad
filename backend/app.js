import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";
import userRoutes from "./src/routes/users_routes.js";

const app = express();
const server = createServer(app);
connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/users", userRoutes);

const start = async () => {
  try {
    const connectionDB = await mongoose.connect(
      "mongodb+srv://hariomgupta8057_db_user:zqfxvuRVNKxi0d8O@cluster0.f3idmhy.mongodb.net/?appName=Cluster0"
    );

    console.log(`connected to DB: ${connectionDB.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`Server running on port ${app.get("port")}`);
    });

  } catch (error) {
    console.log("Error:", error);
  }
};

start();