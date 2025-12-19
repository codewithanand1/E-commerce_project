import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";

dotenv.config();

const app = express();

/* ---------- middleware ---------- */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://e-commerce-fronted-81fo.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* ---------- routes ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoutes);

/* ---------- test ---------- */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ---------- server ---------- */
const PORT = process.env.PORT || 5000;

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB error ❌", err);
  });
