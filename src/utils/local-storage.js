export const boardsListStorage = {
  load: () => {
    const data = localStorage.getItem('boardsList');
    return data ? JSON.parse(data) : [];
  },
  save: boardsListArr => {
    const data = JSON.stringify(boardsListArr);
    localStorage.setItem('boardsList', data);
  }
};
