import StarRating from "../star-rating/StarRating";
import type { User } from "../../data/users";

const TAB_LABELS: { value: string, label: string }[] = [
  { value: "general", label: "General Details" },
  { value: "documents", label: "Documents" },
  { value: "bank", label: "Bank Details" },
  { value: "loans", label: "Loans" },
  { value: "savings", label: "Savings" },
  { value: "app", label: "App and System" }
];

export default function UserDetailsHeader({
  user,
  formatBalance,
  activeTab,
  onTabChange,
}: {
  user: User;
  formatBalance: (n: number) => string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const userId = user.id.replace(/-/g, "").slice(0, 10).toUpperCase();

  return (
    <div className="user-header">
      <div className="user-header-info">
        <div className="user-header-info__block">
          <div className="user-avatar">
            <img src={user.avatar || "/images/user-avatar.svg"} alt={user.name} />
          </div>
          <div>
            <p className="user-header-info__name">{user.name}</p>
            <p className="user-header-info__id">{userId}</p>
          </div>
        </div>

        <div className="user-tier">
          <p>User's Tier</p>
          <div className="star-rating">
            <StarRating value={user.rating} />
          </div>
        </div>

        <div className="user-header-info__block user-header-info__block--right">
          <p className="user-header-info__balance">₦{formatBalance(user.balance)}</p>
          <p className="user-header-info__account">{user.accountNumber}/{user.bank}</p>
        </div>
      </div>

      <div className="user-header-nav-mobile">
        <select
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value)}
          aria-label="User details sections"
        >
          {TAB_LABELS.map((tab) => (
            <option key={tab.value} value={tab.value}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      <nav className="user-header-nav" aria-label="User details sections">
        {TAB_LABELS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={"user-header-nav__item" + (activeTab === tab.value ? " user-header-nav__item--active" : "")}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
