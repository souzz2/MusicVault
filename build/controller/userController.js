"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userBusiness_1 = require("../business/userBusiness");
class UserController {
    constructor() {
        this.UserBusinnes = new userBusiness_1.UserBusinnes();
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { nickname, emailuser, password, role } = req.body;
                const result = yield this.UserBusinnes.signupUser({
                    nickname,
                    emailuser,
                    password,
                    role,
                });
                res.status(201).send(result);
            }
            catch (error) {
                res.status(400).json({ message: "Erro ao se registrar" });
            }
            login = (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { emailuser, password } = req.body;
                    const result = yield this.UserBusinnes.loginUser({
                        emailuser,
                        password,
                    });
                    res.send(result);
                }
                catch (error) {
                    res.status(400).json({
                        message: "Não foi possível realizar o login",
                    });
                }
            });
        });
    }
}
exports.UserController = UserController;
