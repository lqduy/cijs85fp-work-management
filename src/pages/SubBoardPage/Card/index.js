import { useRef, useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Button from '../../../components/Button';
import {
  arrowRightIcon,
  clockIcon,
  copyIcon,
  editIcon,
  openIcon,
  photoIcon,
  tagIcon,
  trashIcon,
  userIcon
} from '../../../utils/icons';
import styles from './Card.module.scss';
import { cardsListStorage } from '../../../utils/local-storage';
import EditLabelSubBox from './SettingSubBox/EditLabelSubBox';
import { CARD_SETTING_SUBBOX } from '../../../utils/constants';

let cx = classNames.bind(styles);

const Card = ({ cardData, cardIndex, cardsLength, handleRemoveCard }) => {
  const { cardId, cardTitle, cardLabels } = cardData;

  const [cardTitleValue, setCardTitleValue] = useState(cardTitle);
  const [cardLabelsArr, setCardLabelArr] = useState([...cardLabels]);
  const [openSettingBox, setOpenSettingBox] = useState(false);
  const [openSettingSubBox, setOpenSettingSubBox] = useState(null);
  const settingBoxRef = useRef(null);
  const titleInputRef = useRef(null);
  const saveBtnRef = useRef(null);
  const prevCardTitle = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: cardId,
    data: { ...cardData, cardIndex: cardIndex, cardsLength: cardsLength }
  });
  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid var(--headerSearchInput-outlineColor)' : undefined
  };

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
    if (!openSettingBox) {
      setOpenSettingSubBox(null);
    }
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

  const handleUpdateLabels = labelsListArr => {
    setCardLabelArr(labelsListArr);

    const newCardData = { ...cardData, cardLabels: labelsListArr };
    const cardsListData = cardsListStorage.load();
    const newCardListData = cardsListData.map(card =>
      card.cardId === cardId ? newCardData : card
    );
    cardsListStorage.save(newCardListData);
  };

  const settingBox = useMemo(
    () => (
      <div className={cx('setting-box')} ref={settingBoxRef}>
        <div className={cx('setting-part')}>
          <Button leftIcon={openIcon} className={cx('setting-item')}>
            Open card
          </Button>
        </div>
        <div className={cx('setting-part')}>
          <Button
            leftIcon={tagIcon}
            className={cx('setting-item')}
            onClick={() => setOpenSettingSubBox(CARD_SETTING_SUBBOX.EDIT_LABELS)}
          >
            Edit labels
          </Button>
          {openSettingSubBox === CARD_SETTING_SUBBOX.EDIT_LABELS && (
            <EditLabelSubBox
              data={cardLabelsArr}
              onClickX={() => setOpenSettingSubBox(null)}
              handleUpdateLabels={handleUpdateLabels}
            />
          )}
        </div>
        <Button leftIcon={userIcon} className={cx('setting-item')}>
          Change members
        </Button>
        <Button leftIcon={photoIcon} className={cx('setting-item')}>
          Change cover
        </Button>
        <Button leftIcon={arrowRightIcon} className={cx('setting-item')}>
          Move
        </Button>
        <Button leftIcon={copyIcon} className={cx('setting-item')}>
          Copy
        </Button>
        <Button leftIcon={clockIcon} className={cx('setting-item')}>
          Edit dates
        </Button>
        <Button
          leftIcon={trashIcon}
          className={cx('setting-item', 'remove-column-btn')}
          onClick={() => handleRemoveCard(cardId)}
        >
          Remove this card
        </Button>
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openSettingSubBox]
  );

  const labelsListElements = useMemo(
    () => (
      <div className={cx('card-labels-list')}>
        {cardLabelsArr.length > 0 &&
          cardLabelsArr.map(label => (
            <span key={label} className={cx('label')} style={{ backgroundColor: label }}></span>
          ))}
      </div>
    ),
    [cardLabelsArr]
  );

  return (
    <div
      key={cardId}
      className={cx('card-wrap', { 'card-editing': openSettingBox })}
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
    >
      {openSettingBox && <div className={cx('black-overlay')}></div>}
      {openSettingBox && settingBox}
      {openSettingBox && (
        <button ref={saveBtnRef} className={cx('save-btn')} onClick={handleUpdateCardTitle}>
          Save
        </button>
      )}
      {openSettingBox && (
        <div className={cx('textares__wrap')}>
          {cardLabelsArr.length > 0 && labelsListElements}
          <textarea
            ref={titleInputRef}
            className={cx('card-title')}
            value={cardTitleValue}
            onChange={e => setCardTitleValue(e.target.value)}
            onKeyDown={onEnterToSave}
            rows={4}
          ></textarea>
        </div>
      )}
      {!openSettingBox && (
        <div className={cx('card-title')}>
          {cardLabelsArr.length > 0 && labelsListElements}
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
