import React from 'react';
import classNames from 'classnames/bind';

import Button from '../../../components/Button';
import { editIcon } from '../../../utils/icons';
import styles from './Card.module.scss';

let cx = classNames.bind(styles);

const Card = ({ cardId, cardTitle }) => {
  return (
    <div key={cardId} className={cx('card-wrap')}>
      <h3>{cardTitle}</h3>
      <Button className={cx('edit-card-btn')}>{editIcon}</Button>
    </div>
  );
};

export default Card;
