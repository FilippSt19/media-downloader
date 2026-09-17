import { Router } from "express";
import multer from "multer";

import {
    analyzeMedia,
    downloadMediaFile,
    convertMediaFile,
} from "../controllers/mediaController.js";

import { validate } from "../validation/validate.js";
import {
    analyzeMediaSchema,
    convertMediaSchema,
} from "../validation/media.js";
import {
    downloadSchema,
} from "../validation/download.js";

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 200 * 1024 * 1024 },
});

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

router.post(
    "/convert",
    upload.single("file"),
    validate(convertMediaSchema),
    convertMediaFile
);

export default router;