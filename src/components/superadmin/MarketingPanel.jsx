import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Marketing = ({ onClose }) => {
    const [campaignName, setCampaignName] = useState('');
    const [language, setLanguage] = useState('tr');
    const [channel, setChannel] = useState('email');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedSegments, setSelectedSegments] = useState(['all']);
    const [timing, setTiming] = useState('now');
    const [scheduledDate, setScheduledDate] = useState('');

    // Accordion states
    const [variableTypeOpen, setVariableTypeOpen] = useState(false);
    const [mediaSampleOpen, setMediaSampleOpen] = useState(false);
    const [selectedVariableType, setSelectedVariableType] = useState('numara');
    const [selectedMediaType, setSelectedMediaType] = useState('resim');

    const handleSegmentToggle = (segment) => {
        setSelectedSegments(prev =>
            prev.includes(segment)
                ? prev.filter(s => s !== segment)
                : [...prev, segment]
        );
    };

    const getPreviewContent = () => {
        let previewBody = body || 'Mesaj içeriği burada görünecek';
        previewBody = previewBody.replace(/\{\{username\}\}/g, 'Ahmet');
        previewBody = previewBody.replace(/\{\{discount_code\}\}/g, 'SAVE20');
        previewBody = previewBody.replace(/\{\{company_name\}\}/g, 'CallPilot');
        previewBody = previewBody.replace(/\{\{expiry_date\}\}/g, '31.12.2024');
        return previewBody;
    };

    const handleSave = () => {
        console.log('Kampanya kaydediliyor...', {
            campaignName,
            language,
            channel,
            title,
            body,
            selectedSegments,
            timing,
            scheduledDate
        });
        alert('Kampanya başarıyla kaydedildi!');
    };

    const handleTestSend = () => {
        console.log('Test gönderimi yapılıyor...');
        alert('Test mesajı gönderildi!');
    };

    const handleStartCampaign = () => {
        console.log('Kampanya başlatılıyor...');
        alert('Kampanya başlatıldı!');
    };
    const [footerText, setFooterText] = useState('');

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                display: 'flex',
                height: '100vh',
                backgroundColor: '#1a1919ff',
                overflow: 'hidden'
            }}
        >
            {/* Kapatma Butonu */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 35,
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#d64e4e'
                }}
                title="Kapat"
            >
                ✕
            </button>

            {/* Sol Form Alanı */}
            <div style={{
                flex: 1,
                backgroundColor: '#2c2f36',
                margin: '20px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #3a3d44'

            }}>

                {/* Header */}
                <div style={{
                    padding: '15px 25px',
                    borderBottom: '1px solid #3a3d44',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#275db5',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px'
                        }}>📧</div>
                        <div>

                            <h1 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', margin: 0 }}>
                                Kampanya Oluştur
                            </h1>
                            <p style={{ color: '#8b8e95', fontSize: '14px', margin: '4px 0 0 0' }}>
                                Pazarlama • Varsayılan
                            </p>
                        </div>
                    </div>

                    {/* Dil Seçimi - Header'da */}
                    <div style={{ minWidth: '120px' }}>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #3a3d44',
                                borderRadius: '6px',
                                fontSize: '13px',
                                backgroundColor: '#1e2025',
                                color: '#ffffff'
                            }}
                        >
                            <option value="tr">Türkçe</option>
                            <option value="en">İngilizce</option>
                            <option value="de">Almanca</option>
                            <option value="fr">Fransızca</option>
                        </select>
                    </div>
                </div>

                {/* Form Content */}
                <div style={{ padding: '18px', flex: 1, overflowY: 'auto' }}>
                    {/* Kampanya Adı */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ffffff',
                            fontWeight: '500',
                            marginBottom: '8px',
                            fontSize: '14px'
                        }}>
                            Kampanya adı *
                        </label>
                        <input
                            type="text"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            placeholder="Kampanya adını girin"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #3a3d44',
                                borderRadius: '6px',
                                fontSize: '14px',
                                backgroundColor: '#1e2025',
                                color: '#ffffff'
                            }}
                        />
                        <div style={{ fontSize: '12px', color: '#8b8e95', textAlign: 'right', marginTop: '4px' }}>
                            {campaignName.length}/60
                        </div>
                    </div>



                    {/* Değişken Türü Dropdown */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: 320,
                            marginBottom: '20px'
                        }}
                    >
                        {/* Başlık */}
                        <div
                            onClick={() => setVariableTypeOpen(!variableTypeOpen)}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 14px',
                                backgroundColor: '#1e2025',
                                border: '1px solid #3a3d44',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                color: '#ffffff',
                                fontSize: '14px',
                                width: '100%'
                            }}
                        >
                            <span>Değişken Türü</span>
                            {variableTypeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>

                        {/* Açılan Menü */}
                        {variableTypeOpen && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    zIndex: 999,
                                    width: '100%',
                                    backgroundColor: '#1e2025',
                                    border: '1px solid #3a3d44',
                                    borderTop: 'none',
                                    borderRadius: '0 0 6px 6px',
                                    padding: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    marginTop: '2px'
                                }}
                            >
                                {[
                                    { id: 'numara', label: 'Numara' },
                                    { id: 'ad', label: 'Ad' }
                                ].map(type => (
                                    <label
                                        key={type.id}
                                        style={{
                                            backgroundColor:
                                                selectedVariableType === type.id ? '#2d3036' : '#25272c',
                                            border:
                                                selectedVariableType === type.id
                                                    ? '1px solid #4b9fff'
                                                    : '1px solid #3a3d44',
                                            padding: '10px 12px',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            cursor: 'pointer',
                                            color: '#ffffff',
                                            fontSize: '13px',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={e =>
                                            (e.currentTarget.style.backgroundColor = '#2d3036')
                                        }
                                        onMouseLeave={e => {
                                            if (selectedVariableType !== type.id) {
                                                e.currentTarget.style.backgroundColor = '#25272c';
                                            }
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="variableType"
                                            value={type.id}
                                            checked={selectedVariableType === type.id}
                                            onChange={e => setSelectedVariableType(e.target.value)}
                                            style={{
                                                accentColor: '#275db5',
                                                width: '10px',
                                                height: '10px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        {type.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>


                    {/*Medya Örneği*/}
                    <div style={{ position: 'relative', maxWidth: 320, width: '100%', marginBottom: '20px' }}>
                        <div
                            onClick={() => setMediaSampleOpen(!mediaSampleOpen)}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 14px',
                                backgroundColor: '#1e2025',
                                border: '1px solid #3a3d44',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                color: '#ffffff',
                                fontSize: '14px',
                                width: '100%',
                            }}
                        >
                            <span>Medya Örneği</span>
                            {mediaSampleOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>

                        {mediaSampleOpen && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    zIndex: 999,
                                    border: '1px solid #3a3d44',
                                    borderTop: 'none',
                                    borderRadius: '0 0 6px 6px',
                                    backgroundColor: '#1e2025',
                                    padding: '12px',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    marginTop: '2px'
                                }}
                            >
                                {[
                                    { id: 'resim', label: ' Resim' },
                                    { id: 'video', label: ' Video' },
                                    { id: 'dokuman', label: ' Doküman' },
                                    { id: 'konum', label: ' Konum' }
                                ].map(media => (
                                    <label
                                        key={media.id}
                                        style={{
                                            backgroundColor: selectedMediaType === media.id ? '#2d3036' : '#25272c',
                                            border: selectedMediaType === media.id ? '1px solid #4b9fff' : '1px solid #3a3d44',
                                            padding: '10px 12px',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            cursor: 'pointer',
                                            color: '#ffffff',
                                            fontSize: '13px',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#2d3036';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedMediaType !== media.id) {
                                                e.currentTarget.style.backgroundColor = '#25272c';
                                            }
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="mediaType"
                                            value={media.id}
                                            checked={selectedMediaType === media.id}
                                            onChange={(e) => setSelectedMediaType(e.target.value)}
                                            style={{
                                                accentColor: '#275db5',
                                                width: '10px',
                                                height: '10px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        {media.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>




                    {/* Başlık */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ffffff',
                            fontWeight: '500',
                            marginBottom: '8px',
                            fontSize: '14px'
                        }}>
                            Başlık (Opsiyonel)
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Başlık metnini girin"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #3a3d44',
                                borderRadius: '6px',
                                fontSize: '14px',
                                backgroundColor: '#1e2025',
                                color: '#ffffff'
                            }}
                        />
                        <div style={{ fontSize: '12px', color: '#8b8e95', textAlign: 'right', marginTop: '4px' }}>
                            {campaignName.length}/60
                        </div>
                    </div>

                    {/* Mesaj İçeriği */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ffffff',
                            fontWeight: '500',
                            marginBottom: '8px',
                            fontSize: '14px'
                        }}>
                            İçerik
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #3a3d44',
                                borderRadius: '6px',
                                fontSize: '14px',
                                minHeight: '100px',
                                maxHeight: '200px',
                                resize: 'vertical',
                                backgroundColor: '#1e2025',
                                color: '#ffffff',
                                overflowY: 'auto'
                            }}
                        />

                    </div>

                    {/* Hedef Kitle 
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ffffff',
                            fontWeight: '500',
                            marginBottom: '8px',
                            fontSize: '14px'
                        }}>
                            Kitle segmenti seçimi *
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                            {[
                                { id: 'all', label: 'Tüm kullanıcılar' },
                                { id: 'premium', label: 'Premium üyeler' },
                                { id: 'new', label: 'Yeni kayıtlar' },
                                { id: 'active', label: 'Aktif kullanıcılar' },
                                { id: 'inactive', label: 'İnaktif kullanıcılar' },
                                { id: 'vip', label: 'VIP müşteriler' }
                            ].map(segment => (
                                <div
                                    key={segment.id}
                                    onClick={() => handleSegmentToggle(segment.id)}
                                    style={{
                                        backgroundColor: selectedSegments.includes(segment.id) ? '#275db5' : '#1e2025',
                                        color: selectedSegments.includes(segment.id) ? 'white' : '#ffffff',
                                        border: selectedSegments.includes(segment.id) ? '1px solid #275db5' : '1px solid #3a3d44',
                                        borderRadius: '16px',
                                        padding: '5px 10px',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {segment.label}
                                </div>
                            ))}
                        </div>
                    </div>*/}



                    {/* Zamanlama */}
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ffffff',
                            fontWeight: '500',
                            marginBottom: '8px',
                            fontSize: '14px'
                        }}>
                            Zamanlama
                        </label>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                                <input
                                    type="radio"
                                    name="timing"
                                    value="now"
                                    checked={timing === 'now'}
                                    onChange={(e) => setTiming(e.target.value)}
                                    style={{ accentColor: '#275db5' }}
                                />
                                Şimdi
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                                <input
                                    type="radio"
                                    name="timing"
                                    value="scheduled"
                                    checked={timing === 'scheduled'}
                                    onChange={(e) => setTiming(e.target.value)}
                                    style={{ accentColor: '#275db5' }}
                                />
                                Belirli tarih ve saat
                            </label>
                        </div>
                        <input
                            type="datetime-local"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            disabled={timing === 'now'}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #3a3d44',
                                borderRadius: '6px',
                                fontSize: '14px',
                                opacity: timing === 'now' ? 0.5 : 1,
                                backgroundColor: '#1e2025',
                                color: '#ffffff'
                            }}
                        />

                        {/* Footer */}
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                color: '#ffffff',
                                fontWeight: '500',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>
                                Footer (Opsiyonel)
                            </label>
                            <input
                                type="text"
                                value={footerText}
                                onChange={(e) => setFooterText(e.target.value)}
                                placeholder="Alt bilgi metnini girin"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',

                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    backgroundColor: '#1e2025',
                                    color: '#ffffff'
                                }}
                            />
                            <div style={{ fontSize: '12px', color: '#8b8e95', textAlign: 'right', marginTop: '4px' }}>
                                {footerText.length}/60
                            </div>
                        </div>


                    </div>
                </div>


                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'flex-end',
                    padding: '15px 25px',
                    borderTop: '1px solid #3a3d44',
                    backgroundColor: '#1a1d22'
                }}>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#2c2f36',
                            color: '#ffffff',
                            border: '1px solid #3a3d44',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }}
                    >
                        Kaydet
                    </button>
                    <button
                        onClick={handleTestSend}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#2c2f36',
                            color: '#ffffff',
                            border: '1px solid #3a3d44',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }}
                    >
                        Test Gönder
                    </button>
                    <button
                        onClick={handleStartCampaign}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#275db5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }}
                    >
                        Kampanyayı Başlat
                    </button>
                </div>
            </div>

            {/* Sağ Önizleme Alanı */}
            <div style={{
                width: 'clamp(300px, 25vw, 400px)',
                flexShrink: 0,
                overflow: 'hidden',
                backgroundColor: '#2c2f36',
                margin: '20px 20px 20px 0',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                border: '1px solid #3a3d44'
            }}>
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #3a3d44'
                }}>
                    <h2 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                        Kampanya Önizlemesi
                    </h2>
                </div>
                <div style={{ padding: '20px' }}>
                    {/* WhatsApp Tarzı Mesaj Balonu */}
                    <div style={{
                        backgroundColor: '#1a1d22',
                        border: '1px solid #3a3d44',
                        borderRadius: '8px',
                        padding: '20px',
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }}>
                        {/* Gönderilen Mesaj Balonu */}
                        <div style={{
                            alignSelf: 'flex-end',
                            maxWidth: '80%',
                            backgroundColor: '#128c7e',
                            borderRadius: '18px 18px 4px 18px',
                            padding: '12px 16px',
                            marginBottom: '8px',
                            wordBreak: 'break-word',      // ❗️ Uzun kelimeler taşmasın
                            whiteSpace: 'pre-wrap'
                        }}>
                            {title && (
                                <div style={{
                                    color: '#ffffff',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    marginBottom: '6px'
                                }}>
                                    {title}
                                </div>
                            )}
                            <div style={{
                                color: '#ffffff',
                                fontSize: '13px',
                                lineHeight: '1.4'
                            }}>
                                {getPreviewContent()}
                            </div>
                            {/* ✅ Footer Metni Buraya Ekleniyor */}
                            {footerText && (
                                <div style={{
                                    marginTop: '8px',
                                    color: '#d3e4e3',
                                    fontSize: '11px',
                                    fontStyle: 'italic',
                                    paddingTop: '3px'
                                }}>
                                    {footerText}
                                </div>
                            )}

                            <div style={{
                                textAlign: 'right',
                                marginTop: '4px',
                                fontSize: '11px',
                                color: '#b8d3d1'
                            }}>
                                10:30 ✓✓
                            </div>
                        </div>

                        {/* Karşı Taraftan Gelen Cevap Simülasyonu */}
                        <div style={{
                            alignSelf: 'flex-start',
                            maxWidth: '70%',
                            backgroundColor: '#2a2a2a',
                            borderRadius: '18px 18px 18px 4px',
                            padding: '10px 14px',
                            marginTop: '4px'
                        }}>
                            <div style={{
                                color: '#ffffff',
                                fontSize: '13px',
                                lineHeight: '1.4'
                            }}>
                                Teşekkürler! 👍
                            </div>
                            <div style={{
                                textAlign: 'left',
                                marginTop: '4px',
                                fontSize: '11px',
                                color: '#8b8e95'
                            }}>
                                10:31
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketing;