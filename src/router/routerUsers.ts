import express from "express";
import { UserController } from "../controller/userController";

export const userRouter = express.Router();
const controller = new UserController();

userRouter.post("/signup", controller.signup);
userRouter.post("/login", controller.login);
userRouter.get("/users", controller.getUsers);

