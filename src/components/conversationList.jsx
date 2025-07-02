// src/components/ConversationList.jsx
import React from "react";

const conversations = [
    {
        id: 1,
        name: "Ali",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        time: "10:30",
        lastMessage: "Merhaba!",
        unread: 2,
        channel: "Email",
        active: true,
        status: "Bekliyor"
    },
    {
        id: 2,
        name: "Ayşe",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        time: "09:15",
        lastMessage: "Teşekkürler!",
        unread: 0,
        channel: "Facebook",
        active: false,
        status: "Yanıtlandı"
    },
    // ... (diğer sohbetler)
];

function ConversationList() {
    return (
        <div className="conversation-list">
            {conversations.map(conv => (
                <div className={`conversation-row${conv.active ? " active" : ""}`} key={conv.id}>
                    {/* 1. ADIM: İKON BURAYA */}
                    {conv.active && (
                        <span className="conv-bubble-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" style={{ opacity: 0.5 }}>
                                <path d="M2 21l21-9-21-9v7l15 2-15 2v7z" />
                            </svg>
                        </span>
                    )}
                    {/* 2. ADIM: DİĞER SOHBET BİLGİLERİ */}
                    <img src={conv.avatar} className="conv-avatar" alt={conv.name} />
                    <div className="conv-info">
                        <div className="conv-header">
                            <span className="conv-name">{conv.name}</span>
                            <span className="conv-time">{conv.time}</span>
                        </div>
                        <div className="conv-last">{conv.lastMessage}</div>
                        {/* Durum etiketi */}
                        <span className={`conv-status conv-status-${conv.status.toLowerCase()}`}>{conv.status}</span>
                    </div>
                    {conv.unread > 0 && <span className="conv-unread">{conv.unread}</span>}
                    <span className={`conv-channel ${conv.channel.toLowerCase()}`}>{conv.channel}</span>
                </div>
            ))}
        </div>
    );
}

export default ConversationList;