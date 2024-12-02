import express from "express";
import { AlbumController } from "../controller/albumController";

export const albumRouter = express.Router();

const albumController = new AlbumController();

albumRouter.post("/", albumController.addAlbumWithMusics);
albumRouter.put("/:id", albumController.updateAlbum);
albumRouter.delete("/:id", albumController.deleteAlbum);
albumRouter.get("/search", albumController.searchAlbumsByName); 
albumRouter.get("/", albumController.getAlbums);