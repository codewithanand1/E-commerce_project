import express from "express"
import { addProduct, listproduct, removeProduct } from "../controllers/productcontroller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

let productRoutes=express.Router();


productRoutes.post("/addproduct",upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3", maxCount:1},
    {name:"image4",maxCount:1}]),addProduct)


productRoutes.get("/list",adminAuth,listproduct);
productRoutes.post("/remove/:id",adminAuth,removeProduct)

export default productRoutes
