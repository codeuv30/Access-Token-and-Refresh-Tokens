"use client"

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const hydrateUser = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/api/auth/me");
            
            setUser(res.data.user);
            router.push("/home")

        } catch (error) {
            console.log("error in hydration", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        hydrateUser();
    }, []);

    return <Auth.Provider value={{ user, setUser, isLoading, setIsLoading, hydrateUser }}>{children}</Auth.Provider>;
};

export const useAuth = () => useContext(Auth);