import React from 'react';
import classNames from 'classnames/bind';

import styles from './SubBoardHeader.module.scss';
import { filterIcon, starRegularIcon, threeDotsIcon, viewModeIcon } from '../../../utils/icons';
import Button from '../../../components/Button';

let cx = classNames.bind(styles);

const SubBoardHeader = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('left-part')}>
        <input type="text" className={cx('board-title')} />

        <Button className={cx('star-icon')}>{starRegularIcon}</Button>
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
