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

export const columnsListStorage = {
  load: () => {
    const data = localStorage.getItem('columnsList');
    return data ? JSON.parse(data) : [];
  },
  save: boardsListArr => {
    const data = JSON.stringify(boardsListArr);
    localStorage.setItem('columnsList', data);
  }
};

export const cardsListStorage = {
  load: () => {
    const data = localStorage.getItem('cardsList');
    return data ? JSON.parse(data) : [];
  },
  save: boardsListArr => {
    const data = JSON.stringify(boardsListArr);
    localStorage.setItem('cardsList', data);
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

export const descriptionStorage = {
  load: () => {
    const data = localStorage.getItem('description');
    return data ? JSON.parse(data) : [];
  },
  save: descriptionArr => {
    const data = JSON.stringify(descriptionArr);
    localStorage.setItem('description', data);
  }
}