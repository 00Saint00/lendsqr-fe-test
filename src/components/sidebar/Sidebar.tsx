import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../core/data";
import "../../styles/sidebar.scss";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <img src="/images/logo.svg" alt="Lendsqr Logo" className="sidebar__logo" />
      </div>

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
    </aside>
  );
};

export default Sidebar;
