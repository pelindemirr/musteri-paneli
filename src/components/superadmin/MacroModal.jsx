import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import CloseIcon from "../CloseIcon";

export default function MacroModal({ open, onClose, messages, onAdd, onEdit, onDelete }) {
    const [isAdding, setIsAdding] = useState(false);
    const [newMsg, setNewMsg] = useState("");
    const [editIdx, setEditIdx] = useState(null);
    const [editMsg, setEditMsg] = useState("");

    if (!open) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.45)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                width: 400,
                background: '#23262b',
                color: '#fff',
                borderRadius: 14,
                boxShadow: '0 8px 32px -8px #000',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh',
                minHeight: 320,
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px 12px 24px',
                    borderBottom: '1px solid #333',
                    background: '#1a1d21',
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                }}>
                    <h2 style={{ margin: 0, fontSize: 20, color: '#ffb300', fontWeight: 700 }}>Hazır Mesajlar</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', fontWeight: 700 }}>×</button>
                </div>
                <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                        <span style={{ fontWeight: 600, fontSize: 16 }}>Makro Listesi</span>
                        <button
                            onClick={() => { setIsAdding(true); setNewMsg(""); }}
                            style={{ background: '#ffb300', color: '#23262b', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
                        >+ Yeni Ekle</button>
                    </div>
                    {/* Ekleme alanı */}
                    {isAdding && (
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                            <input
                                value={newMsg}
                                onChange={e => setNewMsg(e.target.value)}
                                placeholder="Yeni hazır mesaj..."
                                style={{ flex: 1, padding: 8, borderRadius: 5, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: 15 }}
                            />
                            <button
                                onClick={() => { if (newMsg.trim()) { onAdd(newMsg.trim()); setIsAdding(false); setNewMsg(""); } }}
                                style={{ background: '#275db5', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 14px', fontWeight: 600, cursor: 'pointer' }}
                            >Kaydet</button>
                            <button
                                onClick={() => { setIsAdding(false); setNewMsg(""); }}
                                style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 14px', fontWeight: 600, cursor: 'pointer' }}
                            >İptal</button>
                        </div>
                    )}
                    {/* Liste */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {messages.length === 0 && <div style={{ color: '#888', fontSize: 15 }}>Henüz makro yok.</div>}
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ background: '#232b36', borderRadius: 6, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #333' }}>
                                {editIdx === idx ? (
                                    <>
                                        <input
                                            value={editMsg}
                                            onChange={e => setEditMsg(e.target.value)}
                                            style={{ flex: 1, minWidth: 0, padding: 8, borderRadius: 5, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: 15 }}
                                        />
                                        <button
                                            onClick={() => { if (editMsg.trim()) { onEdit(idx, editMsg.trim()); setEditIdx(null); setEditMsg(""); } }}
                                            style={{ background: '#275db5', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 8px', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}
                                        >Kaydet</button>
                                        <button
                                            onClick={() => { setEditIdx(null); setEditMsg(""); }}
                                            style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 8px', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}
                                        >İptal</button>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ flex: 1, fontSize: 15, color: '#fff' }}>{msg}</span>
                                        <button
                                            onClick={() => { setEditIdx(idx); setEditMsg(msg); }}
                                            style={{ background: 'none', border: 'none', color: '#ffb300', fontSize: 18, cursor: 'pointer', marginRight: 2 }}
                                            title="Düzenle"
                                        >
                                            <FaRegEdit />
                                        </button>
                                        <button
                                            onClick={() => onDelete(idx)}
                                            style={{ background: 'none', border: 'none', color: '#d64e4e', fontSize: 18, cursor: 'pointer' }}
                                            title="Sil"
                                        >
                                            <CloseIcon color="#ff0000" size={18} />
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 