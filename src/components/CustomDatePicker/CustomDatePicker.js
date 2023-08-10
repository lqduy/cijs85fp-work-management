import React from "react";
import styles from "./CustomDatePicker.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);
const CustomDatePicker = ({ props }) => {
  return (
    <div className={cx('root')}>
      <DatePicker selectsRange inline {...props} />
    </div>
  );
};

export default CustomDatePicker;
