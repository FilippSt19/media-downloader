"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const node_http_1 = __importDefault(require("node:http"));
const logger_js_1 = require("./logger/logger.js");
const mediaRoutes_js_1 = __importDefault(require("./routes/mediaRoutes.js"));
const index_js_1 = require("./socket/index.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use("/api/media", mediaRoutes_js_1.default);
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "media-downloader-api",
    });
});
const server = node_http_1.default.createServer(app);
(0, index_js_1.initializeSocket)(server);
server.listen(PORT, () => {
    logger_js_1.logger.info(`Server listening on port ${PORT}`);
});
