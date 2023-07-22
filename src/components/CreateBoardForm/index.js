import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CreateBoardForm.module.scss';
import Button from '../Button';

let cx = classNames.bind(styles);

const CreateBoardForm = ({ handleCloseForm, handleAddBoard }) => {
  const [titleValue, setTitleValue] = useState('');
  const ref = useRef(null);

  const onClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      handleCloseForm();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = e => {
    e.preventDefault();
    if (titleValue.length > 0) {
      handleAddBoard(titleValue);
      setTitleValue('');
    }
  };

  return (
    <form className={cx('wrapper')} ref={ref} onSubmit={onSubmitForm}>
      <h4>Create board</h4>
      <div className={cx('boardWhiteFrame')}>
        <img src="/assets/white-frame/board.svg" alt="board-white-frame" />
      </div>
      <div className={cx('background')}>
        <h5>Background</h5>
      </div>
      <div className={cx('boardTitle')}>
        <label htmlFor="inputBoarTitle">
          <h5>Board title</h5>
        </label>
        <input
          id="inputBoarTitle"
          type="text"
          value={titleValue}
          onChange={e => setTitleValue(e.target.value)}
        />
      </div>
      <Button className={cx('formBtn')} type="submit" fullWidth>
        Create
      </Button>
      <Button className={cx('formBtn')} fullWidth>
        Start with temple
      </Button>
    </form>
  );
};

export default CreateBoardForm;
