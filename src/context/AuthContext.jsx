import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const role = localStorage.getItem("userRole");
        return role ? { role } : null;
    });

    // Giriş fonksiyonu
    const login = (role) => {
        setUser({ role });
        localStorage.setItem("userRole", role);
    };

    // Çıkış fonksiyonu
    const logout = () => {
        setUser(null);
        localStorage.removeItem("userRole");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 