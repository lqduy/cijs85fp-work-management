import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderLanding.module.scss';
import { titleNavHeaderPage } from '../../../utils/imgHeroLandingPage';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
let cx = classNames.bind(styles);
const Header = () => {
  const { currentUser } = useAuth();
  const hasCurrentUser = !!currentUser;

  const [isActive, setIsActive] = useState(false);
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  const removeActive = () => {
    setIsActive(false);
  };

  return (
    <div className={cx('header')}>
      <nav className={cx(`${styles.navbar}`)}>
        {/* logo */}
        <a href="#home" className={cx(`${styles.logo}`)}>
          <img width="auto" height="40" src="/assets/logo.png" alt="logo" />
        </a>

        <ul
          className={cx(`${styles.navMenu} ${isActive ? styles.active : ''}`)}
        >
          {titleNavHeaderPage.map((item) => {
            return (
              <li onClick={removeActive}>
                <a href="#home" className={cx(`${styles.navLink}`)}>
                  {item.title}
                </a>
              </li>
            );
          })}
          <li onClick={removeActive}>
            <Link to="/u/home">
              <button>
                {!hasCurrentUser ? 'Đăng ký ngay' : 'Mở bảng của bạn'}
              </button>
            </Link>
          </li>
        </ul>

        <div
          className={cx(`${styles.hamburger} ${isActive ? styles.active : ''}`)}
          onClick={toggleActiveClass}
        >
          <span className={cx(`${styles.bar}`)}></span>
          <span className={cx(`${styles.bar}`)}></span>
          <span className={cx(`${styles.bar}`)}></span>
        </div>
      </nav>
    </div>
  );
};
export default Header;
