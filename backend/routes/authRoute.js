import express from "express"
import {adminLogin, googleauth, login, logout, registration } from "../controllers/auth.controller.js";

const authRoutes=express.Router();
authRoutes.post("/registration",registration);
authRoutes.post("/googleregistration",googleauth);
authRoutes.post("/login",login);
authRoutes.get("/logout",logout);
authRoutes.post("/adminlogin",adminLogin);


export default authRoutes