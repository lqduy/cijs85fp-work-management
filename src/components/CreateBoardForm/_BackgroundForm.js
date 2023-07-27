import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CreateBoardForm.module.scss';
import { backgroundColorsList, backgroundImagesList } from '../../utils/constants';
import { backCaretIcon, xIcon } from '../../utils/icons';
import Button from '../Button';

let cx = classNames.bind(styles);

const BackgroundForm = ({
  wrapperClassName,
  onCloseSubForm,
  getImageBgElements,
  getColorBgElements
}) => {
  const [showMoreImageBg, setShowMoreImageBg] = useState(false);
  const [showMoreColorBg, setShowMoreColorBg] = useState(false);

  const isStart = !showMoreColorBg && !showMoreImageBg;

  let imageBgElements = [];
  let monoColorBgElements = [];
  let gradientColorBgElements = [];

  const onClickShowMoreImageBg = e => {
    e.preventDefault();
    setShowMoreImageBg(true);
    setShowMoreColorBg(false);
  };

  const onClickShowMoreColorBg = e => {
    e.preventDefault();
    setShowMoreColorBg(true);
    setShowMoreImageBg(false);
  };

  const onBackSubForm = e => {
    e.preventDefault();
    setShowMoreImageBg(false);
    setShowMoreColorBg(false);
  };

  if (isStart) {
    imageBgElements = getImageBgElements(backgroundImagesList.slice(5, 11));
    gradientColorBgElements = getImageBgElements(backgroundColorsList.gradientColor.slice(0, 6));
  } else if (showMoreImageBg) {
    imageBgElements = getImageBgElements(backgroundImagesList);
  } else if (showMoreColorBg) {
    imageBgElements = getImageBgElements(backgroundColorsList.gradientColor);
    monoColorBgElements = getColorBgElements(backgroundColorsList.monoColor);
  }

  return (
    <div className={cx(wrapperClassName, 'backgroundForm')}>
      {isStart && (
        <>
          <h4>Board background</h4>
          <div className={cx('photoBackground')}>
            <div className={cx('title')}>
              <h5>Photos</h5>
              <Button className={cx('seeMoreBtn')} onClick={onClickShowMoreImageBg}>
                See more
              </Button>
            </div>

            <div className={cx('images')}>{imageBgElements}</div>
          </div>
          <div className={cx('colorBackground')}>
            <div className={cx('title')}>
              <h5>Colors</h5>
              <Button className={cx('seeMoreBtn')} onClick={onClickShowMoreColorBg}>
                See more
              </Button>
            </div>
            <div className={cx('images')}>{gradientColorBgElements}</div>
          </div>
        </>
      )}

      {!isStart && showMoreImageBg && (
        <>
          <h4>Photos</h4>
          <div className={cx('showMoreImageBg')}>{imageBgElements}</div>
        </>
      )}

      {!isStart && showMoreColorBg && (
        <>
          <h4>Colors</h4>
          <div className={cx('showMoreColorBg')}>{imageBgElements}</div>
          <div className={cx('showMoreColorBg')}>{monoColorBgElements}</div>
        </>
      )}
      {!isStart && (
        <Button className={cx('backBtn')} onClick={onBackSubForm}>
          {backCaretIcon}
        </Button>
      )}
      <Button className={cx('closeBtn')} onClick={onCloseSubForm}>
        {xIcon}
      </Button>
    </div>
  );
};

export default BackgroundForm;
