import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames/bind';

import {
  tableIcon,
  downCaretIcon,
  searchIcon,
  bellIcon,
  infoIcon,
  darkNLightIcon
} from '../../utils/icons';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button';
import styles from './Header.module.scss';
import ThemeContext from '../../contexts/ThemeContext';
import { themeModeStorage } from '../../utils/local-storage';

let cx = classNames.bind(styles);

const Header = () => {
  const [focusInput, setFocusInput] = useState(false);
  const { setDarkMode } = useContext(ThemeContext);
  const [error, setError] = useState('')
  const {currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')
    try {
      await logout();
      navigate('/login');
    }

    catch(error) {
      setError(error)

    }
  }

  const handleSetThemeMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      themeModeStorage.save(newMode);
      return newMode;
    });
  };

  return (
    <header className={cx('header')}>
      <nav className={cx('menu')}>
        <Button leftIcon={tableIcon} to={'/'}>
          Trello
        </Button>
        <Button rigthIcon={downCaretIcon}>Workspaces</Button>
        <Button rigthIcon={downCaretIcon}>Templates</Button>
        <Button className={cx('createBtn')}>Create</Button>
        <Button className={cx('logOutBtn')} onClick={handleLogout}>Log out</Button>
      </nav>
      <div className={cx('setting')}>
        <div className={cx('inputBar__wrap')}>
          <form className={cx('inputBar', { focusInput: focusInput })}>
            <Button>{searchIcon}</Button>
            <input
              type="text"
              placeholder="Search"
              onFocus={() => setFocusInput(true)}
              onBlur={() => setFocusInput(false)}
            />
          </form>
        </div>
        <Button className={cx('settingBtn')} circled>
          {bellIcon}
        </Button>
        <Button className={cx('settingBtn')} circled>
          {infoIcon}
        </Button>
        <Button className={cx('settingBtn')} circled onClick={handleSetThemeMode}>
          {darkNLightIcon}
        </Button>
      </div>
    </header>
  );
};

export default Header;
