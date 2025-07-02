import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { FiMail, FiGlobe, FiMessageCircle, FiAlertCircle } from "react-icons/fi";

// Yardımcı saat formatlayıcı
function formatTime(date) {
    return new Date(date).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Durum-ikon eşleştirme fonksiyonu
const statusIcons = {
    "Bekliyor": { icon: "🟡", tooltip: "Müşteri mesaj attı, temsilci henüz yanıtlamadı." },
    "Yanıtlandı": { icon: "🟢", tooltip: "Temsilci yanıt verdi, akış devam ediyor." },
    "Yönlendirildi": { icon: "🔁", tooltip: "Başka temsilciye ya da yöneticiye aktarıldı." },
    "Kapatıldı": { icon: "🔒", tooltip: "Sohbet tamamlandı, müşteri teşekkür etti vb." },
};

// Platform-ikon eşleştirme objesi
const platformIcons = {
    whatsapp: <FaWhatsapp color='#25D366' title="WhatsApp" />,
    facebook: <FaFacebookMessenger color='#0084FF' title="Facebook Messenger" />,
    email: <FiMail color='#ffb300' title="Email" />,
    web: <FiGlobe color='#26aca3' title="Web" />,
    default: <FiMessageCircle color='#aaa' title="Bilinmiyor" />
};

function ChatList({ conversations, selectedId, onSelect, onToggleFavorite, onStartChat, onEndChat }) {
    // Aktif sayaçlar için state
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: 16 }}>
            <h3 style={{ color: "#26aca3" }}>Sohbetler</h3>
            {conversations.map((conv) => {
                const lastMessage = conv.messages[conv.messages.length - 1];

                // --- BAR TIMER & SAYAÇ ---
                // Son mesajı atan müşteri mi?
                const lastMsg = conv.messages[conv.messages.length - 1];
                const customerActive = lastMsg && lastMsg.sender !== "Siz";
                let timerSec = 0;
                let barColor = '#4caf50';
                let barWidth = 0;
                if (conv.status === "Aktif" || conv.status === "Yanıtlandı") {
                    if (customerActive) {
                        // Müşteri aktif: bar hep yeşil ve dolu
                        barColor = '#4caf50';
                        barWidth = 100;
                        timerSec = 0;
                    } else {
                        // Temsilci cevap verdikten sonra müşteri bekleniyor
                        // Son müşteri mesajı ile temsilci mesajı arasındaki süreyi bul
                        let lastCustomerMsgTime = null;
                        let lastAgentMsgTime = null;
                        for (let i = conv.messages.length - 1; i >= 0; i--) {
                            if (conv.messages[i].sender === "Siz" && !lastAgentMsgTime) {
                                lastAgentMsgTime = new Date(conv.messages[i].timestamp);
                            }
                            if (conv.messages[i].sender !== "Siz" && !lastCustomerMsgTime) {
                                lastCustomerMsgTime = new Date(conv.messages[i].timestamp);
                            }
                            if (lastCustomerMsgTime && lastAgentMsgTime) break;
                        }
                        if (lastCustomerMsgTime && lastAgentMsgTime) {
                            timerSec = Math.floor((lastAgentMsgTime - lastCustomerMsgTime) / 1000);
                            if (timerSec < 0) timerSec = 0;
                        }
                        if (lastCustomerMsgTime && (!lastAgentMsgTime || lastCustomerMsgTime > lastAgentMsgTime)) {
                            timerSec = Math.floor((now - lastCustomerMsgTime.getTime()) / 1000);
                        }
                        timerSec = Math.max(0, Math.min(timerSec, 120));
                        // Bar rengi ve genişliği
                        if (timerSec < 90) {
                            // 0-90 sn arası yeşil
                            barColor = '#4caf50';
                        } else {
                            // 90-120 sn arası sarıdan kırmızıya geçiş
                            // Geçiş için interpolate
                            const t = (timerSec - 90) / 30; // 0-1 arası
                            // Sarı: #ffb300, Kırmızı: #d32f2f
                            // RGB: sarı (255,179,0), kırmızı (211,47,47)
                            const r = Math.round(255 + (211 - 255) * t);
                            const g = Math.round(179 + (47 - 179) * t);
                            const b = Math.round(0 + (47 - 0) * t);
                            barColor = `rgb(${r},${g},${b})`;
                        }
                        barWidth = Math.min((timerSec / 120) * 100, 100);
                    }
                } else {
                    // Bekliyor veya Kapatıldı ise bar ve sayaç durur
                    timerSec = 0;
                    barWidth = 0;
                }
                const min = String(Math.floor(timerSec / 60)).padStart(2, '0');
                const sec = String(timerSec % 60).padStart(2, '0');
                // --- BAR TIMER & SAYAÇ ---

                // --- TOPLAM SOHBET SÜRESİ SAYAÇ ---
                let totalMin = '00';
                let totalS = '00';
                if ((conv.status === 'Aktif' || conv.status === 'Yanıtlandı') && conv.startedAt) {
                    const totalSec = Math.floor((now - new Date(conv.startedAt).getTime()) / 1000);
                    totalMin = String(Math.floor(totalSec / 60)).padStart(2, '0');
                    totalS = String(totalSec % 60).padStart(2, '0');
                }
                // --- TOPLAM SOHBET SÜRESİ SAYAÇ ---

                return (
                    <div
                        key={conv.id}
                        onClick={() => onSelect(conv.id)}
                        style={{
                            padding: 12,
                            marginBottom: 8,
                            backgroundColor: conv.id === selectedId ? "#d64e4e" : "#f2f2f2",
                            color: conv.id === selectedId ? "white" : "#333",
                            borderRadius: 6,
                            cursor: "pointer",
                            position: "relative"
                        }}
                    >
                        {/* TOPLAM SOHBET SÜRESİ SAYAÇ */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2, gap: 8 }}>
                            <span className="timer-bar-total" style={{ fontWeight: 'normal', color: '#888', fontSize: 11 }}>{totalMin}:{totalS}</span>
                        </div>
                        {/* BAR TIMER ve Müşteri Bekleme Süresi */}
                        <div className="timer-bar-wrapper" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div
                                className="timer-bar"
                                style={{
                                    width: `${barWidth}%`,
                                    background: barColor,
                                    transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1), background 0.7s',
                                }}
                            />
                            <span className="timer-bar-time" style={{ fontSize: 13, color: '#333' }}>Bekleme: {min}:{sec}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div className="chatlist-avatar-wrapper">
                                {conv.avatar ? (
                                    <>
                                        <img src={conv.avatar} alt={conv.name} className="chatlist-avatar mini" />
                                        <span className="platform-icon badge">
                                            {platformIcons[conv.platform] || platformIcons.default}
                                        </span>
                                    </>
                                ) : (
                                    <span className="platform-icon mini-only">
                                        {platformIcons[conv.platform] || platformIcons.default}
                                    </span>
                                )}
                            </div>
                            <strong>{conv.name}</strong>
                        </div>
                        {/* Sohbeti Bitir butonu: sadece seçili ve aktif/yanıtlandı ise, sağ üst köşede */}
                        {(conv.id === selectedId && (conv.status === "Aktif" || conv.status === "Yanıtlandı")) && (
                            <button
                                onClick={e => { e.stopPropagation(); onEndChat(conv.id); }}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 12,
                                    background: '#d64e4e',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 6,
                                    padding: '6px 18px',
                                    fontWeight: 600,
                                    fontSize: 14,
                                    cursor: 'pointer',
                                    zIndex: 2,
                                    boxShadow: '0 2px 8px -2px #d64e4e44'
                                }}
                            >Sohbeti Bitir</button>
                        )}
                        {/* Sohbete Dahil Ol butonu: Bekliyor veya Kapatıldı ise */}
                        {(conv.status === "Bekliyor" || conv.status === "Kapatıldı") && (
                            <button onClick={e => { e.stopPropagation(); onStartChat(conv.id); }} style={{ marginTop: 8, background: '#26aca3', color: 'white', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Sohbete Dahil Ol</button>
                        )}
                        {lastMessage && (
                            <div
                                style={{
                                    fontSize: "13px",
                                    marginTop: 4,
                                    color: conv.id === selectedId ? "#f3f3f3" : "#666",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "80%",
                                    }}
                                >
                                    {lastMessage.text}
                                </span>
                                <span style={{ marginLeft: 8 }}>{formatTime(lastMessage.timestamp)}</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ChatList;
