import { Router } from "express";
import * as endpointsUsers from "./endpointsUsers";

const router = Router();

router.post("/signup", endpointsUsers.signup);
router.post("/login", endpointsUsers.login);

export default router;
