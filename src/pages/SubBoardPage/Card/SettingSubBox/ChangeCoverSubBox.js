import React, { useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import MenuBox from '../../../../components/MenuBox';
import Button from '../../../../components/Button';
import { backgroundColorsList } from '../../../../utils/constants';
import { checkIcon } from '../../../../utils/icons';
import styles from './SettingSubBox.module.scss';

let cx = classNames.bind(styles);

const ChangeCoverSubBox = ({ data, onClickX, handleUpdateCover }) => {
  const { isFullSize, coverColor } = data;

  const [coverColorValue, setCoverColorValue] = useState(
    coverColor ?? backgroundColorsList.monoColor[0]
  );
  const [isFullSizeCover, setIsFullSizeCover] = useState(isFullSize);

  const onColorBgSelected = color => {
    setCoverColorValue(color);
    handleUpdateCover(isFullSizeCover, color);
  };

  const onSizeBgSelected = booleanValue => {
    setIsFullSizeCover(booleanValue);
    handleUpdateCover(booleanValue, coverColorValue);
  };

  const colorsListElements = useMemo(
    () =>
      backgroundColorsList.monoColor.map((color, index) => (
        <span
          key={index}
          className={cx('bgSelectBox')}
          style={{ backgroundColor: color }}
          onClick={() => onColorBgSelected(color)}
        >
          {color === coverColorValue && checkIcon}
        </span>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coverColorValue]
  );

  return (
    <MenuBox className={cx('menu-box', 'changeCover-box')} boxTitle={'Cover'} onClickX={onClickX}>
      <h5>Size</h5>
      <div className={cx('size-options')}>
        <div
          className={cx('size-half', 'size__wrap', { 'size-selected': !isFullSizeCover })}
          onClick={() => onSizeBgSelected(false)}
        >
          <div className={cx('cover')} style={{ backgroundColor: coverColorValue }}></div>
          <div className={cx('body')}>
            <span></span>
            <span></span>
            <div className={cx('d-flex')}>
              <span></span>
              <span></span>
            </div>
            <span className={cx('circle')}></span>
          </div>
        </div>
        <div
          className={cx('size-full', 'size__wrap', { 'size-selected': isFullSizeCover })}
          onClick={() => onSizeBgSelected(true)}
        >
          <div className={cx('size-full__core')} style={{ backgroundColor: coverColorValue }}>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <Button fullWidth>Remove cover</Button>
      <h5>Colors</h5>
      <div className={cx('colors-list')}>{colorsListElements}</div>
    </MenuBox>
  );
};

export default ChangeCoverSubBox;
