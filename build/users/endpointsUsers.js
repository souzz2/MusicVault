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
exports.login = exports.signup = void 0;
const dataUsers_1 = require("./dataUsers");
const authenticator_1 = require("../services/authenticator");
const hashManager_1 = require("../services/hashManager");
const idGenerator_1 = require("../services/idGenerator");
const bcrypt_1 = require("bcrypt");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickname, emailuser, password, role } = req.body;
        if (!nickname || !emailuser || !password || !role) {
            throw new Error('Preencha os campos "name","nickname", "email" e "password"');
        }
        const iduser = (0, idGenerator_1.generatedId)();
        const cypherPassword = yield (0, hashManager_1.hash)(password);
        yield (0, dataUsers_1.insertUserData)({
            iduser,
            nickname,
            emailuser,
            password: cypherPassword,
            role,
        });
        const token = (0, authenticator_1.generateToken)({
            iduser,
            role: role,
        });
        res.status(201).send({
            message: "Usuário criado!",
            token,
        });
    }
    catch (error) {
        res.status(404).json({ message: "Erro ao se registrar.", error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailuser, password } = req.body;
        if (!emailuser || !password) {
            throw new Error("'email' e 'senha' são obrigatórios");
        }
        const user = yield (0, dataUsers_1.getUserByEmailData)(emailuser);
        if (!user) {
            throw new Error("Usuário não encontrado ou senha incorreta");
        }
        const passwordIsCorrect = yield (0, bcrypt_1.compare)(password, user.password);
        if (!passwordIsCorrect) {
            throw new Error("Usuário não encontrado ou senha incorreta");
        }
        const token = (0, authenticator_1.generateToken)({
            iduser: user.iduser,
            role: user.role,
        });
        res.send({
            message: "Usuário logado!",
            token,
        });
    }
    catch (error) {
        res.status(400).json({ message: "Não foi possível realizar o login" });
    }
});
exports.login = login;
