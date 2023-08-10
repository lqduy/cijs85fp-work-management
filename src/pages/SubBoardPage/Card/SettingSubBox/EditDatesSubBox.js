import { useState } from "react";
import classNames from "classnames/bind";

import MenuBox from "../../../../components/MenuBox";

import "./EditDatesSubBox_reactDatePicker.scss";
import styles from "./SettingSubBox.module.scss";
import CustomDatePicker from "../../../../components/CustomDatePicker/CustomDatePicker";
let cx = classNames.bind(styles);

const EditDatesSubBox = ({ onClickX }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <MenuBox
      className={cx("menu-box", "editDates-box")}
      boxTitle={"Dates"}
      onClickX={onClickX}
    >
      <CustomDatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
      />
    </MenuBox>
  );
};

export default EditDatesSubBox;
