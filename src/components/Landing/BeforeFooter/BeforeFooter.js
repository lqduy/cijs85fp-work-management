import React from 'react';
import classNames from 'classnames/bind';
import styles from './BeforeFooter.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { arrowRightIcon } from '../../../utils/icons';
let cx = classNames.bind(styles);
const BeforeFooter = () => {
  const { currentUser } = useAuth();
  const hasCurrentUser = !!currentUser;
  return (
    <div className={cx('before-footer')}>
      <div className={cx('title')}>
        <h2>Bắt đầu sử dụng Work Management ngay hôm nay</h2>
        <Link to={!hasCurrentUser ? '/signup' : '/u/home'}>
          <button>
            <span>
              {!hasCurrentUser ? 'Đăng ký - hoàn toàn miễn phí!' : 'Đến trang người dùng của bạn'}
            </span>
            <span>{arrowRightIcon}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BeforeFooter;
