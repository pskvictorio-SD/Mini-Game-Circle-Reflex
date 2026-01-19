import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";

const routes = Router();

routes.get("/", getUsers);

export default routes;