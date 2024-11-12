import { Router } from "express";
import { UserController } from "../controller/userController";

export const router = Router();
const controller = new UserController();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
