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
exports.artistData = void 0;
const connection_1 = __importDefault(require("../connection"));
class artistData {
    constructor() {
        this.getArtistByIdData = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("artists")
                    .where("idartist", "=", id)
                    .orderBy("idartist", "asc")
                    .limit(1);
                if (!result.length) {
                    throw new Error(`Artista com id ${id} não encontrado`);
                }
                return result[0];
            }
            catch (error) {
                throw new Error("Erro ao buscar artista por ID");
            }
        });
        this.getArtistsByNameData = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("artists")
                    .select("nameartist")
                    .where("nameartist", "like", `%${name}%`)
                    .orderBy("nameartist", "asc")
                    .limit(5);
                if (!result.length) {
                    throw new Error("Nenhum artista encontrado com esse nome.");
                }
                return result;
            }
            catch (error) {
                throw new Error("Erro ao buscar artistas por nome");
            }
        });
        this.getArtistsData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("artists")
                    .orderBy("idartist", "asc")
                    .limit(10);
                if (!result.length) {
                    throw new Error("Não há artistas disponíveis.");
                }
                return result;
            }
            catch (error) {
                throw new Error("Erro ao buscar todos os artistas");
            }
        });
    }
}
exports.artistData = artistData;