import React from "react";

export default function SuperAdminSidebar({ collapsed, onToggleSidebar, activeSection, onSectionChange, onOpenMacroModal, onOpenUserPanel }) {
    return (
        <div style={{
            width: collapsed ? 80 : 320,
            background: '#181818',
            color: '#fff',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #222',
            transition: 'width 0.2s cubic-bezier(.4,0,.2,1)',
            zIndex: 10,
            position: 'relative',
        }}>
            <div style={{ padding: '28px 24px 18px 24px', borderBottom: '1px solid #23262b', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontWeight: 900, fontSize: 26, color: '#275db5', letterSpacing: 0.5 }}>CallPilot</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0 0 0' }}>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ color: '#bbb', fontWeight: 700, fontSize: 15, marginLeft: 32, marginBottom: 8 }}>Sohbetler</div>
                    <button style={{ width: '100%', background: 'none', border: 'none', color: activeSection === 'all' ? '#ffb300' : '#fff', fontWeight: 700, fontSize: 17, textAlign: 'left', padding: '10px 32px', cursor: 'pointer', borderLeft: activeSection === 'all' ? '4px solid #ffb300' : '4px solid transparent', backgroundColor: activeSection === 'all' ? '#23262b' : 'none', transition: 'all 0.18s' }} onClick={() => onSectionChange('all')}>Tüm Konuşmalar</button>
                    <button style={{ width: '100%', background: 'none', border: 'none', color: activeSection === 'waiting' ? '#ffb300' : '#fff', fontWeight: 700, fontSize: 17, textAlign: 'left', padding: '10px 32px', cursor: 'pointer', borderLeft: activeSection === 'waiting' ? '4px solid #ffb300' : '4px solid transparent', backgroundColor: activeSection === 'waiting' ? '#23262b' : 'none', transition: 'all 0.18s' }} onClick={() => onSectionChange('waiting')}>Bekleyenler</button>
                    <button style={{ width: '100%', background: 'none', border: 'none', color: activeSection === 'answered' ? '#ffb300' : '#fff', fontWeight: 700, fontSize: 17, textAlign: 'left', padding: '10px 32px', cursor: 'pointer', borderLeft: activeSection === 'answered' ? '4px solid #ffb300' : '4px solid transparent', backgroundColor: activeSection === 'answered' ? '#23262b' : 'none', transition: 'all 0.18s' }} onClick={() => onSectionChange('answered')}>Yanıtlananlar</button>
                </div>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ color: '#bbb', fontWeight: 700, fontSize: 15, marginLeft: 32, marginBottom: 8 }}>İstatistikler</div>
                    <button style={{ width: '100%', background: 'none', border: 'none', color: '#fff', fontWeight: 700, fontSize: 17, textAlign: 'left', padding: '10px 32px', cursor: 'pointer', borderLeft: '4px solid transparent', transition: 'all 0.18s' }}>Genel İstatistikler</button>
                </div>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ color: '#bbb', fontWeight: 700, fontSize: 15, marginLeft: 32, marginBottom: 8 }}>Temsilci Yönetimi</div>
                    <button
                        style={{
                            width: '100%',
                            background: '#23262b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontWeight: 700,
                            fontSize: 17,
                            textAlign: 'left',
                            padding: '12px 32px',
                            cursor: 'pointer',
                            marginBottom: 8,
                            boxShadow: '0 2px 8px -4px #000',
                            borderLeft: '4px solid #fff',
                            transition: 'background 0.18s, color 0.18s',
                        }}
                        onClick={onOpenUserPanel}
                    >
                        Kullanıcı Yönetimi
                    </button>
                </div>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ color: '#bbb', fontWeight: 700, fontSize: 15, marginLeft: 32, marginBottom: 8 }}>Ayarlar</div>
                    <button style={{ width: '100%', background: 'none', border: 'none', color: '#fff', fontWeight: 700, fontSize: 17, textAlign: 'left', padding: '10px 32px', cursor: 'pointer', borderLeft: '4px solid transparent', transition: 'all 0.18s' }} onClick={onOpenMacroModal}>Makro Yönetimi</button>
                </div>
            </div>
            <div style={{ padding: 24, borderTop: '1px solid #23262b', color: '#bbb', fontSize: 15 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Süper Admin</div>
                <div style={{ fontSize: 14, marginBottom: 8 }}>superadmin@callpilot.com</div>
                <button style={{ background: '#d64e4e', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 0', fontWeight: 700, fontSize: 16, width: '100%', cursor: 'pointer' }}>Çıkış Yap</button>
            </div>
        </div>
    );
} 