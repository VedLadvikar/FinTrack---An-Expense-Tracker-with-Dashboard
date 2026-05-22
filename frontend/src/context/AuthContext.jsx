import { createContext, useContext, useState, useEffect } from "react";
import userService from "../services/userService";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await userService.getCurrentUser();
                if (response.success) {
                    setUser(response.data.user);
                }
            } catch {

                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [token]);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const register = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider
            value={{ user, token, loading, login, register, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;
