import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import classNames from 'classnames/bind';
import 'react-quill/dist/quill.snow.css';
import styles from './TextEditor.module.scss';
import Button from '../Button';
import { cardsListStorage } from '../../utils/local-storage';
import { penIcon, xIcon } from '../../utils/icons';

let cx = classNames.bind(styles);

const TextEditor = ({ cardId, cardDescription }) => {
  const [descValue, setDescValue] = useState(cardDescription);
  const [openEditor, setOpenEditor] = useState(false);
  const descPrevValueRef = useRef(null);

  const hasInitialValues = cardId && cardDescription;
  const initialValues = cardDescription;

  useEffect(() => {
    if (cardDescription && cardDescription === '') {
      setOpenEditor(true);
    }
  }, []);

  const handleUpdateCardDescription = () => {
    // if (descValue !== '') {
    const cardsListData = cardsListStorage.load();
    const newCardsListData = cardsListData.map(card =>
      card.cardId === cardId ? { ...card, description: descValue } : card
    );
    cardsListStorage.save(newCardsListData);

    setOpenEditor(false);
    // }
  };

  // useEffect(() => {
  //   if (hasInitialValues) {
  //     setDescValue(initialValues);
  //   } else setDescValue('');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [initialValues]);

  const controlDataHandler = e => {
    e.preventDefault();
    handleUpdateCardDescription(e);
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

  // const shouldOpenEditor = openEditor || cardDescription === '';

  return (
    <div className={cx('wrapper')}>
      {openEditor && (
        <div className={cx('editor-wrapper')}>
          <ReactQuill
            theme="snow"
            value={descValue}
            onChange={setDescValue}
            style={{ backgroundColor: 'var(--backgroundColor)', color: 'var(--textColor)' }}
          />
          <div className={cx('editor-btn')}>
            <Button className={cx('createBtn')} onClick={controlDataHandler}>
              Save
            </Button>
            {openEditor && <Button onClick={onClickToCancelEdit}>{xIcon}</Button>}
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
