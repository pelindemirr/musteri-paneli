import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Marketing = ({ onClose }) => {
  const [campaignName, setCampaignName] = useState("");
  const [language, setLanguage] = useState("tr");
  const [channel, setChannel] = useState("email");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedSegments, setSelectedSegments] = useState(["all"]);

  const [buttons, setButtons] = useState([]);

  // Accordion states
  const [variableTypeOpen, setVariableTypeOpen] = useState(false);
  const [mediaSampleOpen, setMediaSampleOpen] = useState(false);
  const [selectedVariableType, setSelectedVariableType] = useState("numara");
  const [selectedMediaType, setSelectedMediaType] = useState("resim");

  // Button states
  const [buttonTypeSelectOpen, setButtonTypeSelectOpen] = useState(false);
  const [selectedButtonType, setSelectedButtonType] = useState("");
  const [quickReply, setQuickReply] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteButtonText, setWebsiteButtonText] = useState("Visit website");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneButtonText, setPhoneButtonText] = useState("Call phone number");
  const [countryCode, setCountryCode] = useState("TR +90");
  const [offerCode, setOfferCode] = useState("");
  const [offerButtonText, setOfferButtonText] = useState("Copy offer code");
  const [showAllButtons, setShowAllButtons] = useState(false);

  const handleSegmentToggle = (segment) => {
    setSelectedSegments((prev) =>
      prev.includes(segment)
        ? prev.filter((s) => s !== segment)
        : [...prev, segment]
    );
  };

  const getPreviewContent = () => {
    let previewBody = body || "Mesaj içeriği burada görünecek";
    previewBody = previewBody.replace(/\{\{username\}\}/g, "Ahmet");
    previewBody = previewBody.replace(/\{\{discount_code\}\}/g, "SAVE20");
    previewBody = previewBody.replace(/\{\{company_name\}\}/g, "CallPilot");
    previewBody = previewBody.replace(/\{\{expiry_date\}\}/g, "31.12.2024");
    return previewBody;
  };

  const handleSave = () => {
    console.log("Kampanya kaydediliyor...", {
      campaignName,
      language,
      channel,
      title,
      body,
      selectedSegments,
      timing,
      scheduledDate,
    });
    alert("Kampanya başarıyla kaydedildi!");
  };

  const handleTestSend = () => {
    console.log("Test gönderimi yapılıyor...");
    alert("Test mesajı gönderildi!");
  };

  const handleStartCampaign = () => {
    console.log("Kampanya başlatılıyor...");
    alert("Kampanya başlatıldı!");
  };
  const [footerText, setFooterText] = useState("");

  // Button addition functions
  const addButton = (type, data) => {
    if (buttons.length >= 10) return;

    const newButton = { type, ...data };
    setButtons([...buttons, newButton]);

    // Reset form fields
    setQuickReply("");
    setWebsiteUrl("");
    setWebsiteButtonText("Visit website");
    setPhoneNumber("");
    setPhoneButtonText("Call phone number");
    setOfferCode("");
    setOfferButtonText("Copy offer code");
    setSelectedButtonType("");
  };

  const removeButton = (index) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  const countryCodes = [
    { code: "TR +90", name: "Türkiye" },
    { code: "US +1", name: "Amerika" },
    { code: "DE +49", name: "Almanya" },
    { code: "FR +33", name: "Fransa" },
    { code: "GB +44", name: "İngiltere" },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        display: "flex",
        height: "100vh",
        backgroundColor: "#1a1919ff",
        overflow: "hidden",
      }}
    >
      {/* Kapatma Butonu */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 35,
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          color: "#d64e4e",
        }}
        title="Kapat"
      >
        ✕
      </button>

      {/* Sol Form Alanı */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#2c2f36",
          margin: "20px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #3a3d44",
        }}
      >
        <div
          style={{
            padding: "15px 25px",
            borderBottom: "1px solid #3a3d44",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#275db5",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              📧
            </div>
            <div>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                Kampanya Oluştur
              </h1>
              <p
                style={{
                  color: "#8b8e95",
                  fontSize: "14px",
                  margin: "4px 0 0 0",
                }}
              >
                Pazarlama • Varsayılan
              </p>
            </div>
          </div>

          {/* Dil Seçimi - Header'da */}
          <div style={{ minWidth: "120px" }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #3a3d44",
                borderRadius: "6px",
                fontSize: "13px",
                backgroundColor: "#1e2025",
                color: "#ffffff",
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
        <div style={{ padding: "18px", flex: 1, overflowY: "auto" }}>
          {/* Kampanya Adı */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontWeight: "500",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Kampanya adı *
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Kampanya adını girin"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #3a3d44",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#1e2025",
                color: "#ffffff",
              }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#8b8e95",
                textAlign: "right",
                marginTop: "4px",
              }}
            >
              {campaignName.length}/60
            </div>
          </div>

          {/* Değişken Türü Dropdown */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 320,
              marginBottom: "20px",
            }}
          >
            {/* Başlık */}
            <div
              onClick={() => setVariableTypeOpen(!variableTypeOpen)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                backgroundColor: "#1e2025",
                border: "1px solid #3a3d44",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "14px",
                width: "100%",
              }}
            >
              <span>Değişken Türü</span>
              {variableTypeOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {/* Açılan Menü */}
            {variableTypeOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 999,
                  width: "100%",
                  backgroundColor: "#1e2025",
                  border: "1px solid #3a3d44",
                  borderTop: "none",
                  borderRadius: "0 0 6px 6px",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "2px",
                }}
              >
                {[
                  { id: "numara", label: "Numara" },
                  { id: "ad", label: "Ad" },
                ].map((type) => (
                  <label
                    key={type.id}
                    style={{
                      backgroundColor:
                        selectedVariableType === type.id
                          ? "#2d3036"
                          : "#25272c",
                      border:
                        selectedVariableType === type.id
                          ? "1px solid #4b9fff"
                          : "1px solid #3a3d44",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      color: "#ffffff",
                      fontSize: "13px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#2d3036")
                    }
                    onMouseLeave={(e) => {
                      if (selectedVariableType !== type.id) {
                        e.currentTarget.style.backgroundColor = "#25272c";
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name="variableType"
                      value={type.id}
                      checked={selectedVariableType === type.id}
                      onChange={(e) => setSelectedVariableType(e.target.value)}
                      style={{
                        accentColor: "#275db5",
                        width: "10px",
                        height: "10px",
                        cursor: "pointer",
                      }}
                    />
                    {type.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/*Medya Örneği*/}
          <div
            style={{
              position: "relative",
              maxWidth: 320,
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <div
              onClick={() => setMediaSampleOpen(!mediaSampleOpen)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                backgroundColor: "#1e2025",
                border: "1px solid #3a3d44",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "14px",
                width: "100%",
              }}
            >
              <span>Medya Örneği</span>
              {mediaSampleOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            {mediaSampleOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 999,
                  border: "1px solid #3a3d44",
                  borderTop: "none",
                  borderRadius: "0 0 6px 6px",
                  backgroundColor: "#1e2025",
                  padding: "12px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "2px",
                }}
              >
                {[
                  { id: "resim", label: " Resim" },
                  { id: "video", label: " Video" },
                  { id: "dokuman", label: " Doküman" },
                  { id: "konum", label: " Konum" },
                ].map((media) => (
                  <label
                    key={media.id}
                    style={{
                      backgroundColor:
                        selectedMediaType === media.id ? "#2d3036" : "#25272c",
                      border:
                        selectedMediaType === media.id
                          ? "1px solid #4b9fff"
                          : "1px solid #3a3d44",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      color: "#ffffff",
                      fontSize: "13px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2d3036";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedMediaType !== media.id) {
                        e.currentTarget.style.backgroundColor = "#25272c";
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
                        accentColor: "#275db5",
                        width: "10px",
                        height: "10px",
                        cursor: "pointer",
                      }}
                    />
                    {media.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Başlık */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontWeight: "500",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Başlık (Opsiyonel)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Başlık metnini girin"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #3a3d44",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#1e2025",
                color: "#ffffff",
              }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#8b8e95",
                textAlign: "right",
                marginTop: "4px",
              }}
            >
              {title.length}/60
            </div>
          </div>

          {/* Mesaj İçeriği */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontWeight: "500",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              İçerik
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Mesaj içeriğinizi girin..."
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #3a3d44",
                borderRadius: "6px",
                fontSize: "14px",
                minHeight: "100px",
                maxHeight: "200px",
                resize: "vertical",
                backgroundColor: "#1e2025",
                color: "#ffffff",
                overflowY: "auto",
              }}
            />
          </div>

          {/* Footer */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontWeight: "500",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              Footer (Opsiyonel)
            </label>
            <input
              type="text"
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              placeholder="Alt bilgi metnini girin"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #3a3d44",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#1e2025",
                color: "#ffffff",
              }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#8b8e95",
                textAlign: "right",
                marginTop: "4px",
              }}
            >
              {footerText.length}/60
            </div>
          </div>

          {/* --- Butonlar Alanı --- */}
          <div style={{ marginBottom: "25px", maxWidth: 400 }}>
            <label
              style={{
                color: "#ffffff",
                fontWeight: "500",
                fontSize: "14px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Butonlar{" "}
              <span style={{ color: "#8b8e95", fontWeight: "400" }}>
                - Opsiyonel
              </span>
            </label>
            <p
              style={{
                color: "#8b8e95",
                fontSize: "12px",
                margin: "0 0 15px 0",
                lineHeight: "1.4",
              }}
            >
              Müşterilerinize mesajınıza cevap vermesi veya belirli bir işlem
              yapması için butonlar eklemenize yarar. En fazla 10 buton
              eklenebilir. 3'ten fazla buton eklenirse, liste şeklinde görünür.
            </p>

            {/* Add Button */}
            <button
              onClick={() => setButtonTypeSelectOpen(!buttonTypeSelectOpen)}
              disabled={buttons.length >= 10}
              style={{
                padding: "10px 14px",
                backgroundColor: buttons.length >= 10 ? "#444" : "#275db5",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: buttons.length >= 10 ? "not-allowed" : "pointer",
                fontSize: "13px",
                fontWeight: "500",
                width: "100%",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              🔘 + Buton ekle
            </button>

            {/* Button Type Selection */}
            {buttonTypeSelectOpen && (
              <div
                style={{
                  background: "#1e2025",
                  border: "1px solid #3a3d44",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Buton türü seçin:
                </div>

                {/* Custom (Quick Reply) - Her zaman eklenebilir */}
                <button
                  style={{
                    background:
                      selectedButtonType === "quick"
                        ? "#2d3036"
                        : "transparent",
                    color: "#fff",
                    border:
                      selectedButtonType === "quick"
                        ? "1px solid #4b9fff"
                        : "1px solid #3a3d44",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "13px",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => setSelectedButtonType("quick")}
                  onMouseEnter={(e) => {
                    if (selectedButtonType !== "quick") {
                      e.currentTarget.style.backgroundColor = "#25272c";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedButtonType !== "quick") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div style={{ fontWeight: "500" }}>Custom</div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#8b8e95",
                      marginTop: "2px",
                    }}
                  >
                    Hızlı yanıt
                  </div>
                </button>

                {/* Diğer buton türleri - Sadece bir kere eklenebilir */}
                {[
                  {
                    id: "website",
                    label: "Visit Website",
                    desc: "Web sitesi ziyaret et",
                  },
                  {
                    id: "whatsapp",
                    label: "Call on WhatsApp",
                    desc: "WhatsApp üzerinden ara",
                  },
                  {
                    id: "call",
                    label: "Call Phone Number",
                    desc: "Telefon numarasını ara",
                  },
                  {
                    id: "copy",
                    label: "Copy Offer Code",
                    desc: "Teklif kodunu kopyala",
                  },
                ].map((type) => {
                  const isAlreadyAdded = buttons.some(
                    (btn) => btn.type === type.id
                  );

                  return (
                    <button
                      key={type.id}
                      disabled={isAlreadyAdded}
                      style={{
                        background:
                          selectedButtonType === type.id
                            ? "#2d3036"
                            : isAlreadyAdded
                            ? "#1a1d22"
                            : "transparent",
                        color: isAlreadyAdded ? "#666" : "#fff",
                        border:
                          selectedButtonType === type.id
                            ? "1px solid #4b9fff"
                            : "1px solid #3a3d44",
                        borderRadius: "6px",
                        padding: "10px 12px",
                        textAlign: "left",
                        cursor: isAlreadyAdded ? "not-allowed" : "pointer",
                        fontSize: "13px",
                        transition: "all 0.2s ease",
                        opacity: isAlreadyAdded ? 0.5 : 1,
                      }}
                      onClick={() =>
                        !isAlreadyAdded && setSelectedButtonType(type.id)
                      }
                      onMouseEnter={(e) => {
                        if (selectedButtonType !== type.id && !isAlreadyAdded) {
                          e.currentTarget.style.backgroundColor = "#25272c";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedButtonType !== type.id && !isAlreadyAdded) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <div style={{ fontWeight: "500" }}>
                        {type.label} {isAlreadyAdded && "(Eklendi)"}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: isAlreadyAdded ? "#555" : "#8b8e95",
                          marginTop: "2px",
                        }}
                      >
                        {type.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Quick Reply Form */}
            {selectedButtonType === "quick" && (
              <div
                style={{
                  background: "#1e2025",
                  border: "1px solid #3a3d44",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Tür
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "6px",
                      color: "#ffffff",
                      fontSize: "13px",
                    }}
                  >
                    <option>Custom</option>
                  </select>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Buton Metni
                  </label>
                  <input
                    type="text"
                    value={quickReply}
                    maxLength={25}
                    onChange={(e) => setQuickReply(e.target.value)}
                    placeholder="Quick Reply"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #3a3d44",
                      backgroundColor: "#25272c",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#8b8e95",
                      textAlign: "right",
                      marginTop: "4px",
                    }}
                  >
                    {websiteButtonText.length}/25
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    URL Türü
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "6px",
                      color: "#ffffff",
                      fontSize: "13px",
                    }}
                  >
                    <option>Static</option>
                  </select>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://www.example.com"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #3a3d44",
                      backgroundColor: "#25272c",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#8b8e95",
                      marginTop: "4px",
                    }}
                  >
                    0/2000
                  </div>
                </div>

                <div
                  style={{
                    background: "#2a2f35",
                    padding: "8px 10px",
                    borderRadius: "4px",
                    marginBottom: "12px",
                    fontSize: "11px",
                    color: "#8b8e95",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  ℹ️ Track app conversions (Marketing Messages Lite API only)
                </div>

                <button
                  onClick={() => {
                    if (websiteUrl.trim() && websiteButtonText.trim()) {
                      addButton("website", {
                        text: websiteButtonText.trim(),
                        url: websiteUrl.trim(),
                      });
                    }
                  }}
                  disabled={
                    !websiteUrl.trim() ||
                    !websiteButtonText.trim() ||
                    buttons.length >= 10
                  }
                  style={{
                    padding: "8px 16px",
                    backgroundColor:
                      !websiteUrl.trim() ||
                      !websiteButtonText.trim() ||
                      buttons.length >= 10
                        ? "#444"
                        : "#275db5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor:
                      !websiteUrl.trim() ||
                      !websiteButtonText.trim() ||
                      buttons.length >= 10
                        ? "not-allowed"
                        : "pointer",
                    fontSize: "13px",
                    width: "100%",
                  }}
                >
                  Ekle
                </button>
              </div>
            )}

            {/* Phone Call Form */}
            {selectedButtonType === "call" && (
              <div
                style={{
                  background: "#1e2025",
                  border: "1px solid #3a3d44",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Call to Action • Opsiyonel
                  </label>
                </div>

                {/* İlk satır - Yatay Layout */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "12px",
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ flex: "0 0 140px" }}>
                    <label
                      style={{
                        color: "#ffffff",
                        fontSize: "13px",
                        marginBottom: "4px",
                        display: "block",
                      }}
                    >
                      Type of Action
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "#25272c",
                        border: "1px solid #3a3d44",
                        borderRadius: "6px",
                        color: "#ffffff",
                        fontSize: "13px",
                      }}
                    >
                      <option>Call phone number</option>
                    </select>
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        color: "#ffffff",
                        fontSize: "13px",
                        marginBottom: "4px",
                        display: "block",
                      }}
                    >
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={phoneButtonText}
                      maxLength={25}
                      onChange={(e) => setPhoneButtonText(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #3a3d44",
                        backgroundColor: "#25272c",
                        color: "#fff",
                        fontSize: "13px",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#8b8e95",
                        textAlign: "right",
                        marginTop: "2px",
                      }}
                    >
                      {phoneButtonText.length}/25
                    </div>
                  </div>
                </div>

                {/* İkinci satır - Yatay Layout */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "12px",
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ flex: "0 0 140px" }}>
                    <label
                      style={{
                        color: "#ffffff",
                        fontSize: "13px",
                        marginBottom: "4px",
                        display: "block",
                      }}
                    >
                      Country
                    </label>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "#25272c",
                        border: "1px solid #3a3d44",
                        borderRadius: "6px",
                        color: "#ffffff",
                        fontSize: "13px",
                      }}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code.split(" ")[1]}{" "}
                          {country.code.split(" ")[0]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        color: "#ffffff",
                        fontSize: "13px",
                        marginBottom: "4px",
                        display: "block",
                      }}
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Geçerli bir telefon numarası girin"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border:
                          phoneNumber &&
                          !/^\d{10,}$/.test(phoneNumber.replace(/\s/g, ""))
                            ? "1px solid #d64e4e"
                            : "1px solid #3a3d44",
                        backgroundColor: "#25272c",
                        color: "#fff",
                        fontSize: "13px",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "11px",
                        color:
                          phoneNumber &&
                          !/^\d{10,}$/.test(phoneNumber.replace(/\s/g, ""))
                            ? "#d64e4e"
                            : "#8b8e95",
                        marginTop: "2px",
                      }}
                    >
                      {phoneNumber &&
                      !/^\d{10,}$/.test(phoneNumber.replace(/\s/g, ""))
                        ? "⚠️ You need to enter a phone number. Please add a valid phone number."
                        : "0/20"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (
                      phoneNumber.trim() &&
                      phoneButtonText.trim() &&
                      /^\d{10,}$/.test(phoneNumber.replace(/\s/g, ""))
                    ) {
                      addButton("call", {
                        text: phoneButtonText.trim(),
                        phone: phoneNumber.trim(),
                        country: countryCode,
                      });
                    }
                  }}
                  disabled={
                    !phoneNumber.trim() ||
                    !phoneButtonText.trim() ||
                    !/^\d{10,}$/.test(phoneNumber.replace(/\s/g, "")) ||
                    buttons.length >= 10
                  }
                  style={{
                    padding: "8px 16px",
                    backgroundColor:
                      !phoneNumber.trim() ||
                      !phoneButtonText.trim() ||
                      !/^\d{10,}$/.test(phoneNumber.replace(/\s/g, "")) ||
                      buttons.length >= 10
                        ? "#444"
                        : "#275db5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor:
                      !phoneNumber.trim() ||
                      !phoneButtonText.trim() ||
                      !/^\d{10,}$/.test(phoneNumber.replace(/\s/g, "")) ||
                      buttons.length >= 10
                        ? "not-allowed"
                        : "pointer",
                    fontSize: "13px",
                    width: "100%",
                  }}
                >
                  Ekle
                </button>
              </div>
            )}

            {/* Offer Code Form */}
            {selectedButtonType === "copy" && (
              <div
                style={{
                  background: "#1e2025",
                  border: "1px solid #3a3d44",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Call to Action • Opsiyonel
                  </label>
                </div>

                {/* İlk satır - Yatay Layout */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "12px",
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ flex: "0 0 140px" }}>
                    <label
                      style={{
                        color: "#ffffff",
                        fontSize: "13px",
                        marginBottom: "4px",
                        display: "block",
                      }}
                    >
                      Type of Action
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "#25272c",
                        border: "1px solid #3a3d44",
                        borderRadius: "6px",
                        color: "#ffffff",
                        fontSize: "13px",
                      }}
                    >
                      <option>Copy offer code</option>
                    </select>
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        color: "#ffffff",
                        fontSize: "13px",
                        marginBottom: "4px",
                        display: "block",
                      }}
                    >
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={offerButtonText}
                      maxLength={25}
                      onChange={(e) => setOfferButtonText(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #3a3d44",
                        backgroundColor: "#25272c",
                        color: "#fff",
                        fontSize: "13px",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#8b8e95",
                        textAlign: "right",
                        marginTop: "2px",
                      }}
                    >
                      {offerButtonText.length}/25
                    </div>
                  </div>
                </div>

                {/* İkinci satır - Offer Code */}
                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      color: "#ffffff",
                      fontSize: "13px",
                      marginBottom: "4px",
                      display: "block",
                    }}
                  >
                    Offer code
                  </label>
                  <input
                    type="text"
                    value={offerCode}
                    maxLength={15}
                    onChange={(e) => setOfferCode(e.target.value)}
                    placeholder="Enter sample text"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #3a3d44",
                      backgroundColor: "#25272c",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#8b8e95",
                      }}
                    >
                      Add sample text
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#8b8e95",
                      }}
                    >
                      {offerCode.length}/15
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (offerCode.trim() && offerButtonText.trim()) {
                      addButton("copy", {
                        text: offerButtonText.trim(),
                        code: offerCode.trim(),
                      });
                    }
                  }}
                  disabled={
                    !offerCode.trim() ||
                    !offerButtonText.trim() ||
                    buttons.length >= 10
                  }
                  style={{
                    padding: "8px 16px",
                    backgroundColor:
                      !offerCode.trim() ||
                      !offerButtonText.trim() ||
                      buttons.length >= 10
                        ? "#444"
                        : "#275db5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor:
                      !offerCode.trim() ||
                      !offerButtonText.trim() ||
                      buttons.length >= 10
                        ? "not-allowed"
                        : "pointer",
                    fontSize: "13px",
                    width: "100%",
                  }}
                >
                  Ekle
                </button>
              </div>
            )}

            {/* Added Buttons List */}
            {buttons.length > 0 && (
              <div style={{ marginTop: "15px" }}>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Eklenen Butonlar ({buttons.length}/10):
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {(showAllButtons ? buttons : buttons.slice(0, 3)).map(
                    (btn, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#23262b",
                          color: "#fff",
                          borderRadius: "6px",
                          padding: "10px 12px",
                          fontSize: "13px",
                          border: "1px solid #3a3d44",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ flex: 1, overflow: "hidden" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              marginBottom: "2px",
                            }}
                          >
                            {btn.type === "quick" && <span>↩️</span>}
                            {btn.type === "website" && <span>🌐</span>}
                            {btn.type === "whatsapp" && <span>📞</span>}
                            {btn.type === "call" && <span>☎️</span>}
                            {btn.type === "copy" && <span>📋</span>}
                            <span style={{ fontWeight: "500" }}>
                              {btn.text}
                            </span>
                          </div>
                          {btn.url && (
                            <div style={{ fontSize: "11px", color: "#8b8e95" }}>
                              {btn.url}
                            </div>
                          )}
                          {btn.phone && (
                            <div style={{ fontSize: "11px", color: "#8b8e95" }}>
                              {btn.country} {btn.phone}
                            </div>
                          )}
                          {btn.code && (
                            <div style={{ fontSize: "11px", color: "#8b8e95" }}>
                              Kod: {btn.code}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeButton(i)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#d64e4e",
                            cursor: "pointer",
                            fontSize: "16px",
                            padding: "4px",
                            marginLeft: "8px",
                          }}
                          title="Butonu sil"
                        >
                          ✕
                        </button>
                      </div>
                    )
                  )}

                  {buttons.length > 3 && (
                    <button
                      onClick={() => setShowAllButtons(!showAllButtons)}
                      style={{
                        color: "#275db5",
                        fontSize: "13px",
                        cursor: "pointer",
                        background: "#23262b",
                        borderRadius: "6px",
                        padding: "10px 0",
                        border: "1px solid #3a3d44",
                        textAlign: "center",
                      }}
                    >
                      {showAllButtons
                        ? "Daha az göster"
                        : `Tümünü Gör (${buttons.length})`}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            padding: "15px 25px",
            borderTop: "1px solid #3a3d44",
            backgroundColor: "#1a1d22",
          }}
        >
          <button
            onClick={handleSave}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2c2f36",
              color: "#ffffff",
              border: "1px solid #3a3d44",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Kaydet
          </button>
          <button
            onClick={handleTestSend}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2c2f36",
              color: "#ffffff",
              border: "1px solid #3a3d44",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Test Gönder
          </button>
          <button
            onClick={handleStartCampaign}
            style={{
              padding: "8px 16px",
              backgroundColor: "#275db5",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Kampanyayı Başlat
          </button>
        </div>
      </div>

      {/* Sağ Önizleme Alanı */}
      <div
        style={{
          width: "clamp(300px, 25vw, 400px)",
          flexShrink: 0,
          overflow: "hidden",
          backgroundColor: "#2c2f36",
          margin: "20px 20px 20px 0",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          border: "1px solid #3a3d44",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #3a3d44",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            Template Preview
          </h2>
          <p
            style={{
              color: "#8b8e95",
              fontSize: "12px",
              margin: "4px 0 0 0",
            }}
          >
            Şablon Önizlemesi
          </p>
        </div>
        <div style={{ padding: "20px" }}>
          {/* WhatsApp Tarzı Mesaj Balonu */}
          <div
            style={{
              backgroundColor: "#1a1d22",
              border: "1px solid #3a3d44",
              borderRadius: "8px",
              padding: "20px",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {/* Gönderilen Mesaj Balonu */}
            <div
              style={{
                alignSelf: "flex-end",
                maxWidth: "85%",
                backgroundColor: "#25d366",
                borderRadius: "18px 18px 4px 18px",
                padding: "12px 16px",
                marginBottom: "8px",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {/* Header */}
              {title && (
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  {title}
                </div>
              )}

              {/* Body */}
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  lineHeight: "1.4",
                }}
              >
                {getPreviewContent()}
              </div>

              {/* Footer */}
              {footerText && (
                <div
                  style={{
                    marginTop: "8px",
                    color: "#d3e4e3",
                    fontSize: "11px",
                    fontStyle: "italic",
                    paddingTop: "3px",
                  }}
                >
                  {footerText}
                </div>
              )}

              <div
                style={{
                  textAlign: "right",
                  marginTop: "4px",
                  fontSize: "11px",
                  color: "#b8d3d1",
                }}
              >
                14:30 ✓✓
              </div>
            </div>

            {/* Butonlar Önizlemesi */}
            {buttons.length > 0 && (
              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  alignSelf: "flex-end",
                  maxWidth: "85%",
                  width: "100%",
                }}
              >
                {(buttons.length <= 3 ? buttons : buttons.slice(0, 3)).map(
                  (btn, i) => {
                    let icon = "";
                    let bgColor = "#ffffff";
                    let textColor = "#1a202c";

                    if (btn.type === "quick") {
                      icon = "↩️ ";
                      bgColor = "#e8f5e8";
                      textColor = "#0d7377";
                    } else if (btn.type === "website") {
                      icon = "🌐 ";
                      bgColor = "#e6f0fa";
                      textColor = "#275db5";
                    } else if (btn.type === "whatsapp") {
                      icon = "📞 ";
                      bgColor = "#dcf8c6";
                      textColor = "#25d366";
                    } else if (btn.type === "call") {
                      icon = "☎️ ";
                      bgColor = "#fff3e0";
                      textColor = "#e65100";
                    } else if (btn.type === "copy") {
                      icon = "📋 ";
                      bgColor = "#f3e5f5";
                      textColor = "#7b1fa2";
                    }

                    return (
                      <button
                        key={i}
                        style={{
                          background: bgColor,
                          color: textColor,
                          border: "none",
                          borderRadius: "8px",
                          padding: "10px 12px",
                          fontSize: "13px",
                          fontWeight: "500",
                          textAlign: "left",
                          cursor: "pointer",
                          width: "100%",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          transition: "all 0.2s ease",
                        }}
                        disabled
                      >
                        <span>{icon}</span>
                        <span>{btn.text}</span>
                      </button>
                    );
                  }
                )}

                {buttons.length > 3 && (
                  <button
                    style={{
                      color: "#275db5",
                      fontSize: "13px",
                      fontWeight: "500",
                      background: "#ffffff",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      border: "1px solid #e0e0e0",
                      textAlign: "center",
                      cursor: "pointer",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    disabled
                  >
                    🔽 See all options
                  </button>
                )}
              </div>
            )}

            {/* Karşı Taraftan Gelen Cevap Simülasyonu */}
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "70%",
                backgroundColor: "#2a2a2a",
                borderRadius: "18px 18px 18px 4px",
                padding: "10px 14px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  lineHeight: "1.4",
                }}
              >
                Teşekkürler! 👍
              </div>
              <div
                style={{
                  textAlign: "left",
                  marginTop: "4px",
                  fontSize: "11px",
                  color: "#8b8e95",
                }}
              >
                14:31
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
