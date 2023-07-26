import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../../components/Button';
import styles from './AddForm.module.scss';
import { plusIcon, xIcon } from '../../../utils/icons';

let cx = classNames.bind(styles);

const AddForm = props => {
  const {
    columnId,
    boardId,
    handleAddNewCard,
    setCloseAddCardForm,
    isAddColumnForm,
    setCloseAddColumnForm,
    handleAddNewColumn
  } = props || {};

  const [title, setTitle] = useState('');
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const onClickOutside = e => {
    const handleCloseForm = () => {
      if (isAddColumnForm) {
        setCloseAddColumnForm();
      } else {
        setCloseAddCardForm();
      }
    };
    if (formRef.current && !formRef.current.contains(e.target)) {
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

  const onSubmitToAdd = e => {
    e.preventDefault();
    if (title !== '') {
      if (isAddColumnForm) {
        const newColumn = {
          parentId: boardId,
          columnId: `co-${uuidv4()}`,
          columnTitle: title,
        };
        handleAddNewColumn(newColumn);
      } else {
        const newCard = {
          parentId: columnId,
          cardId: `ca-${uuidv4()}`,
          cardTitle: title
        };
        handleAddNewCard(newCard);
      }
      setTitle('');
      inputRef.current.focus();
    }
  };

  const onEnterToSubmit = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSubmitToAdd(e);
    }
  };

  const handleCloseForm = e => {
    e.preventDefault();
    if (isAddColumnForm) {
      setCloseAddColumnForm();
    } else setCloseAddCardForm();
  };

  const InputTagElement = isAddColumnForm ? 'input' : 'textarea';

  return (
    <form className={cx('add-item-form')} onSubmit={onSubmitToAdd} ref={formRef}>
      <InputTagElement
        ref={inputRef}
        placeholder={isAddColumnForm ? 'Enter column title...' : 'Enter a title for this card...'}
        className={cx('textarea', { 'add-column-input': isAddColumnForm })}
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={onEnterToSubmit}
        autoFocus
      />
      <div className={cx('form-btns')}>
        <Button type="submit" leftIcon={plusIcon} className={cx('add-item-form-submit-btn')}>
          {isAddColumnForm ? 'Add column' : 'Add card'}
        </Button>
        <Button className={cx('add-item-form-cancel-btn')} onClick={handleCloseForm}>
          {xIcon}
        </Button>
      </div>
    </form>
  );
};

AddForm.defaultProps = {
  isAddColumnForm: false
};

export default AddForm;
