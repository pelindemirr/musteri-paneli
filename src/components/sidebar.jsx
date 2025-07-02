import React from "react";
import { FiLogOut } from "react-icons/fi";

function Sidebar({ showFavorites, onToggleFavorites }) {
    return (
        <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
            {/* Menülerin tamamı bir kapsayıcıda */}
            <div>
                <h2 className="logo">CallPilot</h2>
                <input type="text" className="search-input" placeholder="Search..." />

                {/*<div className="menu-section">
                    <p className="menu-title">Gelen Kutusu</p>
                </div>*/}

                <div className="menu-section">
                    <p className="menu-title">Konuşmalar</p>

                    <button
                        className={`menu-button ${!showFavorites ? "active" : ""}`}
                        onClick={() => onToggleFavorites(false)}
                    >  Bütün Konuşmalar
                    </button>

                    <button
                        className={`menu-button ${showFavorites ? "active" : ""}`}
                        onClick={() => onToggleFavorites(true)}
                    >
                        Favoriler
                    </button>

                    <button className="menu-button">Bekleyenler</button>
                    <button className="menu-button">Yanıtlananlar</button>
                </div>

                <div className="menu-section">
                    <hr className="sidebar-divider" />
                    <p className="menu-title">Belgeler</p>
                    <p className="menu-item">Müşteri Bilgileri</p>
                </div>

                <hr className="sidebar-divider" />
                <div className="menu-section">
                    <p className="menu-title">Temsilci Grupları</p>
                    <p className="menu-item">Admin</p>
                    <hr className="sidebar-divider" />
                </div>

                <div className="menu-section">
                    <p className="menu-title">Kanallar</p>
                    <ul className="channel-list">
                        <li>Email</li>
                        <li>Facebook</li>
                    </ul>
                    <hr className="sidebar-divider" />
                </div>
            </div>

            {/* Sidebar alt kısmı: kullanıcı ve çıkış */}
            <div className="sidebar-bottom" style={{ width: '100%' }}>
                <div className="user-info-box" style={{ marginBottom: '8px' }}>
                    <span className="user-name">Azra</span>
                    <span className="user-mail">iknowtechnology@gmail.com</span>
                </div>
                <hr className="sidebar-divider" style={{ margin: '10px 0' }} />
                <div className="user-info-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', boxShadow: 'none', padding: 0, marginTop: '-8px' }}>
                    <button
                        className="logout-btn"
                        title="Çıkış Yap"
                        onClick={() => alert('Çıkış yapıldı!')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <FiLogOut />
                        <span style={{ fontSize: '14px', color: '#fff' }}>Çıkış Yap</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
