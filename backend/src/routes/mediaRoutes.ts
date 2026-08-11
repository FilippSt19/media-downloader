import { Router } from "express";

import {
  analyzeMedia,
  downloadMediaFile,
} from "../controllers/mediaController.js";

const router = Router();

router.post("/analyze", analyzeMedia);
router.post("/download", downloadMediaFile);

export default router;