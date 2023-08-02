import React, { useState } from 'react';
import classNames from 'classnames/bind';

import MenuBox from '../../../../components/MenuBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './SettingSubBox.module.scss';
import Button from '../../../../components/Button';

let cx = classNames.bind(styles);

const labelColors = ['#4BCE97', '#e2b203', '#FAA53D', '#f87462', '#9f8fef', '#579dff'];

const EditLabelSubBox = ({ data, onClickX, handleUpdateLabels }) => {
  const [checkedList, setCheckedList] = useState(data);

  const handleCheck = color => {
    let newCheckedList = [];
    const isChecked = checkedList.includes(color);
    if (isChecked) {
      newCheckedList = checkedList.filter(c => c !== color);
    } else {
      newCheckedList = [...checkedList, color];
    }
    setCheckedList(newCheckedList);
    handleUpdateLabels(newCheckedList);
  };

  const onRemoveAll = () => {
    setCheckedList([]);
    handleUpdateLabels([]);
  };

  return (
    <MenuBox
      className={cx('menu-box', 'editLabels-box')}
      boxTitle={'Edit Labels'}
      onClickX={onClickX}
    >
      <input type="text" placeholder="Search labels..." />
      <h5>Labels</h5>
      <div className={cx('d-flex-col')}>
        {labelColors.map(color => (
          <div className={cx('editLabels__labelItem')} key={color}>
            <input
              type="checkbox"
              id={`labelcolor-${color.replace('#', '')}`}
              checked={checkedList.includes(color)}
              onChange={() => handleCheck(color)}
            />
            <label
              htmlFor={`labelcolor-${color.replace('#', '')}`}
              style={{ backgroundColor: color }}
            ></label>
            <FontAwesomeIcon icon={faPencil} size="sm" />
          </div>
        ))}
      </div>
      <Button className={cx('clear-all-btn')} onClick={onRemoveAll}>
        Clear all label(s)
      </Button>
    </MenuBox>
  );
};

export default EditLabelSubBox;
