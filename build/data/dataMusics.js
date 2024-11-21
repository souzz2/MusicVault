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
const idGenerator_1 = require("../services/idGenerator");
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
        this.updateMusic = (id, updates) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fields = [];
                const values = [];
                if (updates.namemusic) {
                    fields.push("namemusic = ?");
                    values.push(updates.namemusic);
                }
                if (updates.genremusic) {
                    fields.push("genremusic = ?");
                    values.push(updates.genremusic);
                }
                if (updates.duration) {
                    fields.push("duration = ?");
                    values.push(updates.duration);
                }
                if (updates.idalbum) {
                    fields.push("idalbum = ?");
                    values.push(updates.idalbum);
                }
                if (fields.length === 0) {
                    throw new Error("Nenhum campo válido para atualizar.");
                }
                const query = `
        UPDATE musics
        SET ${fields.join(", ")}
        WHERE idmusic = ?;
      `;
                values.push(id);
                yield connection_1.default.raw(query, values);
            }
            catch (error) {
                throw new Error("Erro ao atualizar música no banco de dados.");
            }
        });
        this.addMusics = (namemusic, genremusic, duration, idalbum) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idmusic = (0, idGenerator_1.generatedId)();
                yield (0, connection_1.default)("musics").insert({
                    idmusic,
                    namemusic,
                    genremusic,
                    duration,
                    idalbum,
                });
            }
            catch (sql) {
                throw sql;
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
                return yield (0, connection_1.default)("musics")
                    .select("namemusic")
                    .where("namemusic", "like", `%${name}%`)
                    .orderBy("namemusic", "asc")
                    .limit(5);
            }
            catch (sql) {
                throw sql;
            }
        });
        this.getMusics = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, connection_1.default)("musics").orderBy("idmusic", "asc").limit(10);
            }
            catch (sql) {
                throw sql;
            }
        });
    }
}
exports.musicData = musicData;
