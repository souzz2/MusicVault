import express from "express";
import { musicController } from "../controller/musicController";

export const musicRoutes = express.Router();
const controller = new musicController();

musicRoutes.post("/musics", controller.postMusics);
musicRoutes.get("/musics/:id", controller.getMusicsById);
musicRoutes.get("/musics/search", controller.searchMusicByName);
musicRoutes.get("/musics", controller.getMusics);
