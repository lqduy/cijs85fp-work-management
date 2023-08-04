import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import MenuBox from '../../../../components/MenuBox';
import { checkIcon } from '../../../../utils/icons';
import { coverColorsListData } from '../../../../utils/constants';
import styles from './SettingSubBox.module.scss';
import ThemeContext from '../../../../contexts/ThemeContext';

let cx = classNames.bind(styles);

const ChangeCoverSubBox = ({ data, onClickX, handleUpdateCover }) => {
  const { isFullSize, coverColor } = data;

  const { darkMode } = useContext(ThemeContext);
  const coverColorsList = useMemo(
    () => coverColorsListData.map(color => (darkMode ? color.dark : color.light)),
    [darkMode]
  );

  const [coverColorValue, setCoverColorValue] = useState(coverColor ?? coverColorsList[0]);
  const [isFullSizeCover, setIsFullSizeCover] = useState(isFullSize);

  const onColorBgSelected = color => {
    setCoverColorValue(color);
    handleUpdateCover(isFullSizeCover, color);
  };

  const onSizeBgSelected = booleanValue => {
    setIsFullSizeCover(booleanValue);
    handleUpdateCover(booleanValue, coverColorValue);
  };

  const onRemoveCover = () => {
    setCoverColorValue(null);
    setIsFullSizeCover(false);
    handleUpdateCover(false, null);
  };

  const colorsListElements = useMemo(
    () =>
      coverColorsList.map((color, index) => (
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
      <button className={cx('remove-cover-btn')} onClick={onRemoveCover}>
        Remove cover
      </button>
      <h5>Colors</h5>
      <div className={cx('colors-list')}>{colorsListElements}</div>
    </MenuBox>
  );
};

export default ChangeCoverSubBox;
