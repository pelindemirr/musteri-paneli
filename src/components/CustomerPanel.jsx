import React, { useState } from "react";
import { FiTrash2, FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";
import ActionButtons from './ActionButtons';
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
const managers = ["Ayşe Yılmaz", "Mehmet Demir", "Enes Deniz"];
// Ekip arkadaşları 
const agents = ["Ayşe Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Ali Vural", "Ali Kadem", "Elif Gün", "Berat Şaş "].filter(name => !managers.includes(name));

function CustomerPanel({ customer, handleSendMessage, onEndChat, conversationStatus, conversationId, onShowHistory }) {
    const [showReadyMessages1, setShowReadyMessages1] = useState(false);
    const managers = ["Ayşe Yılmaz", "Mehmet Demir"];
    const agents = ["Ayşe Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Ali Vural", "Ali Kadem", "Elif Gün", "Berat Şaş "].filter(name => !managers.includes(name));
    const [showManagerList, setShowManagerList] = useState(false);
    const [selectedManager, setSelectedManager] = useState("");
    const [note, setNote] = useState("");
    const [savedNote, setSavedNote] = useState("");
    const [noteOpen, setNoteOpen] = useState(true);
    const [info, setInfo] = useState("");

    function handleManagerTransfer() {
        setShowManagerModal(false);
        setInfo('Mesaj yöneticiye aktarıldı!');
        setTimeout(() => setInfo(''), 2000);
    }

    const handleSaveNote = () => {
        setSavedNote(note);
        setNote("");
    };
    const handleDeleteNote = () => {
        setSavedNote("");
        setNote("");
    };
    // Aksiyonlar
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
                <div style={{ marginTop: 18, marginBottom: 8, fontSize: 15 }}>
                    <div><strong>id:</strong> {customer.id}</div>
                    <div><strong>Müşteri No:</strong> {customer.customerNo}</div>
                    <div><strong>Telefon:</strong> {customer.phone}</div>
                    <div><strong>Adres:</strong> {customer.address}</div>
                    <div><strong>E-posta:</strong> {customer.email}</div>
                    <div><strong>Geçmiş Konuşma Konusu:</strong> {customer.subject ? customer.subject : 'Henüz bir konu belirtilmemiş.'}</div>
                </div>
            </div>
            {/* Aksiyonlar */}
            <ActionButtons
                onManagerTransfer={handleManagerTransfer}
                onAgentTransfer={handleAgentTransfer}
                onReadyMessage={handleReadyMessage1}
                agents={agents}
                managers={managers}
                readyMessages={readyMessages1}
                info={info}
                zIndex={1000}
                showManagerList={showManagerList}
                selectedManager={selectedManager}
                onManagerSelect={setSelectedManager}
                onManagerListToggle={setShowManagerList}
            />
            {/* Hazır mesajlar açılır kutusu 2 
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
            )}*/}
            {/*  */}
            <div style={{ background: '#23262b', borderRadius: 8, padding: 8, marginBottom: 8, marginTop: 16, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: noteOpen ? 4 : 0 }}>
                    <div style={{ fontWeight: 'bold', color: '#ffb300', fontSize: 14 }}>Özel Not</div>
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
            {/* Hızlı Yardım Merkezi linki 
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                <a href="https://yardim.orneksirket.com" target="_blank" rel="noopener noreferrer" style={{ color: '#b0c7f7', fontSize: 15, textDecoration: 'underline' }}>
                    Hızlı Yardım Merkezi
                </a>
            </div> */}
        </div>

    );

}
export default CustomerPanel;