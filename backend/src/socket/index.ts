import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";

let io: Server;

export function initializeSocket(server: HttpServer): Server {
    io = new Server(server, {
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

export function getSocket(): Server {
    if (!io) {
        throw new Error("Socket.IO has not been initialized.");
    }

    return io;
}