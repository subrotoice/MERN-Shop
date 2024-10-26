import { Navigate, Outlet, useLocation } from "react-router-dom";
import LeftSideBar from "../../components/dashboard/LeftSideBar";
import Navbar from "../../components/dashboard/Navbar";
import { useAuth } from "../../context/AuthContext";

const AdminPage = () => {
  const { user } = useAuth();

  const location = useLocation(); // Get the current location (the news page)
  if (!user) return <Navigate to="/login" state={location.state} />;

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftSideBar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="bg-base-100 flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
