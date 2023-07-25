import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './SubBoardPage.module.scss';
import { useParams } from 'react-router-dom';
import { boardsListStorage, updateNewBoardToStorage } from '../../utils/local-storage';
import Button from '../../components/Button';
import { plusIcon } from '../../utils/icons';
import AddForm from './AddForm';
import ThemeContext from '../../contexts/ThemeContext';
import Column from './Column';
import Card from './Card';
import SubBoardHeader from './SubBoardHeader';

let cx = classNames.bind(styles);

const SubBoardPage = () => {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState([]);
  const [openAddColumnForm, setOpenAddColumnForm] = useState(false);

  const { darkMode } = useContext(ThemeContext);

  const fetchBoardData = () => {
    const boardsListData = boardsListStorage.load();
    const boardData = boardsListData.find(board => board.boardId === boardId);
    setBoardData(boardData);

    // update lastVisting
    const time = new Date().getTime();
    const newBoardsListData = boardsListData.map(board =>
      board.boardId === boardId ? { ...board, lastVisiting: time } : board
    );
    boardsListStorage.save(newBoardsListData);
  };

  useEffect(() => {
    fetchBoardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { boardImageBg, boardColorBg, columnsList } = boardData;

  const handleAddNewCard = (columnId, newCard) => {
    const newBoardData = { ...boardData };
    const updatingIndex = columnsList.findIndex(column => column.columnId === columnId);
    newBoardData.columnsList[updatingIndex].cardsList.push(newCard);
    setBoardData(newBoardData);

    updateNewBoardToStorage(boardId, newBoardData);
  };

  const handleAddNewColumn = newColumn => {
    const newBoardData = { ...boardData };
    newBoardData.columnsList.push(newColumn);
    setBoardData(newBoardData);

    updateNewBoardToStorage(boardId, newBoardData);
  };

  const handleRemoveColumn = columnId => {
    const newColumnsList = columnsList.filter(column => column.columnId !== columnId);
    const newBoardData = { ...boardData, columnsList: newColumnsList };
    setBoardData(newBoardData);

    updateNewBoardToStorage(boardId, newBoardData);
  };

  const handleRemoveCard = (cardId, columnId) => {
    const updatingColumn = columnsList.find(column => column.columnId === columnId);
    const newCardsList = updatingColumn.cardsList.filter(card => card.cardId !== cardId);
    const newColumn = { ...updatingColumn, cardsList: newCardsList };
    const newColumnsList = columnsList.map(column =>
      column.columnId === columnId ? newColumn : column
    );
    const newBoardData = { ...boardData, columnsList: newColumnsList };
    setBoardData(newBoardData);

    updateNewBoardToStorage(boardId, newBoardData);
  };

  const pageBackground =
    (boardImageBg && { backgroundImage: `url(${boardImageBg})` }) ||
    (boardColorBg && { backgroundColor: boardColorBg });

  return (
    <div className={cx('wrapper')} style={pageBackground}>
      <SubBoardHeader />
      <div className={cx('columns-list')}>
        {darkMode && <div className={cx('dark-mode-layer')}></div>}
        {/* Render Column */}
        {(boardData.columnsList || []).map(column => (
          <Column
            key={column.columnId}
            {...column}
            handleAddNewCard={handleAddNewCard}
            handleRemoveColumn={handleRemoveColumn}
          >
            <div className={cx('column__cards-list')}>
              {/* Render Card */}
              {column.cardsList.map(card => (
                <Card
                  key={card.cardId}
                  {...card}
                  columnId={column.columnId}
                  handleRemoveCard={handleRemoveCard}
                />
              ))}
            </div>
          </Column>
        ))}
        {/* Add Column Form/Button */}
        {openAddColumnForm ? (
          <div className={cx('add-column-form')}>
            <AddForm
              isAddColumnForm
              setCloseAddColumnForm={() => setOpenAddColumnForm(false)}
              handleAddNewColumn={handleAddNewColumn}
            />
          </div>
        ) : (
          <Button
            leftIcon={plusIcon}
            className={cx('add-column-btn')}
            onClick={() => setOpenAddColumnForm(true)}
          >
            Add another column
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubBoardPage;
