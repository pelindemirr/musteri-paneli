import React, { useState } from "react";
import SuperAdminSidebar from "./superadmin/SuperAdminSidebar";
import SuperAdminChatList from "./superadmin/SuperAdminChatList";
import SuperAdminChatWindow from "./superadmin/SuperAdminChatWindow";
import AgentStatistics from "./superadmin/AgentStatistics";
import MacroModal from "./superadmin/MacroModal";
import UserManagementPanel from "./superadmin/UserManagementPanel";
import Marketing from "./superadmin/MarketingPanel";
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

// Her sohbete tek bir sorumlu temsilci atayarak veri tutarlılığını sağla
const agentsForAssignment = ["Ali Vural", "Zeynep Kaya", "Ali Kadem", "Elif Gün", "Berat Şaş"];
dummyConversations.forEach((conv, index) => {
    // 1. Her sohbete döngüsel olarak bir sorumlu ata
    const responsibleAgent = agentsForAssignment[index % agentsForAssignment.length];

    // 2. Bu sohbetteki TÜM temsilci mesajlarını bu sorumlu temsilcinin adıyla GÜNCELLE
    conv.messages.forEach(msg => {
        // Müşteri veya Süper Admin olmayan tüm mesajlar temsilci mesajıdır
        if (msg.sender !== conv.name && msg.sender !== 'Süper Admin') {
            msg.sender = responsibleAgent;
        }
    });
});

// Hazır mesajlar (makrolar) başlangıcı
const initialMacros = [
    "Yardımcı olabildiysem ne mutlu!",
    "İyi günler dilerim!",
    "Teşekkürler, tekrar görüşmek üzere.",
    "Sorununuz çözüldü mü?",
    "Sohbeti sonlandırmak ister misiniz?",
    "Başka bir temsilciye aktarmamı ister misiniz?",
    "Yöneticiye aktarıyorum.",
    "Herhangi bir sorunuz olursa tekrar yazabilirsiniz.",
    "Görüşmek üzere!",
    "Başka bir konuda yardımcı olabilir miyim?"
];

export default function SuperAdminPanel() {
    const [conversations, setConversations] = useState(dummyConversations);
    const [macros, setMacros] = useState(initialMacros);
    const [macroModalOpen, setMacroModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('all');
    const [conversationFilter, setConversationFilter] = useState('all');
    // Her konuşma için devralma state'i
    const [takenOverConversations, setTakenOverConversations] = useState({});
    const [userPanelOpen, setUserPanelOpen] = useState(false);



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

    const [marketingPanelOpen, setMarketingPanelOpen] = useState(false);

    // Makro CRUD fonksiyonları
    const handleAddMacro = (msg) => setMacros(prev => [...prev, msg]);
    const handleEditMacro = (idx, msg) => setMacros(prev => prev.map((m, i) => i === idx ? msg : m));
    const handleDeleteMacro = (idx) => setMacros(prev => prev.filter((_, i) => i !== idx));

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1a1d21' }}>
            <SuperAdminSidebar
                collapsed={sidebarCollapsed}
                onToggleSidebar={handleToggleSidebar}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                onOpenMacroModal={() => setMacroModalOpen(true)}
                onOpenUserPanel={() => setUserPanelOpen(true)}
                onOpenMarketing={() => setMarketingPanelOpen(true)} // <-- BUNU EKLE!
            />

            <div style={{
                width: '1px',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
            }}></div>

            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <SuperAdminChatList
                    conversations={conversations}
                    selectedId={selectedId}
                    onSelectConversation={handleSelectConversation}
                    conversationFilter={conversationFilter}
                    macroModalOpen={macroModalOpen}
                />

                <SuperAdminChatWindow
                    conversation={selectedConversation}
                    onSendMessage={handleSendMessage}
                    isTakenOver={isTakenOver}
                    onTakeOver={handleTakeOver}
                    macroModalOpen={macroModalOpen}
                />

                <AgentStatistics customer={selectedConversation} macroModalOpen={macroModalOpen} />

                {userPanelOpen && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 3000,
                        background: '#23262b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 0,
                        boxShadow: 'none',
                    }}>
                        <UserManagementPanel onClose={() => setUserPanelOpen(false)} />
                    </div>
                )}
            </div>


            {marketingPanelOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: sidebarCollapsed ? 56 : 280,
                        width: `calc(100% - ${sidebarCollapsed ? 56 : 280}px)`,
                        height: '100%',
                        zIndex: 3000,
                        background: '#23262b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 0,
                        boxShadow: 'none',
                    }}
                >
                    <Marketing onClose={() => setMarketingPanelOpen(false)} />
                </div>
            )}
            <MacroModal
                open={macroModalOpen}
                onClose={() => setMacroModalOpen(false)}
                messages={macros}
                onAdd={handleAddMacro}
                onEdit={handleEditMacro}
                onDelete={handleDeleteMacro}
            />
        </div>
    );
} 