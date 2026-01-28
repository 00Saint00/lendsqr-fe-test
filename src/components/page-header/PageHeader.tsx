import { useOutletContext } from "react-router-dom";
import "../../styles/page-header.scss";

interface OutletContext {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const { isSidebarOpen, toggleSidebar } = useOutletContext<OutletContext>();

  return (
    <div className="page-header">
      {!isSidebarOpen && (
        <button className="page-header__menu-toggle" onClick={toggleSidebar}>
          <img src="/images/icons/menu.svg" alt="Open menu" />
        </button>
      )}
      <h1 className="page-header__title">{title}</h1>
    </div>
  );
};

export default PageHeader;
