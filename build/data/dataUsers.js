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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = void 0;
const connection_1 = __importDefault(require("../connection"));
class userData {
    constructor() {
        this.insertUserData = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, connection_1.default)("users").insert({
                    iduser: user.iduser,
                    nickname: user.nickname,
                    password: user.password,
                    emailuser: user.emailuser
                });
            }
            catch (sql) {
                throw sql;
            }
        });
        this.getUserByEmailData = (emailuser) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("users")
                    .select("*")
                    .where({ emailuser: emailuser });
                if (result.length === 0)
                    return null;
                return {
                    iduser: result[0].iduser,
                    nickname: result[0].nickname,
                    emailuser: result[0].emailuser,
                    password: result[0].password
                };
            }
            catch (sql) {
                throw sql;
            }
        });
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, connection_1.default)("users").orderBy("iduser", "asc").limit(10);
            }
            catch (sql) {
                throw sql;
            }
        });
    }
}
exports.userData = userData;
