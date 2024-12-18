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
exports.artistController = void 0;
const artistBusiness_1 = require("../business/artistBusiness");
class artistController {
    constructor() {
        this.artistBusiness = new artistBusiness_1.artistBusiness();
        this.deleteArtist = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    throw new Error("O ID do artista é obrigatório para exclusão.");
                }
                const token = req.headers.authorization;
                yield this.artistBusiness.deleteArtist(id, token);
                res
                    .status(200)
                    .json({ message: `Artista com ID ${id} deletada com sucesso.` });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao deletar o artista.", error: error.message });
            }
        });
        this.postArtist = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { nameartist, bio, countryartist, datebirthartist } = req.body;
                if (!nameartist || !bio || !countryartist || !datebirthartist) {
                    throw new Error("Os parâmetros de busca não foram preenchidos corretamente.");
                }
                const token = req.headers.authorization;
                yield this.artistBusiness.addArtist(nameartist, bio, countryartist, datebirthartist, token);
                res.status(200).json(`Artista ${nameartist} adicionado com sucesso!`);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Erro ao adicionar o artista", error: error.message });
            }
        });
        this.searchArtistsByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.query.name;
                const artists = yield this.artistBusiness.searchArtistsByName(name);
                res.status(200).json({ artists });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: error.message || "Erro ao buscar artista", error });
            }
        });
        this.getArtistsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const artist = yield this.artistBusiness.getArtistsMusic(id);
                res.status(200).json({ artist });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: error.message || "Erro ao buscar artista", error });
            }
        });
        this.getAllArtists = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const artists = yield this.artistBusiness.getAllArtists();
                res.status(200).json({ artists });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: error.message || "Erro ao buscar artistas", error });
            }
        });
    }
}
exports.artistController = artistController;
