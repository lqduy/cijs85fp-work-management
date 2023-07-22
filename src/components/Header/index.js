import React, { useState } from 'react';
import classNames from 'classnames/bind';

import {
  tableIcon,
  downCaretIcon,
  searchIcon,
  bellIcon,
  infoIcon,
  darkNLightIcon
} from '../../utils/icons';
import Button from '../Button';
import styles from './Header.module.scss';

let cx = classNames.bind(styles);

const Header = () => {
  const [focusInput, setFocusInput] = useState(false);

  return (
    <header className={cx('header')}>
      <nav className={cx('menu')}>
        <Button leftIcon={tableIcon} to={'/'}>
          Trello
        </Button>
        <Button rigthIcon={downCaretIcon}>Workspaces</Button>
        <Button rigthIcon={downCaretIcon}>Templates</Button>
        <Button>Create</Button>
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
        <Button className={cx('settingBtn')} circled>
          {darkNLightIcon}
        </Button>
      </div>
    </header>
  );
};

export default Header;
