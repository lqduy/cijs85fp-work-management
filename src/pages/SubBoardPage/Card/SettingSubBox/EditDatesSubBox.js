import { useState } from 'react';
import classNames from 'classnames/bind';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import MenuBox from '../../../../components/MenuBox';

import './EditDatesSubBox_reactDatePicker.scss';
import styles from './SettingSubBox.module.scss';
let cx = classNames.bind(styles);

const EditDatesSubBox = ({ onClickX }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <MenuBox className={cx('menu-box', 'editDates-box')} boxTitle={'Dates'} onClickX={onClickX}>
      <DatePicker
        wrapperClassName={cx('date-picker')}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </MenuBox>
  );
};

export default EditDatesSubBox;
