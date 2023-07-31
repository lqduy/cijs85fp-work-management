// import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import "firebase/firestore";
// import "firebase/auth";
// import { privateRouters } from "../routers";
// import Header from "../components/Header"
// import Sidebar from "../components/Sidebar/Sidebar";
// import classNames from "classnames";
// import { themeModeStorage } from "../utils/local-storage";
// import ThemeContext from "../contexts/ThemeContext";

// const Main = () => {
//     const [darkMode, setDarkMode] = useState(() => themeModeStorage.load());
//     const [sidebarOpen, setSidebarOpen] = useState(true);
  
//     useEffect(() => {
//       document.body.classList.toggle("dark-mode", darkMode);
//     }, [darkMode]);
  
//     const onToggleSidebar = () => {
//       setSidebarOpen((prev) => !prev);
//     };
  
//     const sidebarStyles = classNames("site-sidebar", {
//       ["open"]: sidebarOpen,
//     });

//   return (
//     <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
//         <div className="site-container">
//           <Header />
//           <main>
//             <div className="site-main-content">
//               <nav className={sidebarStyles}>
//                 <Sidebar
//                   onToggleSidebar={onToggleSidebar}
//                   sidebarOpen={sidebarOpen}
//                 />
//               </nav>
//               <div className="site-content-wrapper">
//                 <div className="site-content">
//                   <Routes>
//                     {privateRouters.map((route, index) => {
//                       const Page = route.component;
//                       return (
//                         <Route
//                           key={index}
//                           path={route.path}
//                           element={<Page />}
//                         />
//                       );
//                     })}
//                   </Routes>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </ThemeContext.Provider>
//   )
// }
// export default Main
