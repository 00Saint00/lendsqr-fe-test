import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../core/data";
import "../../styles/sidebar.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar__organization">
        <img src="/images/icons/briefcase.svg" alt="Organization" />
        <span>Switch Organization</span>
        <img src="/images/icons/down-arrow.svg" alt="Dropdown" />
      </div>

      <nav className="sidebar__nav">
        {navItems.slice(1).map((item) => {
          if (item.header) {
            return (
              <div key={item.id} className="sidebar__header-item">
                {item.title}
              </div>
            );
          }

          const isActive = location.pathname === item.link;

          return (
            <Link
              key={item.id}
              to={item.link}
              className={`sidebar__nav-item ${isActive ? "active" : ""}`}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.title}
                  className="sidebar__nav-icon"
                />
              )}
              <span className="sidebar__nav-text">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__close-btn" onClick={onClose}>
          <img src="/images/icons/close-icon.svg" alt="Close sidebar" />
          <span>Close</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
