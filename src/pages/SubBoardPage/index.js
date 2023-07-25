import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './SubBoardPage.module.scss';
import { useParams } from 'react-router-dom';
import { boardsListStorage } from '../../utils/local-storage';
import Button from '../../components/Button';
import { editIcon, plusIcon } from '../../utils/icons';
import AddForm from './AddForm';
import ThemeContext from '../../contexts/ThemeContext';
import Column from './Column';
import Card from './Card';

let cx = classNames.bind(styles);

const SubBoardPage = () => {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState([]);
  const [openAddCardForm, setOpenAddCardForm] = useState(null);
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

    const boardsListData = boardsListStorage.load();
    const newBoardsList = boardsListData.map(board =>
      board.boardId === boardId ? newBoardData : board
    );
    boardsListStorage.save(newBoardsList);
  };

  const handleAddNewColumn = newColumn => {
    const newBoardData = { ...boardData };
    newBoardData.columnsList.push(newColumn);
    setBoardData(newBoardData);

    const boardsListData = boardsListStorage.load();
    const newBoardsList = boardsListData.map(board =>
      board.boardId === boardId ? newBoardData : board
    );
    boardsListStorage.save(newBoardsList);
  };

  const pageBackground =
    (boardImageBg && { backgroundImage: `url(${boardImageBg})` }) ||
    (boardColorBg && { backgroundColor: boardColorBg });

  return (
    <div className={cx('wrapper')} style={pageBackground}>
      {darkMode && <div className={cx('dark-mode-layer')}></div>}
      <div className={cx('columns-list')}>
        {/* Render Column */}
        {(boardData.columnsList || []).map(column => (
          <Column
            {...column}
            handleAddNewCard={handleAddNewCard}
            openAddCardForm={openAddCardForm}
            setOpenAddCardForm={() => setOpenAddCardForm(column.columnId)}
            setCloseAddCardForm={() => setOpenAddCardForm(null)}
          >
            <div className={cx('column__cards-list')}>
              {/* Render Card */}
              {column.cardsList.map(card => (
                <Card {...card} />
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
