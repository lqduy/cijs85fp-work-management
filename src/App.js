import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { puplicRouters } from './routers';
import Header from './components/Header';

function App() {
  return (
    <div className="container">
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
  );
}

export default App;
