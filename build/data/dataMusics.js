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
exports.musicData = void 0;
const connection_1 = __importDefault(require("../connection"));
class musicData {
    constructor() {
        this.deleteMusic = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("musics").where("idmusic", id).del();
                if (result === 0) {
                    throw new Error(`Música com id ${id} não encontrada.`);
                }
            }
            catch (error) {
                throw new Error("Erro ao deletar música no banco de dados.");
            }
        });
        this.updateMusics = (id, updates) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("musics")
                    .where("idmusic", id)
                    .update(updates);
                return result;
            }
            catch (error) {
                throw new Error("Erro ao atualizar música no banco de dados.");
            }
        });
        this.checkAlbumExists = (idalbum) => __awaiter(this, void 0, void 0, function* () {
            const album = yield (0, connection_1.default)("albuns").where("idalbum", idalbum).first();
            return !!album;
        });
        this.addMusicsData = (idmusic, namemusic, genremusic, duration, idalbum) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, connection_1.default)("musics").insert({
                    idmusic,
                    namemusic,
                    genremusic,
                    duration,
                    idalbum,
                });
            }
            catch (error) {
                throw new Error("Erro ao adicionar música no banco de dados.");
            }
        });
        this.findMusicById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, connection_1.default)("musics")
                    .where("idmusic", id)
                    .orderBy("idmusic", "asc")
                    .limit(10);
            }
            catch (sql) {
                throw sql;
            }
        });
        this.searchMusicByName = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("musics").where("namemusic", "ilike", `%${name}%`);
                return result;
            }
            catch (error) {
                throw new Error("Erro ao buscar músicas no banco de dados.");
            }
        });
        this.getMusics = (limit, offset) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, connection_1.default)("musics")
                    .orderBy("idmusic", "asc")
                    .limit(limit)
                    .offset(offset);
            }
            catch (sql) {
                throw sql;
            }
        });
    }
}
exports.musicData = musicData;
