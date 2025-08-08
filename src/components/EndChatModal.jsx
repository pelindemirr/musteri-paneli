import React, { useState } from 'react';

const EndChatModal = ({
    isOpen,
    onClose,
    onConfirm,
    showEndedModal = false,
    onEndedModalClose,
    zIndex = 2000,
    endReason = '',
    onEndReasonChange
}) => {
    const handleConfirm = () => {
        if (endReason && onConfirm) {
            onConfirm(endReason);
        }
    };

    const handleClose = () => {
        if (onEndReasonChange) {
            onEndReasonChange('');
        }
        if (onClose) {
            onClose();
        }
    };

    const handleEndedModalClose = () => {
        if (onEndedModalClose) {
            onEndedModalClose();
        }
    };

    if (!isOpen && !showEndedModal) return null;

    return (
        <>
            {/* Sohbeti Bitir Modal */}
            {isOpen && (
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
                    zIndex: zIndex
                }}>
                    <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 32, minWidth: 340, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Sohbeti bitirmek istediğinize emin misiniz?</div>
                        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 14, marginTop: 8 }}>Sohbeti neden bitirmek istiyorsunuz?</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                            {[
                                { value: 'Sorun Çözüldü', label: 'Müşterinin sorunu çözüldü' },
                                { value: 'Sohbeti Terk Etti', label: 'Kullanıcı Sohbeti Terk etti' },
                                { value: 'Kapatıldı', label: 'Başka durumlar' }
                            ].map(opt => (
                                <label
                                    key={opt.value}
                                    style={{
                                        display: 'flex', alignItems: 'center',
                                        background: endReason === opt.value ? '#275db5' : '#232b36',
                                        color: endReason === opt.value ? '#fff' : '#b0b0b0',
                                        borderRadius: 6, padding: '8px 12px', cursor: 'pointer',
                                        fontWeight: 600, fontSize: 14,
                                        border: endReason === opt.value ? '1.5px solid #3976e6' : '1px solid #232b36',
                                        transition: 'all 0.15s', minHeight: 38
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
                                        onChange={e => onEndReasonChange && onEndReasonChange(e.target.value)}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{ flex: 1, textAlign: 'left' }}>{opt.label}</span>
                                </label>
                            ))}
                        </div>
                        <button
                            style={{
                                background: endReason ? '#d64e4e' : '#888',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '8px 18px',
                                fontWeight: 600,
                                marginRight: 10,
                                cursor: endReason ? 'pointer' : 'not-allowed',
                                opacity: endReason ? 1 : 0.7,
                                transition: 'background 0.15s'
                            }}
                            onClick={handleConfirm}
                            disabled={!endReason}
                        >
                            Evet, Bitir
                        </button>
                        <button
                            style={{
                                background: '#444',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '8px 18px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                            onClick={handleClose}
                        >
                            Vazgeç
                        </button>
                    </div>
                </div>
            )}

            {/* Bitirme Sonrası Modal */}
            {showEndedModal && (
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
                    zIndex: zIndex + 100
                }}>
                    <div style={{ background: '#23262b', color: '#fff', borderRadius: 10, padding: 32, minWidth: 340, boxShadow: '0 4px 24px -8px #000', textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Sohbet başarıyla sonlandırıldı.</div>
                        <button
                            style={{
                                background: '#275db5',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '8px 18px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                marginTop: 10
                            }}
                            onClick={handleEndedModalClose}
                        >
                            Kapat
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EndChatModal; 