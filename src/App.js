import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import classNames from "classnames";

import "firebase/firestore";
import "firebase/auth";

import Header from "./components/Header";
import ThemeContext from "./contexts/ThemeContext";
import { themeModeStorage } from "./utils/local-storage";
import PrivateRoute from "./routers/PrivateRoute";
import { privateRouters, publicRouters } from "./routers";

function App() {
  const [darkMode, setDarkMode] = useState(() => themeModeStorage.load());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentImg, setCurrentImg] = useState(null);

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
      <ThemeContext.Provider
        value={{
          darkMode,
          setDarkMode,
          sidebarOpen,
          onToggleSidebar,
          currentImg,
          setCurrentImg,
        }}
      >
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
                  element={<PrivateRoute component={<Page />} />}
                />
              );
            })}
          </Routes>
        </div>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
