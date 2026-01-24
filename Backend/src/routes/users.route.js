import { Router } from "express";
import { getUsers,createUser,getUserById,getUserByUsername,getUserByEmail } from "../controllers/user.controller.js";

const routes = Router();

routes.get("/", getUsers);
routes.post("/", createUser);
routes.post("/:id", getUserById);
// routes.get("/login/username", getUserByUsername);
routes.post("/login/email", getUserByEmail);

export default routes;