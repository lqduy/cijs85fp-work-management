import React, { useEffect, useState, Switch } from "react";
import { Routes, Route } from "react-router-dom";
import "firebase/firestore";
import "firebase/auth";
import { AuthProvider } from "./contexts/AuthContext";
// import Main from "./pages/Main";
import Signup from "./pages/Authenticator/Signup/Signup";
import Login from "./pages/Authenticator/Login/Login";
import { NotFoundPage } from "./pages/NotFoundPage";
import Header from "./components/Header";
import ThemeContext from "./contexts/ThemeContext";
import { themeModeStorage } from "./utils/local-storage";
import Sidebar from "./components/Sidebar/Sidebar";
import classNames from "classnames";
import PrivateRoute from "./routers/PrivateRoute";
import { privateRouters, publicRouters } from "./routers";

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
          <Routes>
            {publicRouters.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
            {privateRouters.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <Page />
                    </PrivateRoute>
                  }
                />
              );
            })}
          </Routes>
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
                <div className="site-content"></div>
              </div>
            </div>
          </main>
        </div>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
