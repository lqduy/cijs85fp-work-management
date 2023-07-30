import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "firebase/firestore";
import "firebase/auth";

import { publicRouters } from "./routers";
import Header from "./components/Header";
import ThemeContext from "./contexts/ThemeContext";
import { themeModeStorage } from "./utils/local-storage";
import Sidebar from "./components/Sidebar/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import classNames from "classnames";

function App() {
  const [darkMode, setDarkMode] = useState(() => themeModeStorage.load());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const onToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const sidebarStyles = classNames("site-sidebar", {
    ["open"]: sidebarOpen,
  });

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <div className="site-container">
          <Header />
          <main>
            <div className="site-main-content">
              <nav className={sidebarStyles}>
                <Sidebar
                  onToggleSidebar={onToggleSidebar}
                  sidebarOpen={sidebarOpen}
                />
              </nav>
              <div className="site-content-wrapper">
                <div className="site-content">
                  <Routes>
                    {publicRouters.map((route, index) => {
                      const Page = route.component;
                      return (
                        <Route
                          key={index}
                          path={route.path}
                          element={<Page />}
                        />
                      );
                    })}
                  </Routes>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
