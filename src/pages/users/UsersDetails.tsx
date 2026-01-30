import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/users-details.scss";
import { getUsers, updateUser, type User } from "../../data/users";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/page-header/PageHeader";
import UserDetailsHeader from "../../components/users/UserDetailsHeader";
import UserDetailsTabContent from "../../components/users/UserDetailsTabContent";

const UsersDetails = () => {
  const { id } = useParams<{ slug: string; id: string }>();
  const user = getUsers().find((u) => u.id === id);
  const [activeTab, setActiveTab] = useState("general");
  const [, setUsersData] = useState<User[]>([]);

  if (!id || !user) {
    return <div>User not found</div>;
  }

  const formatBalance = (balance: number) => {
    return balance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleBacklistUser = () => {
    updateUser(user.id, { status: "Blacklisted" });
    setUsersData(getUsers());
  };

  const handleActiveUser = () => {
    updateUser(user.id, { status: "Active" });
    setUsersData(getUsers());
  };

  return (
    <div className="users-details">
      <div className="users-details__header-back">
        <Link to="/dashboard/users" className="users-details__header-back-link">
          <img src="/images/icons/back-icon.svg" alt="Back" />
          <span className="users-details__header-back-text">Back to Users</span>
        </Link>
      </div>
      <div className="users-details__header">
        <PageHeader title="User Details" className="users-details__title" />
        <div className="users-details__actions">
          {user.status !== "Blacklisted" && (
            <button
              className="users-details__actions-blacklist"
              onClick={handleBacklistUser}
            >
              Blacklist User
            </button>
          )}

          {user.status !== "Active" && (
            <button
              className="users-details__actions-activate"
              onClick={handleActiveUser}
            >
              Activate User
            </button>
          )}
        </div>
      </div>

      <div className="users-details__content">
        <UserDetailsHeader
          user={user}
          formatBalance={formatBalance}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <UserDetailsTabContent
          activeTab={activeTab}
          user={user}
          formatBalance={formatBalance}
        />
      </div>
    </div>
  );
};

export default UsersDetails;
