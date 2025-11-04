import express from "express"
import { allOrders, placeOrder, userOrders,updateStatus, placeOrderRazorpay, verifyRazorpay } from "../controllers/ordercontroller.js";
import isAuth from "../middleware/isAuth.js"
import adminAuth from "../middleware/adminAuth.js"
const orderRoutes=express.Router();

orderRoutes.post("/placeorder",isAuth,placeOrder);
orderRoutes.post("/razorpay",isAuth,placeOrderRazorpay);
orderRoutes.post("/userorder",isAuth,userOrders);
orderRoutes.post("/verifyrazorpay",isAuth,verifyRazorpay);


//for Admin
orderRoutes.post("/list",adminAuth,allOrders);
orderRoutes.post("/status",adminAuth,updateStatus);


export default orderRoutes