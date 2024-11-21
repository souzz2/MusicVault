"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRouter = void 0;
const express_1 = __importDefault(require("express"));
const musicController_1 = require("../controller/musicController");
exports.musicRouter = express_1.default.Router();
const controller = new musicController_1.musicController();
exports.musicRouter.delete("/:id", controller.deleteMusic);
exports.musicRouter.patch("/:id", controller.updateMusic);
exports.musicRouter.post("/", controller.postMusics);
exports.musicRouter.get("/:id", controller.getMusicsById);
exports.musicRouter.get("/search", controller.searchMusicByName);
exports.musicRouter.get("/", controller.getMusics);
