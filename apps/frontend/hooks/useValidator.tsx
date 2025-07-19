
"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

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

interface UseValidatorReturn {
    validator: Validator | null;
    loading: boolean;
    error: string | null;
    refreshValidator: () => Promise<void>;
}

export function useValidator(publicKey: string): UseValidatorReturn {
    const { getToken } = useAuth();
    const [validator, setValidator] = useState<Validator | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const refreshValidator = useCallback(async () => {
        if (!publicKey) {
            setValidator(null);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const apiUrl = `${API_BACKEND_URL}/api/v1/validator/${publicKey}`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                timeout: 10000, // 10 second timeout
            });

            if (response.data && response.data.data) {
                setValidator(response.data.data);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error: unknown) {
            console.error("Failed to fetch validator data:", error);
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    setError("Validator not found. Please check your public key.");
                } else if (error.response?.status === 401) {
                    setError("Authentication failed. Please try logging in again.");
                } else if (error.code === 'ECONNABORTED') {
                    setError("Request timeout. Please check your connection and try again.");
                } else if (error.message === "Network Error") {
                    setError("Network error. Please check your internet connection.");
                } else {
                    setError("Failed to load validator data. Please try again.");
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            setValidator(null);
        } finally {
            setLoading(false);
        }
    }, [publicKey, getToken]);

    useEffect(() => {
        refreshValidator();

        // Set up interval for auto-refresh only if we have a public key
        if (publicKey) {
            const interval = setInterval(() => {
                refreshValidator();
            }, 1000 * 60 * 2); // Refresh every 2 minutes

            return () => clearInterval(interval);
        }
    }, [publicKey, refreshValidator]);

    return { 
        validator, 
        loading, 
        error, 
        refreshValidator 
    };
}
