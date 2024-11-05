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
exports.getAlbunsData = exports.searchAlbumsByName = exports.getAlbunsMusicsData = void 0;
const connection_1 = __importDefault(require("../connection"));
const getAlbunsMusicsData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.default)("Albuns")
        .select("namemusic")
        .join("albuns", "musics.idalbum", "=", "albuns.idalbum")
        .where("idalbum", "=", id)
        .orderBy("idmusic", "asc");
});
exports.getAlbunsMusicsData = getAlbunsMusicsData;
const searchAlbumsByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.default)("Albuns")
        .select("namealbum")
        .where("namealbum", "like", `%${name}%`)
        .orderBy("namealbum", "asc")
        .limit(5);
});
exports.searchAlbumsByName = searchAlbumsByName;
const getAlbunsData = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.default)("albuns").orderBy("idalbum", "asc").limit(10);
});
exports.getAlbunsData = getAlbunsData;
