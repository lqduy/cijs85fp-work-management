import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';
import Button from '../../components/Button';
import CreateBoardForm from '../../components/CreateBoardForm';
import { boardsListStorage } from '../../utils/local-storage';
import { clockIcon, starRegularIcon, starSolidIcon } from '../../utils/icons';

let cx = classNames.bind(styles);

const HomePage = () => {
  const [boardsList, setBoardsList] = useState([]);
  const [openCreateForm, setOpenCreateForm] = useState(false);

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
    return boardElements;
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('sideBar')}></div>
      <div className={cx('sideBody')}>
        <section className={cx('section')}>
          <h3>
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
          <div className={cx('boards')}></div>
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
        />
      )}
    </div>
  );
};

export default HomePage;
