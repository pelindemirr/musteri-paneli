import { useState } from "react";
import { FiTrash2, FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";
import './CustomerPanel.css';

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
// Yöneticiler
const managers = ["Ayşe Yılmaz", "Mehmet Demir"];
// Ekip arkadaşları (yöneticiler hariç)
const agents = ["Ayşe Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Ali Vural"].filter(name => !managers.includes(name));

function CustomerPanel({ customer, handleSendMessage, onEndChat, conversationStatus, conversationId, onShowHistory }) {
    const [note, setNote] = useState("");
    const [savedNote, setSavedNote] = useState("");
    const [noteOpen, setNoteOpen] = useState(true);
    // Modal ve açılır pencere stateleri
    const [showManagerModal, setShowManagerModal] = useState(false);
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(agents[0]);
    const [showReadyMessages1, setShowReadyMessages1] = useState(false);
    const [showReadyMessages2, setShowReadyMessages2] = useState(false);
    const [info, setInfo] = useState("");
    const [showMakroMenu, setShowMakroMenu] = useState(false);

    const handleSaveNote = () => {
        setSavedNote(note);
        setNote("");
    };
    const handleDeleteNote = () => {
        setSavedNote("");
        setNote("");
    };
    // Aksiyonlar
    const handleManagerTransfer = () => {
        setShowManagerModal(false);
        setInfo("Mesaj yöneticiye aktarıldı!");
        setTimeout(() => setInfo(""), 2000);
    };
    const handleAgentTransfer = () => {
        setShowAgentModal(false);
        setInfo(`Mesaj ${selectedAgent} adlı temsilciye aktarıldı!`);
        setTimeout(() => setInfo(""), 2000);
    };
    const handleReadyMessage1 = (msg) => {
        handleSendMessage(msg);
        setShowReadyMessages1(false);
        setInfo("Hazır mesaj müşteriye iletildi!");
        setTimeout(() => setInfo(""), 1500);
    };
    const handleReadyMessage2 = (msg) => {
        handleSendMessage(msg);
        setShowReadyMessages2(false);
        setInfo("Hazır mesaj müşteriye iletildi!");
        setTimeout(() => setInfo(""), 1500);
    };

    return (
        <div className="customer-panel">
            <div>
                <div className="customer-summary">
                    {customer.avatar ? (
                        <img src={customer.avatar} alt={customer.name} className="customer-avatar" />
                    ) : (
                        <div className="customer-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#23262b', color: '#aaa', fontSize: 36 }}>
                            <FiUser />
                        </div>
                    )}
                    <div>
                        <div className="customer-name">{customer.name}</div>
                        <div className="customer-info">{customer.info}</div>
                    </div>
                </div>
                <div style={{ marginTop: 18, marginBottom: 8, fontSize: 13 }}>
                    <div><strong>id:</strong> {customer.id}</div>
                    <div><strong>Müşteri No:</strong> {customer.customerNo}</div>
                    <div><strong>Telefon:</strong> {customer.phone}</div>
                    <div><strong>Adres:</strong> {customer.address}</div>
                    <div><strong>E-posta:</strong> {customer.email}</div>
                    <div><strong>Geçmiş Konuşma Konusu:</strong> {customer.subject ? customer.subject : 'Yok'}</div>
                </div>
            </div>
            {/* Aksiyonlar */}
            <div className="customer-actions">
                <div className="actions-title">Aksiyonlar</div>

                {/* Makrolar butonu ve açılır menü */}
                <div style={{ position: 'relative', marginBottom: 8 }}>
                    <button
                        className="action-btn"
                        style={{ width: '100%', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 16, paddingRight: 16, fontSize: 15, fontWeight: 500 }}
                        onClick={() => setShowMakroMenu(v => !v)}
                    >
                        <span style={{ flex: 1, textAlign: 'left', fontSize: 15, fontWeight: 500 }}>Makrolar</span>
                        <span style={{ fontSize: 15, fontWeight: 500, color: '#275db5', marginLeft: 8 }}>+</span>
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
                            {/*  */}
                        </div>
                    )}
                </div>
                <button className="action-btn" onClick={() => setShowManagerModal(true)}>Mesajları yöneticiye aktar <span style={{ color: '#275db5' }}>+</span></button>
                <button className="action-btn" onClick={() => setShowAgentModal(true)}>Başka bir temsilciye aktar <span style={{ color: '#275db5' }}>+</span></button>
                <button className="action-btn" onClick={() => setShowReadyMessages1(v => !v)}>Hazır Mesajlar <span style={{ color: '#275db5' }}>+</span></button>
                <button className="action-btn" onClick={() => setShowReadyMessages2(v => !v)}>Hazır Mesajlar <span style={{ color: '#275db5' }}>+</span></button>
                {/* Info mesajı */}
                {info && <div style={{ marginTop: 10, color: '#275db5', fontWeight: 500, textAlign: 'center' }}>{info}</div>}
            </div>
            {/* Yöneticiye aktar modalı */}
            {showManagerModal && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Mesajı yöneticiye aktarmak istediğinize emin misiniz?</div>
                        <button style={{ background: '#275db5', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginRight: 10, cursor: 'pointer' }} onClick={handleManagerTransfer}>Evet, Aktar</button>
                        <button style={{ background: '#d64e4e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowManagerModal(false)}>Vazgeç</button>
                    </div>
                </div>
            )}
            {/* Temsilciye aktar modalı */}
            {showAgentModal && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 24, minWidth: 280, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Hazır Mesajlar</div>
                        {readyMessages1.map(msg => (
                            <div key={msg} style={{ margin: '8px 0', padding: 8, background: '#181818', borderRadius: 6, cursor: 'pointer', color: '#275db5', fontWeight: 500 }} onClick={() => handleReadyMessage1(msg)}>{msg}</div>
                        ))}
                        <button style={{ background: '#d64e4e', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600, marginTop: 10, cursor: 'pointer' }} onClick={() => setShowReadyMessages1(false)}>Kapat</button>
                    </div>
                </div>
            )}
            {/* Hazır mesajlar açılır kutusu 2 */}
            {showReadyMessages2 && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 24, minWidth: 280, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Hazır Mesajlar</div>
                        {readyMessages2.map(msg => (
                            <div key={msg} style={{ margin: '8px 0', padding: 8, background: '#181818', borderRadius: 6, cursor: 'pointer', color: '#275db5', fontWeight: 500 }} onClick={() => handleReadyMessage2(msg)}>{msg}</div>
                        ))}
                        <button style={{ background: '#d64e4e', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600, marginTop: 10, cursor: 'pointer' }} onClick={() => setShowReadyMessages2(false)}>Kapat</button>
                    </div>
                </div>
            )}
            {/*  */}
            <div style={{ background: '#23262b', borderRadius: 8, padding: 8, marginBottom: 8, marginTop: 16, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: noteOpen ? 4 : 0 }}>
                    <div style={{ fontWeight: 'bold', color: '#ffb300', fontSize: 14 }}>Genel Not</div>
                    <button onClick={() => setNoteOpen(!noteOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffb300', fontSize: 18, padding: 0 }}>
                        {noteOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                </div>
                <div style={{ color: '#bbb', fontSize: 12, marginBottom: 6 }}></div>
                {noteOpen && (
                    <>
                        <textarea
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder="Bu müşteriyle ilgili genel notunuzu yazın..."
                            style={{ width: '100%', minHeight: 40, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff', padding: '8px 10px', fontSize: 13, resize: 'vertical', marginBottom: 4, boxSizing: 'border-box' }}
                        />
                        <button
                            onClick={handleSaveNote}
                            style={{ background: '#ffb300', color: '#23262b', border: 'none', borderRadius: 6, padding: '4px 14px', fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }}
                        >Kaydet</button>
                        {savedNote && (
                            <div style={{ marginTop: 8, color: '#fff', fontSize: 13, background: '#181818', borderRadius: 6, padding: 6, border: '1px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span><span style={{ color: '#ffb300', fontWeight: 'bold' }}>Notunuz:</span> {savedNote}</span>
                                <button onClick={handleDeleteNote} title="Notu Sil" style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: 16, marginLeft: 8 }}>
                                    <FiTrash2 />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default CustomerPanel;