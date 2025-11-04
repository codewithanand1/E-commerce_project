import express from "express";
import { addTocart, getUsercart, UpdateCart } from "../controllers/cartcontroller.js";
import isAuth from "../middleware/isAuth.js";
const cartRoute=express.Router();

cartRoute.post("/get",isAuth,getUsercart)
cartRoute.post("/add",isAuth,addTocart)
cartRoute.post("/update",isAuth,UpdateCart)


export default cartRoute