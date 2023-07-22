import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from './HomePage.module.scss';
import Button from '../../components/Button';
import CreateBoardForm from '../../components/CreateBoardForm';
import { boardsListStorage } from '../../utils/local-storage';

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

  const handleAddBoard = boardTitle => {
    const newBoard = {
      boardId: `bo-${uuidv4()}`,
      boardTitle: boardTitle,
      list: [
        {
          columnId: uuidv4(),
          name: 'Todo',
          items: []
        },
        {
          columnId: uuidv4(),
          name: 'In Progress',
          items: []
        },
        {
          columnId: uuidv4(),
          name: 'Completed',
          items: []
        }
      ]
    };
    const newBoardsList = [...boardsList, newBoard];
    setBoardsList(newBoardsList);
    boardsListStorage.save(newBoardsList);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('sideBar')}></div>
      <div className={cx('sideBody')}>
        <section className={cx('section')}>
          <h3>YOUR WORKSPACES</h3>
          <div className={cx('boards')}>
            {boardsList.length > 0 &&
              boardsList.map(board => (
                <Button key={board.boardId} className={cx('board')} to={`/b/${board.boardId}`}>
                  {board.boardTitle}
                </Button>
              ))}
            <Button className={cx('createNewBoardBtn')} onClick={() => setOpenCreateForm(true)}>
              Create new board
            </Button>
          </div>
        </section>
        {openCreateForm && (
          <CreateBoardForm
            handleCloseForm={() => setOpenCreateForm(false)}
            handleAddBoard={handleAddBoard}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
