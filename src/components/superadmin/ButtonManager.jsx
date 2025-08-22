import React, { useState } from "react";
import customIcon from "../../assets/Marketing/custom.svg";
import phoneIcon from "../../assets/Marketing/call.svg";
import copyIcon from "../../assets/Marketing/copy.svg";
import websiteIcon from "../../assets/Marketing/website.png";

const ButtonManager = ({ buttons, setButtons }) => {
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
  // WhatsApp states eklendi
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappButtonText, setWhatsappButtonText] =
    useState("Call on WhatsApp");
  const [whatsappCountryCode, setWhatsappCountryCode] = useState("TR +90");
  const [whatsappActiveFor, setWhatsappActiveFor] = useState("1");
  const [showAllButtons, setShowAllButtons] = useState(false);

  // Button addition functions
  const addButton = (type, data) => {
    // WhatsApp ve Call için yalnızca bir butona izin ver
    if (
      (type === "whatsapp" || type === "call") &&
      buttons.some((btn) => btn.type === type)
    ) {
      return;
    }

    // Custom ve Website için maksimum 10 buton kontrolü
    if (buttons.length >= 10 && (type === "custom" || type === "website")) {
      return;
    }

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
    setWhatsappNumber("");
    setWhatsappButtonText("Call on WhatsApp");
    setWhatsappActiveFor("1");
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

  // Active for options eklendi
  const activeDays = [
    { value: "1", label: "1 gün" },
    { value: "2", label: "2 gün" },
    { value: "3", label: "3 gün" },
    { value: "4", label: "4 gün" },
    { value: "5", label: "5 gün" },
    { value: "6", label: "6 gün" },
    { value: "7", label: "7 gün" },
  ];

  return (
    <div style={{ marginBottom: "25px" }}>
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
        <span style={{ color: "#8b8e95", fontWeight: "400" }}>- Opsiyonel</span>
      </label>
      <p
        style={{
          color: "#8b8e95",
          fontSize: "12px",
          margin: "0 0 15px 0",
          lineHeight: "1.4",
        }}
      >
        Müşterilerinize mesajınıza cevap vermesi veya belirli bir işlem yapması
        için butonlar eklemenize yarar. En fazla 10 buton eklenebilir. 3'ten
        fazla buton eklenirse, liste şeklinde görünür.
      </p>

      {/* Add Button + Dropdown */}
      <div
        style={{
          width: "50%",
          position: "relative",
          marginBottom: "20px",
        }}
      >
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          + Buton ekle
        </button>

        {/* Buton Türü Dropdown */}
        {buttonTypeSelectOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              width: "100%",
              transition: "all 0.25s ease",
              opacity: buttonTypeSelectOpen ? 1 : 0,
              transform: buttonTypeSelectOpen
                ? "translateY(0)"
                : "translateY(-6px)",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "12px",
                backgroundColor: "#1e2025",
                border: "1px solid #3a3d44",
                borderRadius: "6px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
              }}
            >
              {/* Custom Button */}
              <button
                style={{
                  background:
                    selectedButtonType === "quick" ? "#2d3036" : "transparent",
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
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => {
                  setSelectedButtonType("quick");
                  setButtonTypeSelectOpen(false);
                }}
              >
                <img
                  src={customIcon}
                  alt="Custom"
                  style={{
                    width: "16px",
                    height: "16px",
                    filter: "brightness(0) invert(1)",
                  }}
                />
                <div>
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
                </div>
              </button>

              {/* Diğer buton türleri */}
              {[
                {
                  id: "website",
                  label: "Visit Website",
                  desc: "Web sitesi ziyaret et",
                  icon: websiteIcon,
                },
                {
                  id: "call",
                  label: "Call Phone Number",
                  desc: "Telefon numarasını ara",
                  icon: phoneIcon,
                },
                {
                  id: "whatsapp",
                  label: "Call on WhatsApp",
                  desc: "WhatsApp ile ara",
                  icon: phoneIcon,
                },
                {
                  id: "copy",
                  label: "Copy Offer Code",
                  desc: "Teklif kodunu kopyala",
                  icon: copyIcon,
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
                      opacity: isAlreadyAdded ? 0.5 : 1,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onClick={() => {
                      if (!isAlreadyAdded) {
                        setSelectedButtonType(type.id);
                        setButtonTypeSelectOpen(false);
                      }
                    }}
                  >
                    <img
                      src={type.icon}
                      alt={type.label}
                      style={{
                        width: "16px",
                        height: "16px",
                        filter: isAlreadyAdded
                          ? "brightness(0.3)"
                          : "brightness(0) invert(1)",
                      }}
                    />
                    <div>
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
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

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
              {quickReply.length}/25
            </div>
          </div>

          <button
            onClick={() => {
              if (quickReply.trim()) {
                addButton("quick", {
                  text: quickReply.trim(),
                });
              }
            }}
            disabled={!quickReply.trim() || buttons.length >= 10}
            style={{
              padding: "8px 16px",
              backgroundColor:
                !quickReply.trim() || buttons.length >= 10 ? "#444" : "#275db5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor:
                !quickReply.trim() || buttons.length >= 10
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

      {/* Website Form */}
      {selectedButtonType === "website" && (
        <div
          style={{
            background: "#1e2025",
            border: "1px solid #3a3d44",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
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
                <option>Visit website</option>
              </select>
            </div>

            <div>
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
                value={websiteButtonText}
                maxLength={25}
                onChange={(e) => setWebsiteButtonText(e.target.value)}
                placeholder="Visit website"
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
                {websiteButtonText.length}/25
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              <label
                style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  marginBottom: "4px",
                  display: "block",
                }}
              >
                URL Type
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
                <option>Dynamic</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "4px",
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
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

            <div>
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
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
                    {country.code.split(" ")[1]} {country.code.split(" ")[0]}
                  </option>
                ))}
              </select>
            </div>

            <div>
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
      {/* WhatsApp Call Form - YENİ EKLENEN */}
      {selectedButtonType === "whatsapp" && (
        <div
          style={{
            background: "#1e2025",
            border: "1px solid #3a3d44",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          {/* İlk satır: Type of Action ve Button Text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
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
                <option>Call on WhatsApp</option>
              </select>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  marginBottom: "4px",
                  display: "block",
                }}
              >
                Aktiflik Süresi
              </label>
              <select
                value={whatsappActiveFor}
                onChange={(e) => setWhatsappActiveFor(e.target.value)}
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
                {activeDays.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* İkinci satır: Country ve WhatsApp Number */}
          <div>
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
              value={whatsappButtonText}
              maxLength={25}
              onChange={(e) => setWhatsappButtonText(e.target.value)}
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
              {whatsappButtonText.length}/25
            </div>
          </div>
          {/* Ekle Butonu */}
          <button
            onClick={() => {
              if (whatsappButtonText.trim()) {
                addButton("whatsapp", {
                  text: whatsappButtonText.trim(),
                  activeFor: whatsappActiveFor,
                });
              }
            }}
            disabled={!whatsappButtonText.trim() || buttons.length >= 10} // Aktiflik kontrolü
            style={{
              padding: "8px 16px",
              backgroundColor:
                !whatsappButtonText.trim() || buttons.length >= 10
                  ? "#444" // Pasif durum rengi
                  : "#275db5", // Aktif durum rengi
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor:
                !whatsappButtonText.trim() || buttons.length >= 10
                  ? "not-allowed" // Pasif durum için cursor
                  : "pointer", // Aktif durum için cursor
              fontSize: "13px",
              width: "100%",
            }}
          >
            Ekle
          </button>
        </div>
      )}

      {/* Copy Offer Code Form */}
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
              value={offerButtonText}
              maxLength={25}
              onChange={(e) => setOfferButtonText(e.target.value)}
              placeholder="Copy offer code"
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
              {offerButtonText.length}/25
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
              Teklif Kodu
            </label>
            <input
              type="text"
              value={offerCode}
              maxLength={15}
              onChange={(e) => setOfferCode(e.target.value)}
              placeholder="Enter sample"
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
            {(showAllButtons ? buttons : buttons.slice(0, 3)).map((btn, i) => (
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
                    {/* SVG İkonlar */}
                    {btn.type === "quick" && (
                      <img
                        src={customIcon}
                        alt="Quick Reply"
                        style={{
                          width: "16px",
                          height: "16px",
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                    )}
                    {btn.type === "website" && (
                      <img
                        src={websiteIcon}
                        alt="Visit Website"
                        style={{
                          width: "16px",
                          height: "16px",
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                    )}
                    {btn.type === "call" && (
                      <img
                        src={phoneIcon}
                        alt="Call Phone Number"
                        style={{
                          width: "16px",
                          height: "16px",
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                    )}
                    {btn.type === "copy" && (
                      <img
                        src={copyIcon}
                        alt="Copy Offer Code"
                        style={{
                          width: "16px",
                          height: "16px",
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                    )}
                    {btn.type === "whatsapp" && (
                      <img
                        src={phoneIcon}
                        alt="Call on WhatsApp"
                        style={{
                          width: "16px",
                          height: "16px",
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                    )}
                    <span style={{ fontWeight: "500" }}>{btn.text}</span>
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
            ))}

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
  );
};

export default ButtonManager;
