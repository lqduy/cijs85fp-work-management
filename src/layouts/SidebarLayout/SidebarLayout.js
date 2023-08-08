import React, { useContext } from 'react';
import classNames from 'classnames';
import ThemeContext from '../../contexts/ThemeContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header';

const SidebarLayout = ({ children, mainClassName = null, sidebarClassName = null, onClickCreateBtn }) => {
  const { sidebarOpen, onToggleSidebar } = useContext(ThemeContext);

  const sidebarStyles = classNames('site-sidebar', {
    open: sidebarOpen
  });

  const sidebarHomepageStyles = {
    background: 'transparent',
    borderRight: 'none'
  };

  return (
    <>
      <Header onClickCreateBtn={onClickCreateBtn} />
      <main className={mainClassName}>
        <div className="site-main-content">
          <nav className={sidebarStyles} style={mainClassName && sidebarHomepageStyles}>
            <Sidebar
              sidebarClassName={sidebarClassName}
              onToggleSidebar={onToggleSidebar}
              sidebarOpen={sidebarOpen}
            />
          </nav>
          <div className="site-content-wrapper">
            <div className="site-content">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SidebarLayout;
