import express from "express"
const app=express();
import dotenv from "dotenv"
import cors from "cors"
import connectdb from "./config/db.js"
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
    origin:"https://e-commerce-fronted-81fo.onrender.com",
    credentials:true
    }
))

app.use("/api/auth",authRoutes)
app.use("/api/auth",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoutes);

const PORT=process.env.PORT||5000 
app.listen(PORT,()=>{
    connectdb()
    console.log("server is started "+PORT)
})
