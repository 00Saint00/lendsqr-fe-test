import { useState, useEffect, useRef } from "react";
import { usersStats } from "../../core/data";
import { getUsers, updateUser, deleteUser } from "../../data/users";
import type { User } from "../../data/users";
import "../../styles/users.scss";
import PageHeader from "../../components/page-header/PageHeader";

const Users = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setUsersData(getUsers());
  }, []);

  /** -----------------------------
   * Close menu on outside click
   * ----------------------------- */
  useEffect(() => {
    if (!openMenuId) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const menu = menuRefs.current[openMenuId];
      if (menu && menu.contains(e.target as Node)) return;
      setOpenMenuId(null);
    };

    document.addEventListener("mousedown", handleOutsideClick, true);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
  }, [openMenuId]);

  /** -----------------------------
   * User actions handlers
   * ----------------------------- */
  const handleViewUser = (user: User) => {
    alert(`Viewing user: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}`);
  };

  /** -----------------------------
   * Status badge
   * ----------------------------- */
  const StatusBadge = ({ value }: { value: User["status"] }) => {
    const styles: Record<string, { color: string; bg: string }> = {
      Active: { color: "#39CD62", bg: "#E8F5E9" },
      Pending: { color: "#E9B200", bg: "#FFF7D6" },
      Blacklisted: { color: "#E4033B", bg: "#FCE4EC" },
    };

    const { color, bg } = styles[value] || {
      color: "#545F7D",
      bg: "#F1F1F1",
    };

    return (
      <span
        style={{
          color,
          backgroundColor: bg,
          padding: "7px 13px",
          borderRadius: 100,
          fontSize: 14,
          fontFamily: "Work Sans",
        }}
      >
        {value}
      </span>
    );
  };

  /** -----------------------------
   * Actions cell
   * ----------------------------- */
  const ActionsCell = ({ data }: { data?: User }) => {
    if (!data) return null;

    const isOpen = openMenuId === data.id;

    return (
      <div
        className="users__actions-cell"
        ref={(el) => {
          if (el) {
            menuRefs.current[data.id] = el;
          }
        }}
      >
        <button
          type="button"
          className="users__actions-button"
          aria-label="More options"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenMenuId(isOpen ? null : data.id);
          }}
        >
          <img src="/images/icons/more-icon.svg" alt="" />
        </button>

        {isOpen && (
          <div
            className="users__actions-menu"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="users__actions-menu-item"
              onClick={() => {
                setOpenMenuId(null);
                handleViewUser(data);
              }}
            >
              <img src="/images/icons/eye-icon.svg" alt="" />
              View Details
            </button>
            <button
              className="users__actions-menu-item"
              onClick={() => {
                updateUser(data.id, { status: "Blacklisted" });
                setUsersData(getUsers());
                setOpenMenuId(null);
              }}
            >
              <img src="/images/icons/blacklist-icon.svg" alt="" />
              Blacklist User
            </button>
            <button
              className="users__actions-menu-item"
              onClick={() => {
                updateUser(data.id, { status: "Active" });
                setUsersData(getUsers());
                setOpenMenuId(null);
              }}
            >
              <img src="/images/icons/activate.svg" alt="" />
              Activate User
            </button>
          </div>
        )}
      </div>
    );
  };


  const formatDate = (date: Date | string) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="users">
      <PageHeader title="Users" />

      <div className="users__stats">
        {usersStats.map((stat, i) => (
          <div key={i} className="users__stat-card">
            <img src={stat.icon} alt="" />
            <div>
              <h3>{stat.title}</h3>
              <p>{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="users__table-container">

        <div className="users__table-wrapper">
          <table className="users__table">
            <thead>
              <tr>
                <th className="users__table-header">
                  <div className="users__header-content">
                    <span>Organization</span>
                    <img src="/images/icons/filter-icon.svg" alt="" className="users__filter-icon" />
                  </div>
                </th>
                <th className="users__table-header">
                  <div className="users__header-content">
                    <span>Name</span>
                    <img src="/images/icons/filter-icon.svg" alt="" className="users__filter-icon" />
                  </div>
                </th>
                <th className="users__table-header">
                  <div className="users__header-content">
                    <span>Email</span>
                    <img src="/images/icons/filter-icon.svg" alt="" className="users__filter-icon" />
                  </div>
                </th>
                <th className="users__table-header">
                  <div className="users__header-content">
                    <span>Phone</span>
                    <img src="/images/icons/filter-icon.svg" alt="" className="users__filter-icon" />
                  </div>
                </th>
                <th className="users__table-header">
                  <div className="users__header-content">
                    <span>Date Joined</span>
                    <img src="/images/icons/filter-icon.svg" alt="" className="users__filter-icon" />
                  </div>
                </th>
                <th className="users__table-header">
                  <div className="users__header-content">
                    <span>City</span>
                    <img src="/images/icons/filter-icon.svg" alt="" className="users__filter-icon" />
                  </div>
                </th>
                <th className="users__table-header">
                  <div className="users__header-content">
                    <span>Status</span>
                    <img src="/images/icons/filter-icon.svg" alt="" className="users__filter-icon" />
                  </div>
                </th>
                <th className="users__table-header users__table-header--actions"></th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr 
                  key={user.id} 
                  className={`users__table-row ${openMenuId === user.id ? 'users__table-row--menu-open' : ''}`}
                >
                  <td className="users__table-cell">{user.organization}</td>
                  <td className="users__table-cell">{user.name}</td>
                  <td className="users__table-cell">{user.email}</td>
                  <td className="users__table-cell">{user.phone}</td>
                  <td className="users__table-cell">{formatDate(user.dateJoined)}</td>
                  <td className="users__table-cell">
                    <StatusBadge value={user.status} />
                  </td>
                  <td className="users__table-cell users__table-cell--actions">
                    <ActionsCell data={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
