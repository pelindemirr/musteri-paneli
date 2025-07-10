import React, { useState } from "react";
import { FiLogOut, FiChevronLeft, FiChevronRight, FiMenu, FiChevronDown, FiChevronUp, FiUser, FiStar, FiMessageCircle } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

function Sidebar({ showFavorites, onToggleFavorites, collapsed, onToggleSidebar, conversationFilter, onConversationFilterChange, dailyConversationCount, dailyAnsweredCount, logout }) {

    const [openSections, setOpenSections] = useState({
        conversations: true,
        documents: false,
        groups: false,
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
            {/* Logo ve menü başlıkları ortak üst div */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {/* */}
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
                {/**/}
                <div style={{ opacity: collapsed ? 0 : 1, pointerEvents: collapsed ? 'none' : 'auto', transition: 'opacity 0.2s', paddingLeft: collapsed ? 0 : 0, marginTop: 12 }}>
                    {!collapsed && (
                        <>
                            {/* Accordion: Konuşmalar */}
                            <div className="menu-section" style={{ marginTop: 0 }}>
                                <div className={`menu-title${openSections.conversations ? ' open' : ''}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSection('conversations')}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                        <FiMessageCircle style={{ fontSize: 18, color: '#275db5' }} /> Konuşmalar
                                    </span>
                                    <span className="chevron">{openSections.conversations ? <FiChevronUp /> : <FiChevronDown />}</span>
                                </div>
                                {openSections.conversations && (
                                    <div className="sidebar-accordion-content">
                                        <button
                                            className={`menu-button ${!showFavorites && conversationFilter === 'all' ? "active" : ""}`}
                                            onClick={() => {
                                                onToggleFavorites(false);
                                                onConversationFilterChange('all');
                                            }}
                                        >  Bütün Konuşmalar
                                        </button>
                                        { /*   <button
                                           className={`menu-button ${showFavorites ? "active" : ""}`}
                                            onClick={() => onToggleFavorites(true)}
                                        >
                                            Favoriler
                                        </button>*/}
                                        <button
                                            className={`menu-button ${conversationFilter === 'waiting' ? "active" : ""}`}
                                            onClick={() => onConversationFilterChange('waiting')}
                                        >
                                            Bekleyenler
                                        </button>
                                        <button
                                            className={`menu-button ${conversationFilter === 'answered' ? "active" : ""}`}
                                            onClick={() => onConversationFilterChange('answered')}
                                        >
                                            Yanıtlananlar
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Accordion: İstatistikler */}
                            <div className="menu-section">
                                <div className={`menu-title${openSections.documents ? ' open' : ''}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSection('documents')}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                        <FiStar style={{ fontSize: 18, color: '#ffb300' }} /> İstatistikler
                                    </span>
                                    <span className="chevron">{openSections.documents ? <FiChevronUp /> : <FiChevronDown />}</span>
                                </div>
                                {openSections.documents && (
                                    <div className="sidebar-accordion-content">

                                        <p className="menu-item" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <FiUser /> Yanıtlanan Kişi
                                            <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#ffb300' }}>{dailyAnsweredCount}</span>
                                        </p>
                                        <p className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
                                            <FiUser /> Günlük Toplam Konuşma
                                            <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#275db5' }}>{dailyConversationCount}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* Accordion: Takımlar/Ekipler */}
                            <div className="menu-section">
                                <div className={`menu-title${openSections.groups ? ' open' : ''}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSection('groups')}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                        <FiUser style={{ fontSize: 16, color: '#4caf50' }} /> Takımlar
                                    </span>
                                    <span className="chevron">{openSections.groups ? <FiChevronUp /> : <FiChevronDown />}</span>

                                </div>
                                {openSections.groups && (
                                    <div className="sidebar-accordion-content">
                                        <hr style={{
                                            border: 0,
                                            borderTop: '1px solid rgba(171, 166, 166, 0.45)',
                                            margin: '12px 16px',
                                            width: 'calc(100% - 32px)'
                                        }} />
                                        <div style={{ fontWeight: 600, color: '#ffb300', fontSize: 14, marginLeft: 16, marginBottom: 12, letterSpacing: 0.2 }}>Yöneticiler</div>
                                        <ul style={{ listStyle: 'none', padding: 0, marginLeft: 8, marginBottom: 8 }}>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 13, marginBottom: 3 }}>
                                                <FiUser style={{ fontSize: 13 }} /> Ayşe Yılmaz
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 13, marginBottom: 3 }}>
                                                <FiUser style={{ fontSize: 13 }} /> Mehmet Demir
                                            </li>
                                        </ul>
                                        <hr style={{
                                            border: 0,
                                            borderTop: '1px solid rgba(171, 166, 166, 0.45)',
                                            margin: '12px 16px',
                                            width: 'calc(100% - 32px)'
                                        }} />
                                        <div style={{
                                            fontWeight: 600,
                                            color: '#275db5',
                                            fontSize: 14,
                                            marginLeft: 16,
                                            marginBottom: 12,
                                            marginTop: 8,
                                            letterSpacing: 0.2
                                        }}>Ekip Arkadaşları</div>
                                        <ul style={{ listStyle: 'none', padding: 0, marginLeft: 8 }}>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 13, marginBottom: 3 }}>
                                                <FiUser style={{ fontSize: 13 }} /> Ali Vural
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 13, marginBottom: 3 }}>
                                                <FiUser style={{ fontSize: 13 }} /> Zeynep Kaya
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 13, marginBottom: 3 }}>
                                                <FiUser style={{ fontSize: 13 }} /> Sen (Pelin)
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* */}
            {!collapsed && (
                <div className="sidebar-bottom" style={{ width: '100%', padding: '0 0 8px 0' }}>
                    <div className="user-info-box" style={{ marginBottom: 4, paddingLeft: 18 }}>
                        <div className="user-name" style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <FiUser style={{ fontSize: 15, color: '#fff' }} />
                            Pelin DEMİR
                        </div>
                        <div className="user-mail" style={{ fontSize: 15, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <MdEmail style={{ fontSize: 17, color: '#bdbdbd' }} />
                            iknowtechnology@gmail.com
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

export default Sidebar;
