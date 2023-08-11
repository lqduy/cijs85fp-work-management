import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderLanding.module.scss';
import { titleNavHeaderPage } from '../../../utils/imgHeroLandingPage';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
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
{
  /* <nav className={cx('navbar navbar-expand-lg navbar-light bg-light')}>
        <div className={cx('container-fluid')}>
          <a className="navbar-brand" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
                  <span class="navbar-toggler-icon"></span>

          </button>
          <div
            className={cx('collapse navbar-collapse')}
            id="navbarNavDropdown"
          >
            {titleNavHeaderPage.map((item) => {
              return (
                <ul className={cx("navbar-nav")}>
                  <li className={cx("nav-item dropdown")}>
                    <a
                      className={cx("nav-link dropdown-toggle")}
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item.title}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li>
                        <a className="dropdown-item" href="#">
                          {item.detail1}
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {item.detail2}
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {item.detail3}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              );
            })}
            <div className={cx('btnAccount')}>
              <Link to="/u/home">
                <button>
                  {!hasCurrentUser ? 'Đăng ký ngay' : 'Mở bảng của bạn'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav> */
}
