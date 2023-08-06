import { boardsListStorage, columnsListStorage, cardsListStorage } from './local-storage.js';

const getKeysToSearch = () => {
  const boardsData = boardsListStorage.load();
  const columnsData = columnsListStorage.load();
  const cardsData = cardsListStorage.load();

  const keysListToSearch = [];
  boardsData.forEach(board => {
    const columnsList = columnsData.filter(column => column.parentId === board.boardId);
    const cardsList = cardsData.filter(card => {
      const columnIds = columnsList.map(column => column.columnId);
      return columnIds.includes(card.parentId);
    });
    const keyItem = {
      _id: board.boardId,
      isStarred: board.isStarred,
      ...(board.boardImageBg && { imageBg: board.boardImageBg }),
      ...(board.boardColorBg && { colorBg: board.boardColorBg }),
      board: board.boardTitle,
      column: columnsList.map(column => column.columnTitle),
      card: cardsList.map(card => card.cardTitle)
    };
    keysListToSearch.push(keyItem);
  });

  return keysListToSearch;
};

export const getSearchResult = inputKey => {
  const key = inputKey.toLowerCase();
  const keysData = getKeysToSearch();
  const searchResult = keysData
    .map(item => {
      const haveBoard =
        item.board.toLowerCase().includes(key) || key.includes(item.board.toLowerCase());
      const haveColumn = item.column.some(
        title => title.toLowerCase().includes(key) || key.includes(title.toLowerCase())
      );
      const haveCard = item.card.some(
        title => title.toLowerCase().includes(key) || key.includes(title.toLowerCase())
      );

      let newItem = { ...item };

      if (haveColumn) {
        const columnResult = newItem.column.filter(
          title => title.toLowerCase().includes(key) || key.includes(title.toLowerCase())
        );
        newItem = { ...newItem, column: columnResult };
      } else {
        delete newItem.column;
      }

      if (haveCard) {
        const cardResult = newItem.card.filter(
          title => title.toLowerCase().includes(key) || key.includes(title.toLowerCase())
        );
        newItem = { ...newItem, card: cardResult };
      } else {
        delete newItem.card;
      }

      return haveBoard || haveColumn || haveCard ? newItem : null;
    })
    .filter(Boolean);

  return searchResult;
};
