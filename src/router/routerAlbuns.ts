import express from "express";
import { AlbumController } from "../controller/albumController";

export const albumRouter = express.Router();

const albumController = new AlbumController();

albumRouter.delete("/:id", albumController.deleteAlbum)
albumRouter.post("/", albumController.addAlbum)
albumRouter.get("/", albumController.getAlbums);
albumRouter.get("/:id", albumController.getAlbumsMusic);
albumRouter.get("/search", albumController.searchAlbumsByName);
