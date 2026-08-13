import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./document.js";

export const swaggerMiddleware = [
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
];