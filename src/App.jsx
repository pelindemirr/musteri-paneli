import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import ChatList from "./components/chatlist";
import ChatWindow from "./components/chatwindow";
import CustomerPanel from "./components/CustomerPanel";

// Zaman damgası ekleyen yardımcı fonksiyon
const withTimestamps = (messages) =>
  messages.map((msg, index) => ({
    ...msg,
    timestamp: new Date(Date.now() - (messages.length - index) * 60 * 1000),
  }));

// Başlangıç sohbet verileri (favori bilgisi dahil)
const dummyConversations = [
  {
    id: 1,
    name: "Emre",
    platform: "whatsapp",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    isFavorite: false,
    phone: "0555 111 11 11",
    address: "İstanbul, Türkiye",
    email: "emre@example.com",
    status: "Bekliyor",
    messages: withTimestamps([
      { sender: "Emre", text: "Merhaba!" },
      { sender: "Siz", text: "Merhaba, nasıl yardımcı olabilirim?" },
      { sender: "Emre", text: "Bir konuda desteğe ihtiyacım var." },
      { sender: "Siz", text: "Tabii, nasıl yardımcı olabilirim?" },
      { sender: "Emre", text: "Hesabımda bir sorun var." },
      { sender: "Siz", text: "Detay verebilir misiniz?" },
      { sender: "Emre", text: "Oturum açmaya çalıştığımda 'hatalı şifre' uyarısı alıyorum." },
      { sender: "Siz", text: "Şifrenizi yakın zamanda değiştirdiniz mi?" },
      { sender: "Emre", text: "Hayır, uzun zamandır aynı şifreyi kullanıyorum." },
      { sender: "Siz", text: "Size bir şifre sıfırlama bağlantısı gönderebilirim, e-posta adresinizi paylaşır mısınız?" },
      { sender: "Emre", text: "Tabii, emre@example.com" },
      { sender: "Siz", text: "Teşekkürler. Şifre sıfırlama bağlantısını şimdi gönderdim. Gelen kutunuzu kontrol edebilir misiniz?" },
      { sender: "Emre", text: "Evet, geldi. Şifreyi değiştiriyorum." },
      { sender: "Siz", text: "Yeni şifrenizle oturum açmayı deneyin lütfen." },
      { sender: "Emre", text: "Oldu! Şimdi giriş yapabiliyorum, çok teşekkürler." },
      { sender: "Siz", text: "Rica ederim 😊 Başka bir konuda yardımcı olabilir miyim?" },
      { sender: "Emre", text: "Hayır, hepsi bu kadar. İyi günler!" },
      { sender: "Siz", text: "Size de iyi günler dilerim." }
    ]),
  },
  {
    id: 2,
    name: "İrem",
    platform: "facebook",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    isFavorite: true,
    phone: "0555 222 22 22",
    address: "Ankara, Türkiye",
    email: "irem@example.com",
    status: "Yanıtlandı",
    messages: withTimestamps([
      { sender: "İrem", text: "Faturamı bulamıyorum." },
      { sender: "Siz", text: "Hemen yardımcı oluyorum." },
      { sender: "İrem", text: "Teşekkürler!" },
      { sender: "Siz", text: "Rica ederim, başka bir isteğiniz var mı?" },
    ]),
  },
  {
    id: 3,
    name: "Dilara",
    platform: "web",
    avatar: "",
    isFavorite: false,
    phone: "0555 333 33 33",
    address: "İzmir, Türkiye",
    email: "dilara@example.com",
    status: "Yanıtlandı",
    messages: withTimestamps([
      { sender: "Dilara", text: "Cihaz kurulumu nasıl yapılır?" },
      { sender: "Siz", text: "Kurulum adımlarını paylaşıyorum." },
      { sender: "Dilara", text: "Çok teşekkürler, kurulum tamamlandı." },
      { sender: "Siz", text: "Yardımcı olabildiysem ne mutlu!" },
    ]),
  },
  {
    id: 4,
    name: "Azra",
    platform: "email",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    isFavorite: false,
    phone: "0555 444 44 44",
    address: "Bursa, Türkiye",
    email: "azra@example.com",
    status: "Bekliyor",
    messages: withTimestamps([
      { sender: "Azra", text: "Ürünüm kargoya verildi mi?" },
      { sender: "Siz", text: "Siparişinizi kontrol ediyorum..." },
      { sender: "Siz", text: "Evet, kargonuz bugün yola çıktı." },
      { sender: "Azra", text: "Harika, teşekkürler!" },
    ]),
  },
  {
    id: 5,
    name: "Alper",
    platform: "whatsapp",
    avatar: "",
    isFavorite: true,
    phone: "0555 555 55 55",
    address: "Antalya, Türkiye",
    email: "alper@example.com",
    status: "Yanıtlandı",
    messages: withTimestamps([
      { sender: "Alper", text: "Merhaba, hesabıma giriş yapamıyorum." },
      { sender: "Siz", text: "Merhaba Alper Bey, hata mesajı alıyor musunuz?" },
      { sender: "Alper", text: "Evet, 'kullanıcı bulunamadı' diyor." },
      { sender: "Siz", text: "Mail adresinizi paylaşır mısınız kontrol edeyim?" },
      { sender: "Alper", text: "alper@example.com" },
      { sender: "Siz", text: "Görüyorum, bir harf eksik yazılmış. Güncelledim, tekrar deneyin lütfen." },
      { sender: "Alper", text: "Oldu! Giriş yapabiliyorum. Teşekkür ederim." },
    ]),
  },
  {
    id: 6,
    name: "Pelin",
    platform: "facebook",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    isFavorite: false,
    phone: "0555 666 66 66",
    address: "Eskişehir, Türkiye",
    email: "pelin@example.com",
    status: "Bekliyor",
    messages: withTimestamps([
      { sender: "Pelin", text: "Siparişim hâlâ kargoya verilmemiş görünüyor." },
      { sender: "Siz", text: "Kontrol ediyorum Pelin Hanım..." },
      { sender: "Siz", text: "Ürününüz bugün kargoya verilmiş, takip numarasını paylaşayım mı?" },
      { sender: "Pelin", text: "Evet lütfen." },
      { sender: "Siz", text: "Takip numaranız: 123456789. Kargo: PTT." },
      { sender: "Pelin", text: "Çok teşekkür ederim." },
    ]),
  },
  {
    id: 7,
    name: "Selin",
    platform: "web",
    avatar: "",
    isFavorite: true,
    phone: "0555 777 77 77",
    address: "Adana, Türkiye",
    email: "selin@example.com",
    status: "Yanıtlandı",
    messages: withTimestamps([
      { sender: "Selin", text: "Ürünüm arızalı geldi." },
      { sender: "Siz", text: "Üzgünüm bunu duyduğuma. Hangi ürün olduğunu öğrenebilir miyim?" },
      { sender: "Selin", text: "Akıllı bileklik." },
      { sender: "Siz", text: "Size bir iade formu göndereceğim, onu doldurup kargoya verebilir misiniz?" },
      { sender: "Selin", text: "Elbette." },
      { sender: "Siz", text: "Form e-postanıza gönderildi. Yardımcı olabileceğim başka bir konu var mı?" },
      { sender: "Selin", text: "Hayır, teşekkür ederim." },
    ]),
  },
  {
    id: 8,
    name: "Yağmur",
    platform: "email",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    isFavorite: false,
    phone: "0555 888 88 88",
    address: "Samsun, Türkiye",
    email: "yagmur@example.com",
    status: "Bekliyor",
    messages: withTimestamps([
      { sender: "Yağmur", text: "Yeni kampanyalarınız var mı?" },
      { sender: "Siz", text: "Evet! %20 indirimli yaz kampanyası başladı." },
      { sender: "Yağmur", text: "Harika, link gönderebilir misiniz?" },
      { sender: "Siz", text: "Tabii: www.orneksite.com/kampanya" },
      { sender: "Yağmur", text: "Teşekkürler 😊" },
    ]),
  },
  {
    id: 9,
    name: "Ayşe",
    platform: "whatsapp",
    avatar: "",
    isFavorite: false,
    phone: "0555 999 99 99",
    address: "Trabzon, Türkiye",
    email: "ayse@example.com",
    status: "Yanıtlandı",
    messages: withTimestamps([
      { sender: "Yağmur", text: "Yeni kampanyalarınız var mı?" },
      { sender: "Siz", text: "Evet! %20 indirimli yaz kampanyası başladı." },
      { sender: "Yağmur", text: "Harika, link gönderebilir misiniz?" },
      { sender: "Siz", text: "Tabii: www.orneksite.com/kampanya" },
      { sender: "Yağmur", text: "Teşekkürler 😊" },
    ]),
  },
];

function App() {
  const [conversations, setConversations] = useState(dummyConversations);
  const [selectedId, setSelectedId] = useState(conversations[0]?.id || null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const selectedConversation = conversations.find((c) => c.id === selectedId);
  const visibleConversations = showOnlyFavorites
    ? conversations.filter((c) => c.isFavorite)
    : conversations;

  // Favori ekleme / çıkarma
  const toggleFavorite = (id) => {
    const updated = conversations.map((conv) =>
      conv.id === id ? { ...conv, isFavorite: !conv.isFavorite } : conv
    );
    setConversations(updated);
  };

  // Mesaj gönderme (hazır mesajlar için de kullanılır)
  const handleSendMessage = (text) => {
    setConversations((prevConvs) =>
      prevConvs.map((conv) =>
        conv.id === selectedId
          ? {
            ...conv,
            messages: [
              ...conv.messages,
              { sender: "Siz", text, timestamp: new Date() },
            ],
          }
          : conv
      )
    );
  };

  // Örnek müşteri bilgisi (gerekirse yukarıya ekle)
  const customer = selectedConversation
    ? {
      name: selectedConversation.name,
      info: "Kullanıcı bilgileri",
      avatar: selectedConversation.avatar,
      phone: selectedConversation.phone,
      address: selectedConversation.address,
      email: selectedConversation.email
    }
    : {
      name: "Müşteri",
      info: "Kullanıcı bilgileri",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "-",
      address: "-",
      email: "-"
    };

  // Sohbete dahil ol (başlat)
  const handleStartChat = (id) => {
    setConversations((prevConvs) =>
      prevConvs.map((conv) =>
        conv.id === id
          ? {
            ...conv,
            status: "Aktif",
            startedAt: new Date(), // Sohbet başlangıç zamanı
          }
          : conv
      )
    );
  };

  // Sohbeti bitir
  const handleEndChat = (id) => {
    setConversations((prevConvs) =>
      prevConvs.map((conv) =>
        conv.id === id
          ? {
            ...conv,
            status: "Kapatıldı",
            endedAt: new Date(), // Sohbet bitiş zamanı
          }
          : conv
      )
    );
  };

  return (
    <div className="app-container">
      <Sidebar
        showFavorites={showOnlyFavorites}
        onToggleFavorites={setShowOnlyFavorites}
      />
      <div className="main-content">
        <div className="chatlist-panel">
          <ChatList
            conversations={visibleConversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onToggleFavorite={toggleFavorite}
            onStartChat={handleStartChat}
            onEndChat={handleEndChat}
          />
        </div>
        <div className="chatwindow-panel">
          <ChatWindow conversation={selectedConversation} />
        </div>
        <div className="customer-panel-wrapper">
          <CustomerPanel
            customer={customer}
            handleSendMessage={handleSendMessage}
            onEndChat={handleEndChat}
            conversationStatus={selectedConversation?.status}
            conversationId={selectedConversation?.id}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
