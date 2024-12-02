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
        this.deleteMusic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    throw new Error("O ID da música é obrigatório para exclusão.");
                }
                const token = req.headers.authorization;
                yield this.musicBusiness.deleteMusic(id, token);
                res
                    .status(200)
                    .json({ message: `Música com ID ${id} deletada com sucesso.` });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao deletar música.", error: error.message });
            }
        });
        this.updateMusic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { namemusic, genremusic, duration } = req.body;
                if (!id || (!namemusic && !genremusic && !duration)) {
                    throw new Error("Parâmetros de atualização inválidos.");
                }
                const token = req.headers.authorization;
                yield this.musicBusiness.updateMusic(id, token, {
                    namemusic,
                    genremusic,
                    duration,
                });
                res.status(200).json(`Música com ID ${id} atualizada com sucesso.`);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao atualizar música.", error: error.message });
            }
        });
        this.postMusic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { namemusic, genremusic, duration } = req.body;
                if (!namemusic || !genremusic || !duration) {
                    throw new Error("Os parâmetros de busca não foram preenchidos corretamente.");
                }
                const token = req.headers.authorization;
                yield this.musicBusiness.addMusic(namemusic, genremusic, duration, token);
                res.status(200).json(`Música ${namemusic} adicionada com sucesso!`);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao adicionar música", error: error.message });
            }
        });
        this.postMusicsWithAlbums = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { namemusic, genremusic, duration, idalbum } = req.body;
                if (!namemusic || !genremusic || !duration || !idalbum) {
                    throw new Error("Os parâmetros de busca não foram preenchidos corretamente.");
                }
                const token = req.headers.authorization;
                yield this.musicBusiness.addMusicsWithAlbuns(namemusic, genremusic, duration, idalbum, token);
                res.status(200).json(`Música ${namemusic} adicionada com sucesso!`);
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
                const token = req.headers.authorization;
                const music = yield this.musicBusiness.getMusicById(id, token);
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
                const token = req.headers.authorization;
                const musics = yield this.musicBusiness.searchMusicByName(name, token);
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
                const token = req.headers.authorization;
                const limit = parseInt(req.query.limit) || 10;
                const page = parseInt(req.query.page) || 1;
                const offset = (page - 1) * limit;
                const musics = yield this.musicBusiness.getMusics(token, limit, offset);
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
