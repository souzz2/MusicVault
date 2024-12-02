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
                yield this.musicData.updateMusics(id, updates);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao atualizar a música.");
            }
        });
        this.addMusic = (namemusic, genremusic, duration, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                if (!namemusic || !genremusic || !duration) {
                    throw new Error("Todos os campos da música são obrigatórios.");
                }
                const idmusic = (0, idGenerator_1.generatedId)();
                yield this.musicData.addMusicsData(idmusic, namemusic, genremusic, duration);
                return idmusic;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao adicionar música no banco de dados.");
            }
        });
        this.addMusicsWithAlbuns = (namemusic, genremusic, duration, idalbum, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                if (!namemusic || !genremusic || !duration || !idalbum) {
                    throw new Error("Todos os campos da música são obrigatórios.");
                }
                const idmusic = (0, idGenerator_1.generatedId)();
                const albumExists = yield this.musicData.checkAlbumExists(idalbum);
                if (!albumExists) {
                    throw new Error(`Álbum com id ${idalbum} não encontrado.`);
                }
                yield this.musicData.addMusicsData(idmusic, namemusic, genremusic, duration, idalbum);
                return idmusic;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao adicionar música no banco de dados.");
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
                return musics || [];
            }
            catch (error) {
                throw new Error(error.message || "Erro ao buscar músicas.");
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
        this.getMusics = (token, limit, offset) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                const musics = yield this.musicData.getMusics(limit, offset);
                if (musics.length === 0) {
                    throw new Error("Não há músicas disponíveis no momento.");
                }
                return musics;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao buscar músicas.");
            }
        });
    }
}
exports.musicBusiness = musicBusiness;
