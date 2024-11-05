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
exports.getAlbum = exports.getAlbunsMusic = void 0;
const dataAlbuns_1 = require("./dataAlbuns");
const getAlbunsMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const AlbunsMusics = yield (0, dataAlbuns_1.getAlbunsMusicsData)(id);
        if (!id) {
            throw new Error("É necessário preencher o parâmetro id");
        }
        if (!AlbunsMusics) {
            throw new Error("Album não encontrado");
        }
        res.status(200).json(AlbunsMusics);
    }
    catch (error) {
        res.status(500).json({ message: `Erro ao buscar o album`, error });
    }
});
exports.getAlbunsMusic = getAlbunsMusic;
const getAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dataAlbuns_1.getAlbunsData)();
        if (result.length === 0) {
            throw new Error("Não há playlists disponíveis no momento.");
        }
        res.send(result);
    }
    catch (error) {
        res.status(404).json({ message: "Erro ao buscar playlists.", error });
    }
});
exports.getAlbum = getAlbum;
