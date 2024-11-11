import { Router } from "express";
import * as endpointsAlbuns from "./endpointsAlbuns";

const router = Router();

router.get("/", endpointsAlbuns.getAlbum);
router.get("/search", endpointsAlbuns.searchAlbumsByName);
router.get("/music/:id", endpointsAlbuns.getAlbumsMusic);

export default router;
