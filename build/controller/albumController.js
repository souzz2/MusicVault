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
exports.AlbumController = void 0;
const albumBusiness_1 = require("../business/albumBusiness");
class AlbumController {
    constructor() {
        this.albumBusiness = new albumBusiness_1.AlbumBusiness();
        this.updateAlbum = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { namealbum, releasealbum, idartist } = req.body;
                if (!id) {
                    throw new Error("O ID do álbum é obrigatório.");
                }
                const token = req.headers.authorization;
                yield this.albumBusiness.updateAlbum(id, namealbum, releasealbum, idartist, token);
                res.status(200).send({ message: "Álbum atualizado com sucesso!" });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: error.message || "Erro ao atualizar álbum", error });
            }
        });
        this.deleteAlbum = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    throw new Error("O id do álbum é obrigatório.");
                }
                const token = req.headers.authorization;
                yield this.albumBusiness.deleteAlbum(id, token);
                res
                    .status(200)
                    .send({ message: `Álbum com id ${id} deletado com sucesso!` });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: error.message || "Erro ao deletar álbum", error });
            }
        });
        this.getAlbumsMusic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers.authorization;
                const musics = yield this.albumBusiness.getAlbumsMusic(id, token);
                res.status(200).send({ musics });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: error.message || "Erro ao buscar o álbum", error });
            }
        });
        this.searchAlbumsByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.query.name;
                const token = req.headers.authorization;
                const albums = yield this.albumBusiness.searchAlbumsByName(name, token);
                res.status(200).send({ albums });
            }
            catch (error) {
                const message = error.message || "Erro ao buscar álbum";
                res.status(500).json({ message, error });
            }
        });
        this.getAlbums = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const albums = yield this.albumBusiness.getAlbums(token);
                res.status(200).send({ albums });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: error.message || "Erro ao buscar álbuns", error });
            }
        });
    }
}
exports.AlbumController = AlbumController;
