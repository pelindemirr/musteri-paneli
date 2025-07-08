import React, { useState, useRef, useEffect } from "react";
import { FiAlertCircle, FiTrash2, FiChevronDown, FiChevronUp, FiEdit2, FiClock, FiCheckCircle, FiRepeat, FiLock, FiUser, FiSave, FiX } from "react-icons/fi";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { FiMail, FiGlobe, FiMessageCircle } from "react-icons/fi";

// Saat formatlama yardımcı fonksiyonu
function formatTime(date) {
    return date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Durum-ikon eşleştirme fonksiyonu (react-icons ile)
const statusIcons = {
    "Bekliyor": { icon: <FiClock style={{ color: '#f39c12', fontSize: 16, verticalAlign: 'middle' }} />, tooltip: "Müşteri mesaj attı, temsilci henüz yanıtlamadı." },
    "Yanıtlandı": { icon: <FiCheckCircle style={{ color: '#275db5', fontSize: 16, verticalAlign: 'middle' }} />, tooltip: "Temsilci yanıt verdi, akış devam ediyor." },
    "Yönlendirildi": { icon: <FiRepeat style={{ color: '#3498db', fontSize: 16, verticalAlign: 'middle' }} />, tooltip: "Başka temsilciye ya da yöneticiye aktarıldı." },
    "Kapatıldı": { icon: <FiLock style={{ color: '#888', fontSize: 16, verticalAlign: 'middle' }} />, tooltip: "Sohbet tamamlandı, müşteri teşekkür etti vb." },
};

const statusOptions = ["Bekliyor", "Yanıtlandı", "Yönlendirildi", "Kapatıldı"];

// Platform-ikon eşleştirme objesi (chatlist.jsx ile aynı)
const platformIcons = {
    whatsapp: <FaWhatsapp color="#25D366" title="WhatsApp" style={{ fontSize: 16, verticalAlign: 'middle' }} />,
    facebook: <FaFacebookMessenger color="#0084FF" title="Facebook Messenger" style={{ fontSize: 16, verticalAlign: 'middle' }} />,
    email: <FiMail color="#ffb300" title="Email" style={{ fontSize: 16, verticalAlign: 'middle' }} />,
    web: <FiGlobe color="#275db5" title="Web" style={{ fontSize: 16, verticalAlign: 'middle' }} />,
    default: <FiMessageCircle color="#aaa" title="Bilinmiyor" style={{ fontSize: 16, verticalAlign: 'middle' }} />
};

function ChatWindow({ conversation, onEndChat, onStartChat }) {
    // Tüm hook'lar en başta
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [savedNote, setSavedNote] = useState("");
    const [note, setNote] = useState("");
    const [noteOpen, setNoteOpen] = useState(true);
    const [kvkkChoice, setKvkkChoice] = useState(null);
    const [status, setStatus] = useState(conversation?.status || "Bekliyor");
    const [editStatus, setEditStatus] = useState(false);
    const [showEndChatModal, setShowEndChatModal] = useState(false);
    const [showEndEndedModal, setShowEndEndedModal] = useState(false);
    const [oldMessagesMap, setOldMessagesMap] = useState({});
    const [oldBatchMap, setOldBatchMap] = useState({});
    const [oldLoadingMap, setOldLoadingMap] = useState({});
    const messagesEndRef = useRef(null);
    const [endReason, setEndReason] = useState("");

    // eski mesajları görüntüleme / geçmiş sohbetler
    // Tüm eski mesajlar (örnek sahte veri)
    const allFakeOldMessages = [
        {
            sender: 'Pelin',
            text: 'Merhaba, yardım almak istiyorum. (1)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
            sender: 'Siz',
            text: 'Daha önceki bir mesaj (2)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 60000),
        },
        {
            sender: 'Pelin',
            text: 'Daha önceki bir mesaj (3)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 120000),
        },
        {
            sender: 'Pelin',
            text: 'İyi günler. (4)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 180000),
        },
        {
            sender: 'Siz',
            text: 'Daha eski bir mesaj (5)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
            sender: 'Pelin',
            text: 'Daha eski bir mesaj (6)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 60000),
        },
        {
            sender: 'Siz',
            text: 'Daha eski bir mesaj (7)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 120000),
        },
        {
            sender: 'Pelin',
            text: 'Daha eski bir mesaj (8)',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 180000),
        },
    ];
    // Kaç mesaj bir seferde yüklensin?
    const OLD_MESSAGES_BATCH_SIZE = 5;
    // Şu ana kadar yüklenen eski mesajlar
    const oldMessages = conversation ? (oldMessagesMap[conversation.id] || []) : [];
    const oldBatch = conversation ? (oldBatchMap[conversation.id] || 0) : 0;
    const oldLoading = conversation ? (oldLoadingMap[conversation.id] || false) : false;
    const allOldLoaded = oldBatch * OLD_MESSAGES_BATCH_SIZE >= allFakeOldMessages.length;

    // KVKK modalı
    function handleKvkkChoice(choice) {
        setKvkkChoice(choice);
        // TODO: Backend'e gönder (örnek fetch)
        // 
    }


    const messagesWithKvkk = conversation ? [...oldMessages, ...conversation.messages] : [];

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messagesWithKvkk.length]);

    const handleReport = () => {
        if (reportReason) {
            alert(`Bildirilen sebep: ${reportReason}`);
            setShowReportModal(false);
            setReportReason("");
        }
    };

    const handleEndChatConfirmed = (reason) => {
        if (conversation && conversation.id) {
            // Bitirme sebebi burada kullanılabilir (ör. backend'e gönderilebilir)
            // console.log('Bitirme sebebi:', reason);
            onEndChat(conversation.id);
            setShowEndChatModal(false);
            setShowEndEndedModal(true);
        }
    };

    const handleEndEndedModalClose = () => {
        setShowEndEndedModal(false);
        setStatus('Yanıtlandı');
        // 
    };

    // uyarı kutusu
    const warningBoxStyle = {
        background: '#23262b',
        borderRadius: 5,
        padding: '18px 16px',
        marginTop: 16,
        marginBottom: 0,
        boxShadow: '0 2px 12px -4px #000',
        textAlign: 'center',
        color: '#d64e4e',
        fontWeight: 600,
        fontSize: 15
    };

    // Mesajları Yükle butonu için handler
    const handleLoadOldMessages = () => {
        setOldLoadingMap(prev => ({ ...prev, [conversation.id]: true }));
        setTimeout(() => {
            const nextBatch = allFakeOldMessages.slice(
                oldBatch * OLD_MESSAGES_BATCH_SIZE,
                (oldBatch + 1) * OLD_MESSAGES_BATCH_SIZE
            );
            setOldMessagesMap(prev => ({
                ...prev,
                [conversation.id]: [...nextBatch, ...(prev[conversation.id] || [])]
            }));
            setOldBatchMap(prev => ({
                ...prev,
                [conversation.id]: (prev[conversation.id] || 0) + 1
            }));
            setOldLoadingMap(prev => ({ ...prev, [conversation.id]: false }));
        }, 900);
    };

    // Koşullu 
    if (!conversation) {
        return <div className="chat-window">Bir sohbet seçin</div>;
    }

    return (
        <div className="chat-window" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#1e1e1e',
            color: 'white',
            padding: '16px',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Üst Başlık */}
            <div style={{
                borderBottom: '1px solid #444',
                paddingBottom: 10,
                marginBottom: 10,
                fontSize: 18,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span>{conversation.name}</span>
                {/* Durum etiketi ve ikon */}
                <span
                    className="status-badge"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#23262b',
                        borderRadius: 8,
                        padding: '2px 8px',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#fff',
                        gap: 4,
                        marginLeft: 4,
                        cursor: 'pointer',
                        minWidth: 0,
                        height: 24,
                        position: 'relative'
                    }}
                    title={statusIcons[status]?.tooltip || status}
                    onClick={() => setEditStatus((v) => !v)}
                >
                    {statusIcons[status]?.icon}
                    <span style={{ fontSize: 13, marginLeft: 2 }}>{status}</span>
                    {/* Durum değiştirme dropdown'u */}
                    {editStatus && (
                        <div style={{
                            position: 'absolute',
                            top: 28,
                            left: 0,
                            background: '#23262b',
                            border: '1px solid #444',
                            borderRadius: 8,
                            zIndex: 10,
                            padding: 4,
                            minWidth: 120,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            fontSize: 14
                        }}>
                            {statusOptions.map(opt => (
                                <div
                                    key={opt}
                                    onClick={() => { setStatus(opt); setEditStatus(false); }}
                                    style={{
                                        padding: '4px 8px',
                                        cursor: 'pointer',
                                        background: status === opt ? '#275db5' : 'transparent',
                                        color: status === opt ? '#fff' : '#eee',
                                        borderRadius: 6,
                                        marginBottom: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6
                                    }}
                                >
                                    {statusIcons[opt]?.icon}
                                    <span style={{ fontSize: 13 }}>{opt}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </span>
                {/* */}
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 12, justifyContent: 'space-between', width: '100%' }}>
                    <FiAlertCircle style={{ color: '#ffb300', cursor: 'pointer', fontSize: '18px' }} title="Kullanıcıyı bildir" onClick={() => setShowReportModal(true)} />
                    <div style={{ flex: 1 }} />
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
                            marginLeft: 'auto',
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

            {showReportModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{ background: '#23262b', padding: 28, borderRadius: 12, minWidth: 320, color: '#fff', boxShadow: '0 4px 24px -8px #000' }}>
                        <h3 style={{ color: '#ffb300', marginTop: 0 }}>Kullanıcıyı Bildir</h3>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 8 }}>
                                <input type="radio" name="report" value="Hakaret / Küfür İçeriği" checked={reportReason === "Hakaret / Küfür İçeriği"} onChange={e => setReportReason(e.target.value)} /> Hakaret / Küfür İçeriği
                            </label>
                            <label style={{ display: 'block', marginBottom: 8 }}>
                                <input type="radio" name="report" value="Spam / Alakasız Mesajlar" checked={reportReason === "Spam / Alakasız Mesajlar"} onChange={e => setReportReason(e.target.value)} /> Spam / Alakasız Mesajlar
                            </label>
                            <label style={{ display: 'block', marginBottom: 8 }}>
                                <input type="radio" name="report" value="Diğer" checked={reportReason === "Diğer"} onChange={e => setReportReason(e.target.value)} /> Diğer
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => setShowReportModal(false)} style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>İptal</button>
                            <button onClick={handleReport} disabled={!reportReason} style={{ background: reportReason ? '#ffb300' : '#888', color: '#23262b', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: reportReason ? 'pointer' : 'not-allowed' }}>Gönder</button>
                        </div>
                    </div>
                </div>
            )}

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
                            <label style={{ display: 'flex', alignItems: 'center', background: endReason === 'Müşterinin sorunu çözüldü' ? '#275db5' : '#232b36', color: endReason === 'Müşterinin sorunu çözüldü' ? '#fff' : '#b0b0b0', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, border: endReason === 'Müşterinin sorunu çözüldü' ? '1.5px solid #3976e6' : '1px solid #232b36', transition: 'all 0.15s', minHeight: 38 }}>
                                <input type="radio" name="endReason" value="Müşterinin sorunu çözüldü" checked={endReason === 'Müşterinin sorunu çözüldü'} onChange={e => setEndReason(e.target.value)} style={{ marginRight: 12, accentColor: '#275db5', flexShrink: 0 }} />
                                <span style={{ flex: 1, textAlign: 'left' }}>Müşterinin sorunu çözüldü</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', background: endReason === 'Kullanıcı Sohbeti Terk etti' ? '#275db5' : '#232b36', color: endReason === 'Kullanıcı Sohbeti Terk etti' ? '#fff' : '#b0b0b0', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, border: endReason === 'Kullanıcı Sohbeti Terk etti' ? '1.5px solid #3976e6' : '1px solid #232b36', transition: 'all 0.15s', minHeight: 38 }}>
                                <input type="radio" name="endReason" value="Kullanıcı Sohbeti Terk etti" checked={endReason === 'Kullanıcı Sohbeti Terk etti'} onChange={e => setEndReason(e.target.value)} style={{ marginRight: 12, accentColor: '#275db5', flexShrink: 0 }} />
                                <span style={{ flex: 1, textAlign: 'left' }}>Kullanıcı Sohbeti Terk etti</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', background: endReason === 'Başka durumlar' ? '#275db5' : '#232b36', color: endReason === 'Başka durumlar' ? '#fff' : '#b0b0b0', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, border: endReason === 'Başka durumlar' ? '1.5px solid #3976e6' : '1px solid #232b36', transition: 'all 0.15s', minHeight: 38 }}>
                                <input type="radio" name="endReason" value="Başka durumlar" checked={endReason === 'Başka durumlar'} onChange={e => setEndReason(e.target.value)} style={{ marginRight: 12, accentColor: '#275db5', flexShrink: 0 }} />
                                <span style={{ flex: 1, textAlign: 'left' }}>Başka durumlar</span>
                            </label>
                        </div>
                        <button style={{ background: endReason ? '#d64e4e' : '#888', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginRight: 10, cursor: endReason ? 'pointer' : 'not-allowed', opacity: endReason ? 1 : 0.7, transition: 'background 0.15s' }} onClick={() => endReason && handleEndChatConfirmed(endReason)} disabled={!endReason}>Evet, Bitir</button>
                        <button style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowEndChatModal(false)}>Vazgeç</button>
                    </div>
                </div>
            )}

            {status === 'Kapatıldı' && showEndEndedModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3000
                }}>
                    <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Sohbet Sonlandırıldı</div>
                        <div style={{ fontSize: 15, fontWeight: 400, marginBottom: 18 }}>Bu sohbet kapatıldı, yeni mesaj gönderilemez.</div>
                        <button style={{ background: '#275db5', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={handleEndEndedModalClose}>Tamam</button>
                    </div>
                </div>
            )}

            {/* Mesajlar */}
            <div className="messages-area" style={{
                flex: 1,
                overflowY: 'auto',
                minHeight: 0,
                paddingRight: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: 0
            }}>
                {/*  Mesajları Yükle butonu */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
                    {!allOldLoaded && (
                        oldLoading ? (
                            <div style={{ marginTop: 8, color: '#275db5', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span className="spinner" style={{ width: 18, height: 18, border: '3px solid #275db5', borderTop: '3px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                                Yükleniyor...
                            </div>
                        ) : (
                            <button
                                style={{
                                    marginTop: 8,
                                    background: '#23262b',
                                    color: '#fff',
                                    border: '1px solid #275db5',
                                    borderRadius: 6,
                                    padding: '6px 18px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: 14
                                }}
                                onClick={handleLoadOldMessages}
                            >
                                Mesajları Yükle
                            </button>
                        )
                    )}
                </div>
                {/* Diğer mesajlar */}
                {messagesWithKvkk.slice(1).map((msg, idx) => {
                    const isAgent = msg.sender === "Siz";
                    const isSystem = msg.sender === "Sistem";
                    // Platforma göre balon rengi belirle 
                    let bubbleBg = isAgent ? '#27db5' : '#23292b';
                    let bubbleColor = '#fff';
                    if (!isAgent && !isSystem) {
                        switch (conversation.platform) {
                            case 'whatsapp':
                                bubbleBg = 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)';
                                bubbleColor = '#23262b';
                                break;
                            case 'facebook':
                                bubbleBg = 'linear-gradient(135deg, #0084ff 0%, #00c6ff 100%)';
                                bubbleColor = '#fff';
                                break;
                            case 'email':
                                bubbleBg = 'linear-gradient(135deg, #ffb300 0%,rgb(160, 131, 45) 100%)';
                                bubbleColor = '#23262b';
                                break;
                            case 'web':
                                bubbleBg = 'linear-gradient(135deg, #275db5 0%, #4f8cff 100%)';
                                bubbleColor = '#fff';
                                break;
                            default:
                                bubbleBg = '#23262b';
                                bubbleColor = '#fff';
                        }
                    } else if (isAgent) {
                        bubbleBg = 'linear-gradient(135deg, #3a3a3a 0%, #636363 100%)';
                        bubbleColor = '#fff';
                    } else if (isSystem) {
                        bubbleBg = '#eafaf7';
                        bubbleColor = '#222';
                    }
                    return (
                        <div key={idx} style={{
                            display: 'flex',
                            flexDirection: isAgent ? 'row-reverse' : 'row',
                            alignItems: 'flex-end',
                            marginBottom: 10,
                            gap: 8,
                        }}>
                            {/* */}
                            {!isSystem && (
                                isAgent ? (
                                    <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#275db5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '1.5px solid #eee' }}>
                                        <FiUser />
                                    </span>
                                ) : (
                                    conversation.avatar ? (
                                        <img src={conversation.avatar} alt={conversation.name} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #eee', background: '#23262b' }} />
                                    ) : (
                                        <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#23262b', color: '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '1.5px solid #eee' }}>
                                            <FiUser />
                                        </span>
                                    )
                                )
                            )}
                            <div
                                className="message-bubble"
                                style={{
                                    background: bubbleBg,
                                    color: bubbleColor,
                                    borderRadius: isAgent ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                                    padding: '10px 16px 22px 16px',
                                    fontSize: 15,
                                    maxWidth: '70%',
                                    minWidth: 48,
                                    boxShadow: '0 2px 8px -4px #000',
                                    alignSelf: isAgent ? 'flex-end' : 'flex-start',
                                    border: isAgent ? '1px solid #444' : 'none',
                                    wordBreak: 'break-word',
                                    position: 'relative',
                                    transition: 'background 0.2s',
                                }}
                            >
                                <span style={{ flex: 1 }}>{msg.text}</span>
                                {msg.timestamp && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: 6,
                                        right: 12,
                                        fontSize: 11,
                                        color: isAgent ? '#bbb' : '#23262b99',
                                        marginLeft: 8,
                                        marginRight: 0,
                                        verticalAlign: 'bottom',
                                        background: 'transparent',
                                        padding: 0
                                    }}>{formatTime(new Date(msg.timestamp))}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Mesaj yazma alanı */}
            {status === 'Kapatıldı' ? (
                <div style={{
                    background: '#2C2C2C',
                    borderRadius: 8,
                    padding: '18px 16px',
                    marginTop: 0,
                    marginBottom: 0,
                    boxShadow: '0 2px 12px -4px #000',
                    textAlign: 'center',
                    color: '#d64e4e',
                    fontWeight: 600,
                    fontSize: 15
                }}>
                    Bu sohbet kapatıldı, yeni mesaj gönderilemez.
                </div>
            ) : status === 'Yönlendirildi' ? (
                <div style={{
                    background: '#23262b',
                    borderRadius: 8,
                    padding: '18px 16px',
                    marginTop: 0,
                    marginBottom: 0,
                    boxShadow: '0 2px 12px -4px #000',
                    textAlign: 'center',
                    color: '#d64e4e',
                    fontWeight: 600,
                    fontSize: 15
                }}>
                    Bu sohbet başka bir temsilciye yönlendirildi, yeni mesaj gönderilemez.
                </div>
            ) : (
                <div style={{
                    background: '#23262b',
                    borderRadius: 5,
                    padding: '16px 16px 12px 16px',
                    marginTop: 0,
                    marginBottom: 0,
                    boxShadow: '0 2px 12px -4px #000',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 8
                }}>
                    <textarea
                        className="textarea-focus"
                        placeholder="Mesajınızı yazın..."
                        rows={2}
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
                            fontSize: 15,
                            '::placeholder': { color: '#fff' }
                        }}
                    />
                    <button
                        className="chat-send-btn-animated"
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
                    >
                        Gönder
                    </button>
                    <style>{`
                        .chat-send-btn-animated:hover {
                            background: #3976e6 !important;
                            transform: scale(1.04);
                        }
                        .chat-send-btn-animated:active {
                            transform: scale(0.98);
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}

export default ChatWindow;
