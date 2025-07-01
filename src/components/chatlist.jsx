import React from "react";

function ChatList({ conversations, selectedId, onSelect }) {
    return (
        <div style={{ padding: 16 }}>
            <h3 style={{ color: "#26aca3" }}>Sohbetler</h3>
            {conversations.map((conv) => (
                <div
                    key={conv.id}
                    onClick={() => onSelect(conv.id)} // ← Tıklanınca ID gönderiyoruz
                    style={{
                        padding: 12,
                        marginBottom: 8,
                        backgroundColor: conv.id === selectedId ? "#d64e4e" : "#f2f2f2",
                        color: conv.id === selectedId ? "white" : "#333",
                        borderRadius: 6,
                        cursor: "pointer",
                    }}
                >
                    {conv.name}
                </div>
            ))}
        </div>
    );
}
export default ChatList;
