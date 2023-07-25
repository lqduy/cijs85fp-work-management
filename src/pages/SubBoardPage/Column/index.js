import classNames from 'classnames/bind';

import styles from './Column.module.scss';
import Button from '../../../components/Button';
import { plusIcon, threeDotsIcon } from '../../../utils/icons';
import AddForm from '../AddForm';

let cx = classNames.bind(styles);

const Column = ({
  children,
  columnId,
  columnTitle,
  handleAddNewCard,
  openAddCardForm,
  setOpenAddCardForm,
  setCloseAddCardForm
}) => {
  return (
    <div key={columnId} className={cx('column')}>
      <div className={cx('column__title')}>
        <h4>{columnTitle}</h4>
        <Button>{threeDotsIcon}</Button>
      </div>
      <div className={cx('column__cards-list')}>
        {/* Render Card */}
        {children}
      </div>
      {openAddCardForm === columnId ? (
        <AddForm
          columnId={columnId}
          setCloseAddCardForm={setCloseAddCardForm}
          handleAddNewCard={handleAddNewCard}
        />
      ) : (
        <Button leftIcon={plusIcon} className={cx('add-card-btn')} onClick={setOpenAddCardForm}>
          Add a card
        </Button>
      )}
    </div>
  );
};

export default Column;
