import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import "../styles/dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard__main">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
