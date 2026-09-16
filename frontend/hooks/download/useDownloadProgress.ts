"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export function useDownloadProgress() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:4000");

        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        socket.on("download:progress", (data) => {
            setProgress(data.progress);
            setStatus(data.status);
        });

        socket.on("download:completed", () => {
            setProgress(100);
            setStatus("Finished");
        });

        socket.on("download:failed", (data) => {
            setStatus(data.message);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return {
        progress,
        status,
    };
}