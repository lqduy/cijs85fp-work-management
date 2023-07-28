import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { puplicRouters } from "./routers";
import Header from "./components/Header";
import ThemeContext from "./contexts/ThemeContext";
import { themeModeStorage } from "./utils/local-storage";
import Sidebar from "./components/Sidebar/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";

// firebase.initializeApp({
//   apiKey: 'AIzaSyAI-g4aT3bfiNIcxFiAp-8D81FCuYhMJc8',
//   authDomain: 'cijs85fp-work-management.firebaseapp.com',
//   projectId: 'cijs85fp-work-management'
// });
// const db = firebase.firestore();

function App() {
  const [darkMode, setDarkMode] = useState(() => themeModeStorage.load());
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthProvider>
      <ThemeContext.Provider
        value={{ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }}
      >
        <div className="site-container">
          <Header />
          <div className={sidebarOpen ? "wrapper open" : "wrapper"}>
            <nav
              className={
                sidebarOpen
                  ? "sidebar-container sidebar-open"
                  : "sidebar-container"
              }
            >
              <Sidebar />
            </nav>
            <main
              className={sidebarOpen ? "main-container open" : "main-container"}
            >
              <Routes>
                {puplicRouters.map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route key={index} path={route.path} element={<Page />} />
                  );
                })}
              </Routes>
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
