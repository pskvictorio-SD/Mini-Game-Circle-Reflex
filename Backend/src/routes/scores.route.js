import { Router } from "express";
import {getScores,createScores} from "../controllers/scores.controller.js"

const routes = Router()

routes.get("/", getScores)
routes.post("/", createScores)

export default routes