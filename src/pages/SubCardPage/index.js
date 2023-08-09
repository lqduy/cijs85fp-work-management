import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import TextEditor from '../../components/TextEditor/TextEditor';
import SubBoardPage from '../SubBoardPage';
import Button from '../../components/Button';
import {
  checkListIcon,
  clockIcon,
  gearIcon,
  paperClipIcon,
  tagIcon,
  userIcon,
  xIcon,
  arrowRightIcon,
  copyIcon,
  photoIcon,
  trashIcon,
  shareIcon,
  plusIcon,
  commentsIcon,
  textIcon
} from '../../utils/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { cardsListStorage, columnsListStorage } from '../../utils/local-storage';
import ThemeContext from '../../contexts/ThemeContext';
import styles from './SubCardPage.module.scss';
import { useAuth } from '../../contexts/AuthContext';
let cx = classNames.bind(styles);

const SubCardPage = () => {
  const { boardId, cardId } = useParams();
  const [cardData, setCardData] = useState({});
  const [columnData, setColumnData] = useState({});
  const cardRef = useRef(null);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const onClickOutsideSettingBox = e => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      navigate(`/b/${boardId}`);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutsideSettingBox);
    return () => {
      document.removeEventListener('mousedown', onClickOutsideSettingBox);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchData = () => {
    const cardsListData = cardsListStorage.load();
    const cardData = cardsListData.find(card => card.cardId === cardId);
    if (!cardData) {
      navigate('/not-found');
      return;
    }
    setCardData(cardData);

    const columnsListData = columnsListStorage.load();
    const columnData = columnsListData.find(column => column.columnId === cardData.parentId);
    if (!columnData) {
      navigate('/not-found');
      return;
    }
    setColumnData(columnData);
  };

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { cardTitle, cardColorCover, cardLabels, description } = cardData;
  const { columnTitle } = columnData;

  const coverElements = useMemo(() => {
    const background = {
      backgroundColor: (darkMode ? cardColorCover?.dark : cardColorCover?.light) || null
    };
    return <div className={cx('cover')} style={background}></div>;
  }, [darkMode, cardColorCover]);

  const labelsElements = useMemo(
    () =>
      (cardLabels || []).map(color => <span key={color} style={{ backgroundColor: color }}></span>),
    [cardLabels]
  );

  return (
    <div className={cx('wrapper')}>
      <SubBoardPage />
      <div className={cx('card-wrapper')}>
        <div className={cx('card-core')} ref={cardRef}>
          <Button className={cx('x-btn')} to={`/b/${boardId}`}>
            {xIcon}
          </Button>
          {cardColorCover?.dark && cardColorCover?.light && coverElements}
          <div className={cx('title')}>
            <h1>{cardTitle}</h1>
          </div>
          <p className={cx('column-title')}>
            in column <span>{columnTitle}</span>
          </p>
          <div className={cx('body')}>
            <div className={cx('body__details')}>
              <div className={cx('body__details--labels')}>
                <h4>Labels</h4>
                <div className={cx('list')}>
                  {labelsElements}
                  <span className={cx('add-labels-btn')}>{plusIcon}</span>
                </div>
              </div>
              <div className={cx('body__details--description')}>
                <h2>
                  <span>{textIcon}</span>
                  <span>Description</span>
                </h2>
                <div className={cx('description-quill')}>
                  <TextEditor cardId={cardId} cardDescription={description} />
                </div>
              </div>
              <div className={cx('body__details--activity')}>
                <h2>
                  <span>{commentsIcon}</span>
                  <span>Activity</span>
                </h2>
                <div className={cx('activity-content')}>
                  <div className={cx('input-bar')}>
                    <span className={cx('user-avatar')}>
                      <p>{currentUser.bc.email[0].toUpperCase()}</p>
                    </span>
                    <span className={cx('input-fake')}>Write a comment...</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('body__setting')}>
              <h4>Add to card</h4>
              <Button leftIcon={userIcon} className={cx('body__setting--item')}>
                Change members
              </Button>
              <Button leftIcon={tagIcon} className={cx('body__setting--item')}>
                Labels
              </Button>
              <Button leftIcon={checkListIcon} className={cx('body__setting--item')}>
                Checklist
              </Button>
              <Button leftIcon={clockIcon} className={cx('body__setting--item')}>
                Dates
              </Button>
              <Button leftIcon={paperClipIcon} className={cx('body__setting--item')}>
                Attachment
              </Button>
              <Button leftIcon={gearIcon} className={cx('body__setting--item')}>
                Custom Fields
              </Button>
              <h4>Actions</h4>
              <Button leftIcon={arrowRightIcon} className={cx('body__setting--item')}>
                Move
              </Button>
              <Button leftIcon={copyIcon} className={cx('body__setting--item')}>
                Duplicate
              </Button>
              <Button leftIcon={photoIcon} className={cx('body__setting--item')}>
                Make template
              </Button>
              <Button leftIcon={trashIcon} className={cx('body__setting--item')}>
                Remove
              </Button>
              <h4>Social</h4>
              <Button leftIcon={shareIcon} className={cx('body__setting--item')}>
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCardPage;
