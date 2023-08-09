import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import {
  tableIcon,
  downCaretIcon,
  searchIcon,
  bellIcon,
  infoIcon,
  darkNLightIcon,
  userIcon,
  logOutIcon
} from '../../utils/icons';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button';
import MenuBox from '../MenuBox';
import ThemeContext from '../../contexts/ThemeContext';
import { themeModeStorage } from '../../utils/local-storage';
import SearchBox from './SearchBox';
import { useDebounce } from 'use-debounce';
import { getSearchResult } from '../../utils/helper';
import { HEADER_SUBMENU } from '../../utils/constants';
import styles from './Header.module.scss';

let cx = classNames.bind(styles);

const Header = ({ onClickCreateBtn }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [debouncedSearchKeyValue] = useDebounce(searchInputValue, 500);
  const [focusInput, setFocusInput] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [error, setError] = useState('');

  const { setDarkMode } = useContext(ThemeContext);
  const { currentUser, logout } = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError(error);
    }
  };

  const handleBlurInputAfterSearch = () => {
    if (focusInput) return;
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    handleBlurInputAfterSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusInput]);

  const handleSearch = inputKey => {
    if (inputKey.length === 0) return;
    const result = getSearchResult(inputKey);
    setSearchResult(result);
  };

  useEffect(() => {
    handleSearch(debouncedSearchKeyValue);
  }, [debouncedSearchKeyValue]);

  const handleKeyDown = e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedResultIndex(prevIndex => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : searchResult.length - 1;
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedResultIndex(prevIndex => {
        const newIndex = prevIndex < searchResult.length - 1 ? prevIndex + 1 : 0;
        return newIndex;
      });
    } else if (e.key === 'Enter' && selectedResultIndex !== -1) {
      const selectedBoardId = searchResult[selectedResultIndex]._id;
      navigate(`/b/${selectedBoardId}`);
      setFocusInput(false);
    }
  };

  const handleSetThemeMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      themeModeStorage.save(newMode);
      return newMode;
    });
  };

  const userName = useMemo(() => currentUser.bc.email.split('@')[0], [currentUser]);

  return (
    <header className={cx('header')}>
      <nav className={cx('menu')}>
        <Button leftIcon={tableIcon} to={'/'}>
          Work M
        </Button>
        <Button rigthIcon={downCaretIcon}>Workspaces</Button>
        <Button rigthIcon={downCaretIcon}>Templates</Button>
        <div className={cx('setting-item__wrap')}>
          <Button className={cx('createBtn')} onClick={onClickCreateBtn}>
            Create
          </Button>
        </div>
      </nav>
      <div className={cx('setting')}>
        <div className={cx('inputBar__wrap')}>
          <form
            className={cx('inputBar', { focusInput: focusInput })}
            onSubmit={e => e.preventDefault()}
          >
            <Button>{searchIcon}</Button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchInputValue}
              onFocus={() => setFocusInput(true)}
              onChange={e => setSearchInputValue(e.target.value)}
              onBlur={() => setFocusInput(false)}
              onKeyDown={handleKeyDown}
            />
            {focusInput && (
              <SearchBox
                data={searchResult}
                handleCloseSearchBox={() => setFocusInput(false)}
                selectedIndex={selectedResultIndex}
              />
            )}
          </form>
        </div>
        <Button className={cx('settingBtn')} circled>
          {bellIcon}
        </Button>
        <Button className={cx('settingBtn')} to={'/'} circled>
          {infoIcon}
        </Button>
        <Button className={cx('settingBtn')} circled onClick={handleSetThemeMode}>
          {darkNLightIcon}
        </Button>
        <div className={cx('setting-item__wrap', 'userBtn__wrap')}>
          <Button
            className={cx('userBtn')}
            rigthIcon={userIcon}
            onClick={() => setOpenSubMenu(HEADER_SUBMENU.USER)}
          >
            {userName}
          </Button>
          {openSubMenu === HEADER_SUBMENU.USER && (
            <MenuBox
              className={cx('menu-subbox', 'right-align')}
              boxTitle={'ACCOUNT'}
              onClickX={() => setOpenSubMenu(null)}
            >
              <Button
                className={cx('menu-subbox__btn')}
                leftIcon={logOutIcon}
                onClick={handleLogout}
                fullWidth
              >
                Log out
              </Button>
            </MenuBox>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
