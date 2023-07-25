import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Button from '../../../components/Button';
import { editIcon, trashIcon, xIcon } from '../../../utils/icons';
import styles from './Card.module.scss';

let cx = classNames.bind(styles);

const Card = ({ columnId, cardId, cardTitle, handleRemoveCard }) => {
  const [openSettingBox, setOpenSettingBox] = useState(false);
  const settingBoxRef = useRef(null);

  const onClickOutsideSettingBox = e => {
    if (settingBoxRef.current && !settingBoxRef.current.contains(e.target)) {
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
              onClick={() => handleRemoveCard(cardId, columnId)}
            >
              Remove this card
            </Button>
          </div>
        </div>
      )}
      <h3 className={cx('card-title')}>{cardTitle}</h3>
      <Button className={cx('edit-card-btn')} onClick={() => setOpenSettingBox(true)}>
        {editIcon}
      </Button>
    </div>
  );
};

export default Card;
