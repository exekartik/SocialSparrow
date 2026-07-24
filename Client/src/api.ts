import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        const hasToken = Boolean(localStorage.getItem("token"));
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (hasToken && !window.location.pathname.includes("/login")) {
            toast.error("Session expired. Please sign in again.");
            window.location.href = "/login";
        }
        throw new Error("Invalid or expired token.");
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
};
export default apiFetch;
