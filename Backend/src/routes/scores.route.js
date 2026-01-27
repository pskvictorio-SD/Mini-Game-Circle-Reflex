import { Router } from "express";
import {getScores,createScore} from "../controllers/scores.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const routes = Router()

routes.get("/", getScores)
routes.post("/", authMiddleware, createScore)

export default routes