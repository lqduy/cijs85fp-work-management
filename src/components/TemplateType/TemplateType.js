import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from '../../pages/HomePage/HomePage.module.scss';
import Button from '../../components/Button';
import { boardsListStorage, columnsListStorage } from '../../utils/local-storage';


let cx = classNames.bind(styles);

const TemplateType = () => {
  const [boardsList, setBoardsList] = useState([]);
  const onFetchBoardsData = () => {
    const data = boardsListStorage.load();
    setBoardsList(data);
  };
  useEffect(() => {
    onFetchBoardsData();
  }, []);
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
      </div>
    );
    return boardElements;
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('sideBody')}>
        <section className={cx('section')}>
          <h3>Business</h3>
          <div className={cx('boards')}>
            {boardsListElements}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TemplateType;
