import React from "react";

function ChatWindow({ conversation }) {
    if (!conversation) {
        return <div className="chat-window">Bir sohbet seçin</div>;
    }

    return (
        <div className="chat-window" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: '#1e1e1e',
            color: 'white',
            padding: '16px',
        }}>
            {/* Üst başlık */}
            <div style={{
                borderBottom: '1px solid #444',
                paddingBottom: 10,
                marginBottom: 10,
                fontSize: 18,
                fontWeight: 'bold'
            }}>
                {conversation.name}
            </div>

            {/* Mesajlar */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                paddingRight: 10
            }}>
                {conversation.messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            alignSelf: msg.sender === "Siz" ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.sender === "Siz" ? '#26aca3' : '#444',
                            padding: '10px 14px',
                            borderRadius: 10,
                            maxWidth: '50%',
                            color: msg.sender === "Siz" ? 'white' : '#ddd',
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Mesaj yazma alanı */}
            <div style={{ display: 'flex', marginTop: 12 }}>
                <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    style={{
                        flex: 1,
                        padding: 10,
                        borderRadius: '6px 0 0 6px',
                        border: 'none',
                        outline: 'none',
                    }}
                />
                <button style={{
                    padding: '10px 16px',
                    backgroundColor: '#26aca3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0 6px 6px 0',
                    cursor: 'pointer',
                }}>
                    Gönder
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
