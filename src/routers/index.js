import HomePage from '../pages/HomePage';
import SubBoardPage from '../pages/SubBoardPage';

export const puplicRouters = [
  { path: '/', component: HomePage },
  { path: '/b/:boardId', component: SubBoardPage }
];
export const privateRouters = [];
