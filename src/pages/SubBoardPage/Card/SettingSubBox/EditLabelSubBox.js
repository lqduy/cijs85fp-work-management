import React from 'react';
import classNames from 'classnames/bind';

import MenuBox from '../../../../components/MenuBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './SettingSubBox.module.scss';

let cx = classNames.bind(styles);

const labelColors = ['#4BCE97', '#e2b203', '#FAA53D', '#f87462', '#9f8fef', '#579dff'];

const EditLabelSubBox = () => {
  return (
    <MenuBox className={cx('menu-box', 'editLabels-box')} boxTitle={'Edit Labels'}>
      <input type="text" placeholder="Search labels..." />
      <h5>Labels</h5>
      <div className={cx('d-flex-col')}>
        {labelColors.map(color => (
          <div className={cx('editLabels__labelItem')} key={color}>
            <input type="checkbox" id={`labelcolor-${color.replace('#', '')}`} />
            <label
              htmlFor={`labelcolor-${color.replace('#', '')}`}
              style={{ backgroundColor: color }}
            ></label>
            <FontAwesomeIcon icon={faPencil} size="sm" />
          </div>
        ))}
      </div>
    </MenuBox>
  );
};

export default EditLabelSubBox;
