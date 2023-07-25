import React from 'react';
import classNames from 'classnames/bind';

import styles from './MenuBox.module.scss';

let cx = classNames.bind(styles);

const MenuBox = ({children}) => {
  return (
    <div className={cx('wrapper')}>
      {children}
    </div>
  )
}

export default MenuBox