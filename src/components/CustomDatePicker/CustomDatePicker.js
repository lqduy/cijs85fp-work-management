import React from 'react';
import styles from './CustomDatePicker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);
const CustomDatePicker = ({ startDate, endDate, onChangeDates }) => {
  return (
    <div className={cx('root')} onMouseDown={(e) => e.stopPropagation()}>
      <DatePicker
        selected={startDate}
        onChange={onChangeDates}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
  );
};

export default CustomDatePicker;
