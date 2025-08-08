import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiUser, FiStar, FiMessageCircle, FiSettings, FiBarChart2, FiUsers, FiActivity } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

export default function SuperAdminSidebar({
    collapsed,
    onToggleSidebar,
    activeSection,
    onSectionChange,
    onOpenMacroModal,
    onOpenUserPanel,
    onOpenMarketing

}) {
    const { logout } = useAuth();
    const [openSections, setOpenSections] = useState({
        conversations: true,
        statistics: false,
        agents: false,
        settings: false,
    });

    const toggleSection = (key) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="sidebar" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'space-between',
            background: '#181818',
            width: collapsed ? 56 : 280,
            minWidth: collapsed ? 56 : 280,
            transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
            overflow: 'hidden',
            position: 'relative',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 0, marginTop: 4 }}>
                    {!collapsed && (
                        <h2 className="logo" style={{
                            fontWeight: 800,
                            fontSize: 22,
                            letterSpacing: 0.5,
                            color: '#275db5',
                            textShadow: '0 2px 8px #1a2a4a22, 0 1px 0 #fff2',
                            fontFamily: 'Segoe UI, Arial, sans-serif',
                            lineHeight: 1.1,
                            margin: 5,
                        }}>CallPilot</h2>
                    )}
                    <button
                        onClick={onToggleSidebar}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontSize: 22,
                            cursor: 'pointer',
                            zIndex: 2,
                            marginLeft: 0,
                            marginRight: 0,
                            padding: 7,
                            height: 32,
                            width: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        title={collapsed ? 'Menüyü Aç' : 'Menüyü Daralt'}
                    >
                        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                    </button>
                </div>

                <div style={{ opacity: collapsed ? 0 : 1, pointerEvents: collapsed ? 'none' : 'auto', transition: 'opacity 0.2s', paddingLeft: collapsed ? 0 : 0, marginTop: 12 }}>
                    {!collapsed && (
                        <>
                            {/* Konuşmalar */}
                            <div className="menu-section" style={{ marginTop: 0 }}>
                                <div className={`menu-title${openSections.conversations ? ' open' : ''}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSection('conversations')}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                        <FiMessageCircle style={{ fontSize: 18, color: '#275db5' }} /> Tüm Konuşmalar
                                    </span>
                                    <span className="chevron">{openSections.conversations ? <FiChevronUp /> : <FiChevronDown />}</span>
                                </div>
                                {openSections.conversations && (
                                    <div className="sidebar-accordion-content">
                                        <button
                                            className={`menu-button ${activeSection === 'all' ? "active" : ""}`}
                                            onClick={() => onSectionChange('all')}
                                        >
                                            Tüm Konuşmalar
                                        </button>
                                        <button
                                            className={`menu-button ${activeSection === 'waiting' ? "active" : ""}`}
                                            onClick={() => onSectionChange('waiting')}
                                        >
                                            Bekleyenler
                                        </button>
                                        <button
                                            className={`menu-button ${activeSection === 'answered' ? "active" : ""}`}
                                            onClick={() => onSectionChange('answered')}
                                        >
                                            Yanıtlananlar
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* İstatistikler */}
                            <div className="menu-section">
                                <div className={`menu-title${openSections.statistics ? ' open' : ''}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSection('statistics')}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                        <FiBarChart2 style={{ fontSize: 18, color: '#ffb300' }} /> İstatistikler
                                    </span>
                                    <span className="chevron">{openSections.statistics ? <FiChevronUp /> : <FiChevronDown />}</span>
                                </div>
                                {openSections.statistics && (
                                    <div className="sidebar-accordion-content">
                                        <p className="menu-item" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <FiUser /> Toplam Temsilci
                                            <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#ffb300' }}>15</span>
                                        </p>
                                        <p className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
                                            <FiActivity /> Aktif Müşteri
                                            <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#275db5' }}>127</span>
                                        </p>
                                        <p className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
                                            <FiMessageCircle /> Toplam Sohbet
                                            <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#28a745' }}>89</span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Temsilci Yönetimi */}
                            <div className="menu-section">
                                <div className={`menu-title${openSections.agents ? ' open' : ''}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSection('agents')}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                        <FiUsers style={{ fontSize: 16, color: '#4caf50' }} /> Temsilci Yönetimi
                                    </span>
                                    <span className="chevron">{openSections.agents ? <FiChevronUp /> : <FiChevronDown />}</span>
                                </div>
                                {openSections.agents && (
                                    <div className="sidebar-accordion-content">
                                        <button
                                            className={`menu-button ${activeSection === 'performance' ? "active" : ""}`}
                                            onClick={() => onSectionChange('performance')}
                                        >
                                            Performans Raporları
                                        </button>
                                        <button
                                            className="menu-button"
                                            onClick={onOpenUserPanel}
                                            style={{ color: '#fff', fontWeight: 500 }}
                                        >
                                            Kullanıcı Yönetimi
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Sistem Ayarları */}
                            <div className="menu-section">
                                <div className={`menu-title${openSections.settings ? ' open' : ''}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSection('settings')}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                        <FiSettings style={{ fontSize: 16, color: '#dc3545' }} /> Ayarlar
                                    </span>
                                    <span className="chevron">{openSections.settings ? <FiChevronUp /> : <FiChevronDown />}</span>
                                </div>
                                {openSections.settings && (
                                    <div className="sidebar-accordion-content">
                                        <button
                                            className={`menu-button ${activeSection === 'settings' ? "active" : ""}`}
                                            onClick={() => onSectionChange('settings')}
                                        >
                                            Genel Ayarlar
                                        </button>
                                        <button
                                            className={`menu-button ${activeSection === 'notifications' ? "active" : ""}`}
                                            onClick={() => onSectionChange('notifications')}
                                        >
                                            Bildirim Ayarları
                                        </button>
                                        <button
                                            className="menu-button"
                                            onClick={onOpenMacroModal}
                                            style={{ color: '#fff', fontWeight: 500 }}
                                        >
                                            Makro Yönetimi
                                        </button>
                                        <button
                                            className="menu-button"
                                            onClick={onOpenMarketing}

                                            style={{ color: '#fff', fontWeight: 500 }}

                                        >
                                            Marketing
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {!collapsed && (
                <div className="sidebar-bottom" style={{ width: '100%', padding: '0 0 8px 0' }}>
                    <div className="user-info-box" style={{ marginBottom: 4, paddingLeft: 18 }}>
                        <div className="user-name" style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <FiUser style={{ fontSize: 15, color: '#fff' }} />
                            Süper Admin
                        </div>
                        <div className="user-mail" style={{ fontSize: 15, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <MdEmail style={{ fontSize: 17, color: '#bdbdbd' }} />
                            superadmin@callpilot.com
                        </div>
                    </div>
                    <hr className="sidebar-divider" style={{ margin: '10px 0' }} />
                    <div className="user-info-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', background: 'transparent', boxShadow: 'none', paddingLeft: 10, marginTop: '-4px' }}>
                        <button
                            className="logout-btn"
                            title="Çıkış Yap"
                            onClick={logout}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}
                        >
                            <FiLogOut style={{ fontSize: 17 }} />
                            <span style={{ fontSize: 15, color: '#fff' }}>Çıkış Yap</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}