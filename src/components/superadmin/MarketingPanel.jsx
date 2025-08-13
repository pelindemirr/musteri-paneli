import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import marketingIcon from "../../assets/Marketing/marketing.svg";
import utilityIcon from "../../assets/Marketing/utility.svg";
import authIcon from "../../assets/Marketing/authentication.svg";
import imageIcon from "../../assets/Marketing/image.svg";
import videoIcon from "../../assets/Marketing/video.svg";
import documentIcon from "../../assets/Marketing/document.svg";
import phoneIcon from "../../assets/Marketing/call.svg";
import copyIcon from "../../assets/Marketing/copy.svg";
import campaignIcon from "../../assets/Marketing/campaign.svg";
import customIcon from "../../assets/Marketing/custom.svg";
import KonumIcon from "../../assets/Marketing/konum.svg";

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

  const [footerText, setFooterText] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("marketing");

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
                {currentStep === 1 ? "Şablon Kurulum" : "Kampanya Oluştur"}
              </h1>
              <p
                style={{
                  color: "#8b8e95",
                  fontSize: "14px",
                  margin: "4px 0 0 0",
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
            {/* Step 1 */}
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

            {/* Çizgi */}
            <div
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: currentStep > 1 ? "#275db5" : "#3a3d44",
              }}
            />

            {/* Step 2 */}
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
              {/* Category Selection */}
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
                          : "scale(1)", // seçilince büyütme
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
                          filter: "brightness(0) invert(1)", // her zaman beyaz
                          transition: "transform 0.2s ease",
                          transform:
                            selectedCategory === "marketing"
                              ? "scale(1.1)"
                              : "scale(1)", // ikon da büyüsün
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
                          : "scale(1)", // büyüme efekti
                      boxShadow:
                        selectedCategory === "utility"
                          ? "0 4px 8px rgba(0,0,0,0.3)"
                          : "none", // seçilince gölge
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
                          filter: "brightness(0) invert(1)", // her zaman beyaz
                          transition: "transform 0.2s ease",
                          transform:
                            selectedCategory === "utility"
                              ? "scale(1.1)"
                              : "scale(1)", // ikon da büyüsün
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
                      boxShadow:
                        selectedCategory === "authentication"
                          ? "0 4px 8px rgba(0,0,0,0.3)"
                          : "none",
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
                          filter: "brightness(0) invert(1)", // her zaman beyaz
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

              {/* Template Type Selection */}
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
                    <div
                      style={{
                        backgroundColor: "#1e2025",
                        border: "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <input
                        type="radio"
                        name="marketingType"
                        value="default"
                        defaultChecked
                        style={{ accentColor: "#275db5" }}
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
                    <div
                      style={{
                        backgroundColor: "#1e2025",
                        border: "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <input
                        type="radio"
                        name="marketingType"
                        value="catalog"
                        style={{ accentColor: "#275db5" }}
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
                    <div
                      style={{
                        backgroundColor: "#1e2025",
                        border: "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <input
                        type="radio"
                        name="marketingType"
                        value="permissions"
                        style={{ accentColor: "#275db5" }}
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
                    <div
                      style={{
                        backgroundColor: "#1e2025",
                        border: "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <input
                        type="radio"
                        name="utilityType"
                        value="default"
                        defaultChecked
                        style={{ accentColor: "#275db5" }}
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
                    <div
                      style={{
                        backgroundColor: "#1e2025",
                        border: "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <input
                        type="radio"
                        name="utilityType"
                        value="permissions"
                        style={{ accentColor: "#275db5" }}
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

                {selectedCategory === "authentication" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#1e2025",
                        border: "1px solid #3a3d44",
                        borderRadius: "8px",
                        padding: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <input
                        type="radio"
                        name="authType"
                        value="otp"
                        defaultChecked
                        style={{ accentColor: "#275db5" }}
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
            // Step 2: Edit template (Existing campaign content)
            <div>
              {/* Kampanya Adı ve Dil Seçimi */}
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginBottom: "20px",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {/* Kampanya Adı */}
                <div
                  style={{
                    flex: "0 0 70%", // geniş ekranda %70 kaplar
                    minWidth: "250px", // 250px altına düşerse alta geçer
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

                {/* Dil Seçimi */}
                <div
                  style={{
                    flex: "0 0 30%", // geniş ekranda %30 kaplar
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
                          onChange={(e) =>
                            setSelectedVariableType(e.target.value)
                          }
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
                            selectedMediaType === media.id
                              ? "#2d3036"
                              : "#25272c",
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

                {/* Text Formatting Toolbar */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "8px",
                    padding: "8px",
                    backgroundColor: "#1e2025",
                    borderRadius: "6px 6px 0 0",
                    border: "1px solid #3a3d44",
                    borderBottom: "none",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => {
                      const textarea = document.querySelector(
                        'textarea[placeholder="Mesaj içeriğinizi girin..."]'
                      );
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = body.substring(start, end);
                      const newText =
                        body.substring(0, start) +
                        "*" +
                        selectedText +
                        "*" +
                        body.substring(end);
                      setBody(newText);
                      setTimeout(() => {
                        textarea.focus();
                        textarea.setSelectionRange(start + 1, end + 1);
                      }, 0);
                    }}
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
                    title="Kalın yazı (*metin*)"
                  >
                    <strong>B</strong>
                  </button>

                  <button
                    onClick={() => {
                      const textarea = document.querySelector(
                        'textarea[placeholder="Mesaj içeriğinizi girin..."]'
                      );
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = body.substring(start, end);
                      const newText =
                        body.substring(0, start) +
                        "_" +
                        selectedText +
                        "_" +
                        body.substring(end);
                      setBody(newText);
                      setTimeout(() => {
                        textarea.focus();
                        textarea.setSelectionRange(start + 1, end + 1);
                      }, 0);
                    }}
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
                    title="İtalik yazı (_metin_)"
                  >
                    <em>I</em>
                  </button>

                  <button
                    onClick={() => {
                      const textarea = document.querySelector(
                        'textarea[placeholder="Mesaj içeriğinizi girin..."]'
                      );
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = body.substring(start, end);
                      const newText =
                        body.substring(0, start) +
                        "~" +
                        selectedText +
                        "~" +
                        body.substring(end);
                      setBody(newText);
                      setTimeout(() => {
                        textarea.focus();
                        textarea.setSelectionRange(start + 1, end + 1);
                      }, 0);
                    }}
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
                    title="Üstü çizili (~metin~)"
                  >
                    S
                  </button>

                  <button
                    onClick={() => setBody(body + "😊")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    title="Emoji ekle"
                  >
                    😊
                  </button>

                  <button
                    onClick={() => setBody(body + "👍")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    title="Thumbs up"
                  >
                    👍
                  </button>

                  <button
                    onClick={() => setBody(body + "🎉")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    title="Celebration"
                  >
                    🎉
                  </button>

                  <button
                    onClick={() => setBody(body + "❤️")}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#25272c",
                      border: "1px solid #3a3d44",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    title="Heart"
                  >
                    ❤️
                  </button>
                </div>

                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Mesaj içeriğinizi girin..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #3a3d44",
                    borderRadius: "0 0 6px 6px",
                    fontSize: "14px",
                    minHeight: "100px",
                    maxHeight: "200px",
                    resize: "vertical",
                    backgroundColor: "#1e2025",
                    color: "#ffffff",
                    overflowY: "auto",
                    borderTop: "none",
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
                  Müşterilerinize mesajınıza cevap vermesi veya belirli bir
                  işlem yapması için butonlar eklemenize yarar. En fazla 10
                  buton eklenebilir. 3'ten fazla buton eklenirse, liste şeklinde
                  görünür.
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
                    width: "50%",
                    marginBottom: "12px",
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
                      position: "relative",
                      width: "100%",
                      maxWidth: 320,
                      marginBottom: "20px",
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
                      }}
                    >
                      {/* Custom Button */}
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
                          icon: "/assets/Marketing/website.svg", // Doğru SVG yolunu buraya koyun
                        },
                        {
                          id: "whatsapp",
                          label: "Call on WhatsApp",
                          desc: "WhatsApp üzerinden ara",
                          icon: phoneIcon,
                        },
                        {
                          id: "call",
                          label: "Call Phone Number",
                          desc: "Telefon numarasını ara",
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
                              cursor: isAlreadyAdded
                                ? "not-allowed"
                                : "pointer",
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
                          !quickReply.trim() || buttons.length >= 10
                            ? "#444"
                            : "#275db5",
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
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
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
                          <option>Static</option>
                        </select>
                      </div>

                      <div>
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
                            marginTop: "4px",
                          }}
                        >
                          {websiteButtonText.length}/25
                        </div>
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
                              {country.code.split(" ")[1]}{" "}
                              {country.code.split(" ")[0]}
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
                                <div
                                  style={{ fontSize: "11px", color: "#8b8e95" }}
                                >
                                  {btn.url}
                                </div>
                              )}
                              {btn.phone && (
                                <div
                                  style={{ fontSize: "11px", color: "#8b8e95" }}
                                >
                                  {btn.country} {btn.phone}
                                </div>
                              )}
                              {btn.code && (
                                <div
                                  style={{ fontSize: "11px", color: "#8b8e95" }}
                                >
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
          )}
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
