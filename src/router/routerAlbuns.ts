import express from "express";
import { AlbumController } from "../controller/albumController";

export const albumRouter = express.Router();

const albumController = new AlbumController();

albumRouter.put("/:id", albumController.updateAlbum);
albumRouter.delete("/:id", albumController.deleteAlbum);
albumRouter.get("/", albumController.getAlbums);
albumRouter.get("/:id", albumController.getAlbumsMusic);
albumRouter.get("/search", albumController.searchAlbumsByName);
