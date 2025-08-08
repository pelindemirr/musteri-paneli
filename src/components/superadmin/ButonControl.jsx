import React, { useState } from "react";
import "./WhatsAppButtonForm.css"; // CSS burada olacak

const BUTTON_TYPES = [
    { value: "quick_reply", label: "Quick Reply (Hızlı Yanıt)" },
    { value: "visit_website", label: "Visit website (Site Ziyareti)" },
    { value: "call_whatsapp", label: "Call on WhatsApp (WhatsApp'tan Ara)" },
    { value: "call_phone", label: "Call phone number (Telefon Numarasını Ara)" },
    { value: "copy_offer", label: "Copy offer code (Kampanya Kodunu Kopyala)" },
];

export default function WhatsAppButtonForm() {
    const [buttons, setButtons] = useState([]);
    const [newButtonType, setNewButtonType] = useState("quick_reply");
    const [newButtonText, setNewButtonText] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newPhoneCountry, setNewPhoneCountry] = useState("US +1");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newValidityDays, setNewValidityDays] = useState(7);
    const [newOfferCode, setNewOfferCode] = useState("");
    const [timing, setTiming] = useState("now");
    const [scheduledDate, setScheduledDate] = useState("");
    const [footerText, setFooterText] = useState("");

    const maxButtons = 10;

    function validateButton() {
        if (!newButtonText.trim()) {
            alert("Buton metni boş olamaz.");
            return false;
        }
        if (newButtonText.length > 25) {
            alert("Buton metni 25 karakteri geçemez.");
            return false;
        }

        switch (newButtonType) {
            case "visit_website":
                if (!newUrl.trim() || !newUrl.startsWith("http")) {
                    alert("Geçerli bir URL girin.");
                    return false;
                }
                break;
            case "call_phone":
                if (!newPhoneNumber.match(/^\d+$/)) {
                    alert("Geçerli bir telefon numarası girin.");
                    return false;
                }
                break;
            case "copy_offer":
                if (!newOfferCode.trim()) {
                    alert("Kampanya kodunu girin.");
                    return false;
                }
                break;
            default:
                break;
        }
        return true;
    }

    function addButton() {
        if (buttons.length >= maxButtons) {
            alert("En fazla 10 buton eklenebilir.");
            return;
        }
        if (!validateButton()) return;

        const newBtn = {
            id: Date.now(),
            type: newButtonType,
            text: newButtonText,
            url: newButtonType === "visit_website" ? newUrl : undefined,
            phoneCountry: newButtonType === "call_phone" ? newPhoneCountry : undefined,
            phoneNumber: newButtonType === "call_phone" ? newPhoneNumber : undefined,
            validityDays: newButtonType === "call_whatsapp" ? newValidityDays : undefined,
            offerCode: newButtonType === "copy_offer" ? newOfferCode : undefined,
        };
        setButtons([...buttons, newBtn]);
        // Temizle
        setNewButtonText("");
        setNewUrl("");
        setNewPhoneNumber("");
        setNewOfferCode("");
    }

    function removeButton(id) {
        setButtons(buttons.filter((b) => b.id !== id));
    }

    return (
        <div className="container">
            <h2>Butonlar Alanı (Opsiyonel)</h2>
            <p>Müşterilerin mesajınıza yanıt vermesi veya işlem yapması için buton ekleyin. Maksimum 10 buton.</p>

            <div className="button-list">
                {buttons.length === 0 && <p>Henüz buton eklenmedi.</p>}
                {buttons.map((btn) => (
                    <div key={btn.id} className="button-item">
                        <div>
                            <strong>{btn.text}</strong> — <em>{btn.type.replace("_", " ")}</em>
                        </div>
                        <button onClick={() => removeButton(btn.id)} className="btn-remove" title="Butonu sil">
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="add-button-section">
                <label>Buton Türü</label>
                <select
                    value={newButtonType}
                    onChange={(e) => setNewButtonType(e.target.value)}
                >
                    {BUTTON_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </select>

                <label>Buton Metni</label>
                <input
                    maxLength={25}
                    placeholder="Buton metnini girin"
                    value={newButtonText}
                    onChange={(e) => setNewButtonText(e.target.value)}
                />
                <small>{newButtonText.length}/25 karakter</small>

                {newButtonType === "visit_website" && (
                    <>
                        <label>Website URL</label>
                        <input
                            type="url"
                            placeholder="https://www.example.com"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                        />
                    </>
                )}

                {newButtonType === "call_whatsapp" && (
                    <>
                        <label>Geçerlilik Süresi (gün)</label>
                        <input
                            type="number"
                            min={1}
                            max={30}
                            value={newValidityDays}
                            onChange={(e) => setNewValidityDays(Number(e.target.value))}
                        />
                    </>
                )}

                {newButtonType === "call_phone" && (
                    <>
                        <label>Ülke Kodu</label>
                        <select
                            value={newPhoneCountry}
                            onChange={(e) => setNewPhoneCountry(e.target.value)}
                        >
                            <option>US +1</option>
                            <option>TR +90</option>
                            <option>DE +49</option>
                        </select>

                        <label>Telefon Numarası</label>
                        <input
                            type="tel"
                            placeholder="Örn: 5551234567"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                        />
                    </>
                )}

                {newButtonType === "copy_offer" && (
                    <>
                        <label>Kampanya Kodu</label>
                        <input
                            type="text"
                            placeholder="Örnek: INDIRIM2025"
                            value={newOfferCode}
                            onChange={(e) => setNewOfferCode(e.target.value)}
                        />
                    </>
                )}

                <button onClick={addButton} disabled={buttons.length >= maxButtons}>
                    Buton Ekle
                </button>
            </div>

            <div className="timing-section">
                <label>Mesaj Gönderim Zamanı</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="timing"
                            value="now"
                            checked={timing === "now"}
                            onChange={() => setTiming("now")}
                        />
                        Şimdi
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="timing"
                            value="scheduled"
                            checked={timing === "scheduled"}
                            onChange={() => setTiming("scheduled")}
                        />
                        Belirli tarih ve saat
                    </label>
                </div>
                <input
                    type="datetime-local"
                    disabled={timing === "now"}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                />
            </div>

            <div className="footer-section">
                <label>Footer (Opsiyonel)</label>
                <input
                    maxLength={60}
                    placeholder="Alt bilgi metnini girin"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                />
                <small>{footerText.length}/60</small>
            </div>

            <div className="preview-section">
                <h3>Buton Önizlemesi</h3>

                <div className="preview-card">
                    <p>İlk Önizleme (3 Buton):</p>
                    <div className="preview-buttons">
                        {buttons.slice(0, 3).map((btn) => (
                            <button key={btn.id} className="preview-btn">
                                {btn.text}
                            </button>
                        ))}
                    </div>
                </div>

                {buttons.length > 3 && (
                    <div className="preview-card">
                        <p>İkinci Önizleme (3'ten fazla buton):</p>
                        <div className="preview-buttons">
                            {buttons.slice(0, 2).map((btn) => (
                                <button key={btn.id} className="preview-btn">
                                    {btn.text}
                                </button>
                            ))}
                            <button className="preview-btn see-all">See all options</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
