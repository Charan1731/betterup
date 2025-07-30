"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface Website {
    id: string;
    url: string;
    ticks: {
        id: string;
        createdAt: string;
        status: string;
        latency: number;
    }[];
}

export function useWebsites() {
    const { getToken } = useAuth();
    const [websites, setWebsites] = useState<Website[]>([]);

    async function refreshWebsites() {    
        try{
            const token = await getToken();
            
            const apiUrl = `${API_BACKEND_URL}/api/v1/websites/website`;
            
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setWebsites(response.data.data || []);
        }catch(error){
            console.error("Error fetching websites:", error);
            setWebsites([]);
            toast.error("Failed to fetch websites")
        }
    }

    useEffect(() => {
        refreshWebsites();

        const interval = setInterval(() => {
            refreshWebsites();
        }, 1000 * 60 * 1);

        return () => clearInterval(interval);
    }, []);

    return { websites, refreshWebsites };

}