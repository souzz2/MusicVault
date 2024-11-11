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
exports.getArtistsData = exports.getArtistsByNameData = exports.getArtistByIdData = void 0;
const connection_1 = __importDefault(require("../connection"));
const getArtistByIdData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.default)("artists")
        .where("idartist", "=", id)
        .orderBy("idartist", "asc")
        .limit(10);
});
exports.getArtistByIdData = getArtistByIdData;
const getArtistsByNameData = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.default)("artists")
        .select("nameartist")
        .where("nameartist", "like", `%${name}%`)
        .orderBy("nameartist", "asc")
        .limit(5);
});
exports.getArtistsByNameData = getArtistsByNameData;
const getArtistsData = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.default)("artists").orderBy("idartist", "asc").limit(10);
});
exports.getArtistsData = getArtistsData;
