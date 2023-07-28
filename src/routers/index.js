import HomePage from '../pages/HomePage';
import SubBoardPage from '../pages/SubBoardPage';
import Login from '../pages/Authenticator/Login/Login';
import Signup from '../pages/Authenticator/Signup/Signup'
import Home from '../pages/Home/Home';
import Templates from "../pages/Templates/Templates"

export const puplicRouters = [
  { path: '/', component: HomePage },
  { path: '/b/:boardId', component: SubBoardPage },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { path: '/home', component: Home},
  { path: '/templates', component: Templates},
];
export const privateRouters = [];
