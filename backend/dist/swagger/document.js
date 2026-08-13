"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerDocument = {
    openapi: "3.0.3",
    info: {
        title: "Media Downloader API",
        version: "1.0.0",
        description: "API for downloading media.",
    },
    servers: [
        {
            url: "http://localhost:4000",
        },
    ],
    paths: {
        "/health": {
            get: {
                summary: "Health check",
                tags: ["Health"],
                responses: {
                    200: {
                        description: "Service is running",
                    },
                },
            },
        },
        "/api/media/analyze": {
            post: {
                summary: "Analyze media URL",
                tags: ["Media"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["url"],
                                properties: {
                                    url: {
                                        type: "string",
                                        example: "https://youtu.be/dQw4w9WgXcQ",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Media analyzed successfully",
                    },
                    400: {
                        description: "Invalid URL",
                    },
                },
            },
        },
        "/api/media/download": {
            post: {
                summary: "Download media",
                tags: ["Media"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: [
                                    "url",
                                    "type",
                                    "quality",
                                ],
                                properties: {
                                    url: {
                                        type: "string",
                                        example: "https://youtu.be/dQw4w9WgXcQ",
                                    },
                                    type: {
                                        type: "string",
                                        enum: [
                                            "audio",
                                            "video",
                                        ],
                                    },
                                    quality: {
                                        type: "integer",
                                        example: 192,
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Download started",
                    },
                    400: {
                        description: "Invalid request",
                    },
                },
            },
        },
    },
};
exports.default = swaggerDocument;
