"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
exports.router = (0, express_1.Router)();
const controller = new userController_1.UserController();
exports.router.post("/signup", controller.signup);
exports.router.post("/login", controller.login);
