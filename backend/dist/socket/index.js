"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
exports.getSocket = getSocket;
const socket_io_1 = require("socket.io");
let io;
function initializeSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
    return io;
}
function getSocket() {
    if (!io) {
        throw new Error("Socket.IO has not been initialized.");
    }
    return io;
}
