import Sidebar from "./components/sidebar";
import ChatList from "./components/chatlist";
import ChatWindow from "./components/chatwindow";
import React, { useState } from "react";

const dummyConversations = [
  {
    id: 1,
    name: "Emre",
    messages: [
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
    ],
  },
  {
    id: 2,
    name: "İrem",
    messages: [
      { sender: "İrem", text: "Faturamı bulamıyorum." },
      { sender: "Siz", text: "Hemen yardımcı oluyorum." },
      { sender: "İrem", text: "Teşekkürler!" },
      { sender: "Siz", text: "Rica ederim, başka bir isteğiniz var mı?" },
    ],
  },
  {
    id: 3,
    name: "Dilara",
    messages: [
      { sender: "Dilara", text: "Cihaz kurulumu nasıl yapılır?" },
      { sender: "Siz", text: "Kurulum adımlarını paylaşıyorum." },
      { sender: "Dilara", text: "Çok teşekkürler, kurulum tamamlandı." },
      { sender: "Siz", text: "Yardımcı olabildiysem ne mutlu!" },
    ],
  },
  {
    id: 4,
    name: "Azra",
    messages: [
      { sender: "Azra", text: "Ürünüm kargoya verildi mi?" },
      { sender: "Siz", text: "Siparişinizi kontrol ediyorum..." },
      { sender: "Siz", text: "Evet, kargonuz bugün yola çıktı." },
      { sender: "Azra", text: "Harika, teşekkürler!" },
    ],
  },
]

function App() {
  const [conversations] = useState(dummyConversations);
  const [selectedId, setSelectedId] = useState(conversations[0]?.id || null);
  const selectedConversation = conversations.find((c) => c.id === selectedId);

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: 300, borderRight: '1px solid #eee' }}>
          <ChatList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <div style={{ flex: 1 }}>
          <ChatWindow conversation={selectedConversation} />
        </div>
      </div>
    </div>
  );
  /* <div className="message-input-row">
     <input className="message-input" placeholder="Mesajınızı yazın..." />
     <button className="send-button">
       Gönder
       <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
         <path fill="currentColor" d="M2 21l21-9-21-9v7l15 2-15 2v7z" />
       </svg>
     </button>
   </div>*/
  <div className="main-content">
    <div className="messages-area">
      {/* Burada mesaj balonları olacak */}
    </div>
    <div className="message-input-row">
      <input className="message-input" placeholder="Mesajınızı yazın..." />
      <button className="send-button">Gönder</button>
    </div>
  </div>
}

export default App;
