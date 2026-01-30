import type { ReactNode } from "react";
import type { User } from "../../data/users";
import "../../styles/users-details.scss";

const panel = "users-details__content-item users-details__tab-panel";

export default function UserDetailsTabContent({
  activeTab,
  user,
  formatBalance,
}: {
  activeTab: string;
  user: User;
  formatBalance: (n: number) => string;
}) {
  const tabContentMap: { [key: string]: ReactNode } = {
    general: (
      <div className={panel}>
        <section className="users-details__section users-details__section-info">
          <h4 className="users-details__section-title">Personal Information</h4>
          <div className="users-details__info-grid">
            <div className="users-details__info-item">
              <span className="users-details__info-label">Full Name</span>
              <span className="users-details__info-value">{user.name}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Phone Number</span>
              <span className="users-details__info-value">{user.phone}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Email Address</span>
              <span className="users-details__info-value">{user.email}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">BVN</span>
              <span className="users-details__info-value">{user.bvn}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Gender </span>
              <span className="users-details__info-value">{user.gender}</span>
            </div>

           
            <div className="users-details__info-item">
              <span className="users-details__info-label">Marital Status</span>
              <span className="users-details__info-value">{user.maritalStatus}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Children</span>
              <span className="users-details__info-value">{user.children}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Type of Residence</span>
              <span className="users-details__info-value">{user.typeOfResidence}</span>
            </div>
    
          </div>
        </section>
        <section className="users-details__section users-details__section-education">
          <h4 className="users-details__section-title">Education and Employment</h4>
          <div className="users-details__info-grid">
            <div className="users-details__info-item">
              <span className="users-details__info-label">Level of Education</span>
              <span className="users-details__info-value"> {user.levelOfEducation} </span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Employment Status</span>
              <span className="users-details__info-value">{user.employmentStatus}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Sector of Employment</span>
              <span className="users-details__info-value">FinTech</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Duration of Employment</span>
              <span className="users-details__info-value">{user.employmentDuration} years</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Office Email</span>
              <span className="users-details__info-value">{user.email}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Monthly Income</span>
              <span className="users-details__info-value">
                {user.monthlyIncomeMin === 0 && user.monthlyIncomeMax === 0
                  ? "₦0.00"
                  : `₦${formatBalance(user.monthlyIncomeMin)} - ₦${formatBalance(user.monthlyIncomeMax)}`}
              </span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Loan Repayment</span>
              <span className="users-details__info-value">₦{formatBalance(user.loanRepayment)}</span>
            </div>
          </div>
        </section>

        <section className="users-details__section users-details__section-socials">
          <h4 className="users-details__section-title">Socials</h4>
          <div className="users-details__info-grid">
            <div className="users-details__info-item">
              <span className="users-details__info-label">Twitter</span>
              <span className="users-details__info-value">{user.twitter}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Facebook</span>
              <span className="users-details__info-value">{user.facebook}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Instagram</span>
              <span className="users-details__info-value">{user.instagram}</span>
            </div>
          </div>
        </section>  

        {/* Guarantor section */}
        <section className="users-details__section users-details__section-guarantor">
          <h4 className="users-details__section-title">Guarantor</h4>
          <div className="users-details__info-grid">
            <div className="users-details__info-item">
              <span className="users-details__info-label">Full Name</span>
              <span className="users-details__info-value">{user.name}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Phone Number</span>
              <span className="users-details__info-value">{user.guarantorPhone}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Email Address</span>
              <span className="users-details__info-value">{user.guarantorEmail}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Relationship</span>
              <span className="users-details__info-value">{user.guarantorRelationship}</span>
            </div>
          </div>
        </section>

        <section className="users-details__section users-details__section-guarantor">
          <div className="users-details__info-grid">
            <div className="users-details__info-item">
              <span className="users-details__info-label">Full Name</span>
              <span className="users-details__info-value">{user.secondGuarantorName}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Phone Number</span>
              <span className="users-details__info-value">{user.secondGuarantorPhone}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Email Address</span>
              <span className="users-details__info-value">{user.secondGuarantorEmail}</span>
            </div>
            <div className="users-details__info-item">
              <span className="users-details__info-label">Relationship</span>
              <span className="users-details__info-value">{user.secondGuarantorRelationship}</span>
            </div>
          </div>
        </section>
      </div>
    ),
    documents: (
      <div className={panel}>
        <p className="users-details__placeholder">Documents will be listed here.</p>
      </div>
    ),
    bank: (
      <div className={panel}>
        <div className="users-details__info-grid">
          <div className="users-details__info-item">
            <span className="users-details__info-label">Bank</span>
            <span className="users-details__info-value">{user.bank}</span>
          </div>
          <div className="users-details__info-item">
            <span className="users-details__info-label">Account Number</span>
            <span className="users-details__info-value">{user.accountNumber}</span>
          </div>
          <div className="users-details__info-item">
            <span className="users-details__info-label">Balance</span>
            <span className="users-details__info-value">₦{formatBalance(user.balance)}</span>
          </div>
        </div>
      </div>
    ),
    loans: (
      <div className={panel}>
        <p className="users-details__placeholder">Loans will be listed here.</p>
      </div>
    ),
    savings: (
      <div className={panel}>
        <p className="users-details__placeholder">Savings will be listed here.</p>
      </div>
    ),
    app: (
      <div className={panel}>
        <p className="users-details__placeholder">App and system information will be listed here.</p>
      </div>
    ),
  };

  return (
    <div className="users-details__tab-content">
      {tabContentMap[activeTab]}
    </div>
  );
}
