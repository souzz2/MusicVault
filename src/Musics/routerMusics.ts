import { Router } from "express";
import * as endpointsMusics from "./endpointsMusics";

const router = Router();

router.get("/", endpointsMusics.getMusics);
router.get("/:id", endpointsMusics.getMusicsById);
router.post("/", endpointsMusics.postMusics);
export default router;
