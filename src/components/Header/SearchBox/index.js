import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './SearchBox.module.scss';
import { starSolidIcon } from '../../../utils/icons';
let cx = classNames.bind(styles);

const SearchBox = ({ data, handleCloseSearchBox, selectedIndex }) => {
  return (
    <div className={cx('search-wrap')}>
      <div className={cx('search-result-list')}>
        {data &&
          data.map((item, index) => {
            const boardThumbnail =
              (item.imageBg && { backgroundImage: `url(${item.imageBg})` }) ||
              (item.colorBg && { backgroundColor: item.colorBg });
            return (
              <Link
                key={item._id}
                to={`/b/${item._id}`}
                onMouseDown={e => e.preventDefault()}
                onClick={handleCloseSearchBox}
              >
                <div className={cx('result-item', { 'selected-item': selectedIndex === index })}>
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
                            <h3 key={index}>{cardTitle}</h3>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
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
