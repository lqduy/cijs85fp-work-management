import React from 'react';
import classNames from 'classnames/bind';

import styles from './SearchBox.module.scss';
let cx = classNames.bind(styles);

const SearchBox = () => {
  return (
    <div className={cx('search-wrap')}>
      <div className={cx('search-result-list')}>
        <div className={cx('result-item')}>
          <div className={cx('thumbnail')}></div>
          <div className={cx('details')}>
            <div className={cx('details__board')}>
              <h3>Board Title</h3>
              <p>Board</p>
            </div>
            <div className={cx('details__column')}>
              <h3>Column Title</h3>
              <p>Board</p>
            </div>
            <div className={cx('details__card')}>
              <h3>Card Title</h3>
              <p>Board</p>
            </div>
          </div>
        </div>
        <div className={cx('result-item')}>
          <div className={cx('thumbnail')}></div>
          <div className={cx('details')}>
            <div className={cx('details__board')}>
              <h3>Board Title</h3>
              <p>Board</p>
            </div>
            <div className={cx('details__column')}>
              <h3>Column Title</h3>
              <p>Board</p>
            </div>
            <div className={cx('details__card')}>
              <h3>Card Title</h3>
              <p>Board</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox