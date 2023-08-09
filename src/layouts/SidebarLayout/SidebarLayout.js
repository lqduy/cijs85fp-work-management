import React, { useContext } from "react";
import classNames from "classnames";
import ThemeContext from "../../contexts/ThemeContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";

const SidebarLayout = ({ children }) => {
  const { sidebarOpen, onToggleSidebar } = useContext(ThemeContext);

  const sidebarStyles = classNames("site-sidebar", {
    open: sidebarOpen,
  });
  return (
    <main>
       <Header/>
      <div className="site-main-content">
        <nav className={sidebarStyles}>
          <Sidebar
            onToggleSidebar={onToggleSidebar}
            sidebarOpen={sidebarOpen}
          />
        </nav>
        <div className="site-content-wrapper">
          <div className="site-content">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default SidebarLayout;
