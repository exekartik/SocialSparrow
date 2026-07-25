import axios from "axios";
import toast from "react-hot-toast";

const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
    const isOnLocalhost = typeof window !== "undefined" && 
        (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    if (envUrl) {
        const isLocalUrl = envUrl.includes("localhost") || envUrl.includes("127.0.0.1");
        // Only use the env URL if we're actually running on localhost, otherwise ignore it
        if (!isLocalUrl || isOnLocalhost) {
            return envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`;
        }
    }
    
    if (isOnLocalhost) {
        return "http://localhost:3000/api";
    }
    return "/api";
};

const baseURL = getBaseUrl();

const api = axios.create({
    baseURL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const hasToken = Boolean(localStorage.getItem("token"));
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            if (hasToken && !window.location.pathname.includes("/login")) {
                toast.error("Session expired. Please sign in again.");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;