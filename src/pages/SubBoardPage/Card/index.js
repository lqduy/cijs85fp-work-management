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
  const [editingTitleValue, setEditingTitleValue] = useState(false);
  const settingBoxRef = useRef(null);
  const titleInputRef = useRef(null);

  const onClickOutsideSettingBox = e => {
    const isClickOutside =
      settingBoxRef.current &&
      titleInputRef.current &&
      !settingBoxRef.current.contains(e.target) &&
      !titleInputRef.current.contains(e.target);
    if (isClickOutside) {
      setOpenSettingBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutsideSettingBox);
    return () => {
      document.removeEventListener('mousedown', onClickOutsideSettingBox);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenSetting = () => {
    setOpenSettingBox(true);
    setEditingTitleValue(true);
    titleInputRef.current.focus();
  };

  const handleUpdateCardTitle = e => {
    const newCardTitle = e.target.value;
    setCardTitleValue(newCardTitle);

    const newCardData = { ...cardData, cardTitle: newCardTitle };
    const cardsListData = cardsListStorage.load();
    const newCardsListData = cardsListData.map(card =>
      card.cardId === cardId ? newCardData : card
    );
    cardsListStorage.save(newCardsListData);
  };

  return (
    <div key={cardId} className={cx('card-wrap')}>
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
      <input
        ref={titleInputRef}
        name="cardTitle"
        className={cx('card-title')}
        value={cardTitleValue}
        onChange={handleUpdateCardTitle}
        readOnly={!editingTitleValue}
        onBlur={() => setEditingTitleValue(false)}
        autoFocus
      />
      <Button className={cx('edit-card-btn')} onClick={handleOpenSetting}>
        {editIcon}
      </Button>
    </div>
  );
};

export default Card;
