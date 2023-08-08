import React, { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';
import { xIcon } from '../../utils/icons';
import styles from './MenuBox.module.scss';

let cx = classNames.bind(styles);

const MenuBox = ({ children, className, boxTitle = false, onClickX }) => {
  const boxRef = useRef(null);

  const onClickOutsideSettingBox = e => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      onClickX();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutsideSettingBox);
    return () => {
      document.removeEventListener('mousedown', onClickOutsideSettingBox);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={boxRef} className={cx('setting-box', className)}>
      <div className={cx('box-title')}>
        {boxTitle && <h4>{boxTitle}</h4>}
        <Button className={cx('close-settingbox-btn')} onClick={onClickX}>
          {xIcon}
        </Button>
      </div>
      {children}
    </div>
  );
};

export default MenuBox;
