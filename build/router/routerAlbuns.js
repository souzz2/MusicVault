"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumRouter = void 0;
const express_1 = __importDefault(require("express"));
const albumController_1 = require("../controller/albumController");
exports.albumRouter = express_1.default.Router();
const albumController = new albumController_1.AlbumController();
exports.albumRouter.get('/albums', albumController.getAlbums);
exports.albumRouter.get('/albums/:id', albumController.getAlbumsMusic);
exports.albumRouter.get('/search', albumController.searchAlbumsByName);
