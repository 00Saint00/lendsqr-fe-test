import { useOutletContext } from "react-router-dom";
import "../../styles/page-header.scss";

interface OutletContext {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface PageHeaderProps {
  title: string;
  className?: string;
}

const PageHeader = ({ title, className }: PageHeaderProps) => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext<OutletContext>();

  return (
    <div className="page-header">
      {!isSidebarOpen && (
        <button className="page-header__menu-toggle" onClick={toggleSidebar}>
          <img src="/images/icons/menu.svg" alt="Open menu" />
        </button>
      )}
      <h2 className={`${className ?? ""}`.trim()}>{title}</h2>
    </div>
  );
};

export default PageHeader;
