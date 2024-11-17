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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumData = void 0;
const connection_1 = __importDefault(require("../connection"));
class albumData {
    constructor() {
        this.addAlbum = (idalbum, namealbum, releasealbum, idartist, idmusic) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("albuns").insert({
                idalbum,
                namealbum,
                idartist,
                releasealbum,
                idmusic,
            });
        });
        this.deleteAlbum = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("albuns")
                .where("idalbum", "=", id)
                .del();
        });
        this.getAlbumsMusicData = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("albuns")
                .innerJoin("musics", "musics.idalbum", "=", "albuns.idalbum")
                .select("musics.namemusic")
                .where("albuns.idalbum", "=", id)
                .orderBy("musics.idmusic", "asc");
        });
        this.getAlbumsByNameData = (name) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("albuns")
                .select("namealbum")
                .where("namealbum", "like", `%${name}%`)
                .orderBy("namealbum", "asc")
                .limit(5);
        });
        this.getAlbumsData = () => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("albuns").orderBy("idalbum", "asc").limit(10);
        });
    }
}
exports.albumData = albumData;
