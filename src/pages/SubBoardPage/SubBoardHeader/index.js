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
import { boardsListStorage, updateNewBoardToStorage } from '../../../utils/local-storage';

let cx = classNames.bind(styles);

const SubBoardHeader = ({ boardData }) => {
  const { boardTitle, isStarred } = boardData;

  const [isStarredIcon, setIsStarredIcon] = useState(isStarred);
  const [boardTitleValue, setBoardTitleValue] = useState(boardTitle);
  const [editingBoardTitle, setEditingBoardTitle] = useState(false);

  const handleEditBoardTitle = e => {
    let newTitle = e.target.value;
    setBoardTitleValue(newTitle);

    if (newTitle.length === 0) {
      newTitle = 'Unknown';
    }
    const newBoardData = { ...boardData, boardTitle: newTitle };
    updateNewBoardToStorage(boardData.boardId, newBoardData);
  };

  const onEnterToSaveEditing = e => {
    if (e.key === 'Enter') {
      setEditingBoardTitle(false);
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
          onChange={handleEditBoardTitle}
          readOnly={!editingBoardTitle}
          onFocus={() => setEditingBoardTitle(true)}
          onBlur={() => setEditingBoardTitle(false)}
          onKeyDown={onEnterToSaveEditing}
          size={boardTitleValue.length}
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
