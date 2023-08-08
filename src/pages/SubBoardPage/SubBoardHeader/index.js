import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SubBoardHeader.module.scss';
import {
  checkIcon,
  filterIcon,
  starRegularIcon,
  starSolidIcon,
  threeDotsIcon,
  trashIcon,
  viewModeIcon,
  xIcon
} from '../../../utils/icons';
import Button from '../../../components/Button';
import {
  boardsListStorage,
  cardsListStorage,
  columnsListStorage,
  updateNewBoardToStorage
} from '../../../utils/local-storage';
import MenuBox from '../../../components/MenuBox';
import { SUBBOARD_HEADER_SUBMENU } from '../../../utils/constants';
import { useNavigate } from 'react-router';

let cx = classNames.bind(styles);

const SubBoardHeader = ({ boardData }) => {
  const { boardId, boardTitle, isStarred } = boardData;

  const [isStarredIcon, setIsStarredIcon] = useState(isStarred);
  const [boardTitleValue, setBoardTitleValue] = useState(boardTitle);
  const [editingBoardTitle, setEditingBoardTitle] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [removePreparing, setRemovePreparing] = useState(false);

  const navigator = useNavigate();

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

  const handleRemoveBoard = () => {
    const boardData = boardsListStorage.load();
    const columnData = columnsListStorage.load();
    const cardData = cardsListStorage.load();

    const columnIds = columnData
      .filter(column => column.parentId === boardId)
      .map(column => column.columnId);
    const newColumnsList = columnData.filter(column => column.parentId !== boardId);
    const newCardsList = cardData.filter(card =>
      columnIds.every(columnId => columnId !== card.parentId)
    );
    const newBoardsList = boardData.filter(board => board.boardId !== boardId);

    boardsListStorage.save(newBoardsList);
    columnsListStorage.save(newColumnsList);
    cardsListStorage.save(newCardsList);

    navigator('/');
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
          size={boardTitleValue.length}
        />
        <Button className={cx('star-icon')} onClick={handleSetStar}>
          {isStarredIcon ? starSolidIcon : starRegularIcon}
        </Button>
      </div>
      <div className={cx('right-part')}>
        <div className={cx('setting-item__wrap')}>
          <Button leftIcon={filterIcon} className={cx('setting-item', 'filter-btn')}>
            Filter
          </Button>
        </div>
        <div className={cx('setting-item__wrap')}>
          <Button leftIcon={viewModeIcon} className={cx('setting-item')}>
            View mode
          </Button>
        </div>
        <div className={cx('setting-item__wrap')}>
          <Button onClick={() => setOpenSubMenu(SUBBOARD_HEADER_SUBMENU.SETTING)}>
            {threeDotsIcon}
          </Button>
          {openSubMenu === SUBBOARD_HEADER_SUBMENU.SETTING && (
            <MenuBox
              className={cx('right-align')}
              boxTitle={'Board Setting'}
              onClickX={() => setOpenSubMenu(null)}
              resetFunction={() => setRemovePreparing(false)}
            >
              <div className={cx('setting-item', 'remove-board')}>
                <Button
                  leftIcon={trashIcon}
                  className={cx('setting-item__btn', 'remove-btn', {
                    'disable-hover': removePreparing
                  })}
                  onClick={() => setRemovePreparing(true)}
                  fullWidth={!removePreparing}
                >
                  Remove this board
                </Button>
                {removePreparing && (
                  <div className={cx('preparing-remove-btn')}>
                    <Button className={cx('submit-remove-btn')} onClick={handleRemoveBoard}>
                      {checkIcon}
                    </Button>
                    <Button
                      className={cx('cancel-remove-btn')}
                      onClick={() => setRemovePreparing(false)}
                    >
                      {xIcon}
                    </Button>
                  </div>
                )}
              </div>
            </MenuBox>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubBoardHeader;
