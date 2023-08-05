import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import ThemeContext from '../../contexts/ThemeContext';
import { themeModeStorage } from '../../utils/local-storage';
import SearchBox from './SearchBox';
import { useDebounce } from 'use-debounce';
import { getSearchResult } from '../../utils/helper';
import styles from './Header.module.scss';

let cx = classNames.bind(styles);

const Header = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [debouncedSearchKeyValue] = useDebounce(searchInputValue, 500);

  const [focusInput, setFocusInput] = useState(false);
  const { setDarkMode } = useContext(ThemeContext);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
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

  return (
    <header className={cx('header')}>
      <nav className={cx('menu')}>
        <Button leftIcon={tableIcon} to={'/'}>
          Work M
        </Button>
        <Button rigthIcon={downCaretIcon}>Workspaces</Button>
        <Button rigthIcon={downCaretIcon}>Templates</Button>
        <Button className={cx('createBtn')}>Create</Button>
        <Button className={cx('logOutBtn')} onClick={handleLogout}>
          Log out
        </Button>
      </nav>
      <div className={cx('setting')}>
        <div className={cx('inputBar__wrap')}>
          <form
            className={cx('inputBar', { focusInput: focusInput })}
            onSubmit={e => e.preventDefault()}
          >
            <Button>{searchIcon}</Button>
            <input
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
