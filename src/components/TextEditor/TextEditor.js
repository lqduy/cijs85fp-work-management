import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import classNames from 'classnames/bind';
import styles from './TextEditor.module.scss';
import Button from '../Button';
import { cardsListStorage } from '../../utils/local-storage';
import { penIcon, xIcon } from '../../utils/icons';
import 'react-quill/dist/quill.snow.css';

let cx = classNames.bind(styles);

const TextEditor = ({ cardId, cardDescription }) => {
  const [descValue, setDescValue] = useState(cardDescription);
  const [openEditor, setOpenEditor] = useState(false);
  const descPrevValueRef = useRef(null);
  const hasInitialValues = cardId && cardDescription;
  const initialValues = cardDescription;

  const handleUpdateCardDescription = () => {
    if (descValue !== '') {
      const cardsListData = cardsListStorage.load();
      const newCardsListData = cardsListData.map((card) =>
        card.cardId === cardId ? { ...card, description: descValue } : card
      );
      cardsListStorage.save(newCardsListData);
    } else if (descPrevValueRef.current) {
      setDescValue(descPrevValueRef.current);
    }
    setOpenEditor(false);
  };

  useEffect(() => {
    if (hasInitialValues) {
      setDescValue(initialValues);
    } else setDescValue('');
    if (initialValues === '') {
      setOpenEditor(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const controlDataHandler = (e) => {
    e.preventDefault();
    handleUpdateCardDescription();
  };
  const OnClickToEdit = () => {
    descPrevValueRef.current = descValue;
    setOpenEditor(true);
  };

  const onClickToCancelEdit = () => {
    if (descPrevValueRef.current) {
      setDescValue(descPrevValueRef.current);
    }
    setOpenEditor(false);
  };

  return (
    <div className={cx('wrapper')}>
      {openEditor && (
        <div className={cx('editor-wrapper')}>
          <ReactQuill
            theme="snow"
            value={descValue}
            onChange={setDescValue}
            style={{
              backgroundColor: 'var(--backgroundColor)',
              color: 'var(--textColor)',
            }}
          />
          <div className={cx('editor-btn')}>
            <Button className={cx('createBtn')} onClick={controlDataHandler}>
              Save
            </Button>
            {openEditor && (
              <Button onClick={onClickToCancelEdit}>{xIcon}</Button>
            )}
          </div>
        </div>
      )}
      {!openEditor && (
        <div className={cx('display-descr')}>
          <div dangerouslySetInnerHTML={{ __html: descValue }} />
          <Button className={cx('editIcon')} onClick={OnClickToEdit}>
            {penIcon}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
