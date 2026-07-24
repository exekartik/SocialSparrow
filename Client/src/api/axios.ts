import axios from "axios";
import toast from "react-hot-toast";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const baseURL = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl.replace(/\/$/, "")}/api`;

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