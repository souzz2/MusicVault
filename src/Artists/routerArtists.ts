import { Router } from "express";
import * as endpointsAlbuns from "./endpointsArtists";

const router = Router();

router.get("/", endpointsAlbuns.getArtist);
router.get("/:id", endpointsAlbuns.getArtistsById);
router.get("/", endpointsAlbuns.searchArtistsByName);

export default router;
