import React from 'react';
import classNames from 'classnames/bind';
import MenuBox from '../../../../components/MenuBox';

import './SettingSubBox.module.scss';
let cx = classNames.bind();

const EditDatesSubBox = ({ onClickX }) => {
  return (
    <MenuBox
      className={cx('menu-box', 'changeCover-box')}
      boxTitle={'Dates'}
      onClickX={onClickX}
    ></MenuBox>
  );
};

export default EditDatesSubBox;
