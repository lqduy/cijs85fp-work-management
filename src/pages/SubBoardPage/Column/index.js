import { useRef, useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Button from '../../../components/Button';
import AddForm from '../AddForm';
import Card from '../Card';
import { plusIcon, threeDotsIcon, trashIcon, xIcon } from '../../../utils/icons';
import { cardsListStorage, columnsListStorage } from '../../../utils/local-storage';
import styles from './Column.module.scss';

let cx = classNames.bind(styles);

const Column = ({ columnId, columnTitle, handleRemoveColumn }) => {
  const [cardsData, setCardsData] = useState([]);
  const [openAddCardForm, setOpenAddCardForm] = useState(false);
  const [openSettingBox, setOpenSettingBox] = useState(false);
  const [columnTitleValue, setColumnTitleValue] = useState(columnTitle);
  const [editingColumnTitle, setEditingColumnTitle] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: columnId
  });
  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition
  };

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

  const handleUpdateColumnTitle = e => {
    if (columnTitleValue !== '') {
      const columnsListData = columnsListStorage.load();
      const newColumnListData = columnsListData.map(column =>
        column.columnId === columnId ? { ...column, columnTitle: columnTitleValue } : column
      );
      columnsListStorage.save(newColumnListData);
    }
    setEditingColumnTitle(false);
  };

  const onEnterToSave = e => {
    if (e.key === 'Enter') {
      handleUpdateColumnTitle(e);
    }
  };

  const settingBoxElements = useMemo(
    () => (
      <div className={cx('setting-box')} ref={settingBoxRef}>
        <div className={cx('box-title')}>
          <h4>List action</h4>
          <Button className={cx('close-settingbox-btn')} onClick={() => setOpenSettingBox(false)}>
            {xIcon}
          </Button>
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
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      className={cx('column')}
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
      {...listeners}
    >
      {openSettingBox && settingBoxElements}
      <div className={cx('column__title')}>
        <input
          className={cx({ 'column__title--edit': editingColumnTitle })}
          value={columnTitleValue}
          onFocus={() => setEditingColumnTitle(true)}
          onChange={e => setColumnTitleValue(e.target.value)}
          onBlur={handleUpdateColumnTitle}
          onKeyDown={onEnterToSave}
          readOnly={!editingColumnTitle}
        />
        <Button onClick={() => setOpenSettingBox(true)}>{threeDotsIcon}</Button>
      </div>
      <div className={cx('column__cards-list')}>
        {/* Render Card */}
        {cardsData?.map(card => (
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
