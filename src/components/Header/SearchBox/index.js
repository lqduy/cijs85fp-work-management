import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './SearchBox.module.scss';
import { starSolidIcon } from '../../../utils/icons';
let cx = classNames.bind(styles);

const SearchBox = ({ data, handleCloseSearchBox, selectedIndex }) => {
  const navigate = useNavigate();

  const handleEnterBoard = boardId => {
    navigate(`/b/${boardId}`);
    handleCloseSearchBox();
  };

  const handleEnterCard = (e, boardId, idsList, index) => {
    e.stopPropagation();
    const cardId = idsList[index];
    navigate(`/b/${boardId}/${cardId}`);
    handleCloseSearchBox();
  };

  return (
    <div className={cx('search-wrap')}>
      <div className={cx('search-result-list')}>
        {data &&
          data.map((item, index) => {
            const boardThumbnail =
              (item.imageBg && { backgroundImage: `url(${item.imageBg})` }) ||
              (item.colorBg && { backgroundColor: item.colorBg });
            return (
              <div
                key={item._id}
                className={cx('result-item', { 'selected-item': selectedIndex === index })}
                onMouseDown={e => e.preventDefault()}
                onClick={() => handleEnterBoard(item._id)}
              >
                <div className={cx('thumbnail')} style={boardThumbnail}>
                  <span>{item.board[0]}</span>
                </div>
                <div className={cx('details')}>
                  <div className={cx('details__board')}>
                    <p>Board</p>
                    <h3>{item.board}</h3>
                    {item.isStarred && <span className={cx('star-icon')}>{starSolidIcon}</span>}
                  </div>
                  {item.column && item.column.length > 0 && (
                    <div className={cx('details__column')}>
                      <p>Column(s)</p>
                      <div className={cx('result-list')}>
                        {item.column.map((columnTitle, index) => (
                          <h3 key={index}>{columnTitle}</h3>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.card && item.card.length > 0 && (
                    <div className={cx('details__card')}>
                      <p>Card(s)</p>
                      <div className={cx('result-list')}>
                        {item.card.map((cardTitle, index) => (
                          <h3
                            key={index}
                            onClick={e => handleEnterCard(e, item._id, item.card_id, index)}
                          >
                            {cardTitle}
                          </h3>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        {data.length === 0 && (
          <div className={cx('no-search-result')}>
            <img src="/assets/vectors/search-result.png" alt="Search result" />
            <p>
              No search results yet. <br /> Enter the title of the board, column, or card.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
