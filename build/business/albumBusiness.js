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
const idGenerator_1 = require("../services/idGenerator");
const musicBusiness_1 = require("./musicBusiness");
class AlbumBusiness {
    constructor() {
        this.albumData = new dataAlbuns_1.albumData();
        this.musicData = new musicBusiness_1.musicBusiness();
    }
}
exports.AlbumBusiness = AlbumBusiness;
class AlbumBusiness {
    constructor() {
        this.albumData = new dataAlbuns_1.albumData();
        this.musicData = new musicBusiness_1.musicBusiness();
        this.addAlbumWithMusics = (namealbum, releasealbum, idartist, musics, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                if (!namealbum || !releasealbum || !idartist || musics.length === 0) {
                    throw new Error("Os parâmetros do álbum ou das músicas não foram preenchidos corretamente.");
                }
                const idalbum = (0, idGenerator_1.generatedId)();
                yield this.albumData.addAlbum(idalbum, namealbum, releasealbum, idartist, []);
                for (const music of musics) {
                    console.log(`Procurando música: ${music.namemusic}`);
                    const existingMusic = yield this.musicData.searchMusicByName(music.namemusic, token);
                    if (existingMusic.length === 0) {
                        console.log(`Música não encontrada, adicionando: ${music.namemusic}`);
                        yield this.musicData.addMusic(music.namemusic, music.genremusic, music.duration, idalbum, token);
                    }
                    else {
                        console.log(`Música encontrada, atualizando: ${music.namemusic}`);
                        yield this.musicData.updateMusic(existingMusic[0].idmusic, token, {
                            idalbum,
                        });
                    }
                }
                return `Álbum "${namealbum}" adicionado com sucesso com as músicas associadas.`;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao adicionar o álbum e as músicas.");
            }
        });
        this.updateAlbum = (id, token, namealbum, releasealbum, idartist) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                if (!id) {
                    throw new Error("O ID do álbum é obrigatório.");
                }
                if (!namealbum && !releasealbum && !idartist) {
                    throw new Error("Pelo menos um campo deve ser informado para atualizar.");
                }
                const updates = {};
                if (namealbum)
                    updates.namealbum = namealbum;
                if (releasealbum)
                    updates.releasealbum = releasealbum;
                if (idartist)
                    updates.idartist = idartist;
                yield this.albumData.updateAlbum(id, updates);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao atualizar álbum.");
            }
        });
        this.deleteAlbum = (id, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
                yield this.albumData.deleteAlbum(id);
            }
            catch (error) {
                throw new Error(error.message || "Erro ao deletar álbum");
            }
        });
        this.getAlbumsMusic = (id, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
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
        this.searchAlbumsByName = (name, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
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
        this.getAlbums = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token não informado");
                }
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
