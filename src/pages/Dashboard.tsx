import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import "../styles/dashboard.scss";
import TopNav from "../components/nav/TopNav";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <TopNav />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className={`dashboard__main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Outlet context={{ isSidebarOpen, toggleSidebar }} />
      </main>
    </div>
  );
};

export default Dashboard;
