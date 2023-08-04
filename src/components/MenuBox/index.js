import React from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';
import { xIcon } from '../../utils/icons';
import styles from './MenuBox.module.scss';

let cx = classNames.bind(styles);

const MenuBox = ({ children, className, boxTitle, onClickX }) => {
  return (
    <div className={cx('setting-box', className)}>
      <div className={cx('box-title')}>
        <h4>{boxTitle}</h4>
        <Button className={cx('close-settingbox-btn')} onClick={onClickX}>
          {xIcon}
        </Button>
      </div>
      {children}
    </div>
  );
};

export default MenuBox;
