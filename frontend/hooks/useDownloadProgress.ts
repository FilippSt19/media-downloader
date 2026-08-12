"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export function useDownloadProgress() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:4000");

        socket.on("download-progress", (data) => {
            setProgress(data.progress);
            setStatus(data.status);
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