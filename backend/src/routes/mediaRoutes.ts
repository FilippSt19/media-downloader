import { Router } from "express";

import {
    analyzeMedia,
    downloadMediaFile,
} from "../controllers/mediaController.js";

import { validate } from "../validation/validate.js";
import {
    analyzeMediaSchema,
} from "../validation/media.js";
import {
    downloadSchema,
} from "../validation/download.js";

const router = Router();

router.post(
    "/analyze",
    validate(analyzeMediaSchema),
    analyzeMedia
);

router.post(
    "/download",
    validate(downloadSchema),
    downloadMediaFile
);

export default router;