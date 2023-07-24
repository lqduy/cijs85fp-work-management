import HomePage from '../pages/HomePage';
import SubBoardPage from '../pages/SubBoardPage';
import Login from '../pages/Authenticator/Login/Login';
import Signup from '../pages/Authenticator/Signup/Signup'

export const puplicRouters = [
  { path: '/', component: HomePage },
  { path: '/b/:boardId', component: SubBoardPage },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
];
export const privateRouters = [];
