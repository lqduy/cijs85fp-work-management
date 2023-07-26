import classNames from 'classnames/bind';

import styles from './Column.module.scss';
import Button from '../../../components/Button';
import { plusIcon, threeDotsIcon, trashIcon, xIcon } from '../../../utils/icons';
import AddForm from '../AddForm';
import { useRef, useState, useEffect } from 'react';
import { cardsListStorage } from '../../../utils/local-storage';
import Card from '../Card';

let cx = classNames.bind(styles);

const Column = ({ columnId, columnTitle, handleRemoveColumn }) => {
  const [cardsData, setCardsData] = useState([]);
  const [openAddCardForm, setOpenAddCardForm] = useState(false);
  const [openSettingBox, setOpenSettingBox] = useState(false);

  const settingBoxRef = useRef(null);

  const onClickOutsideSettingBox = e => {
    if (settingBoxRef.current && !settingBoxRef.current.contains(e.target)) {
      setOpenSettingBox(false);
    }
  };

  const handleFetchData = () => {
    const cardsData = cardsListStorage.load().filter(card => card.parentId === columnId);
    setCardsData(cardsData);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutsideSettingBox);
    handleFetchData();
    return () => {
      document.removeEventListener('mousedown', onClickOutsideSettingBox);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNewCard = newCard => {
    const newCardsData = [...cardsData, newCard];
    setCardsData(newCardsData);

    const cardsListData = cardsListStorage.load();
    const newCardsListData = [...cardsListData, newCard];
    cardsListStorage.save(newCardsListData);
  };

  const handleRemoveCard = cardId => {
    const newCardsData = cardsData.filter(card => card.cardId !== cardId);
    setCardsData(newCardsData);

    const cardsListData = cardsListStorage.load();
    const newCardsListData = cardsListData.filter(card => card.cardId !== cardId);
    cardsListStorage.save(newCardsListData);
  };

  return (
    <div className={cx('column')}>
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
              onClick={() => handleRemoveColumn(columnId)}
            >
              Remove this column
            </Button>
          </div>
        </div>
      )}
      <div className={cx('column__title')}>
        <h4>{columnTitle}</h4>
        <Button onClick={() => setOpenSettingBox(true)}>{threeDotsIcon}</Button>
      </div>
      <div className={cx('column__cards-list')}>
        {/* Render Card */}
        {(cardsData || []).map(card => (
          <Card
            key={card.cardId}
            cardData={card}
            handleRemoveCard={() => handleRemoveCard(card.cardId)}
          />
        ))}
      </div>
      {openAddCardForm ? (
        <AddForm
          columnId={columnId}
          setCloseAddCardForm={() => setOpenAddCardForm(false)}
          handleAddNewCard={handleAddNewCard}
        />
      ) : (
        <Button
          leftIcon={plusIcon}
          className={cx('add-card-btn')}
          onClick={() => setOpenAddCardForm(true)}
        >
          Add a card
        </Button>
      )}
    </div>
  );
};

export default Column;
