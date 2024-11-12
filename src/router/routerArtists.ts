import express from "express";
import { artistController } from "../controller/artistController";

export const artistRouter = express.Router();
const controller = new artistController();

artistRouter.get("/search", controller.searchArtistsByName);
artistRouter.get("/:id", controller.getArtistsById);
artistRouter.get("/", controller.getAllArtists);
