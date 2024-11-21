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
exports.musicBusiness = void 0;
const dataMusics_1 = require("../data/dataMusics");
const idGenerator_1 = require("../services/idGenerator");
class musicBusiness {
    constructor() {
        this.musicData = new dataMusics_1.musicData();
        this.deleteMusic = (id, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                if (!id) {
                    throw new Error("O ID da música é obrigatório para exclusão.");
                }
                const music = yield this.musicData.findMusicById(id);
                if (!music || music.length === 0) {
                    throw new Error(`Música com id ${id} não encontrada.`);
                }
                yield this.musicData.deleteMusic(id);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao deletar a música.");
            }
        });
        this.updateMusic = (id, token, updates) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                const music = yield this.musicData.findMusicById(id);
                if (!music) {
                    throw new Error(`Música com id ${id} não encontrada.`);
                }
                yield this.musicData.updateMusic(id, updates);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao atualizar a música.");
            }
        });
        this.getMusicById = (id, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                const music = yield this.musicData.findMusicById(id);
                if (!music || music.length === 0) {
                    throw new Error(`Música com id ${id} não encontrada`);
                }
                return music;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao buscar a música");
            }
        });
        this.searchMusicByName = (name, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                if (!name) {
                    throw new Error('O parâmetro de busca "name" é obrigatório.');
                }
                const musics = yield this.musicData.searchMusicByName(name);
                if (!musics || musics.length === 0) {
                    throw new Error("Nenhuma música foi encontrada.");
                }
                return musics;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao buscar músicas");
            }
        });
        this.getMusics = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                const musics = yield this.musicData.getMusics();
                if (musics.length === 0) {
                    throw new Error("Não há músicas disponíveis no momento.");
                }
                return musics;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao buscar músicas.");
            }
        });
        this.addMusic = (namemusic, genremusic, duration, idalbum, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                const idmusic = (0, idGenerator_1.generatedId)();
                yield this.musicData.addMusics(namemusic, genremusic, duration, idalbum);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao adicionar a música.");
            }
        });
    }
}
exports.musicBusiness = musicBusiness;
