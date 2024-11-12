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
class musicBusiness {
    constructor() {
        this.musicData = new dataMusics_1.musicData();
        this.getMusicById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
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
        this.searchMusicByName = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
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
        this.getAllMusics = () => __awaiter(this, void 0, void 0, function* () {
            try {
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
        this.addMusic = (idmusic, namemusic, genremusic, duration, idalbum) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.musicData.addMusics(idmusic, namemusic, genremusic, duration, idalbum);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao adicionar a música.");
            }
        });
    }
}
exports.musicBusiness = musicBusiness;
