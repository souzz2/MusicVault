"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistRouter = void 0;
const express_1 = __importDefault(require("express"));
const artistController_1 = require("../controller/artistController");
exports.artistRouter = express_1.default.Router();
const controller = new artistController_1.artistController();
exports.artistRouter.get("/search", controller.searchArtistsByName);
exports.artistRouter.get("/:id", controller.getArtistsById);
exports.artistRouter.get("/", controller.getAllArtists);
