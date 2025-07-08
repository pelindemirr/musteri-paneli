import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const USERS = {
            admin: { password: "1234", role: "admin" },
            agent: { password: "1234", role: "agent" }
        };

        const user = USERS[username];

        if (user && user.password === password) {
            login(user.role);
        } else {
            setError("Kullanıcı adı veya şifre hatalı!");
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#181818" }}>
            <form onSubmit={handleSubmit} style={{
                background: "#23262b",
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 2px 16px -4px #0008",
                minWidth: 240,
                maxWidth: 320,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14
            }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{
                        fontWeight: 800,
                        fontSize: 22,
                        letterSpacing: 0.5,
                        color: "#275db5",
                        textShadow: "0 2px 8px #1a2a4a22, 0 1px 0 #fff2",
                        fontFamily: 'Segoe UI, Arial, sans-serif',
                        lineHeight: 1.1,
                        marginBottom: 2
                    }}>CallPilot</span>
                </div>
                <h2 style={{ marginBottom: 8, color: "#fff", fontSize: 18, fontWeight: 600, letterSpacing: 0.1 }}>Giriş Yap</h2>
                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: 0,
                        padding: "7px 10px",
                        borderRadius: 6,
                        border: "1px solid #2d3a4a",
                        background: "#232b36",
                        color: "#fff",
                        fontSize: 14,
                        outline: "none",
                        transition: "border 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={e => e.target.style.border = '1.5px solid #275db5'}
                    onBlur={e => e.target.style.border = '1px solid #2d3a4a'}
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: 0,
                        padding: "7px 10px",
                        borderRadius: 6,
                        border: "1px solid #2d3a4a",
                        background: "#232b36",
                        color: "#fff",
                        fontSize: 14,
                        outline: "none",
                        transition: "border 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={e => e.target.style.border = '1.5px solid #275db5'}
                    onBlur={e => e.target.style.border = '1px solid #2d3a4a'}
                />
                <style>{`
                    input::placeholder {
                        color: #b0b0b0 !important;
                        opacity: 1;
                    }
                `}</style>
                {error && <div style={{ color: "#ff5252", marginBottom: 0, fontSize: 13, alignSelf: "flex-start" }}>{error}</div>}
                <button type="submit" className="login-btn-animated" style={{
                    width: "100%",
                    padding: "8px 0",
                    background: "#275db5",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 15,
                    marginTop: 2,
                    letterSpacing: 0.1,
                    boxShadow: "0 1px 4px -2px #0006",
                    transition: "background 0.18s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1)",
                    cursor: "pointer"
                }}>
                    Giriş Yap
                </button>
                <style>{`
                    .login-btn-animated:hover {
                        background: #3976e6 !important;
                        transform: scale(1.04);
                    }
                    .login-btn-animated:active {
                        transform: scale(0.98);
                    }
                `}</style>
                <p style={{ textAlign: "center", marginTop: 6, fontSize: 13 }}>
                    <a href="/forgot-password" style={{ color: "#b0c7f7", textDecoration: "none" }}>
                        Şifremi unuttum
                    </a>
                </p>
            </form>
        </div>
    );
}
