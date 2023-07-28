import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SubBoardHeader.module.scss';
import {
  filterIcon,
  starRegularIcon,
  starSolidIcon,
  threeDotsIcon,
  viewModeIcon
} from '../../../utils/icons';
import Button from '../../../components/Button';
import { updateNewBoardToStorage } from '../../../utils/local-storage';

let cx = classNames.bind(styles);

const SubBoardHeader = ({ boardData }) => {
  const { boardTitle, isStarred } = boardData;

  const [isStarredIcon, setIsStarredIcon] = useState(isStarred);
  const [boardTitleValue, setBoardTitleValue] = useState(boardTitle);
  const [editingBoardTitle, setEditingBoardTitle] = useState(false);

  const handleEditBoardTitle = e => {
    if (boardTitleValue !== '') {
      const newBoardData = { ...boardData, boardTitle: boardTitleValue };
      updateNewBoardToStorage(boardData.boardId, newBoardData);
    }
    setEditingBoardTitle(false);
  };

  const onEnterToSaveEditing = e => {
    if (e.key === 'Enter') {
      handleEditBoardTitle();
    }
  };

  const handleSetStar = () => {
    const status = !isStarredIcon;
    setIsStarredIcon(status);

    const newBoardData = { ...boardData, isStarred: status };
    updateNewBoardToStorage(boardData.boardId, newBoardData);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('left-part')}>
        <input
          type="text"
          className={cx('board-title', {
            'board-title__editing': editingBoardTitle && boardTitleValue.length > 0,
            'board-tile__error': boardTitleValue.length === 0
          })}
          value={boardTitleValue}
          onChange={e => setBoardTitleValue(e.target.value)}
          readOnly={!editingBoardTitle}
          onFocus={() => setEditingBoardTitle(true)}
          onBlur={handleEditBoardTitle}
          onKeyDown={onEnterToSaveEditing}
          size={boardTitleValue.length - 4 || 0}
        />
        <Button className={cx('star-icon')} onClick={handleSetStar}>
          {isStarredIcon ? starSolidIcon : starRegularIcon}
        </Button>
      </div>
      <div className={cx('right-part')}>
        <Button leftIcon={filterIcon} className={cx('filter-icon')}>
          Filter
        </Button>
        <Button leftIcon={viewModeIcon}>View mode</Button>
        <Button>{threeDotsIcon}</Button>
      </div>
    </div>
  );
};

export default SubBoardHeader;
