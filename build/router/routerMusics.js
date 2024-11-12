"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRoutes = void 0;
const express_1 = __importDefault(require("express"));
const musicController_1 = require("../controller/musicController");
exports.musicRoutes = express_1.default.Router();
const controller = new musicController_1.musicController();
exports.musicRoutes.post("/musics", controller.postMusics);
exports.musicRoutes.get("/musics/:id", controller.getMusicsById);
exports.musicRoutes.get("/musics/search", controller.searchMusicByName);
exports.musicRoutes.get("/musics", controller.getMusics);
