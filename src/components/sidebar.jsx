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
            </div>

            <div className="menu-section">
                <p className="menu-title">Folders</p>
                <p className="menu-item">Priority Conversations</p>
            </div>

            <div className="menu-section">
                <p className="menu-title">Teams</p>

            </div>

            <div className="menu-section">
                <p className="menu-title">Channels</p>
                <ul className="channel-list">

                    <li>PaperLayer Email</li>

                </ul>
            </div>

            <div className="user-info">
                <p>Azra</p>
                <span>ıknowtechnology@gmail.com</span>
            </div>
        </div>
    );
}


export default Sidebar;
