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

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
};
export default apiFetch;
