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
exports.AlbumBusiness = void 0;
const dataAlbuns_1 = require("../data/dataAlbuns");
class AlbumBusiness {
    constructor() {
        this.albumData = new dataAlbuns_1.albumData();
        this.addAlbum = (namealbum, releasealbum, idartist, idmusic) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idalbum = uuidv7, await;
                this.albumData.addAlbum(idalbum, namealbum, releasealbum, idartist);
                addMusics();
            }
            catch (error) {
                throw new Error(error.message || "Erro ao inserir álbum");
            }
        });
        this.deleteAlbum = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.albumData.deleteAlbum(id);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao deletar álbum");
            }
        });
        this.getAlbumsMusic = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error("É necessário preencher o parâmetro id");
                }
                const AlbunsMusics = yield this.albumData.getAlbumsMusicData(id);
                if (!AlbunsMusics || AlbunsMusics.length === 0) {
                    throw new Error("Álbum não encontrado");
                }
                return AlbunsMusics;
            }
            catch (error) {
                throw new Error("Erro ao buscar as músicas do álbum");
            }
        });
        this.searchAlbumsByName = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name) {
                    throw new Error('O parâmetro de busca "name" é obrigatório.');
                }
                const albums = yield this.albumData.getAlbumsByNameData(name);
                if (!albums || albums.length === 0) {
                    throw new Error("Nenhum álbum encontrado.");
                }
                return albums;
            }
            catch (error) {
                throw new Error("Erro ao buscar álbuns");
            }
        });
        this.getAlbums = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const albums = yield this.albumData.getAlbumsData();
                if (albums.length === 0) {
                    throw new Error("Não há álbuns disponíveis no momento.");
                }
                return albums;
            }
            catch (error) {
                throw new Error("Erro ao buscar álbuns");
            }
        });
    }
}
exports.AlbumBusiness = AlbumBusiness;
