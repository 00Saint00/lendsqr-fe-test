import { useState, useEffect } from "react";
import type { UsersFilterValues } from "../../utils/filters";
import "../../styles/users-filter-popup.scss";

export type { UsersFilterValues };

const defaultFilters: UsersFilterValues = {
  organization: "",
  username: "",
  email: "",
  phone: "",
  dateFrom: "",
  dateTo: "",
  status: "",
};

const ORGANIZATION_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Select" },
  { value: "lendsqr", label: "lendsqr" },
  { value: "irorun", label: "irorun" },
  { value: "lendstar", label: "lendstar" },
];

const STATUS_OPTIONS: { value: UsersFilterValues["status"]; label: string }[] = [
  { value: "", label: "Select" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Pending", label: "Pending" },
  { value: "Blacklisted", label: "Blacklisted" },
];

export interface FilterAnchorRect {
  top: number;
  left: number;
  bottom: number;
  width: number;
}

type Props = {
  open: boolean;
  onClose: () => void;
  filters: UsersFilterValues;
  onApply: (filters: UsersFilterValues) => void;
  onReset: () => void;
  anchorRect?: FilterAnchorRect | null;
};

export default function UsersFilterPopup({
  open,
  onClose,
  filters,
  onApply,
  onReset,
  anchorRect,
}: Props) {
  const [local, setLocal] = useState<UsersFilterValues>(filters);

  useEffect(() => {
    setLocal(filters);
  }, [filters, open]);

  const handleChange = (field: keyof UsersFilterValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLocal((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  const handleReset = () => {
    setLocal(defaultFilters);
    onReset();
    onClose();
  };

  if (!open) return null;

  const popupStyle: React.CSSProperties = anchorRect
    ? (() => {
        const pad = 16;
        const popupWidth = 480;
        const mobileBreakpoint = 600;
        const winW = typeof window !== "undefined" ? window.innerWidth : 800;
        const isMobile = winW < mobileBreakpoint;

        let left: number;
        if (isMobile) {
          const mobilePopupWidth = Math.min(320, winW - pad * 2);
          left = (winW - mobilePopupWidth) / 2;
        } else {
          left = anchorRect.left;
          if (left + popupWidth > winW - pad) left = winW - popupWidth - pad;
          if (left < pad) left = pad;
        }

        const top = isMobile ? pad * 2 : anchorRect.bottom + 4;
        const maxHeight = isMobile
          ? "calc(100vh - 48px)"
          : `min(560px, calc(100vh - ${anchorRect.bottom + 8}px))`;

        return {
          top,
          left,
          maxHeight,
          ...(isMobile && { width: Math.min(320, winW - pad * 2) }),
        };
      })()
    : {
        top: 24,
        left: 24,
      };

  return (
    <>
      <div
        className="users-filter-overlay"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close filter"
      />
      <div
        className="users-filter-popup"
        style={popupStyle}
        role="dialog"
        aria-modal="true"
        aria-label="Filter users"
      >
        <div className="users-filter-popup__body">
          <div className="users-filter-popup__field">
            <label htmlFor="filter-org">Organization</label>
            <select
              id="filter-org"
              value={local.organization}
              onChange={handleChange("organization")}
            >
              {ORGANIZATION_OPTIONS.map((opt) => (
                <option key={opt.value || "any"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="users-filter-popup__field">
            <label htmlFor="filter-username">Username</label>
            <input
              id="filter-username"
              type="text"
              placeholder="User"
              value={local.username}
              onChange={handleChange("username")}
            />
          </div>
          <div className="users-filter-popup__field">
            <label htmlFor="filter-email">Email</label>
            <input
              id="filter-email"
              type="text"
              placeholder="Email"
              value={local.email}
              onChange={handleChange("email")}
            />
          </div>

          <div className="users-filter-popup__field">
            <label htmlFor="filter-date-from">Date joined</label>
            <input
              id="filter-date-from"
              type="date"
              value={local.dateFrom}
              onChange={handleChange("dateFrom")}
            />
          </div>  
                  <div className="users-filter-popup__field">
            <label htmlFor="filter-phone">Phone number</label>
            <input
              id="filter-phone"
              type="text"
              placeholder="Phone number"
              value={local.phone}
              onChange={handleChange("phone")}
            />
          </div>



          <div className="users-filter-popup__field">
            <label htmlFor="filter-status">Status</label>
            <select
              id="filter-status"
              value={local.status}
              onChange={handleChange("status")}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value || "any"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="users-filter-popup__footer">
          <button type="button" className="users-filter-popup__btn users-filter-popup__btn--outline" onClick={handleReset}>
            Reset
          </button>
          <button type="button" className="users-filter-popup__btn users-filter-popup__btn--primary" onClick={handleApply}>
            Filter
          </button>
        </div>
      </div>
    </>
  );
}
