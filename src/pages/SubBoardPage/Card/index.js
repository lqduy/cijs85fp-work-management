import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Button from '../../../components/Button';
import { editIcon, trashIcon, xIcon } from '../../../utils/icons';
import styles from './Card.module.scss';
import { cardsListStorage } from '../../../utils/local-storage';

let cx = classNames.bind(styles);

const Card = ({ cardData, handleRemoveCard }) => {
  const { cardId, cardTitle } = cardData;

  const [cardTitleValue, setCardTitleValue] = useState(cardTitle);
  const [openSettingBox, setOpenSettingBox] = useState(false);
  const settingBoxRef = useRef(null);
  const titleInputRef = useRef(null);
  const saveBtnRef = useRef(null);
  const prevCardTitle = useRef(null);

  const onClickOutsideSettingBox = e => {
    const isClickOutside =
      settingBoxRef.current &&
      titleInputRef.current &&
      saveBtnRef.current &&
      !settingBoxRef.current.contains(e.target) &&
      !titleInputRef.current.contains(e.target) &&
      !saveBtnRef.current.contains(e.target);
    if (isClickOutside) {
      setOpenSettingBox(false);
      setCardTitleValue(prevCardTitle.current);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutsideSettingBox);
    return () => {
      document.removeEventListener('mousedown', onClickOutsideSettingBox);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoSelectFormValue = () => {
    let timer;
    if (openSettingBox && titleInputRef.current) {
      timer = setTimeout(() => {
        titleInputRef.current.select();
      }, 0);
    }
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    autoSelectFormValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSettingBox]);

  const onCLickEditCard = () => {
    setOpenSettingBox(true);
    prevCardTitle.current = cardTitleValue;
  };

  const handleUpdateCardTitle = () => {
    const newCardTitle = titleInputRef.current.value;
    setCardTitleValue(newCardTitle);

    const newCardData = { ...cardData, cardTitle: newCardTitle };
    const cardsListData = cardsListStorage.load();
    const newCardsListData = cardsListData.map(card =>
      card.cardId === cardId ? newCardData : card
    );
    cardsListStorage.save(newCardsListData);

    setOpenSettingBox(false);
  };

  const onEnterToSave = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleUpdateCardTitle(e);
    }
  };

  return (
    <div key={cardId} className={cx('card-wrap', { 'card-editing': openSettingBox })}>
      {openSettingBox && <div className={cx('black-overlay')}></div>}
      {openSettingBox && (
        <div className={cx('setting-box')} ref={settingBoxRef}>
          <div className={cx('box-title')}>
            <h4>List action</h4>
            <Button className={cx('close-settingbox-btn')}>{xIcon}</Button>
          </div>
          <div className={cx('setting-part')}>
            <Button>Add card</Button>
          </div>
          <div className={cx('setting-part')}>
            <Button
              leftIcon={trashIcon}
              className={cx('remove-column-btn')}
              onClick={() => handleRemoveCard(cardId)}
            >
              Remove this card
            </Button>
          </div>
        </div>
      )}
      {openSettingBox && (
        <button ref={saveBtnRef} className={cx('save-btn')} onClick={handleUpdateCardTitle}>
          Save
        </button>
      )}
      {openSettingBox && (
        <textarea
          ref={titleInputRef}
          className={cx('card-title')}
          value={cardTitleValue}
          onChange={e => setCardTitleValue(e.target.value)}
          onKeyDown={onEnterToSave}
          rows={4}
        ></textarea>
      )}
      {!openSettingBox && (
        <div className={cx('card-title')}>
          <p>{cardTitleValue}</p>
          <Button className={cx('edit-card-btn')} onClick={onCLickEditCard}>
            {editIcon}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Card;
