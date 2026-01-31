import { useState, useEffect, useRef } from "react";
import { usersStats } from "../../core/data";
import { getUsers } from "../../data/users";
import type { User } from "../../data/users";
import "../../styles/users.scss";
import PageHeader from "../../components/page-header/PageHeader";
import UsersFilterPopup, { type FilterAnchorRect } from "../../components/users/UsersFilterPopup";
import { applyFilters, type UsersFilterValues } from "../../utils/filters";
import UserRowActions from "../../components/users/UserRowActions";

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

const defaultFilterValues: UsersFilterValues = {
  organization: "",
  username: "",
  email: "",
  phone: "",
  dateFrom: "",
  dateTo: "",
  status: "",
};

const Users = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [filterAnchorRect, setFilterAnchorRect] =
    useState<FilterAnchorRect | null>(null);
  const [appliedFilters, setAppliedFilters] =
    useState<UsersFilterValues>(defaultFilterValues);
  /** Map of user id → that row’s actions menu DOM element. Used to detect “click outside” and close the menu. */
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const skipNextOutsideClick = useRef(false);

  const openFilterAt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setFilterAnchorRect({
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      width: rect.width,
    });
    setFilterPopupOpen(true);
  };

  useEffect(() => {
    setUsersData(getUsers());
  }, []);

  const filteredUsers = applyFilters(usersData, appliedFilters);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleItemsPerPageChange = (newValue: number) => {
    setItemsPerPage(newValue);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  /** When user clicks anywhere: if the click is outside the open menu’s div, close the menu. menuRefs.current[openMenuId] is that div. */
  useEffect(() => {
    if (!openMenuId) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (skipNextOutsideClick.current) {
        skipNextOutsideClick.current = false;
        return;
      }
      const menu = menuRefs.current[openMenuId];
      if (menu && menu.contains(e.target as Node)) return;
      setOpenMenuId(null);
    };

    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [openMenuId]);

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
      <PageHeader title="Users" className="users__title" />

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
                  <div
                    className="users__header-content users__header-content--clickable"
                    onClick={openFilterAt}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.currentTarget as HTMLDivElement).click()
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Open filter"
                  >
                    <span>Organization</span>
                    <img
                      src="/images/icons/filter-icon.svg"
                      alt=""
                      className="users__filter-icon"
                    />
                  </div>
                </th>
                <th className="users__table-header">
                  <div
                    className="users__header-content users__header-content--clickable"
                    onClick={openFilterAt}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.currentTarget as HTMLDivElement).click()
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Open filter"
                  >
                    <span>Name</span>
                    <img
                      src="/images/icons/filter-icon.svg"
                      alt=""
                      className="users__filter-icon"
                    />
                  </div>
                </th>
                <th className="users__table-header">
                  <div
                    className="users__header-content users__header-content--clickable"
                    onClick={openFilterAt}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.currentTarget as HTMLDivElement).click()
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Open filter"
                  >
                    <span>Email</span>
                    <img
                      src="/images/icons/filter-icon.svg"
                      alt=""
                      className="users__filter-icon"
                    />
                  </div>
                </th>
                <th className="users__table-header">
                  <div
                    className="users__header-content users__header-content--clickable"
                    onClick={openFilterAt}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.currentTarget as HTMLDivElement).click()
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Open filter"
                  >
                    <span>Phone</span>
                    <img
                      src="/images/icons/filter-icon.svg"
                      alt=""
                      className="users__filter-icon"
                    />
                  </div>
                </th>
                <th className="users__table-header">
                  <div
                    className="users__header-content users__header-content--clickable"
                    onClick={openFilterAt}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.currentTarget as HTMLDivElement).click()
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Open filter"
                  >
                    <span>Date Joined</span>
                    <img
                      src="/images/icons/filter-icon.svg"
                      alt=""
                      className="users__filter-icon"
                    />
                  </div>
                </th>
                <th className="users__table-header">
                  <div
                    className="users__header-content users__header-content--clickable"
                    onClick={openFilterAt}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.currentTarget as HTMLDivElement).click()
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Open filter"
                  >
                    <span>Status</span>
                    <img
                      src="/images/icons/filter-icon.svg"
                      alt=""
                      className="users__filter-icon"
                    />
                  </div>
                </th>
                <th className="users__table-header users__table-header--actions"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`users__table-row ${openMenuId === user.id ? "users__table-row--menu-open" : ""}`}
                >
                  <td className="users__table-cell">{user.organization}</td>
                  <td className="users__table-cell">{user.name}</td>
                  <td className="users__table-cell">{user.email}</td>
                  <td className="users__table-cell">{user.phone}</td>
                  <td className="users__table-cell">
                    {formatDate(user.dateJoined)}
                  </td>
                  <td className="users__table-cell">
                    <StatusBadge value={user.status} />
                  </td>
                  <td className="users__table-cell users__table-cell--actions">
                    <UserRowActions
                      user={user}
                      isOpen={openMenuId === user.id}
                      onToggle={() => {
                        if (openMenuId !== user.id)
                          skipNextOutsideClick.current = true;
                        setOpenMenuId(openMenuId === user.id ? null : user.id);
                      }}
                      menuRef={(el) => {
                        if (el) menuRefs.current[user.id] = el;
                      }}
                      onCloseMenu={() => setOpenMenuId(null)}
                      onStatusChange={(updated) =>
                        setUsersData((prev) =>
                          prev.map((u) =>
                            u.id === updated.id ? updated : u,
                          ),
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="users__mobile-cards">
          {paginatedUsers.map((user) => (
            <div key={user.id} className="users__mobile-card">
              <div className="users__mobile-card-header">
                <div>
                  <p className="users__mobile-card-name">{user.name}</p>
                  <p className="users__mobile-card-org">{user.organization}</p>
                </div>
                <div className="users__mobile-card-actions">
                  <UserRowActions
                    user={user}
                    isOpen={openMenuId === user.id}
                    onToggle={() => {
                      if (openMenuId !== user.id)
                        skipNextOutsideClick.current = true;
                      setOpenMenuId(openMenuId === user.id ? null : user.id);
                    }}
                    menuRef={(el) => {
                      if (el) menuRefs.current[user.id] = el;
                    }}
                    onCloseMenu={() => setOpenMenuId(null)}
                    onStatusChange={(updated) =>
                      setUsersData((prev) =>
                        prev.map((u) => (u.id === updated.id ? updated : u)),
                      )
                    }
                  />
                </div>
              </div>
              <div className="users__mobile-card-body">
                <div className="users__mobile-card-row">
                  <span className="users__mobile-card-label">Email</span>
                  <span className="users__mobile-card-value">{user.email}</span>
                </div>
                <div className="users__mobile-card-row">
                  <span className="users__mobile-card-label">Phone</span>
                  <span className="users__mobile-card-value">{user.phone}</span>
                </div>
                <div className="users__mobile-card-row">
                  <span className="users__mobile-card-label">Date Joined</span>
                  <span className="users__mobile-card-value">
                    {formatDate(user.dateJoined)}
                  </span>
                </div>
                <div className="users__mobile-card-row">
                  <span className="users__mobile-card-label">Status</span>
                  <span className="users__mobile-card-value">
                    <StatusBadge value={user.status} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="users__pagination">
          <div className="users__pagination-info">
            <span>Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="users__pagination-select"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>out of {totalItems}</span>
          </div>

          <div className="users__pagination-controls">
            <button
              className="users__pagination-btn users__pagination-btn--prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <img src="/images/icons/prev.svg" alt="" />
            </button>

            <div className="users__pagination-pages">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  className={`users__pagination-page ${
                    page === currentPage ? "users__pagination-page--active" : ""
                  } ${page === "..." ? "users__pagination-page--ellipsis" : ""}`}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="users__pagination-btn users__pagination-btn--next"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <img src="/images/icons/next.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      <UsersFilterPopup
        open={filterPopupOpen}
        onClose={() => setFilterPopupOpen(false)}
        filters={appliedFilters}
        onApply={(filters) => {
          setAppliedFilters(filters);
          setCurrentPage(1);
        }}
        onReset={() => {
          setAppliedFilters(defaultFilterValues);
          setCurrentPage(1);
        }}
        anchorRect={filterAnchorRect}
      />
    </div>
  );
};

export default Users;
