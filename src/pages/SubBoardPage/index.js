import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './SubBoardPage.module.scss';
import { useParams } from 'react-router-dom';
import {
  boardsListStorage,
  cardsListStorage,
  columnsListStorage,
  updateNewBoardToStorage
} from '../../utils/local-storage';
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
  const [boardData, setBoardData] = useState({});
  const [columnsData, setColumnsData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [openAddColumnForm, setOpenAddColumnForm] = useState(false);

  const { darkMode } = useContext(ThemeContext);

  const handleFetchData = () => {
    const boardsListData = boardsListStorage.load();
    const boardData = boardsListData.find(board => board.boardId === boardId);
    setBoardData(boardData);

    const columnsListData = columnsListStorage.load();
    const columnsData = columnsListData.filter(column => column.parentId === boardId);
    setColumnsData(columnsData);

    const cardsListData = cardsListStorage.load();
    const cardsData = cardsListData.filter(card =>
      columnsData.some(column => column.columnId === card.parentId)
    );
    setCardsData(cardsData);

    // Update lastVisting
    const time = new Date().getTime();
    const newBoardsListData = boardsListData.map(board =>
      board.boardId === boardId ? { ...board, lastVisiting: time } : board
    );
    boardsListStorage.save(newBoardsListData);
  };

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { boardImageBg, boardColorBg } = boardData;

  const handleAddNewColumn = newColumn => {
    const newColumnsList = [...columnsData, newColumn];
    setColumnsData(newColumnsList);

    columnsListStorage.save(newColumnsList);
  };

  const handleRemoveColumn = columnId => {
    const newColumnsList = columnsData.filter(column => column.columnId !== columnId);
    setColumnsData(newColumnsList);

    columnsListStorage.save(newColumnsList);
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
        {(columnsData || []).map(column => (
          <Column
            key={column.columnId}
            {...column}
            handleRemoveColumn={handleRemoveColumn}
          />
        ))}
        {/* Add Column Form/Button */}
        {openAddColumnForm ? (
          <div className={cx('add-column-form')}>
            <AddForm
              isAddColumnForm
              boardId={boardId}
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
