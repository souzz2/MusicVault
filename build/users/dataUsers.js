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
exports.getUserByEmailData = exports.insertUserData = void 0;
const connection_1 = __importDefault(require("../connection"));
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["NORMAL"] = "NORMAL";
    USER_ROLES["ADMIN"] = "ADMIN";
    USER_ROLES["ARTISTA"] = "ARTISTA";
})(USER_ROLES || (USER_ROLES = {}));
const insertUserData = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default
        .insert(user)
        .into("users");
});
exports.insertUserData = insertUserData;
const getUserByEmailData = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connection_1.default)("users").select("*").where({ email });
        return {
            iduser: result[0].iduser,
            nickname: result[0].nickname,
            emailuser: result[0].emailuser,
            password: result[0].password,
            role: result[0].role,
        };
    }
    catch (error) {
        throw new Error("Não foi possivel realizar o login");
    }
});
exports.getUserByEmailData = getUserByEmailData;
