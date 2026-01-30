import { Link } from "react-router-dom";
import type { User } from "../../data/users";
import { updateUser } from "../../data/users";
import { slugify } from "../../utils/slug";

export type UserRowActionsProps = {
  user: User;
  isOpen: boolean;
  onToggle: () => void;
  menuRef: (el: HTMLDivElement | null) => void;
  onCloseMenu: () => void;
  onStatusChange?: (updatedUser: User) => void;
};

const detailsPath = (user: User) =>
  `/dashboard/users/${slugify(user.name)}/${user.id}`;

export default function UserRowActions({
  user,
  isOpen,
  onToggle,
  menuRef,
  onCloseMenu,
  onStatusChange,
}: UserRowActionsProps) {
  const handleBlacklist = () => {
    const updated = updateUser(user.id, { status: "Blacklisted" });
    if (updated) onStatusChange?.(updated);
    onCloseMenu();
  };

  const handleActivate = () => {
    const updated = updateUser(user.id, { status: "Active" });
    if (updated) onStatusChange?.(updated);
    onCloseMenu();
  };

  return (
    <div className="users__actions-cell" ref={menuRef}>
      <button
        type="button"
        className="users__actions-button"
        aria-label="More options"
        aria-expanded={isOpen}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
      >
        <img src="/images/icons/more-icon.svg" alt="" />
      </button>

      {isOpen && (
        <div
          className="users__actions-menu"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to={detailsPath(user)}
            className="users__actions-menu-item"
            onClick={onCloseMenu}
          >
            <img src="/images/icons/eye-icon.svg" alt="" />
            View Details
          </Link>
          {user.status !== "Blacklisted" && (
            <button
              type="button"
              className="users__actions-menu-item"
              onMouseDown={handleBlacklist}
            >
              <img src="/images/icons/blacklist-icon.svg" alt="" />
              Blacklist User
            </button>
          )}
          {user.status !== "Active" && (
            <button
              type="button"
              className="users__actions-menu-item"
              onMouseDown={handleActivate}
            >
              <img src="/images/icons/activate.svg" alt="" />
              Activate User
            </button>
          )}
        </div>
      )}
    </div>
  );
}
