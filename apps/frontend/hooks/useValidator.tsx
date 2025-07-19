
"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

const API_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface Validator {
    id: string;
    publicKey: string;
    location: string;
    ip: string;
    pendingSol: number;
    ticks: {
        id: string;
        createdAt: string;
        status: string;
        latency: number;
        website: {
            url: string;
        }
    }[];
}

export function useValidator(publicKey: string) {
    const { getToken } = useAuth();
    const [validator, setValidator] = useState<Validator | null>(null);

    async function refreshValidator() {
        if (!publicKey) return;

        const token = await getToken();
        const apiUrl = `${API_BACKEND_URL}/api/v1/validator/${publicKey}`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setValidator(response.data.data);
        } catch (error) {
            console.error("Failed to fetch validator data:", error);
            setValidator(null);
        }
    }

    useEffect(() => {
        refreshValidator();

        const interval = setInterval(() => {
            refreshValidator();
        }, 1000 * 60 * 1); // Refresh every minute

        return () => clearInterval(interval);
    }, [publicKey]);

    return { validator, refreshValidator };
}
