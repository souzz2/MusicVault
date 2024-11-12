import { Router } from "express";
import * as musicController from "../controller/musicController";

const router = Router();

router.get("/", musicController.getMusics);
router.get("/:id", musicController.getMusicsById);
router.post("/", musicController.postMusics);

export default router;
