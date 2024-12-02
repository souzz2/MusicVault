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
        this.deleteAlbum = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("albuns").where("idalbum", id).del();
                if (result === 0) {
                    throw new Error(`Album com id ${id} não encontrado.`);
                }
            }
            catch (error) {
                throw new Error("Erro ao deletar o álbum no banco de dados.");
            }
        });
        this.updateAlbum = (id, updates) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = {};
                if (updates.namealbum)
                    updateData.namealbum = updates.namealbum;
                if (updates.releasealbum)
                    updateData.releasealbum = updates.releasealbum;
                if (updates.idartist)
                    updateData.idartist = updates.idartist;
                console.log(`Atualizando álbum com id: ${id} com os dados: ${JSON.stringify(updateData)}`);
                yield (0, connection_1.default)("albuns").where("idalbum", "=", id).update(updateData);
            }
            catch (sql) {
                console.error(`Erro ao atualizar o álbum no banco de dados: ${sql.message}`);
                throw new Error("Erro ao atualizar o álbum no banco de dados.");
            }
        });
        this.addAlbum = (idalbum, namealbum, releasealbum, idartist) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, connection_1.default)("albuns").insert({
                    idalbum,
                    namealbum,
                    idartist,
                    releasealbum,
                });
            }
            catch (sql) {
                throw sql;
            }
        });
        this.getAlbumsByNameData = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, connection_1.default)("albuns")
                    .select("namealbum")
                    .where("namealbum", "like", `%${name}%`)
                    .orderBy("namealbum", "asc")
                    .limit(5);
            }
            catch (sql) {
                throw sql;
            }
        });
        this.getAlbumsData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, connection_1.default)("albuns").orderBy("idalbum", "asc").limit(10);
            }
            catch (sql) {
                throw sql;
            }
        });
    }
}
exports.albumData = albumData;
