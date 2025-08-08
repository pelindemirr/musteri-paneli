import React, { useState, useMemo } from "react";
import { FiUsers, FiUserCheck, FiUserX, FiBriefcase, FiUser, FiPlus, FiEdit2, FiTrash2, FiX, FiCheckCircle, FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

const initialTeams = [
    { id: 1, name: "Yöneticiler" },
    { id: 2, name: "Takım 1" },
    { id: 3, name: "Takım 2" },
];

const initialUsers = [
    // Yöneticiler Takımı
    { id: 1, name: "Ayşe Yılmaz", role: "Yönetici", email: "ayse@callpilot.com", phone: "0555 111 11 11", team: 1, avatar: "" },
    { id: 5, name: "Enes Deniz", role: "Yönetici", email: "enes@callpilot.com", phone: "0555 555 55 55", team: 1, avatar: "" },

    // Takım 1 (1 Yönetici + 2 Temsilci)
    { id: 2, name: "Mehmet Demir", role: "Yönetici", email: "mehmet@callpilot.com", phone: "0555 222 22 22", team: 2, avatar: "" },
    { id: 3, name: "Ali Vural", role: "Temsilci", email: "ali@callpilot.com", phone: "0555 333 33 33", team: 2, avatar: "" },
    { id: 4, name: "Zeynep Kaya", role: "Temsilci", email: "zeynep@callpilot.com", phone: "0555 444 44 44", team: 2, avatar: "" },

    // Takım 2 (3 Temsilci)
    { id: 6, name: "Ali Kadem", role: "Temsilci", email: "alikadem@callpilot.com", phone: "0555 666 66 66", team: 3, avatar: "" },
    { id: 7, name: "Elif Gün", role: "Temsilci", email: "elif@callpilot.com", phone: "0555 777 77 77", team: 3, avatar: "" },
    { id: 8, name: "Berat Şaş", role: "Temsilci", email: "berat@callpilot.com", phone: "0555 888 88 88", team: 3, avatar: "" },
    { id: 5, name: "Enes Deniz", role: "Yönetici", email: "enes@callpilot.com", phone: "0555 555 55 55", team: 1, avatar: "" },
];

export default function UserManagementPanel({ onClose }) {
    const [teams, setTeams] = useState(initialTeams);
    const [users, setUsers] = useState(initialUsers);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState('all');

    // Modals and Forms states
    const [editUser, setEditUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showAddTeam, setShowAddTeam] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", role: "Temsilci", team: teams[1]?.id || 2 });
    const [newTeamName, setNewTeamName] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Accordion states
    const [teamsAccordionOpen, setTeamsAccordionOpen] = useState(true);

    const listableUsers = useMemo(() => {
        let filtered = users;
        if (activeFilter === 'managers') filtered = users.filter(u => u.role === 'Yönetici');
        else if (activeFilter === 'agents') filtered = users.filter(u => u.role === 'Temsilci');
        else if (typeof activeFilter === 'number') filtered = users.filter(u => u.team === activeFilter);

        if (search) filtered = filtered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

        return filtered;
    }, [users, activeFilter, search]);

    // --- LOGIC FUNCTIONS (Restored) ---
    const handleAddUser = () => {
        setUsers([...users, { ...newUser, id: Date.now() }]);
        setShowAddUser(false);
        setNewUser({ name: "", email: "", phone: "", role: "Temsilci", team: teams[1]?.id || 2 });
    };

    const handleEditUser = () => {
        setUsers(users.map(u => (u.id === editUser.id ? editUser : u)));
        setEditUser(null);
    };

    const handleAddTeam = () => {
        setTeams([...teams, { id: Date.now(), name: newTeamName }]);
        setShowAddTeam(false);
        setNewTeamName("");
    };

    const confirmDelete = () => {
        setUsers(users.filter(u => u.id !== deleteConfirm));
        setDeleteConfirm(null);
        setSelectedUser(null);
    };

    const openAddUserForm = () => {
        setSelectedUser(null);
        setEditUser(null);
        setShowAddTeam(false);
        setShowAddUser(true);
    };

    const openAddTeamForm = () => {
        setSelectedUser(null);
        setEditUser(null);
        setShowAddUser(false);
        setShowAddTeam(true);
    };

    const handleSelectUser = (user) => {
        setShowAddUser(false);
        setShowAddTeam(false);
        setEditUser(null);
        setSelectedUser(user);
    }

    // --- RENDER ---
    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', background: '#181818', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
            {/* Left Panel */}
            <div style={styles.leftPanel}>
                {/* ... (Header and search bar are fine) ... */}
                <div style={styles.leftPanelHeader}>
                    <h2 style={{ color: '#275db5', margin: 0, fontSize: 22, fontWeight: 700, marginleft: 25 }}>Kullanıcı Yönetimi</h2>
                    <button onClick={onClose} style={styles.closeButton}>×</button>
                </div>

                <div style={styles.searchContainer}>
                    <FiSearch style={{ color: '#888', marginRight: 8 }} />
                    <input type="text" placeholder="Çalışan ara..." value={search} onChange={e => setSearch(e.target.value)} style={styles.searchInput} />
                </div>

                {/* --- Tab Filters with Icons and new Colors --- */}
                <div style={styles.tabFilters}>
                    <button
                        style={{ ...styles.tabButton, ...(activeFilter === 'all' ? styles.tabButtonActive : {}) }}
                        onClick={() => setActiveFilter('all')}>
                        <FiUsers size={14} />
                        <span>Tüm Çalışanlar</span>
                    </button>
                    <button
                        style={{ ...styles.tabButton, ...(activeFilter === 'managers' ? styles.tabButtonActive : {}) }}
                        onClick={() => setActiveFilter('managers')}>
                        <FiUserCheck size={14} />
                        <span>Yöneticiler</span>
                    </button>
                    <button
                        style={{ ...styles.tabButton, ...(activeFilter === 'agents' ? styles.tabButtonActive : {}) }}
                        onClick={() => setActiveFilter('agents')}>
                        <FiUser size={14} />
                        <span>Temsilciler</span>
                    </button>
                </div>

                {/* Teams Accordion */}
                <div style={styles.filtersContainer}>
                    <div style={styles.accordionSection}>
                        <div style={styles.accordionHeader} onClick={() => setTeamsAccordionOpen(!teamsAccordionOpen)}>
                            <h3 style={styles.sectionTitle}>TAKIMLAR</h3>
                            {teamsAccordionOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                        {teamsAccordionOpen && (
                            <div style={{ padding: '8px 0' }}>
                                {teams.map(team => (
                                    <FilterButton key={team.id} icon={<FiBriefcase />} label={team.name} count={users.filter(u => u.team === team.id).length} active={activeFilter === team.id} onClick={() => setActiveFilter(team.id)} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* User List */}
                <div style={styles.scrollableUserList}>
                    {listableUsers.map(user => (
                        <UserListItem key={user.id} user={user} selected={selectedUser?.id === user.id} onClick={() => handleSelectUser(user)} />
                    ))}
                </div>

                {/* Footer Buttons with onClick */}
                <div style={styles.footerButtons}>
                    <button onClick={openAddUserForm} style={{ ...styles.actionButton, background: '#28a745' }}><FiPlus /> Temsilci Ekle</button>
                    <button onClick={openAddTeamForm} style={{ ...styles.actionButton, background: '#275db5' }}><FiPlus /> Takım Ekle</button>
                </div>
            </div>

            {/* Right Panel - DYNAMIC CONTENT */}
            <div style={styles.rightPanel}>
                {(() => {
                    if (showAddUser) {
                        return <AddUserForm newUser={newUser} setNewUser={setNewUser} onSave={handleAddUser} onCancel={() => setShowAddUser(false)} teams={teams} />;
                    }
                    if (showAddTeam) {
                        return <AddTeamForm newTeamName={newTeamName} setNewTeamName={setNewTeamName} onSave={handleAddTeam} onCancel={() => setShowAddTeam(false)} />;
                    }
                    if (editUser) {
                        return <EditUserForm user={editUser} setUser={setEditUser} onSave={handleEditUser} onCancel={() => setEditUser(null)} teams={teams} />;
                    }
                    if (selectedUser) {
                        return <UserDetails user={selectedUser} team={teams.find(t => t.id === selectedUser.team)} onEdit={() => setEditUser(selectedUser)} onDelete={() => setDeleteConfirm(selectedUser.id)} />;
                    }
                    return <div style={styles.placeholder}><FiUser size={48} style={{ marginBottom: 16 }} />Detayları görmek için bir kullanıcı seçin.</div>;
                })()}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3 style={{ marginTop: 0 }}>Silme Onayı</h3>
                        <p>Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => setDeleteConfirm(null)} style={{ ...styles.actionButton, background: '#555' }}>İptal</button>
                            <button onClick={confirmDelete} style={{ ...styles.actionButton, background: '#d64e4e' }}>Sil</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- HELPER COMPONENTS ---

const FilterButton = ({ icon, label, count, active, onClick }) => (
    <button style={{ ...styles.filterButton, ...(active ? styles.filterButtonActive : {}) }} onClick={onClick}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {icon} {label}
        </span>
        <span style={styles.filterCount}>{count}</span>
    </button>
);

const UserListItem = ({ user, selected, onClick }) => (
    <div style={{ ...styles.userListItem, ...(selected ? styles.userListItemSelected : {}) }} onClick={onClick}>
        <div style={styles.userAvatar}>{user.name.charAt(0)}</div>
        <div>
            <div style={styles.userName}>{user.name}</div>
            <div style={{ ...styles.userRole, color: user.role === 'Yönetici' ? '#ffb300' : '#28a745' }}>{user.role}</div>
        </div>
    </div>
);

const UserDetails = ({ user, team, onEdit, onDelete }) => (
    <div style={styles.detailsContainer}>
        <div style={styles.detailsHeader}>
            <div style={{ ...styles.detailsAvatar, fontSize: 48 }}>{user.name.charAt(0)}</div>
            <div style={{ fontWeight: 700, fontSize: 24, color: '#fff' }}>{user.name}</div>
            <div style={{ fontSize: 16, color: '#888' }}>{user.role}</div>
        </div>
        <div style={styles.detailsBody}>
            <InfoRow label="E-posta" value={user.email} />
            <InfoRow label="Telefon" value={user.phone} />
            <InfoRow label="Takım" value={team?.name || 'Takım atanmamış'} />
        </div>
        <div style={styles.detailsFooter}>
            <button onClick={onEdit} style={{ ...styles.actionButton, background: '#275db5' }}><FiEdit2 /> Düzenle</button>
            <button onClick={onDelete} style={{ ...styles.actionButton, background: '#d64e4e' }}><FiTrash2 /> Sil</button>
        </div>
    </div>
);

const InfoRow = ({ label, value }) => (
    <div style={styles.infoRow}>
        <div style={styles.infoLabel}>{label}</div>
        <div style={styles.infoValue}>{value}</div>
    </div>
);

// --- NEW FORM COMPONENTS ---

const AddUserForm = ({ newUser, setNewUser, onSave, onCancel, teams }) => (
    <div style={styles.formContainer}>
        <h3>Yeni Temsilci Ekle</h3>
        {/* Form fields for name, email, phone, role, team */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={onSave} style={{ ...styles.actionButton, background: '#28a745' }}>Kaydet</button>
            <button onClick={onCancel} style={{ ...styles.actionButton, background: '#555' }}>İptal</button>
        </div>
    </div>
);

const EditUserForm = ({ user, setUser, onSave, onCancel, teams }) => (
    <div style={styles.formContainer}>
        <h3>Temsilci Düzenle</h3>
        {/* Form fields pre-filled with user data */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={onSave} style={{ ...styles.actionButton, background: '#275db5' }}>Kaydet</button>
            <button onClick={onCancel} style={{ ...styles.actionButton, background: '#555' }}>İptal</button>
        </div>
    </div>
);

const AddTeamForm = ({ newTeamName, setNewTeamName, onSave, onCancel }) => (
    <div style={styles.formContainer}>
        <h3>Yeni Takım Ekle</h3>
        <input type="text" value={newTeamName} onChange={e => setNewTeamName(e.target.value)} placeholder="Takım Adı" style={styles.searchInput} />
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={onSave} style={{ ...styles.actionButton, background: '#275db5' }}>Ekle</button>
            <button onClick={onCancel} style={{ ...styles.actionButton, background: '#555' }}>İptal</button>
        </div>
    </div>
);


const styles = {
    // Ana Paneller
    leftPanel: { width: 340, background: '#23262b', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', height: '100%' },
    rightPanel: { flex: 1, background: '#1a1d21', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' },
    // Sol Panel İçeriği
    leftPanelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #333' },
    closeButton: { background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', fontWeight: 700, opacity: 0.7 },
    searchContainer: { display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #333' },
    searchInput: {
        width: '100%',
        background: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: 15,
        outline: 'none',
    },
    scrollableArea: { flex: 1, overflowY: 'auto' },
    section: { padding: '16px', borderBottom: '1px solid #333' },
    sectionTitle: { color: '#888', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 },
    userList: { padding: '8px' },
    footerButtons: { display: 'flex', gap: 8, padding: '16px', borderTop: '1px solid #333' },
    actionButton: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, fontSize: 14, border: 'none', borderRadius: 6, padding: '10px', color: '#fff', cursor: 'pointer' },
    // Filtre Butonları
    filterButton: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'transparent', border: 'none', color: '#ccc', padding: '10px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', marginBottom: 4 },
    filterButtonActive: { background: '#275db5', color: '#fff' },
    filterCount: { background: '#333', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 12 },
    // Kullanıcı Listesi Öğesi
    userListItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderRadius: 6, cursor: 'pointer', transition: 'background 0.2s' },
    userListItemSelected: { background: '#1a1d21' },
    userAvatar: { width: 40, height: 40, borderRadius: '50%', background: '#275db5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 },
    userName: { color: '#fff', fontWeight: 600 },
    userRole: { color: '#888', fontSize: 12 },
    // Sağ Panel (Detaylar)
    placeholder: { textAlign: 'center' },
    detailsContainer: { width: '100%', maxWidth: 400, padding: 32 },
    detailsHeader: { textAlign: 'center', marginBottom: 32 },
    detailsAvatar: { width: 100, height: 100, borderRadius: '50%', background: '#275db5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' },
    detailsBody: { marginBottom: 32 },
    detailsFooter: { display: 'flex', gap: 16 },
    infoRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #333' },
    infoLabel: { color: '#888' },
    infoValue: { color: '#fff', fontWeight: 600 },
    // Yeni Stiller
    filtersContainer: { padding: '8px 16px' },
    accordionSection: { borderBottom: '1px solid #333', padding: '8px 0' },
    accordionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: '#888' },
    scrollableUserList: { flex: 1, overflowY: 'auto', padding: '8px' },
    formContainer: { width: '100%', maxWidth: 400, padding: 32, color: '#fff' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
    modalContent: { background: '#23262b', padding: 24, borderRadius: 8, width: '100%', maxWidth: 400 },
    tabFilters: {
        display: 'flex',
        justifyContent: 'flex-start', // Align buttons to the left
        background: '#23262b',
        borderRadius: 8,
        margin: '16px 16px 0 16px',
        padding: 4,
        gap: '4px', // Add a small gap between buttons
    },
    tabButton: {
        // flex: 1, // Removed to allow natural width
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: 'transparent',
        border: 'none',
        color: '#b0b0b0',
        padding: '8px 16px', // Adjusted padding for better spacing
        borderRadius: 6,
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 14,
        transition: 'all 0.2s ease',
    },
    tabButtonActive: {
        background: '#275db5',
        color: '#fff',
        boxShadow: '0 2px 8px -2px rgba(39, 93, 181, 0.5)',
    },
}; 