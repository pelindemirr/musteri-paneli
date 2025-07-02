import React, { useState } from "react";
import { FiAlertCircle, FiTrash2, FiChevronDown, FiChevronUp, FiEdit2, FiClock, FiCheckCircle, FiRepeat, FiLock } from "react-icons/fi";

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
    "Yanıtlandı": { icon: <FiCheckCircle style={{ color: '#26aca3', fontSize: 16, verticalAlign: 'middle' }} />, tooltip: "Temsilci yanıt verdi, akış devam ediyor." },
    "Yönlendirildi": { icon: <FiRepeat style={{ color: '#3498db', fontSize: 16, verticalAlign: 'middle' }} />, tooltip: "Başka temsilciye ya da yöneticiye aktarıldı." },
    "Kapatıldı": { icon: <FiLock style={{ color: '#888', fontSize: 16, verticalAlign: 'middle' }} />, tooltip: "Sohbet tamamlandı, müşteri teşekkür etti vb." },
};

const statusOptions = ["Bekliyor", "Yanıtlandı", "Yönlendirildi", "Kapatıldı"];

function ChatWindow({ conversation }) {
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [note, setNote] = useState("");
    const [savedNote, setSavedNote] = useState("");
    const [noteOpen, setNoteOpen] = useState(true);
    // KVKK onay state
    const [kvkkChoice, setKvkkChoice] = useState(null);
    // Durum state'i (backend ile entegre olunca prop ile alınabilir)
    const [status, setStatus] = useState(conversation.status || "Bekliyor");
    const [editStatus, setEditStatus] = useState(false);

    // KVKK modalı
    function handleKvkkChoice(choice) {
        setKvkkChoice(choice);
        // TODO: Backend'e gönder (örnek fetch)
        // fetch('/api/kvkk-consent', { ... })
    }

    if (!conversation) {
        return <div className="chat-window">Bir sohbet seçin</div>;
    }

    // KVKK bannerı (modal yerine üstte sabit kutu)
    if (!kvkkChoice) {
        return (
            <div className="chat-window" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e1e1e', color: 'white', padding: '16px' }}>
                <div className="kvkk-banner" style={{
                    background: '#23262b',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '18px 20px',
                    marginBottom: 18,
                    boxShadow: '0 2px 12px -4px #000',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 480,
                    alignSelf: 'center',
                    fontSize: 15
                }}>
                    <div style={{ marginBottom: 10, textAlign: 'center' }}>
                        <b>KVKK Onayı</b><br />
                        Kişisel verileriniz 6698 sayılı KVKK kapsamında korunmaktadır. Detaylı bilgi için
                        <a href="/kvkk.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#26aca3', textDecoration: 'underline', marginLeft: 4 }}>
                            KVKK Aydınlatma Metni (PDF)
                        </a>
                        'ni inceleyebilirsiniz.
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button style={{ background: '#26aca3', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleKvkkChoice('accept')}>Kabul Ediyorum</button>
                        <button style={{ background: '#d64e4e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleKvkkChoice('reject')}>Reddediyorum</button>
                        <button style={{ background: '#23262b', color: '#26aca3', border: '1px solid #26aca3', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => window.open('/kvkk.pdf', '_blank')}>Daha Fazla Bilgi</button>
                    </div>
                </div>
            </div>
        );
    }
    if (kvkkChoice === 'reject') {
        return (
            <div className="chat-window" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#fff', background: '#1e1e1e' }}>
                <div style={{ textAlign: 'center' }}>
                    <h3>KVKK Onayı Gerekli</h3>
                    <p>Sohbete devam edebilmek için KVKK onayınız gereklidir.</p>
                </div>
            </div>
        );
    }

    // KVKK mesajı (ilk mesaj olarak)
    const kvkkMessage = {
        sender: "Sistem",
        text: (
            <span>
                Kişisel verileriniz 6698 sayılı KVKK kapsamında korunmaktadır. Detaylı bilgi için{' '}
                <a href="/kvkk.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#26aca3', textDecoration: 'underline' }}>
                    KVKK Aydınlatma Metni (PDF)
                </a>
                .
            </span>
        ),
        type: "kvkk"
    };
    // Mesajlar dizisinin başına KVKK mesajı ekle (sadece ilk mesajda)
    const messagesWithKvkk = [kvkkMessage, ...conversation.messages];

    const handleReport = () => {
        if (reportReason) {
            alert(`Bildirilen sebep: ${reportReason}`);
            setShowReportModal(false);
            setReportReason("");
        }
    };

    const handleSaveNote = () => {
        setSavedNote(note);
        setNote("");
    };

    const handleDeleteNote = () => {
        setSavedNote("");
        setNote("");
    };

    return (
        <div className="chat-window" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#1e1e1e',
            color: 'white',
            padding: '16px',
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
                                        background: status === opt ? '#26aca3' : 'transparent',
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
                {/* KVKK PDF linki */}
                <a
                    href="/kvkk.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "#26aca3",
                        fontWeight: "bold",
                        marginLeft: 12,
                        fontSize: 14,
                        textDecoration: "underline"
                    }}
                >
                    KVKK Aydınlatma Metni (PDF)
                </a>
                <FiAlertCircle style={{ color: '#ffb300', cursor: 'pointer', fontSize: '18px', marginLeft: 8 }} title="Kullanıcıyı bildir" onClick={() => setShowReportModal(true)} />
            </div>

            {showReportModal && (
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

            {/* Mesajlar */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                {messagesWithKvkk.map((msg, idx) => (
                    <div
                        key={idx}
                        className={msg.type === "kvkk" ? "kvkk-message" : ""}
                        style={msg.type === "kvkk"
                            ? {
                                background: '#eafaf7',
                                color: '#222',
                                borderLeft: '4px solid #26aca3',
                                padding: '10px 16px',
                                borderRadius: 8,
                                marginBottom: 10,
                                fontSize: 14,
                                alignSelf: 'center',
                                maxWidth: '80%'
                            }
                            : {
                                alignSelf: msg.sender === "Siz" ? 'flex-end' : 'flex-start',
                                backgroundColor: msg.sender === "Siz" ? '#26aca3' : '#333',
                                padding: '10px 14px',
                                borderRadius: msg.sender === "Siz"
                                    ? '16px 16px 0px 16px'
                                    : '16px 16px 16px 0px',
                                maxWidth: '60%',
                                color: '#fff',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                                position: 'relative',
                                fontSize: 15,
                            }}
                    >
                        <div>{msg.text}</div>
                        {msg.type !== "kvkk" && (
                            <div style={{
                                fontSize: "11px",
                                color: "#ccc",
                                marginTop: "6px",
                                textAlign: msg.sender === "Siz" ? "right" : "left"
                            }}>
                                {formatTime(msg.timestamp || new Date())}
                            </div>
                        )}
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
