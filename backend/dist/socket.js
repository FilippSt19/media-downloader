"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
exports.getSocket = getSocket;
const socket_io_1 = require("socket.io");
let io;
function initializeSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });
    return io;
}
function getSocket() {
    return io;
}
