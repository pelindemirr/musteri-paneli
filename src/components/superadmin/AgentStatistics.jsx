import React, { useState } from "react";
import ActionButtons from '../ActionButtons';
import '../CustomerPanel.css';

export default function AgentStatistics({ customer, macroModalOpen }) {
    // Temsilciye aktarma için state'ler
    const agents = ["Ali Vural", "Zeynep Kaya", "Ali Kadem", "Elif Gün", "Berat Şaş"];
    const [info, setInfo] = useState("");
    // Hazır mesajlar ve makrolar için örnekler
    const readyMessages1 = [
        "Yardımcı olabildiysem ne mutlu!",
        "İyi günler dilerim!",
        "Teşekkürler, tekrar görüşmek üzere.",
        "Sorununuz çözüldü mü?",
        "Sohbeti sonlandırmak ister misiniz?"
    ];
    const managers = ["Ayşe Yılmaz", "Mehmet Demir"];
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

    if (!customer) {
        return (
            <div
                style={{
                    width: '350px',
                    height: '100%',
                    background: '#23262b',
                    borderLeft: '1px solid #333',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >

            </div>
        );
    }

    return (
        <div
            style={{
                width: '350px',
                height: '100%',
                background: '#23262b',
                borderLeft: '1px solid #333',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{
                padding: '15px',
                borderBottom: '1px solid #333',
                background: '#181818',
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
                    <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>Günlük İstatistikler</h3>
                    <div style={{ background: '#2a2d32', borderRadius: '8px', padding: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '13px' }}>Temsilci</span>
                            <span style={{ color: '#275db5', fontSize: '13px', fontWeight: '600' }}>{agentName || '-'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '13px' }}>Ortalama Cevap Süresi</span>
                            <span style={{ color: '#ffb300', fontSize: '13px', fontWeight: '600' }}>{avgReplyTime !== null ? (avgReplyTime < 60 ? `${avgReplyTime.toFixed(1)} sn` : `${(avgReplyTime / 60).toFixed(1)} dk`) : '-'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '13px' }}>Toplam Sohbet</span>
                            <span style={{ color: '#275db5', fontSize: '13px', fontWeight: '600' }}>89</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '13px' }}>Yanıtlanan</span>
                            <span style={{ color: '#28a745', fontSize: '13px', fontWeight: '600' }}>67</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontSize: '13px' }}>Bekleyen</span>
                            <span style={{ color: '#ffc107', fontSize: '13px', fontWeight: '600' }}>22</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#fff', fontSize: '13px' }}>Ortalama Yanıt</span>
                            <span style={{ color: '#ffb300', fontSize: '13px', fontWeight: '600' }}>2.3 dk</span>
                        </div>
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
                    zIndex={2100}
                />
            </div>
        </div>
    );
} 