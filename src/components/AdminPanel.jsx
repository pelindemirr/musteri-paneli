import React from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminPanel() {
    const { logout } = useAuth();
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#23262b", color: "#fff" }}>
            <h1>Admin Paneline Hoşgeldiniz</h1>
            <button onClick={logout} style={{ marginTop: 24, padding: "10px 24px", background: "#d64e4e", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
                Çıkış Yap
            </button>
        </div>
    );
} 