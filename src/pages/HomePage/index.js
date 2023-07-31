import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../contexts/AuthContext';
import styles from './HomePage.module.scss';
import Button from '../../components/Button';
import CreateBoardForm from '../../components/CreateBoardForm';
import { boardsListStorage, columnsListStorage } from '../../utils/local-storage';
import { clockIcon, starRegularIcon, starSolidIcon } from '../../utils/icons';
import Sidebar from '../../components/Sidebar/Sidebar';


let cx = classNames.bind(styles);

const HomePage = () => {
  const [boardsList, setBoardsList] = useState([]);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const {currentUser} = useAuth()

  const onFetchBoardsData = () => {
    const data = boardsListStorage.load();
    setBoardsList(data);
  };

  useEffect(() => {
    onFetchBoardsData();
  }, []);

  const handleAddBoard = newBoard => {
    const newBoardsList = [...boardsList, newBoard];
    setBoardsList(newBoardsList);
    boardsListStorage.save(newBoardsList);

    const newColumns = [
      {
        parentId: newBoard.boardId,
        columnId: `co-${uuidv4()}`,
        columnTitle: 'Todo'
      },
      {
        parentId: newBoard.boardId,
        columnId: `co-${uuidv4()}`,
        columnTitle: 'In Progress'
      },
      {
        parentId: newBoard.boardId,
        columnId: `co-${uuidv4()}`,
        columnTitle: 'Completed'
      }
    ];
    const columnsListData = columnsListStorage.load();
    const newColumnList = [...columnsListData, ...newColumns];
    columnsListStorage.save(newColumnList);

    setOpenCreateForm(false);
  };

  const handleSetStarByBoardId = boardId => {
    const newBoardList = boardsList.map(board =>
      board.boardId === boardId ? { ...board, isStarred: !board.isStarred } : board
    );
    setBoardsList(newBoardList);
    boardsListStorage.save(newBoardList);
  };

  let starredBoardsElements = [];
  let lastestVistingBoardsElements = ([...boardsList] || [])
    .sort((board, nextBoard) => +nextBoard.lastVisiting - +board.lastVisiting)
    .filter(board => board.lastVisiting > 0)
    .slice(0, 4);
  const boardsListElements = (boardsList || []).map(board => {
    const boardElements = (
      <div key={board.boardId} className={cx('boardWrap')}>
        <Button
          className={cx('board')}
          to={`/b/${board.boardId}`}
          style={
            (board.boardImageBg && { backgroundImage: `url(${board.boardImageBg})` }) ||
            (board.boardColorBg && { backgroundColor: board.boardColorBg })
          }
        >
          {board.boardTitle}
        </Button>
        {
          <span
            className={cx('starIcon', { yellowStar: board.isStarred })}
            onClick={() => handleSetStarByBoardId(board.boardId)}
          >
            {board.isStarred ? starSolidIcon : starRegularIcon}
          </span>
        }
      </div>
    );
    if (board.isStarred) {
      starredBoardsElements = [...starredBoardsElements, boardElements];
    }
    const isTop4RecentlyVisited = lastestVistingBoardsElements.some(
      vistedBoard => vistedBoard.boardId === board.boardId
    );
    if (isTop4RecentlyVisited) {
      lastestVistingBoardsElements = lastestVistingBoardsElements.map(vistedBoard =>
        vistedBoard.boardId === board.boardId ? boardElements : vistedBoard
      );
    }

    return boardElements;
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('sideBody')}>
        <section className={cx('section')}>
          <h3>
            <p>Hello, {currentUser}</p>
            <span>{starRegularIcon}</span>
            <span>Starred boards</span>
          </h3>
          <div className={cx('boards')}>{starredBoardsElements}</div>
        </section>
        <section className={cx('section')}>
          <h3>
            <span>{clockIcon}</span>
            <span>Recently viewed</span>
          </h3>
          <div className={cx('boards')}>{lastestVistingBoardsElements}</div>
        </section>
        <section className={cx('section')}>
          <h3>YOUR WORKSPACES</h3>
          <div className={cx('boards')}>
            {boardsListElements}
            <Button className={cx('createNewBoardBtn')} onClick={() => setOpenCreateForm(true)}>
              Create new board
            </Button>
          </div>
        </section>
      </div>
      {openCreateForm && (
        <CreateBoardForm
          handleCloseForm={() => setOpenCreateForm(false)}
          handleAddBoard={handleAddBoard}
          onCloseCreateForm={() => setOpenCreateForm(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
