import { Router } from "express";
import { getUsers,createUser,getUserById,getUserByEmail } from "../controllers/user.controller.js";

const routes = Router();

routes.get("/", getUsers);
routes.post("/", createUser);
routes.post("/:id", getUserById);
routes.post("/login/email", getUserByEmail);

export default routes;