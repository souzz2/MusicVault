import { Router } from "express";
import { UserController } from "../controller/userControlle";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
