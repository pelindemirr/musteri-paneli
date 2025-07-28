import React, { useState, useMemo } from "react";
import { FiUser, FiSearch, FiClock, FiLayers, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function SuperAdminChatList({ conversations, selectedId, onSelectConversation, conversationFilter, macroModalOpen }) {
    // Filtre state'leri
    const [sortOrder, setSortOrder] = useState('desc');
    const [agentFilter, setAgentFilter] = useState('');
    const [customerFilter, setCustomerFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Hover/focus state'leri
    const [activeField, setActiveField] = useState('');
    const [showFilters, setShowFilters] = useState(true); // Varsayılan açık

    // Temsilci ve müşteri listesi çıkar
    const allAgents = useMemo(() => Array.from(new Set(conversations.map(c => c.agent).filter(Boolean))), [conversations]);
    const allCustomers = useMemo(() => Array.from(new Set(conversations.map(c => c.name))), [conversations]);
    const allStatuses = useMemo(() => Array.from(new Set(conversations.map(c => c.status))), [conversations]);

    // Filtrelenmiş ve sıralanmış sohbetler
    let filteredConvs = conversations.filter(c => {
        if (agentFilter && c.agent !== agentFilter) return false;
        if (customerFilter && !c.name.toLowerCase().includes(customerFilter.toLowerCase())) return false;
        if (statusFilter && c.status !== statusFilter) return false;
        if (conversationFilter === 'waiting' && c.status !== 'Bekliyor') return false;
        if (conversationFilter === 'answered' && c.status !== 'Yanıtlandı') return false;
        return true;
    });
    filteredConvs = filteredConvs.sort((a, b) => {
        const tA = a.messages[a.messages.length - 1]?.timestamp || 0;
        const tB = b.messages[b.messages.length - 1]?.timestamp || 0;
        return sortOrder === 'desc' ? tB - tA : tA - tB;
    });

    return (
        <div
            style={{
                width: '320px',
                height: '100%',
                background: '#23262b',
                borderRight: '1px solid #333',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{
                padding: '15px',
                borderBottom: '1px solid #333',
                background: '#1a1d21'
            }}>
                <div
                    style={{ fontSize: 16, color: '#275db5', fontWeight: 700, marginBottom: 8, letterSpacing: 0.2, textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none' }}
                    onClick={() => setShowFilters(v => !v)}
                >
                    <span>Sohbetleri Filtrele</span>
                    <span style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>
                        {showFilters ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                </div>
                {showFilters && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 0, marginBottom: 8 }}>
                        <label style={{ color: '#bbb', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FiLayers />
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                onFocus={() => setActiveField('status')}
                                onBlur={() => setActiveField('')}
                                onMouseEnter={() => setActiveField('status')}
                                onMouseLeave={() => setActiveField('')}
                                style={{
                                    border: activeField === 'status' ? '1.5px solid #275db5' : '1px solid #444',
                                    borderRadius: 5,
                                    background: '#23262b',
                                    color: '#fff',
                                    padding: '8px 10px',
                                    fontSize: 13,
                                    width: '100%',
                                    transition: 'border 0.18s'
                                }}
                            >
                                <option value="">Tüm Durumlar</option>
                                {allStatuses.map(status => (
                                    <option key={status} value={status} style={{ background: '#23262b', color: '#fff' }}>{status}</option>
                                ))}
                            </select>
                        </label>
                        <label style={{ color: '#bbb', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FiUser />
                            <select
                                value={agentFilter}
                                onChange={e => setAgentFilter(e.target.value)}
                                onFocus={() => setActiveField('agent')}
                                onBlur={() => setActiveField('')}
                                onMouseEnter={() => setActiveField('agent')}
                                onMouseLeave={() => setActiveField('')}
                                style={{
                                    border: activeField === 'agent' ? '1.5px solid #275db5' : '1px solid #444',
                                    borderRadius: 5,
                                    background: '#23262b',
                                    color: '#fff',
                                    padding: '8px 10px',
                                    fontSize: 13,
                                    width: '100%',
                                    transition: 'border 0.18s',
                                    marginBottom: 0
                                }}
                            >
                                <option value="">Tüm Temsilciler</option>
                                {allAgents.map(agent => <option key={agent} value={agent}>{agent}</option>)}
                            </select>
                        </label>
                        {/* Temsilci isimleri liste olarak, margin/padding sıfır, select ile senkronize */}
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#bbb', fontSize: 13 }}>
                            {allAgents.map(agent => (
                                <li
                                    key={agent}
                                    style={{
                                        padding: '2px 0 2px 10px',
                                        cursor: 'pointer',
                                        color: agentFilter === agent ? '#275db5' : '#bbb',
                                        fontWeight: agentFilter === agent ? 700 : 400,
                                        background: agentFilter === agent ? '#232b36' : 'transparent',
                                        borderRadius: 4
                                    }}
                                    onClick={() => setAgentFilter(agent)}
                                >
                                    • {agent}
                                </li>
                            ))}
                        </ul>
                        <label style={{ color: '#bbb', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FiSearch />
                            <input
                                type="text"
                                placeholder="Müşteri ara..."
                                value={customerFilter}
                                onChange={e => setCustomerFilter(e.target.value)}
                                onFocus={() => setActiveField('customer')}
                                onBlur={() => setActiveField('')}
                                onMouseEnter={() => setActiveField('customer')}
                                onMouseLeave={() => setActiveField('')}
                                style={{
                                    padding: '8px 10px',
                                    border: activeField === 'customer' ? '1.5px solid #275db5' : '1px solid #444',
                                    borderRadius: 5,
                                    background: '#23262b',
                                    color: '#fff',
                                    fontSize: 13,
                                    width: '100%',
                                    transition: 'border 0.18s'
                                }}
                            />
                        </label>
                        <label style={{ color: '#bbb', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FiClock />
                            <button
                                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                                onFocus={() => setActiveField('sort')}
                                onBlur={() => setActiveField('')}
                                onMouseEnter={() => setActiveField('sort')}
                                onMouseLeave={() => setActiveField('')}
                                style={{
                                    background: activeField === 'sort' ? '#223a5e' : 'none',
                                    border: activeField === 'sort' ? '1.5px solid #275db5' : '1px solid #444',
                                    color: '#fff',
                                    fontSize: 13,
                                    cursor: 'pointer',
                                    borderRadius: 5,
                                    padding: '8px 10px',
                                    width: '100%',
                                    transition: 'border 0.18s, background 0.18s'
                                }}
                            >
                                {sortOrder === 'desc' ? 'Yeniden eskiye' : 'Eskiden yeniye'}
                            </button>
                        </label>
                    </div>
                )}
                <p style={{ margin: '3px 0 0 0', color: '#888', fontSize: '12px' }}>
                    {filteredConvs.length} konuşma
                </p>
            </div>
            <div style={{ padding: '10px 15px 0 15px' }}>
                <h2 style={{ margin: 0, color: '#275db5', fontSize: '16px', fontWeight: 700, textAlign: 'center' }}>Aktif Konuşmalar</h2>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
                {filteredConvs.map((conversation) => (
                    <div
                        key={conversation.id}
                        onClick={() => onSelectConversation(conversation.id)}
                        style={{
                            padding: '12px 15px',
                            borderBottom: '1px solid #333',
                            cursor: 'pointer',
                            background: selectedId === conversation.id ? '#2a2d32' : 'transparent',
                            transition: 'background 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: conversation.avatar ? 'transparent' : '#275db5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            flexShrink: 0
                        }}>
                            {conversation.avatar ? (
                                <img src={conversation.avatar} alt={conversation.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            ) : (
                                conversation.name.charAt(0)
                            )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                                <h3 style={{ margin: 0, color: '#fff', fontSize: '13px', fontWeight: '600' }}>
                                    {conversation.name}
                                </h3>
                                <span style={{
                                    fontSize: '10px',
                                    color: conversation.status === 'Bekliyor' ? '#ffc107' : '#28a745',
                                    fontWeight: '500'
                                }}>
                                    {conversation.status}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{
                                    margin: 0,
                                    color: '#888',
                                    fontSize: '11px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '150px'
                                }}>
                                    {conversation.messages[conversation.messages.length - 1]?.text || 'Mesaj yok'}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ fontSize: '9px', color: '#666' }}>
                                        {conversation.platform}
                                    </span>
                                </div>
                            </div>
                            <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                                {conversation.agent}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 