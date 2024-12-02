import express from "express";
import { musicController } from "../controller/musicController";

export const musicRouter = express.Router();
const controller = new musicController();

musicRouter.post("/", controller.postMusic); 
musicRouter.patch("/:id", controller.updateMusic); 
musicRouter.get("/", controller.getMusics); 
musicRouter.get("/:id", controller.getMusicsById); 
musicRouter.get("/search", controller.searchMusicByName); 
musicRouter.delete("/:id", controller.deleteMusic); 
