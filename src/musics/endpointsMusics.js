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
exports.getMusics = exports.getMusicsById = void 0;
const dataMusics_1 = require("./dataMusics");
const getMusicsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findMusicsId = yield (0, dataMusics_1.findMusicById)(id);
        if (!id) {
            throw new Error("É necessário preencher o parâmetro id");
        }
        if (!findMusicsId) {
            throw new Error(`Música com id ${id} não encontrada`);
        }
        res.status(200).json(findMusicsId);
    }
    catch (error) {
        res.status(500).json({ message: `Erro ao buscar a musica`, error });
    }
});
exports.getMusicsById = getMusicsById;
const getMusics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dataMusics_1.getMusics)();
        if (result.length === 0) {
            throw new Error("Não há músicas disponíveis no momento.");
        }
        res.send(result);
    }
    catch (error) {
        res.status(404).json({ message: "Erro ao buscar musicas.", error });
    }
});
exports.getMusics = getMusics;
