import express from "express";
import { chatWithAI } from "../controllers/ai.controller.js";
import isAuth from "../middleware/isAuth.js";

const AIrouter = express.Router();

AIrouter.post("/chat",isAuth,chatWithAI);

export default AIrouter;