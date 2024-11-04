import { Router } from "express";
import * as endpointsAlbuns from "./endpointsAlbuns"

const router = Router();

router.get("/", endpointsAlbuns.getAlbum);
router.get("/music/:id", endpointsAlbuns.getAlbunsMusic);

export default router;  