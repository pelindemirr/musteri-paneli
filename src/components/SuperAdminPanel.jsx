import React, { useState } from "react";
import SuperAdminSidebar from "./superadmin/SuperAdminSidebar";
import SuperAdminChatList from "./superadmin/SuperAdminChatList";
import SuperAdminChatWindow from "./superadmin/SuperAdminChatWindow";
import AgentStatistics from "./superadmin/AgentStatistics";

// Zaman damgası ekleyen yardımcı fonksiyon
const withTimestamps = (messages) =>
    messages.map((msg, index) => ({
        ...msg,
        timestamp: new Date(Date.now() - (messages.length - index) * 60 * 1000),
    }));

// CustomerPanelApp.jsx'ten alınan dummyConversations ile değiştirildi
const dummyConversations = [
    // Mevcut müşteriler
    {
        id: 1,
        customerNo: "20240001",
        name: "Emre",
        platform: "whatsapp",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        isFavorite: false,
        phone: "0555 111 11 11",
        address: "İstanbul, Türkiye",
        email: "emre@example.com",
        status: "Bekliyor",
        messages: withTimestamps([
            { sender: "Emre", text: "Geçen ay aldığım internet paketiyle ilgiliydi sanırım." },
            { sender: "Siz", text: "Anladım. Sistemden kontrol ediyorum... Lütfen birkaç saniye bekleyin." },
            { sender: "Siz", text: "Evet, 12 Haziran tarihinde alınan bir internet paketi gözüküyor. PDF fatura olarak mı iletmemi istersiniz, yoksa e-posta adresinize mi göndereyim?" },
            { sender: "Emre", text: "E-postama gönderebilir misiniz lütfen?" },
            { sender: "Siz", text: "Tabii ki. Sistemimizde kayıtlı e-posta adresiniz emre.karaca@example.com. Doğru mudur?" },
            { sender: "Emre", text: "Evet, doğru." },
            { sender: "Siz", text: "Harika! Faturanızı şu anda gönderiyorum... Gönderildi. Gelen kutunuzu ve spam klasörünü kontrol etmeyi unutmayın." },
            { sender: "Emre", text: "Geldi, çok teşekkür ederim." },
            { sender: "Siz", text: "Rica ederim Emre Bey. Başka bir konuda yardımcı olabilir miyim?" },
            { sender: "Emre", text: "Hayır, şimdilik yeterli. İyi çalışmalar." },
            { sender: "Siz", text: "Size de iyi günler dilerim. Her zaman buradayız!" }
        ]),
    },
    {
        id: 2,
        customerNo: "20240002",
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
        customerNo: "20240003",
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
        customerNo: "20240004",
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
        customerNo: "20240005",
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
        customerNo: "20240006",
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
        customerNo: "20240007",
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
        customerNo: "20240008",
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
        customerNo: "20240009",
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
    // Ayşe'den (id:9) sonrası silindi
];

export default function SuperAdminPanel() {
    const [conversations, setConversations] = useState(dummyConversations);
    const [selectedId, setSelectedId] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('all');
    const [conversationFilter, setConversationFilter] = useState('all');
    // Her konuşma için devralma state'i
    const [takenOverConversations, setTakenOverConversations] = useState({});

    const selectedConversation = conversations.find((c) => c.id === selectedId);
    const isTakenOver = selectedId ? takenOverConversations[selectedId] : false;
    const handleTakeOver = () => {
        if (!selectedId) return;
        setTakenOverConversations(prev => ({ ...prev, [selectedId]: true }));
    };

    const handleToggleSidebar = () => setSidebarCollapsed((v) => !v);

    const handleSelectConversation = (id) => {
        setSelectedId(id);
    };

    const handleSendMessage = (text) => {
        if (!selectedId) return;

        setConversations((prevConvs) =>
            prevConvs.map((conv) =>
                conv.id === selectedId
                    ? {
                        ...conv,
                        messages: [
                            ...conv.messages,
                            { sender: "Süper Admin", text, timestamp: new Date() },
                        ],
                        status: conv.status === 'Bekliyor' ? 'Yanıtlandı' : conv.status,
                    }
                    : conv
            )
        );
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        if (section === 'all') setConversationFilter('all');
        else if (section === 'waiting') setConversationFilter('waiting');
        else if (section === 'answered') setConversationFilter('answered');
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            background: '#23262b'
        }}>
            <SuperAdminSidebar
                collapsed={sidebarCollapsed}
                onToggleSidebar={handleToggleSidebar}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
            />

            <div style={{
                flex: 1,
                display: 'flex',
                overflow: 'hidden'
            }}>
                <SuperAdminChatList
                    conversations={conversations}
                    selectedId={selectedId}
                    onSelectConversation={handleSelectConversation}
                    conversationFilter={conversationFilter}
                />

                <SuperAdminChatWindow
                    conversation={selectedConversation}
                    onSendMessage={handleSendMessage}
                    isTakenOver={isTakenOver}
                    onTakeOver={handleTakeOver}
                />

                <AgentStatistics customer={selectedConversation} />
            </div>
        </div>
    );
} 