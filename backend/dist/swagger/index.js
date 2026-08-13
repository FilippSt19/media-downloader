"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerMiddleware = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const document_js_1 = __importDefault(require("./document.js"));
exports.swaggerMiddleware = [
    swagger_ui_express_1.default.serve,
    swagger_ui_express_1.default.setup(document_js_1.default),
];
