import { Router } from "express";

import { analyzeMedia } from "../controllers/mediaController.js";

const router = Router();

router.post("/analyze", analyzeMedia);

export default router;