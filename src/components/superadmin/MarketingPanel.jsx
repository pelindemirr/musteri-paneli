import React, { useState } from "react";
import { ChevronDown, ChevronUp, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import marketingIcon from "../../assets/Marketing/marketing.svg";
import utilityIcon from "../../assets/Marketing/utility.svg";
import authIcon from "../../assets/Marketing/authentication.svg";
import imageIcon from "../../assets/Marketing/image.svg";
import videoIcon from "../../assets/Marketing/video.svg";
import documentIcon from "../../assets/Marketing/document.svg";
import campaignIcon from "../../assets/Marketing/campaign.svg";
import KonumIcon from "../../assets/Marketing/konum.svg";
import whatsappIcon from "../../assets/Marketing/whatsapp.png";
import ButtonManager from "./ButtonManager";
import quickIcon from "../../assets/Marketing/custom.svg";
import websiteIcon from "../../assets/Marketing/website.png";
import callIcon from "../../assets/Marketing/call.svg";
import copyIcon from "../../assets/Marketing/copy.svg";

const Marketing = ({ onClose }) => {
  const [campaignName, setCampaignName] = useState("");
  const [language, setLanguage] = useState("tr");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [buttons, setButtons] = useState([]);
  const [footerText, setFooterText] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("marketing");

  // Template seçimleri için state'ler
  const [selectedMarketingType, setSelectedMarketingType] = useState("default");
  const [selectedUtilityType, setSelectedUtilityType] = useState("default");
  const [selectedAuthType, setSelectedAuthType] = useState("otp");

  // Accordion states
  const [variableTypeOpen, setVariableTypeOpen] = useState(false);
  const [mediaSampleOpen, setMediaSampleOpen] = useState(false);
  const [selectedVariableType, setSelectedVariableType] = useState("numara");
  const [selectedMediaType, setSelectedMediaType] = useState("resim");

  // Emoji picker state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // WhatsApp formatlamasını önizlemede göstermek için fonksiyon
  const formatWhatsAppText = (text) => {
    if (!text) return "Mesaj içeriği burada görünecek";

    let formattedText = text;

    // Değişkenleri değiştir
    formattedText = formattedText.replace(/\{\{username\}\}/g, "Ahmet");
    formattedText = formattedText.replace(/\{\{discount_code\}\}/g, "SAVE20");
    formattedText = formattedText.replace(/\{\{company_name\}\}/g, "CallPilot");
    formattedText = formattedText.replace(/\{\{expiry_date\}\}/g, "31.12.2024");

    // WhatsApp formatlamasını JSX'e çevir
    const parts = [];
    let currentIndex = 0;

    // Kalın (*text*), İtalik (_text_), Üstü çizili (~text~) için regex
    const formatRegex = /(\*[^*]+\*|_[^_]+_|~[^~]+~)/g;

    formattedText.split(formatRegex).forEach((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        // Kalın
        parts.push(<strong key={index}>{part.slice(1, -1)}</strong>);
      } else if (part.startsWith("_") && part.endsWith("_")) {
        // İtalik
        parts.push(<em key={index}>{part.slice(1, -1)}</em>);
      } else if (part.startsWith("~") && part.endsWith("~")) {
        // Üstü çizili
        parts.push(
          <span key={index} style={{ textDecoration: "line-through" }}>
            {part.slice(1, -1)}
          </span>
        );
      } else {
        // Normal metin
        parts.push(part);
      }
    });

    return parts;
  };

  const getPreviewContent = () => {
    return formatWhatsAppText(body);
  };

  // Emoji seçildiğinde
  const onEmojiClick = (emojiObject) => {
    setBody(body + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Metin formatlaması için yardımcı fonksiyon
  const formatText = (formatChar) => {
    const textarea = document.querySelector(
      'textarea[placeholder="Mesaj içeriğinizi girin..."]'
    );
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end);

    if (selectedText) {
      // Seçili metin varsa formatla
      const newText =
        body.substring(0, start) +
        formatChar +
        selectedText +
        formatChar +
        body.substring(end);
      setBody(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 1, end + 1);
      }, 0);
    } else {
      // Seçili metin yoksa cursor pozisyonuna formatı ekle
      const newText =
        body.substring(0, start) +
        formatChar +
        formatChar +
        body.substring(start);
      setBody(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 1, start + 1);
      }, 0);
    }
  };

  const handleSave = () => {
    console.log("Kampanya kaydediliyor...", {
      campaignName,
      language,
      title,
      body,
      buttons,
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

  const [showAllButtons, setShowAllButtons] = useState(false); // Yeni state

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
          zIndex: 101,
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
        {/* Header ve Stepper aynı kalacak */}
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
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              <img
                src={campaignIcon}
                alt="Campaign Icon"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
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
                {currentStep === 1 ? "Şablon Kurulum" : "Kampanya Oluştur"}
              </h1>
              <p
                style={{
                  color: "#8b8e95",
                  fontSize: "14px",
                  margin: "3px 0 0 0",
                }}
              >
                {currentStep === 1 ? "Adım 1/2" : "Adım 2/2"}
              </p>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div
          style={{
            padding: "20px 25px",
            borderBottom: "1px solid #3a3d44",
            backgroundColor: "#23262b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <div
              onClick={() => setCurrentStep(1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: currentStep === 1 ? "#275db5" : "#3a3d44",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                1
              </div>
              <span
                style={{
                  color: currentStep === 1 ? "#ffffff" : "#8b8e95",
                  fontSize: "14px",
                  fontWeight: currentStep === 1 ? "600" : "400",
                }}
              >
                Set up template
              </span>
            </div>

            <div
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: currentStep > 1 ? "#275db5" : "#3a3d44",
              }}
            />

            <div
              onClick={() => setCurrentStep(2)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: currentStep === 2 ? "#275db5" : "#3a3d44",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                2
              </div>
              <span
                style={{
                  color: currentStep === 2 ? "#ffffff" : "#8b8e95",
                  fontSize: "14px",
                  fontWeight: currentStep === 2 ? "600" : "400",
                }}
              >
                Edit template
              </span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div style={{ padding: "18px", flex: 1, overflowY: "auto" }}>
          {currentStep === 1 ? (
            // Step 1: Set up template
            <div>
              {/* Category Selection - aynı kalacak */}
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "15px",
                  }}
                >
                  Kategori türü seçin:
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Marketing */}
                  <div
                    onClick={() => setSelectedCategory("marketing")}
                    style={{
                      flex: "1 1 300px",
                      minWidth: "250px",
                      backgroundColor:
                        selectedCategory === "marketing"
                          ? "#275db5"
                          : "#1e2025",
                      border:
                        selectedCategory === "marketing"
                          ? "2px solid #4b9fff"
                          : "1px solid #3a3d44",
                      borderRadius: "8px",
                      padding: "20px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      transform:
                        selectedCategory === "marketing"
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={marketingIcon}
                        alt="Marketing Icon"
                        style={{
                          width: "40px",
                          height: "40px",
                          filter: "brightness(0) invert(1)",
                          transition: "transform 0.2s ease",
                          transform:
                            selectedCategory === "marketing"
                              ? "scale(1.1)"
                              : "scale(1)",
                        }}
                      />
                    </div>
                    <h4
                      style={{
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: "600",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Marketing
                    </h4>
                    <p
                      style={{
                        color: "#dee8ffff",
                        fontSize: "14px",
                        margin: 0,
                        lineHeight: "1.4",
                      }}
                    >
                      Medya ve özelleştirilmiş butonlarla müşterilerinizle
                      etkileşim kurun
                    </p>
                  </div>

                  {/* Utility */}
                  <div
                    onClick={() => setSelectedCategory("utility")}
                    style={{
                      flex: "1 1 300px",
                      minWidth: "250px",
                      backgroundColor:
                        selectedCategory === "utility" ? "#275db5" : "#1e2025",
                      border:
                        selectedCategory === "utility"
                          ? "2px solid #4b9fff"
                          : "1px solid #3a3d44",
                      borderRadius: "8px",
                      padding: "20px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      transform:
                        selectedCategory === "utility"
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={utilityIcon}
                        alt="Utility"
                        style={{
                          width: "40px",
                          height: "40px",
                          filter: "brightness(0) invert(1)",
                          transition: "transform 0.2s ease",
                          transform:
                            selectedCategory === "utility"
                              ? "scale(1.1)"
                              : "scale(1)",
                        }}
                      />
                    </div>
                    <h4
                      style={{
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: "600",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Utility
                    </h4>
                    <p
                      style={{
                        color: "#dee8ffff",
                        fontSize: "14px",
                        margin: 0,
                        lineHeight: "1.4",
                      }}
                    >
                      Hizmet bildirimleri ve güncellemeler gönder
                    </p>
                  </div>

                  {/* Authentication */}
                  <div
                    onClick={() => setSelectedCategory("authentication")}
                    style={{
                      flex: "1 1 300px",
                      minWidth: "250px",
                      backgroundColor:
                        selectedCategory === "authentication"
                          ? "#275db5"
                          : "#1e2025",
                      border:
                        selectedCategory === "authentication"
                          ? "2px solid #4b9fff"
                          : "1px solid #3a3d44",
                      borderRadius: "8px",
                      padding: "20px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      transform:
                        selectedCategory === "authentication"
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "22px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={authIcon}
                        alt="Authentication"
                        style={{
                          width: "40px",
                          height: "40px",
                          filter: "brightness(0) invert(1)",
                          transition: "transform 0.2s ease",
                          transform:
                            selectedCategory === "authentication"
                              ? "scale(1.1)"
                              : "scale(1)",
                        }}
                      />
                    </div>
                    <h4
                      style={{
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: "600",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Authentication
                    </h4>
                    <p
                      style={{
                        color: "#dee8ffff",
                        fontSize: "14px",
                        margin: 0,
                        lineHeight: "1.4",
                      }}
                    >
                      Tek seferlik şifreler ve doğrulama kodları gönder
                    </p>
                  </div>
                </div>
              </div>

              {/* Template Type Selection - TIKLANABİLİR YAPILDI */}
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "15px",
                  }}
                >
                  Göndermek istediğiniz mesaj türünü seçin:
                </h3>

                {selectedCategory === "marketing" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {/* Default */}
                    <div
                      onClick={() => setSelectedMarketingType("default")}
                      style={{
                        backgroundColor:
                          selectedMarketingType === "default"
                            ? "#275db5"
                            : "#1e2025",
                        border:
                          selectedMarketingType === "default"
                            ? "2px solid #4b9fff"
                            : "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="marketingType"
                        value="default"
                        checked={selectedMarketingType === "default"}
                        onChange={() => setSelectedMarketingType("default")}
                        style={{
                          accentColor: "#275db5",
                          pointerEvents: "none",
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                          }}
                        >
                          Default
                        </h4>
                        <p
                          style={{
                            color: "#8b8e95",
                            margin: 0,
                            fontSize: "13px",
                          }}
                        >
                          Mevcut bir sipariş veya hesap hakkında mesaj gönder
                        </p>
                      </div>
                    </div>

                    {/* Catalog */}
                    <div
                      onClick={() => setSelectedMarketingType("catalog")}
                      style={{
                        backgroundColor:
                          selectedMarketingType === "catalog"
                            ? "#275db5"
                            : "#1e2025",
                        border:
                          selectedMarketingType === "catalog"
                            ? "2px solid #4b9fff"
                            : "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="marketingType"
                        value="catalog"
                        checked={selectedMarketingType === "catalog"}
                        onChange={() => setSelectedMarketingType("catalog")}
                        style={{
                          accentColor: "#275db5",
                          pointerEvents: "none",
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                          }}
                        >
                          Catalog
                        </h4>
                        <p
                          style={{
                            color: "#8b8e95",
                            margin: 0,
                            fontSize: "13px",
                          }}
                        >
                          Ürün kataloğunuzu bağlayarak satış yapan mesajlar
                          gönder
                        </p>
                      </div>
                    </div>

                    {/* Calling permissions request */}
                    <div
                      onClick={() => setSelectedMarketingType("permissions")}
                      style={{
                        backgroundColor:
                          selectedMarketingType === "permissions"
                            ? "#275db5"
                            : "#1e2025",
                        border:
                          selectedMarketingType === "permissions"
                            ? "2px solid #4b9fff"
                            : "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="marketingType"
                        value="permissions"
                        checked={selectedMarketingType === "permissions"}
                        onChange={() => setSelectedMarketingType("permissions")}
                        style={{
                          accentColor: "#275db5",
                          pointerEvents: "none",
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                          }}
                        >
                          Calling permissions request
                        </h4>
                        <p
                          style={{
                            color: "#8b8e95",
                            margin: 0,
                            fontSize: "13px",
                          }}
                        >
                          Müşterilerinizden WhatsApp üzerinden arama izni iste
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCategory === "utility" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {/* Default */}
                    <div
                      onClick={() => setSelectedUtilityType("default")}
                      style={{
                        backgroundColor:
                          selectedUtilityType === "default"
                            ? "#275db5"
                            : "#1e2025",
                        border:
                          selectedUtilityType === "default"
                            ? "2px solid #4b9fff"
                            : "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="utilityType"
                        value="default"
                        checked={selectedUtilityType === "default"}
                        onChange={() => setSelectedUtilityType("default")}
                        style={{
                          accentColor: "#275db5",
                          pointerEvents: "none",
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                          }}
                        >
                          Default
                        </h4>
                        <p
                          style={{
                            color: "#8b8e95",
                            margin: 0,
                            fontSize: "13px",
                          }}
                        >
                          Mevcut bir sipariş veya hesap hakkında mesaj gönder
                        </p>
                      </div>
                    </div>

                    {/* Account Update */}
                    <div
                      onClick={() => setSelectedUtilityType("account_update")}
                      style={{
                        backgroundColor:
                          selectedUtilityType === "account_update"
                            ? "#275db5"
                            : "#1e2025",
                        border:
                          selectedUtilityType === "account_update"
                            ? "2px solid #4b9fff"
                            : "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="utilityType"
                        value="account_update"
                        checked={selectedUtilityType === "account_update"}
                        onChange={() =>
                          setSelectedUtilityType("account_update")
                        }
                        style={{
                          accentColor: "#275db5",
                          pointerEvents: "none",
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                          }}
                        >
                          Account Update
                        </h4>
                        <p
                          style={{
                            color: "#8b8e95",
                            margin: 0,
                            fontSize: "13px",
                          }}
                        >
                          Hesap güncellemeleri ve durum değişiklikleri hakkında
                          bilgilendir
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCategory === "authentication" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div
                      onClick={() => setSelectedAuthType("otp")}
                      style={{
                        backgroundColor:
                          selectedAuthType === "otp" ? "#275db5" : "#1e2025",
                        border:
                          selectedAuthType === "otp"
                            ? "2px solid #4b9fff"
                            : "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="authType"
                        value="otp"
                        checked={selectedAuthType === "otp"}
                        onChange={() => setSelectedAuthType("otp")}
                        style={{
                          accentColor: "#275db5",
                          pointerEvents: "none",
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                          }}
                        >
                          One-time Passcode
                        </h4>
                        <p
                          style={{
                            color: "#8b8e95",
                            margin: 0,
                            fontSize: "13px",
                          }}
                        >
                          Tek seferlik şifre ile giriş yapmak için kod gönder
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Step 2: Edit template
            <div>
              {/* Kampanya Adı ve Dil */}
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginBottom: "20px",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    flex: "0 0 70%",
                    minWidth: "250px",
                    boxSizing: "border-box",
                  }}
                >
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
                      boxSizing: "border-box",
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

                <div
                  style={{
                    flex: "0 0 30%",
                    minWidth: "140px",
                    boxSizing: "border-box",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      color: "#ffffff",
                      fontWeight: "500",
                      marginBottom: "8px",
                      fontSize: "14px",
                    }}
                  >
                    Dil
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #3a3d44",
                      borderRadius: "6px",
                      fontSize: "14px",
                      backgroundColor: "#1e2025",
                      color: "#ffffff",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">İngilizce</option>
                    <option value="de">Almanca</option>
                    <option value="fr">Fransızca</option>
                  </select>
                </div>
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
              <div style={{ marginBottom: "20px", position: "relative" }}>
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
                  onChange={(e) =>
                    e.target.value.length <= 1024 && setBody(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.ctrlKey && e.key.toLowerCase() === "b") {
                      e.preventDefault();
                      formatText("*"); // Kalın
                    }
                    if (e.ctrlKey && e.key.toLowerCase() === "i") {
                      e.preventDefault();
                      formatText("_"); // İtalik
                    }
                    if (
                      e.ctrlKey &&
                      e.shiftKey &&
                      e.key.toLowerCase() === "x"
                    ) {
                      e.preventDefault();
                      formatText("~"); // Üstü çizili
                    }
                  }}
                  placeholder="Mesaj içeriğinizi girin..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #3a3d44",
                    borderRadius: "6px",
                    fontSize: "15px", // biraz büyütüldü
                    minHeight: "120px", // biraz daha büyük
                    maxHeight: "250px",
                    resize: "vertical",
                    backgroundColor: "#1e2025",
                    color: "#ffffff",
                    overflowY: "auto",
                  }}
                />

                {/* Karakter Sayacı */}
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "30px",
                    fontSize: "12px",
                    color: body.length >= 1024 ? "#f87171" : "#9ca3af",
                  }}
                >
                  {body.length}/1024
                </div>

                {/* Toolbar (textarea dışında, altında) */}
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    backgroundColor: "#1e2025",
                    border: "1px solid #3a3d44",
                    borderRadius: "6px",
                    padding: "8px",
                  }}
                >
                  <button
                    onClick={() => formatText("*")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    title="Kalın yazı (*metin*) – Ctrl+B"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    onClick={() => formatText("_")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontStyle: "italic",
                    }}
                    title="İtalik yazı (_metin_) – Ctrl+I"
                  >
                    <em>I</em>
                  </button>
                  <button
                    onClick={() => formatText("~")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "line-through",
                    }}
                    title="Üstü çizili (~metin~) – Ctrl+Shift+X"
                  >
                    S
                  </button>
                  {/* Emoji Picker Butonu */}{" "}
                  <div style={{ position: "relative" }}>
                    {" "}
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: showEmojiPicker
                          ? "#275db5"
                          : "#25272c",
                        border: "1px solid #3a3d44",
                        borderRadius: "4px",
                        color: "#ffffff",
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      title="Emoji seç"
                    >
                      {" "}
                      <Smile size={14} /> Emoji{" "}
                    </button>{" "}
                    {/* Emoji Picker */}{" "}
                    {showEmojiPicker && (
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: 0,
                          zIndex: 1000,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        {" "}
                        <EmojiPicker
                          onEmojiClick={onEmojiClick}
                          theme="dark"
                          width={300}
                          height={400}
                          searchDisabled={false}
                          skinTonesDisabled={true}
                          previewConfig={{ showPreview: false }}
                        />{" "}
                      </div>
                    )}{" "}
                  </div>
                  {/* Emoji kısayolları */}
                  <button
                    onClick={() => setBody(body + "👍")}
                    style={{
                      padding: "6px 8px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    👍
                  </button>
                  <button
                    onClick={() => setBody(body + "🎉")}
                    style={{
                      padding: "6px 8px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    🎉
                  </button>
                  <button
                    onClick={() => setBody(body + "❤️")}
                    style={{
                      padding: "6px 8px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    ❤️
                  </button>
                </div>
              </div>

              {/* BUTONLAR KOMPONENTİ */}
              <ButtonManager buttons={buttons} setButtons={setButtons} />

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
            </div>
          )}
        </div>

        {/* Action Buttons - aynı kalacak */}
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
          {currentStep === 1 ? (
            <button
              onClick={() => setCurrentStep(2)}
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
              Devam Et
            </button>
          ) : (
            <>
              <button
                onClick={() => setCurrentStep(1)}
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
                Geri
              </button>
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
            </>
          )}
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ÖNİZLEME ALANI */}
      <div
        style={{
          width: "clamp(300px, 25vw, 400px)",
          flexShrink: 0,
          overflow: "hidden",
          backgroundColor: "#e5ddd5",
          backgroundImage: `url(${whatsappIcon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: "20px 20px 20px 0",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          border: "1px solid #3a3d44",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "16px 16px",
            backgroundColor: "#dcdedfff",
            color: "#2e2d2dff",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          Template Preview
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
            gap: "8px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#ffffffff",
              borderRadius: "8px 8px 0 8px",
              padding: "8px 10px",
              maxWidth: "85%",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              fontSize: "14px",
              lineHeight: "1.4",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {title && (
              <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                {formatWhatsAppText(title)}
              </div>
            )}
            <div style={{ marginBottom: footerText ? "6px" : "2px" }}>
              {getPreviewContent()}
            </div>
            {footerText && (
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: "#555",
                  marginBottom: "2px",
                }}
              >
                {formatWhatsAppText(footerText)}
              </div>
            )}
            <div
              style={{
                fontSize: "11px",
                color: "#888",
                textAlign: "right",
              }}
            >
              14:30 ✓✓
            </div>
          </div>

          {/* Butonları göster */}
          {buttons.length > 0 && (
            <div
              style={{
                alignSelf: "flex-end",
                maxWidth: "85%",
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "hidden",
                fontSize: "14px",
                marginTop: "8px", // Mesaj içeriğiyle bitişik hale getirildi
                padding: "10px", // Kutucuk içi boşluk
              }}
            >
              {(showAllButtons ? buttons : buttons.slice(0, 3)).map(
                (btn, i) => {
                  // Buton türüne göre ikon seçimi
                  let iconSrc = "";
                  if (btn.type === "quick") iconSrc = quickIcon;
                  if (btn.type === "website") iconSrc = websiteIcon;
                  if (btn.type === "call") iconSrc = callIcon;
                  if (btn.type === "copy") iconSrc = copyIcon;

                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px", // İkon ve yazı arasındaki boşluk
                        color: "#47bdf0ff", // Yazı rengi mavi
                        cursor: "pointer",
                        padding: "8px 0", // Her butonun üst ve alt boşluğu
                        borderBottom:
                          i !==
                          (showAllButtons
                            ? buttons.length
                            : Math.min(buttons.length, 3)) -
                            1
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff")
                      }
                    >
                      {/* SVG İkon */}
                      <img
                        src={iconSrc}
                        alt={`${btn.type} icon`}
                        style={{
                          width: "16px",
                          height: "16px",
                          filter:
                            "brightness(0) saturate(100%) hue-rotate(190deg)", // İkonları her zaman mavi yapar
                        }}
                      />
                      <span
                        style={{
                          fontWeight: "600", // Yazıyı daha kalın yapar
                        }}
                      >
                        {btn.text}
                      </span>
                    </div>
                  );
                }
              )}

              {buttons.length > 3 && (
                <div
                  style={{
                    padding: "10px 12px",
                    textAlign: "center",
                    color: "#027EB5",
                    fontWeight: "500",
                    cursor: "pointer",
                    borderTop: "1px solid rgba(0,0,0,0.1)",
                  }}
                  onClick={() => setShowAllButtons(!showAllButtons)} // Tümünü göster/gizle
                >
                  {showAllButtons ? "🔼 Kapat" : "🔽 Tümünü Görüntüle"}
                </div>
              )}
            </div>
          )}

          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#fff",
              borderRadius: "8px 8px 8px 0",
              padding: "8px 10px",
              maxWidth: "70%",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            Teşekkürler! 👍
            <div
              style={{
                fontSize: "11px",
                color: "#888",
                marginTop: "2px",
              }}
            >
              14:31
            </div>
          </div>
        </div>
      </div>

      {/* Emoji picker dışına tıklandığında kapatmak için overlay */}
      {showEmojiPicker && (
        <div
          onClick={() => setShowEmojiPicker(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: "transparent",
          }}
        />
      )}
    </div>
  );
};

export default Marketing;
