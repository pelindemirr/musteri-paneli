import React, { useState } from "react";
import '../CustomerPanel.css';

export default function AgentStatistics({ customer }) {
    // Temsilciye aktarma için state'ler
    const agents = ["Ayşe Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Ali Vural"];
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(agents[0]);
    const [info, setInfo] = useState("");
    // Hazır mesajlar ve makrolar için örnekler
    const readyMessages1 = [
        "Yardımcı olabildiysem ne mutlu!",
        "İyi günler dilerim!",
        "Teşekkürler, tekrar görüşmek üzere.",
        "Sorununuz çözüldü mü?",
        "Sohbeti sonlandırmak ister misiniz?"
    ];
    const readyMessages2 = [
        "Başka bir temsilciye aktarmamı ister misiniz?",
        "Yöneticiye aktarıyorum.",
        "Herhangi bir sorunuz olursa tekrar yazabilirsiniz.",
        "Görüşmek üzere!",
        "Başka bir konuda yardımcı olabilir miyim?"
    ];
    const managers = ["Ayşe Yılmaz", "Mehmet Demir"];
    // agents yukarıda var
    const [showManagerModal, setShowManagerModal] = useState(false);
    const [showManagerList, setShowManagerList] = useState(false);
    const [selectedManager, setSelectedManager] = useState("");
    const [note, setNote] = useState("");
    const [savedNote, setSavedNote] = useState("");
    const [noteOpen, setNoteOpen] = useState(true);
    const [showReadyMessages1, setShowReadyMessages1] = useState(false);
    const [showReadyMessages2, setShowReadyMessages2] = useState(false);
    const [showMakroMenu, setShowMakroMenu] = useState(false);
    // Info mesajı ve modal fonksiyonları
    function handleManagerTransfer() {
        setShowManagerModal(false);
        setInfo('Mesaj yöneticiye aktarıldı!');
        setTimeout(() => setInfo(''), 2000);
    }
    const handleAgentTransfer = () => {
        setShowAgentModal(false);
        setInfo(`Mesaj ${selectedAgent} adlı temsilciye aktarıldı!`);
        setTimeout(() => setInfo(""), 2000);
    };
    const handleReadyMessage1 = (msg) => {
        setShowReadyMessages1(false);
        setInfo("Hazır mesaj müşteriye iletildi!");
        setTimeout(() => setInfo(""), 1500);
    };

    // Temsilci ve cevap süresi hesaplama
    let agentName = null;
    let avgReplyTime = null;
    if (customer && customer.messages && customer.messages.length > 1) {
        // Temsilci adı: ilk müşteri mesajından sonraki ilk temsilci (Siz veya Süper Admin)
        const agentMsg = customer.messages.find(m => m.sender !== customer.name);
        agentName = agentMsg ? agentMsg.sender : null;
        // Ortalama cevap süresi (müşteri mesajı ile temsilci cevabı arasındaki ortalama süre)
        let totalReplyTime = 0;
        let replyCount = 0;
        for (let i = 1; i < customer.messages.length; i++) {
            const prev = customer.messages[i - 1];
            const curr = customer.messages[i];
            if (prev.sender === customer.name && curr.sender !== customer.name && prev.timestamp && curr.timestamp) {
                const diff = (new Date(curr.timestamp) - new Date(prev.timestamp)) / 1000; // sn
                totalReplyTime += diff;
                replyCount++;
            }
        }
        if (replyCount > 0) {
            avgReplyTime = totalReplyTime / replyCount;
        }
    }

    return (
        <div style={{
            width: '350px',
            height: '100%',
            background: '#23262b',
            borderLeft: '1px solid #333',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                padding: '15px',
                borderBottom: '1px solid #333',
                background: '#1a1d21'
            }}>
                <h2 style={{ margin: 5, color: '#275db5', fontSize: '17px', textAlign: 'center' }}>Panel Detayları</h2>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '15px' }}>
                {/* Sadece müşteri bilgisi kutusu */}
                {customer && (
                    <>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 4, marginLeft: 2 }}>Müşteri Bilgileri</div>
                        <div style={{
                            background: '#2a2d32',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '20px',
                            boxShadow: '0 2px 8px -4px #000',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {customer.avatar ? (
                                    <img src={customer.avatar} alt={customer.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #275db5' }} />
                                ) : (
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#275db5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>
                                        {customer.name?.charAt(0) || '?'}
                                    </div>
                                )}
                                <div>
                                    <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{customer.name}</div>
                                    <div style={{ color: '#888', fontSize: 12 }}>{customer.customerNo}</div>
                                </div>
                            </div>
                            <div style={{ color: '#bbb', fontSize: 13, marginTop: 4 }}>
                                <div><b>Telefon:</b> {customer.phone}</div>
                                <div><b>Adres:</b> {customer.address}</div>
                                <div><b>E-posta:</b> {customer.email}</div>
                                <div><b>Platform:</b> {customer.platform}</div>
                                <div><b>Durum:</b> {customer.status}</div>
                                <div><b>Toplam Mesaj:</b> {customer.messages?.length || 0}</div>
                                <div><b>Son Konu:</b> {customer.summary || '-'}</div>
                            </div>
                        </div>
                    </>
                )}
                {/* Günlük İstatistikler */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#fff', fontSize: '14px', marginBottom: '10px' }}>Günlük İstatistikler</h3>
                    <div style={{ background: '#2a2d32', borderRadius: '8px', padding: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '12px' }}>Temsilci</span>
                            <span style={{ color: '#275db5', fontSize: '12px', fontWeight: '600' }}>{agentName || '-'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '12px' }}>Ortalama Cevap Süresi</span>
                            <span style={{ color: '#ffb300', fontSize: '12px', fontWeight: '600' }}>{avgReplyTime !== null ? (avgReplyTime < 60 ? `${avgReplyTime.toFixed(1)} sn` : `${(avgReplyTime / 60).toFixed(1)} dk`) : '-'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '12px' }}>Toplam Sohbet</span>
                            <span style={{ color: '#275db5', fontSize: '12px', fontWeight: '600' }}>89</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '12px' }}>Yanıtlanan</span>
                            <span style={{ color: '#28a745', fontSize: '12px', fontWeight: '600' }}>67</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '12px' }}>Bekleyen</span>
                            <span style={{ color: '#ffc107', fontSize: '12px', fontWeight: '600' }}>22</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#fff', fontSize: '12px' }}>Ortalama Yanıt</span>
                            <span style={{ color: '#ffb300', fontSize: '12px', fontWeight: '600' }}>2.3 dk</span>
                        </div>
                    </div>
                </div>

                {/* Aksiyonlar */}
                <div className="customer-actions" style={{ marginBottom: 20 }}>
                    <div className="actions-title" style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Aksiyonlar</div>
                    <button
                        className="action-btn superadmin-action-btn"
                        onClick={() => setShowManagerModal(true)}
                    >
                        <span>Mesajları yöneticiye aktar</span>
                        <span style={{ color: '#275db5', fontWeight: 700, fontSize: 18 }}>+</span>
                    </button>
                    <button
                        className="action-btn superadmin-action-btn"
                        onClick={() => setShowAgentModal(true)}
                    >
                        <span>Başka bir temsilciye aktar</span>
                        <span style={{ color: '#275db5', fontWeight: 700, fontSize: 18 }}>+</span>
                    </button>
                    <button
                        className="action-btn superadmin-action-btn"
                        onClick={() => setShowReadyMessages1(v => !v)}
                    >
                        <span>Hazır Mesajlar</span>
                        <span style={{ color: '#275db5', fontWeight: 700, fontSize: 18 }}>+</span>
                    </button>
                    <div style={{ position: 'relative', marginBottom: 10 }}>
                        <button
                            className="action-btn superadmin-action-btn"
                            style={{ width: '100%', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 18, paddingRight: 18, fontSize: 15, fontWeight: 500 }}
                            onClick={() => setShowMakroMenu(v => !v)}
                        >
                            <span style={{ flex: 1, textAlign: 'left', fontSize: 15, fontWeight: 500 }}>Makrolar</span>
                            <span style={{ color: '#275db5', fontWeight: 700, fontSize: 18, marginLeft: 8 }}>+</span>
                        </button>
                        {typeof showMakroMenu === 'undefined' ? null : showMakroMenu && (
                            <div style={{
                                position: 'absolute',
                                top: 38,
                                left: 0,
                                background: '#23262b',
                                border: '1px solid #444',
                                borderRadius: 8,
                                zIndex: 10,
                                minWidth: 160,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                fontSize: 15,
                                padding: 0,
                                width: '100%'
                            }}>
                                <a
                                    href="/kvkk.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'block',
                                        padding: '10px 18px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        borderBottom: '1px solid #444',
                                        borderRadius: '8px 8px 0 0',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setShowMakroMenu(false)}
                                >
                                    KVKK Metni
                                </a>
                            </div>
                        )}
                    </div>
                    {info && <div style={{ marginTop: 10, color: '#275db5', fontWeight: 500, textAlign: 'center' }}>{info}</div>}
                </div>
                {/* Yöneticiye aktar modalı */}
                {showManagerModal && (
                    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 2100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Mesajı yöneticiye aktarmak istediğinize emin misiniz?</div>
                            <button style={{ background: '#275db5', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginRight: 10, cursor: 'pointer' }} onClick={handleManagerTransfer}>Evet, Aktar</button>
                            <button style={{ background: '#d64e4e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowManagerModal(false)}>Vazgeç</button>
                        </div>

                    </div>
                )}
                {/* Temsilciye aktar modalı */}
                {showAgentModal && (
                    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 2100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Aktarılacak temsilciyi seçin:</div>
                            <select value={selectedAgent} onChange={e => setSelectedAgent(e.target.value)} style={{ padding: 8, borderRadius: 6, fontSize: 15, marginBottom: 18 }}>
                                {agents.map(agent => <option key={agent} value={agent}>{agent}</option>)}
                            </select>
                            <br />
                            <button style={{ background: '#275db5', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginRight: 10, cursor: 'pointer' }} onClick={handleAgentTransfer}>Aktar</button>
                            <button style={{ background: '#d64e4e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowAgentModal(false)}>Vazgeç</button>
                        </div>
                    </div>
                )}
                {/* Hazır mesajlar açılır kutusu 1 */}
                {showReadyMessages1 && (
                    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 2100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 24, minWidth: 280, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Hazır Mesajlar</div>
                            {readyMessages1.map(msg => (
                                <div key={msg} style={{ margin: '8px 0', padding: 8, background: '#181818', borderRadius: 6, cursor: 'pointer', color: '#275db5', fontWeight: 500 }} onClick={() => handleReadyMessage1(msg)}>{msg}</div>
                            ))}
                            <button style={{ background: '#d64e4e', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600, marginTop: 10, cursor: 'pointer' }} onClick={() => setShowReadyMessages1(false)}>Kapat</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 