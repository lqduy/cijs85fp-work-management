import HomePage from "../pages/HomePage";
import SubBoardPage from "../pages/SubBoardPage";
import Login from "../pages/Authenticator/Login/Login";
import Signup from "../pages/Authenticator/Signup/Signup";
import Home from "../pages/Home/Home";
import Templates from "../pages/Templates/Templates";
import TemplateType from "../components/TemplatePreview/TemplatePreview";
import LandingPage from "../pages/LandingPage/LandingPage";
export const publicRouters = [
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];
export const privateRouters = [
  { path: "/aboutus", component: LandingPage },
  { path: "/", component: HomePage },
  { path: "/b/:boardId", component: SubBoardPage },
  { path: "/home", component: Home },
  { path: "/templates", component: Templates },
  { path: "/templates/preview/:boardId", component: TemplateType },
];
