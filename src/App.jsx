import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h2>Aktif Konuşma</h2>

        <div className="conversation-list">
          <div className="conversation-item">Kullanıcı 1 ile konuşma</div>
          <div className="conversation-item">Kullanıcı 2 ile konuşma</div>
          <div className="conversation-item">Kullanıcı 3 ile konuşma</div>
        </div>
      </div>
    </div>
  );
}

export default App;
// Bu satır Git testi içindir

