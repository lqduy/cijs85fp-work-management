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

export const themeModeStorage = {
  load: () => {
    const data = localStorage.getItem('darkThemeMode');
    return data ? JSON.parse(data) : false;
  },
  save: isDarkMode => {
    const data = JSON.stringify(isDarkMode);
    localStorage.setItem('darkThemeMode', data);
  }
};

export const updateNewBoardToStorage = (boardId, newBoardData) => {
  const boardsListData = boardsListStorage.load();
  const newBoardsList = boardsListData.map(board =>
    board.boardId === boardId ? newBoardData : board
  );
  boardsListStorage.save(newBoardsList);
};
