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
exports.musicData = void 0;
const connection_1 = __importDefault(require("../connection"));
class musicData {
    constructor() {
        this.addMusics = (idmusic, namemusic, genremusic, duration, idalbum) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("musics").insert({
                idmusic,
                namemusic,
                genremusic,
                duration,
                idalbum,
            });
        });
        this.findMusicById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("musics")
                .where("idmusic", "=", id)
                .orderBy("idmusic", "asc")
                .limit(10);
        });
        this.searchMusicByName = (name) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("musics")
                .select("namemusic")
                .where("namemusic", "like", `%${name}%`)
                .orderBy("namemusic", "asc")
                .limit(5);
        });
        this.getMusics = () => __awaiter(this, void 0, void 0, function* () {
            return yield (0, connection_1.default)("musics").orderBy("idmusic", "asc").limit(10);
        });
    }
}
exports.musicData = musicData;
