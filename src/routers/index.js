import HomePage from "../pages/HomePage";
import SubBoardPage from "../pages/SubBoardPage";
import Login from "../pages/Authenticator/Login/Login";
import Signup from "../pages/Authenticator/Signup/Signup";
import Home from "../pages/Home/Home";
import Templates from "../pages/Templates/Templates";
import TemplateType from "../components/TemplateType/TemplateType";
import SubBoardPageTemplates from "../components/SubBoardPageTemplates"

export const publicRouters = [
  { path: "/", component: HomePage },
  { path: "/b/:boardId", component: SubBoardPage },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/home", component: Home },
  { path: "/templates", component: Templates },
  { path: "templateType", component: TemplateType },
  { path: "/b/:boardId", component: SubBoardPageTemplates },
];
export const privateRouters = [];
