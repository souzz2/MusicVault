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
exports.UserBusinnes = void 0;
const dataUsers_1 = require("../data/dataUsers");
const authenticator_1 = require("../services/authenticator");
const hashManager_1 = require("../services/hashManager");
const idGenerator_1 = require("../services/idGenerator");
const typeUsers_1 = require("../types/typeUsers");
class UserBusinnes {
    constructor() {
        this.userData = new dataUsers_1.userData();
        this.signupUser = (_a) => __awaiter(this, [_a], void 0, function* ({ nickname, emailuser, password, role }) {
            if (!nickname || !emailuser || !password || !role) {
                throw new Error('Preencha os campos "nickname", "emailuser", "password" e "role"');
            }
            if (!Object.values(typeUsers_1.userRole).includes(role)) {
                throw new Error("O 'role' deve ser um dos valores: NORMAL, ADMIN, ARTISTA.");
            }
            const existingUser = yield this.userData.getUserByEmailData(emailuser);
            if (existingUser) {
                throw new Error("Usuário já existe com este e-mail.");
            }
            const iduser = (0, idGenerator_1.generatedId)();
            const cypherPassword = yield (0, hashManager_1.hash)(password);
            yield this.userData.insertUserData({
                iduser,
                nickname,
                emailuser,
                password: cypherPassword,
                role,
            });
            const token = (0, authenticator_1.generateToken)({ iduser, role });
            return { message: "Usuário criado!", token };
        });
        this.loginUser = (_a) => __awaiter(this, [_a], void 0, function* ({ emailuser, password, }) {
            try {
                if (!emailuser || !password) {
                    throw new Error("'emailuser' e 'password' são obrigatórios");
                }
                const userFromDb = yield this.userData.getUserByEmailData(emailuser);
                if (!userFromDb) {
                    throw new Error("Usuário não encontrado ou senha incorreta");
                }
                const passwordIsCorrect = yield (0, hashManager_1.compare)(password, userFromDb.password);
                if (!passwordIsCorrect) {
                    throw new Error("Usuário não encontrado ou senha incorreta");
                }
                const payload = {
                    iduser: userFromDb.iduser,
                    role: userFromDb.role,
                };
                const token = yield (0, authenticator_1.generateToken)(payload);
                return token;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.UserBusinnes = UserBusinnes;
