import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface User {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    zernioProfileId?: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Decodes a JWT token client-side and checks if it is expired
 */
export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return true;
        
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        
        const payload = JSON.parse(jsonPayload);
        if (typeof payload.exp !== 'number') return false;
        
        const currentSeconds = Math.floor(Date.now() / 1000);
        return payload.exp < currentSeconds;
    } catch (e) {
        return true;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            if (isTokenExpired(storedToken)) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
            } else {
                try {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                } catch (e) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                }
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User, tokenStr: string) => {
        setUser(userData);
        setToken(tokenStr);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenStr);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;