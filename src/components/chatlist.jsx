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
    web: <FiGlobe color='#275db5' title="Web" />,
    default: <FiMessageCircle color='#aaa' title="Bilinmiyor" />
};

const BAR_MAX_SECONDS = parseInt(import.meta.env.VITE_BAR_MAX_SECONDS || 120, 10);
const BAR_GREEN_SECONDS = parseInt(import.meta.env.VITE_BAR_GREEN_SECONDS || 60, 10);
const BAR_YELLOW_SECONDS = parseInt(import.meta.env.VITE_BAR_YELLOW_SECONDS || 90, 10);
const BAR_HEIGHT = parseInt(import.meta.env.VITE_BAR_HEIGHT || 6, 10);

function ChatList({ conversations, selectedId, onSelect, onToggleFavorite, onStartChat, onEndChat }) {
    // Aktif sayaçlar için state
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: 16 }}>
            <h3 style={{ color: "#275db5" }}>Sohbetler</h3>
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
                        timerSec = Math.max(0, Math.min(timerSec, BAR_MAX_SECONDS));
                        // Bar rengi ve genişliği
                        if (timerSec < BAR_GREEN_SECONDS) {
                            // 0-90 sn arası yeşil
                            barColor = '#4caf50';
                        } else if (timerSec < BAR_YELLOW_SECONDS) {
                            // Yeşilden sarıya geçiş
                            const t = (timerSec - BAR_GREEN_SECONDS) / (BAR_YELLOW_SECONDS - BAR_GREEN_SECONDS);
                            // Yeşil: #4caf50 (76,175,80), Sarı: #ffb300 (255,179,0)
                            const r = Math.round(76 + (255 - 76) * t);
                            const g = Math.round(175 + (179 - 175) * t);
                            const b = Math.round(80 + (0 - 80) * t);
                            barColor = `rgb(${r},${g},${b})`;
                        } else {
                            // Sarıdan kırmızıya geçiş
                            const t = (timerSec - BAR_YELLOW_SECONDS) / (BAR_MAX_SECONDS - BAR_YELLOW_SECONDS);
                            // Sarı: #ffb300 (255,179,0), Kırmızı: #d32f2f (211,47,47)
                            const r = Math.round(255 + (211 - 255) * t);
                            const g = Math.round(179 + (47 - 179) * t);
                            const b = Math.round(0 + (47 - 0) * t);
                            barColor = `rgb(${r},${g},${b})`;
                        }
                        barWidth = Math.min((timerSec / BAR_MAX_SECONDS) * 100, 100);
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
                            background: conv.id === selectedId
                                ? "linear-gradient(90deg, #275db5 0%,rgb(93, 118, 165) 100%)"//aktif sohbet rengi
                                : "#23262b",
                            color: conv.id === selectedId ? "#fff" : "#f3f3f3",
                            borderRadius: 6,
                            cursor: "pointer",
                            position: "relative",
                            border: conv.id === selectedId ? '2px solid #275db5' : '1px solid #23262b',
                            boxShadow: conv.id === selectedId ? '0 2px 8px -2px #275db588' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 80
                        }}
                    >
                        {/* ÜST: Avatar, İsim, Favori Yıldız, Timer */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div className="chatlist-avatar-wrapper">
                                    {conv.avatar ? (
                                        <>
                                            <img src={conv.avatar} alt={conv.name} className="chatlist-avatar mini" />
                                            <span className="platform-icon badge">
                                                {platformIcons[conv.platform] || platformIcons.default}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="platform-icon mini-only">
                                                {platformIcons[conv.platform] || platformIcons.default}
                                            </span>
                                            <span className="platform-icon badge">
                                                {platformIcons[conv.platform] || platformIcons.default}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <strong style={{ color: conv.id === selectedId ? '#fff' : '#f3f3f3', fontSize: 15 }}>{conv.name}</strong>
                            </div>
                            {/*  */}
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: 9,
                                        height: 9,
                                        borderRadius: '50%',
                                        background: '#4caf50',
                                        marginLeft: 16,
                                        border: '1.5px solid #fff',
                                        boxShadow: '0 0 0 1.5px #23262b'
                                    }}
                                />
                            </div>
                        </div>
                        {/* Son Mesaj */}
                        {lastMessage && (
                            <div
                                style={{
                                    fontSize: "13px",
                                    marginTop: 2,
                                    color: conv.id === selectedId ? "#e0e0e0" : "#bbb",
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
                        {/* ALT: Bar ve Bekleme Süresi */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                            <div
                                className="timer-bar"
                                style={{
                                    height: BAR_HEIGHT,
                                    background: barColor,
                                    width: `${barWidth}%`,
                                    borderRadius: 4,
                                    transition: 'width 0.3s, background 0.3s'
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ChatList;
