import React, { useState } from "react";
import { FiLogOut, FiChevronLeft, FiChevronRight, FiMenu, FiChevronDown, FiChevronUp, FiUser, FiStar, FiMessageCircle } from "react-icons/fi";

function Sidebar({ showFavorites, onToggleFavorites, collapsed, onToggleSidebar, conversationFilter, onConversationFilterChange, dailyConversationCount, dailyAnsweredCount }) {

    const [openSections, setOpenSections] = useState({
        conversations: true,
        documents: false,
        groups: false,
    }); //başlıklar ayrıldı
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
            {/* Logo ve toggle aynı satırda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, marginTop: 4 }}>
                {!collapsed && (
                    <h2 className="logo" style={{ color: '#275db5', margin: 0, fontSize: 22, fontWeight: 'bold' }}>CallPilot</h2>
                )}
                <button
                    onClick={onToggleSidebar}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#275db5',
                        fontSize: 22,
                        cursor: 'pointer',
                        zIndex: 2,
                        marginLeft: !collapsed ? 0 : 0,
                        marginRight: 0,
                        padding: 4,
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
            {/* Search input hemen başlık altında */}
            {!collapsed && (
                <input type="text" className="search-input" placeholder="Search..." style={{ marginBottom: 10 }} />
            )}
            {/*  */}
            <div style={{ opacity: collapsed ? 0 : 1, pointerEvents: collapsed ? 'none' : 'auto', transition: 'opacity 0.2s', paddingLeft: collapsed ? 0 : 0 }}>
                {!collapsed && (
                    <>
                        {/* Accordion: Konuşmalar */}
                        <div className="menu-section">
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
                                    <button
                                        className={`menu-button ${showFavorites ? "active" : ""}`}
                                        onClick={() => onToggleFavorites(true)}
                                    >
                                        Favoriler
                                    </button>
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
                                    <p className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <FiStar color="#ffb300" /> Günlük Puan
                                    </p>
                                    <p className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <FiUser /> Yanıtlanan Kişi
                                        <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#ffb300' }}>{dailyAnsweredCount}</span>
                                    </p>
                                    <p className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <FiUser /> Günlük Toplam Konuşma
                                        <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#275db5' }}>{dailyConversationCount}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            {/* */}
            {!collapsed && (
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
            )}
        </div>
    );
}

export default Sidebar;
