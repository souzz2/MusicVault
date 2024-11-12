import express from 'express';
import { AlbumController } from '../controller/albumController';

export const albumRouter = express.Router();

const albumController = new AlbumController();

albumRouter.get('/albums', albumController.getAlbums);
albumRouter.get('/albums/:id', albumController.getAlbumsMusic);
albumRouter.get('/search', albumController.searchAlbumsByName);
