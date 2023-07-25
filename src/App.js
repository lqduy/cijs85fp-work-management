import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import firebase from '@firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { puplicRouters } from './routers';
import Header from './components/Header';
import ThemeContext from './contexts/ThemeContext';
import { themeModeStorage } from './utils/local-storage';

// firebase.initializeApp({
//   apiKey: 'AIzaSyAI-g4aT3bfiNIcxFiAp-8D81FCuYhMJc8',
//   authDomain: 'cijs85fp-work-management.firebaseapp.com',
//   projectId: 'cijs85fp-work-management'
// });
// const db = firebase.firestore();

function App() {
  const [darkMode, setDarkMode] = useState(() => themeModeStorage.load());

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className="site-container">
        <Header />
        <div className="main-container">
          <Routes>
            {puplicRouters.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
