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
exports.getArtist = exports.getArtistsById = exports.searchArtistsByName = void 0;
const dataArtists_1 = require("./dataArtists");
const searchArtistsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const name = (_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
    try {
        if (!name) {
            throw new Error('O parâmetro de busca "name" é obrigatório.');
        }
        const artists = yield (0, dataArtists_1.getArtistsByNameData)(name);
        if (!artists.length) {
            throw new Error("Nenhum artista foi encontrado.");
        }
        res.status(200).json({ artists });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar artista", error });
    }
});
exports.searchArtistsByName = searchArtistsByName;
const getArtistsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findArtistId = yield (0, dataArtists_1.getArtistByIdData)(id);
        if (!id) {
            throw new Error("É necessário preencher o parâmetro id");
        }
        if (!findArtistId) {
            throw new Error(`Artista com id ${id} não encontrada`);
        }
        res.status(200).json(findArtistId);
    }
    catch (error) {
        res.status(500).json({ message: `Erro ao buscar a artista`, error });
    }
});
exports.getArtistsById = getArtistsById;
const getArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dataArtists_1.getArtistsData)();
        if (result.length === 0) {
            throw new Error("Não há playlists disponíveis no momento.");
        }
        res.send(result);
    }
    catch (error) {
        res.status(404).json({ message: "Erro ao buscar playlists.", error });
    }
});
exports.getArtist = getArtist;
