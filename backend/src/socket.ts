import { Server } from "socket.io";

let io: Server;

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  return io;
}

export function getSocket() {
  return io;
}