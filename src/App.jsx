import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import SuperAdminPanel from "./components/SuperAdminPanel";
import CustomerPanelApp from "./components/CustomerPanelApp";

function AppContent() {
  const { user } = useAuth();

  if (!user) return <Login />;
  if (user.role === "admin") return <AdminPanel />;
  if (user.role === "superadmin") return <SuperAdminPanel />;
  if (user.role === "agent") return <CustomerPanelApp />;
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}