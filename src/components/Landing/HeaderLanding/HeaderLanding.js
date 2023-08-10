import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderLanding.module.scss';
import { titleNavHeaderPage } from '../../../utils/imgHeroLandingPage';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
let cx = classNames.bind(styles);
const Header = () => {
  const { currentUser } = useAuth();
  const hasCurrentUser = !!currentUser;
  return (
    <div className={cx('header')}>
      <div className={cx('logo')}>
        <img width="auto" height="40" src="/assets/logo.png" alt="logo" />
      </div>
      {titleNavHeaderPage.map((item) => {
        return (
          <nav className={cx('navbar navbar-expand-lg bg-body')}>
            <div className="container-fluid">
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
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item.title}
                    </a>
                    <ul className="dropdown-menu">
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
              </div>
            </div>
          </nav>
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
  );
};
export default Header;
