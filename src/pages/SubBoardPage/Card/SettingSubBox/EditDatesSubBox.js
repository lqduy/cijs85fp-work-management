import { useState } from 'react';
import classNames from 'classnames/bind';

import MenuBox from '../../../../components/MenuBox';

import styles from './SettingSubBox.module.scss';
import CustomDatePicker from '../../../../components/CustomDatePicker/CustomDatePicker';
import Button from '../../../../components/Button';
let cx = classNames.bind(styles);

const CHECK_DATE_TYPE = {
  START: 'start',
  END: 'end',
};

const convertToDate = (dateString) => {
  if (!dateString) return new Date();
  var parts = dateString.split('/');
  var date = new Date(parts[2], parts[1] - 1, parts[0]);
  return date;
};

const EditDatesSubBox = ({
  taskStartDate,
  taskDueDate,
  onClickX,
  handleUpdateDates,
}) => {
  const [startDate, setStartDate] = useState(() =>
    convertToDate(taskStartDate)
  );
  const [endDate, setEndDate] = useState(() => convertToDate(taskDueDate));
  const [cardDates, setCardDates] = useState({
    taskStartDate: taskStartDate,
    taskDueDate: taskDueDate,
  });

  const [allowCheck, setAllowCheck] = useState([
    CHECK_DATE_TYPE.START,
    CHECK_DATE_TYPE.END,
  ]);

  const handleChangeDates = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    let newCardDates = {};
    if (start) {
      newCardDates = { taskStartDate: getDate(start), taskDueDate: null };
    }
    if (end) {
      newCardDates = { ...cardDates, taskDueDate: getDate(end) };
    }
    setCardDates(newCardDates);
  };

  const getDate = (dateObj) => {
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const ddmmyyyy = `${day}/${month}/${year}`;
    return ddmmyyyy;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    const newCardDates = { ...cardDates, [name]: value };
    setCardDates(newCardDates);
  };

  const onClickRemoveDates = () => {
    const initialValue = {
      taskStartDate: null,
      taskDueDate: null,
    };
    handleUpdateDates(initialValue);
    setCardDates(initialValue);
  };

  return (
    <MenuBox
      className={cx('menu-box', 'editDates-box')}
      boxTitle={'Dates'}
      onClickX={onClickX}
    >
      <CustomDatePicker
        startDate={startDate}
        onChangeDates={handleChangeDates}
        endDate={endDate}
      />
      <div className={cx('form-wrap')}>
        <h4>Start date</h4>
        <div className={cx('date-display')}>
          <input type="checkbox" checked id="start-check" />
          <label htmlFor="start-check">
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              name="taskStartDate"
              value={cardDates?.taskStartDate ? cardDates.taskStartDate : ''}
              onChange={onChangeInput}
            />
          </label>
        </div>
        <h4>Due date</h4>
        <div className={cx('date-display')}>
          <input type="checkbox" checked id="end-check" />
          <label htmlFor="end-check">
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              name="taskDueDate"
              value={cardDates?.taskDueDate ? cardDates.taskDueDate : ''}
              onChange={onChangeInput}
            />
          </label>
        </div>
        <Button
          className={cx('save-btn')}
          onClick={() => handleUpdateDates(cardDates)}
        >
          Save
        </Button>
        <Button className={cx('remove-btn')} onClick={onClickRemoveDates}>
          Remove
        </Button>
      </div>
    </MenuBox>
  );
};

export default EditDatesSubBox;
