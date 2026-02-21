
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());                // ✅ MUST be before routes
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

export default app;










