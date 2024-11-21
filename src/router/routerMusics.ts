import express from "express";
import { musicController } from "../controller/musicController";

export const musicRouter = express.Router();
const controller = new musicController();

musicRouter.delete("/:id", controller.deleteMusic);
musicRouter.patch("/:id", controller.updateMusic);
musicRouter.post("/", controller.postMusics);
musicRouter.get("/:id", controller.getMusicsById);
musicRouter.get("/search", controller.searchMusicByName);
musicRouter.get("/", controller.getMusics);
