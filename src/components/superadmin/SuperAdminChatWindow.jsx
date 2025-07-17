import React, { useRef, useEffect, useState } from "react";

export default function SuperAdminChatWindow({ conversation, onSendMessage, isTakenOver, onTakeOver, onEndChat }) {
    const messagesEndRef = useRef(null);
    const [showEndChatModal, setShowEndChatModal] = useState(false);
    const [endReason, setEndReason] = useState("");
    const [showEndEndedModal, setShowEndEndedModal] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation?.messages]);

    if (!conversation) {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#23262b',
                color: '#888'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h3>Konuşma Seçin</h3>
                    <p>Soldaki listeden bir konuşma seçin</p>
                </div>
            </div>
        );
    }

    const handleEndChatConfirmed = (reason) => {
        if (conversation && conversation.id) {
            onEndChat && onEndChat(conversation.id, reason);
            setShowEndChatModal(false);
            setShowEndEndedModal(true);
        }
    };

    const handleEndEndedModalClose = () => {
        setShowEndEndedModal(false);
    };

    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#23262b',
            maxWidth: 'calc(100% - 650px)'
        }}>
            {/* Chat Header */}
            <div style={{
                padding: '12px 15px',
                borderBottom: '1px solid #333',
                background: '#1a1d21',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <div style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    background: conversation.avatar ? 'transparent' : '#275db5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }}>
                    {conversation.avatar ? (
                        <img src={conversation.avatar} alt={conversation.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                    ) : (
                        conversation.name.charAt(0)
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, color: '#fff', fontSize: '14px', fontWeight: '600' }}>
                        {conversation.name}
                    </h3>
                    <p style={{ margin: '2px 0 0 0', color: '#888', fontSize: '11px' }}>
                        {conversation.platform} • {conversation.agent} • {conversation.status}
                    </p>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <button
                        onClick={() => setShowEndChatModal(true)}
                        style={{
                            background: 'none',
                            border: '1px solid #d64e4e',
                            color: '#d64e4e',
                            borderRadius: 6,
                            padding: '4px 12px',
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            height: 32,
                            marginTop: 4,
                            transition: 'background 0.18s, color 0.18s',
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.background = '#d64e4e';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.color = '#d64e4e';
                        }}
                    >
                        Sohbeti Bitir
                    </button>
                </div>
            </div>

            {/* Sohbeti Bitir Popup */}
            {showEndChatModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000
                }}>
                    <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 32, minWidth: 340, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Sohbeti bitirmek istediğinize emin misiniz?</div>
                        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 14, marginTop: 8 }}>Sohbeti neden bitirmek istiyorsunuz?</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                            {[
                                { value: 'Müşterinin sorunu çözüldü', label: 'Müşterinin sorunu çözüldü' },
                                { value: 'Kullanıcı Sohbeti Terk etti', label: 'Kullanıcı Sohbeti Terk etti' },
                                { value: 'Başka durumlar', label: 'Başka durumlar' }
                            ].map(opt => (
                                <label
                                    key={opt.value}
                                    style={{
                                        display: 'flex', alignItems: 'center', background: endReason === opt.value ? '#275db5' : '#232b36', color: endReason === opt.value ? '#fff' : '#b0b0b0', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, border: endReason === opt.value ? '1.5px solid #3976e6' : '1px solid #232b36', transition: 'all 0.15s', minHeight: 38
                                    }}
                                >
                                    {endReason === opt.value && (
                                        <span style={{
                                            display: 'inline-block',
                                            width: 14,
                                            height: 14,
                                            borderRadius: '50%',
                                            background: '#fff',
                                            border: '3px solid #275db5',
                                            marginRight: 10
                                        }} />
                                    )}
                                    <input
                                        type="radio"
                                        name="endReason"
                                        value={opt.value}
                                        checked={endReason === opt.value}
                                        onChange={e => setEndReason(e.target.value)}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{ flex: 1, textAlign: 'left' }}>{opt.label}</span>
                                </label>
                            ))}
                        </div>
                        <button style={{ background: endReason ? '#d64e4e' : '#888', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginRight: 10, cursor: endReason ? 'pointer' : 'not-allowed', opacity: endReason ? 1 : 0.7, transition: 'background 0.15s' }} onClick={() => endReason && handleEndChatConfirmed(endReason)} disabled={!endReason}>Evet, Bitir</button>
                        <button style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowEndChatModal(false)}>Vazgeç</button>
                    </div>
                </div>
            )}
            {/* Bitirme sonrası popup */}
            {showEndEndedModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2100
                }}>
                    <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 32, minWidth: 340, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Sohbet başarıyla sonlandırıldı.</div>
                        <button style={{ background: '#275db5', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer', marginTop: 10 }} onClick={handleEndEndedModalClose}>Kapat</button>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {conversation.messages.map((message, index) => {
                    const isCustomer = message.sender === conversation.name;
                    const isSuperAdmin = message.sender === 'Süper Admin';
                    const isAgent = !isCustomer && !isSuperAdmin;
                    let bubbleBg = '#275db5';
                    let bubbleColor = '#fff';
                    let border = undefined;
                    let icon = null;
                    let superAdminLabel = null;
                    if (isCustomer) {
                        bubbleBg = '#f1f0f0';
                        bubbleColor = '#23262b';
                    } else if (isSuperAdmin) {
                        bubbleBg = 'linear-gradient(135deg,rgb(154, 209, 235) 0%,rgb(58, 118, 178) 100%)'; // Açık mavi degrade
                        bubbleColor = '#fff';
                        border = undefined;
                        icon = null;
                        superAdminLabel = (
                            <div style={{
                                fontSize: '10px',
                                color: '#1976d2',
                                opacity: 0.6,
                                marginBottom: 2,
                                textAlign: 'right',
                                width: '100%',
                                paddingRight: 2
                            }}>
                                Superadmin
                            </div>
                        );
                    }
                    return (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: (isAgent || isSuperAdmin) ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
                            {/* Sadece superadmin için üstte etiket */}
                            {isSuperAdmin && superAdminLabel}
                            <div style={{
                                maxWidth: '70%',
                                padding: '10px 14px 22px 14px',
                                borderRadius: (isAgent || isSuperAdmin)
                                    ? '16px 16px 4px 16px'
                                    : '16px 16px 16px 4px',
                                background: bubbleBg,
                                color: bubbleColor,
                                fontSize: '14px',
                                lineHeight: '1.5',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                                position: 'relative',
                                wordBreak: 'break-word',
                                border: undefined,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                flexDirection: 'column',
                            }}>

                                <span style={{ width: '100%', display: 'block' }}>{message.text}</span>
                                {message.timestamp && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: 6,
                                        right: isCustomer ? 12 : 'auto',
                                        left: isCustomer ? 'auto' : 12,
                                        fontSize: 11,
                                        color: (isAgent || isSuperAdmin) ? '#b3d1fa' : '#888',
                                        marginLeft: 0,
                                        marginRight: 0,
                                        verticalAlign: 'bottom',
                                        background: 'transparent',
                                        padding: 0
                                    }}>{new Date(message.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            {/* Message Input ve Devral Butonu */}
            <div style={{
                background: '#23262b',
                borderRadius: 5,
                padding: '16px 16px 12px 16px',
                marginTop: 0,
                marginBottom: 0,
                boxShadow: '0 2px 12px -4px #000',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                position: 'relative'
            }}>
                {isTakenOver ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 80 }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <textarea
                                rows={2}
                                placeholder="Mesajınızı yazın..."
                                style={{
                                    flex: 1,
                                    minHeight: 50,
                                    maxHeight: 120,
                                    resize: 'vertical',
                                    border: 'none',
                                    outline: 'none',
                                    borderRadius: 5,
                                    padding: 10,
                                    background: 'transparent',
                                    color: '#fff',
                                    fontSize: 15
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey && e.target.value.trim()) {
                                        e.preventDefault();
                                        onSendMessage(e.target.value.trim());
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, alignSelf: 'stretch' }}>
                            <button
                                style={{
                                    background: '#275db5',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 5,
                                    padding: '10px 20px',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    cursor: 'pointer',
                                    transition: 'background 0.18s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1)'
                                }}
                                onClick={e => {
                                    const textarea = e.target.parentNode.parentNode.querySelector('textarea');
                                    if (textarea.value.trim()) {
                                        onSendMessage(textarea.value.trim());
                                        textarea.value = '';
                                    }
                                }}
                            >Gönder</button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 80, gap: 12 }}>
                        <div style={{
                            background: 'transparent',
                            color: '#ffe082',
                            fontWeight: 600,
                            fontSize: 15,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: 0,
                            marginBottom: 0,
                            padding: 0,
                            minHeight: 0
                        }}>
                            <span style={{ fontSize: 18, color: '#ffe082', display: 'flex', alignItems: 'center' }}>⚠️</span>
                            Devralmadan mesaj gönderemezsiniz.
                        </div>
                        <button
                            style={{
                                background: '#ffb300',
                                color: '#23262b',
                                border: 'none',
                                borderRadius: 5,
                                padding: '10px 32px',
                                fontWeight: 600,
                                fontSize: 16,
                                cursor: 'pointer',
                                minWidth: 120
                            }}
                            onClick={onTakeOver}
                        >
                            Devral
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 