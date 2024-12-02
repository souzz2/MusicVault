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
        this.UserBusiness = new userBusiness_1.UserBusiness();
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { nickname, emailuser, password } = req.body;
                if (!nickname || !emailuser || !password) {
                    res.status(400).json({ message: "Todos os campos são obrigatórios" });
                    return;
                }
                if (!emailuser.includes("@")) {
                    res.status(400).json({ message: "Email inválido" });
                    return;
                }
                if (password.length < 6) {
                    res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres" });
                    return;
                }
                const token = yield this.UserBusiness.signupUser({ nickname, emailuser, password });
                res.status(201).json(token);
            }
            catch (error) {
                res.status(400).json({
                    message: "Erro ao se registrar",
                    error: error.message,
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { emailuser, password } = req.body;
                const result = yield this.UserBusiness.loginUser({
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
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserBusiness.getUsers();
                if (!user.length) {
                    throw new Error("Não há usuários disponíveis no momento.");
                }
                res.status(200).json(user);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao buscar usuários.", error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
