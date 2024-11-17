"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
exports.userRouter = express_1.default.Router();
const controller = new userController_1.UserController();
exports.userRouter.post("/signup", controller.signup);
exports.userRouter.post("/login", controller.login);
