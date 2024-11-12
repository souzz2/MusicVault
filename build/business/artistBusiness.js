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
exports.artistBusiness = void 0;
const dataArtists_1 = require("../data/dataArtists");
class artistBusiness {
    constructor() {
        this.artistData = new dataArtists_1.artistData();
        this.getArtistsMusic = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const artist = yield this.artistData.getArtistByIdData(id);
                if (!artist) {
                    throw new Error(`Artista com id ${id} não encontrada`);
                }
                return artist;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao buscar o artista");
            }
        });
        this.searchArtistsByName = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name) {
                    throw new Error('O parâmetro de busca "name" é obrigatório.');
                }
                const artists = yield this.artistData.getArtistsByNameData(name);
                if (!artists.length) {
                    throw new Error("Nenhum artista foi encontrado.");
                }
                return artists;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao buscar artista");
            }
        });
        this.getAllArtists = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const artists = yield this.artistData.getArtistsData();
                if (artists.length === 0) {
                    throw new Error("Não há artistas disponíveis no momento.");
                }
                return artists;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao buscar artistas.");
            }
        });
    }
}
exports.artistBusiness = artistBusiness;
