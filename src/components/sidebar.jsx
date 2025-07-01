function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="logo">CallPilot</h2>
            <input type="text" className="search-input" placeholder="Search..." />

            <div className="menu-section">
                <p className="menu-title">Gelen Kutusu</p>
            </div>

            <div className="menu-section">
                <p className="menu-title">Konuşmalar</p>
                <button className="menu-button">Bütün Konuşmalar</button>
                <button className="menu-button">Favoriler</button>
                <button className="menu-button">Özel Konuşmalar</button>
            </div>

            <div className="menu-section">
                <hr className="sidebar-divider" />
                <p className="menu-title">Dosyalar</p>
                <p className="menu-item">Müşteri Bilgileri</p>
            </div>
            <hr className="sidebar-divider" />
            <div className="menu-section">
                <p className="menu-title">Takımlar</p>
                <p className="menu-item">Admin</p>
                <hr className="sidebar-divider" />
            </div>

            <div className="menu-section">
                <p className="menu-title">Kanallar</p>
                <ul className="channel-list">
                    <li>Email</li>
                    <li>Facebook</li>
                </ul>
                <hr className="sidebar-divider" />
            </div>

            <div className="user-info-box">
                <span className="user-name">Azra</span>
                <span className="user-mail">ıknowtechnology@mail.com</span>
            </div>
        </div>
    );
}

export default Sidebar;