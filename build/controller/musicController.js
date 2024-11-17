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
exports.musicController = void 0;
const musicBusiness_1 = require("../business/musicBusiness");
class musicController {
    constructor() {
        this.musicBusiness = new musicBusiness_1.musicBusiness();
        this.postMusics = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { idmusic, namemusic, genremusic, duration, idalbum } = req.body;
                if (!idmusic || !namemusic || !genremusic || !duration || !idalbum) {
                    throw new Error("Os parâmetros de busca não foram preenchidos corretamente.");
                }
                yield this.musicBusiness.addMusic(idmusic, namemusic, genremusic, duration);
                res.status(200).send(`Música ${namemusic} adicionada com sucesso!`);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao adicionar música", error: error.message });
            }
        });
        this.getMusicsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const music = yield this.musicBusiness.getMusicById(id);
                if (!music) {
                    throw new Error(`Música com id ${id} não encontrada`);
                }
                res.status(200).json(music);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao buscar música", error: error.message });
            }
        });
        this.searchMusicByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const name = (_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
                if (!name) {
                    throw new Error('O parâmetro de busca "name" é obrigatório.');
                }
                const musics = yield this.musicBusiness.searchMusicByName(name);
                if (!musics || musics.length === 0) {
                    throw new Error("Nenhuma música foi encontrada.");
                }
                res.status(200).json({ musics });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao buscar música", error: error.message });
            }
        });
        this.getMusics = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const musics = yield this.musicBusiness.getMusics();
                if (!musics.length) {
                    throw new Error("Não há músicas disponíveis no momento.");
                }
                res.status(200).json(musics);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao buscar músicas.", error: error.message });
            }
        });
    }
}
exports.musicController = musicController;
