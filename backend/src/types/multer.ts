import type { Express, Request } from "express";

export type MulterRequest = Request & {
    file?: Express.Multer.File;
};