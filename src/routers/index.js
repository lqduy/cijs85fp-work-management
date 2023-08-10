import HomePage from '../pages/HomePage';
import SubBoardPage from '../pages/SubBoardPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import Login from '../pages/Authenticator/Login/Login';
import Signup from '../pages/Authenticator/Signup/Signup';

import Templates from '../pages/Templates/Templates';
import SubCardPage from '../pages/SubCardPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const publicRouters = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/not-found', component: NotFoundPage },
];
export const privateRouters = [
  { path: '/u/home', component: HomePage },
  { path: '/b/:boardId', component: SubBoardPage },
  { path: '/b/:boardId/:cardId', component: SubCardPage },
  { path: '/templates', component: Templates },
];
