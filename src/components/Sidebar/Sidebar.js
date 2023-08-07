import { useState, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquarePollVertical,
  faImage,
  faHouse,
  faHeart,
  faSuitcase,
  faColumns,
  faPeopleGroup,
  faGear,
  faMoneyBill,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../../contexts/ThemeContext';
import Button from '../Button';
import styles from './Sidebar.module.scss';

let cx = classNames.bind(styles);

const Sidebar = ({ onToggleSidebar, sidebarOpen, sidebarClassName }) => {
  const [workspaces, setWorkspaces] = useState(true);
  const { setSidebarOpen } = useContext(ThemeContext);

  const sidebarContainerStyles = cx('sidebar-container', {
    ['open']: sidebarOpen,
    [sidebarClassName]: sidebarClassName
  });
  const iconToggleSidebarStyles = cx('sidebar-icon', {
    ['open']: sidebarOpen
  });

  useEffect(() => {
    if (sidebarClassName) {
      setSidebarOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarClassName]);

  return (
    <div className={cx('sidebar-wrapper')}>
      {!sidebarClassName && (
        <Button className={iconToggleSidebarStyles} onClick={onToggleSidebar}>
          <FontAwesomeIcon
            icon={sidebarOpen ? faAngleLeft : faAngleRight}
            className={cx('toggle-icon')}
          />
        </Button>
      )}
      <div className={sidebarContainerStyles}>
        <div className={cx('sidebar-top')}>
          <Link to={'/'}>
            <FontAwesomeIcon icon={faSquarePollVertical} />
            Board
          </Link>
          <Link to={'/templates'}>
            <FontAwesomeIcon icon={faImage} />
            Templates
          </Link>
          <Link to={'/home'}>
            <FontAwesomeIcon icon={faHouse} />
            Home
          </Link>
        </div>
        <div className={cx('divider')}></div>
        <div className={cx('sidebar-workspaces')}>
          <div className={cx('sidebar-workspaces__create')}>
            <span>Workspace views +</span>
          </div>
          <ul className={cx('sidebar-workspaces__list')}>
            <li className={cx('dropdown-item')}>
              <span className={cx('dropdown-text')}>
                <FontAwesomeIcon icon={faSuitcase} />
                Getting started
              </span>
            </li>
            <li className={cx('dropdown-item')}>
              <span className={cx('dropdown-text')}>
                <FontAwesomeIcon icon={faSquarePollVertical} />
                Board
              </span>
            </li>
            <li className={cx('dropdown-item')}>
              <span className={cx('dropdown-text')}>
                <FontAwesomeIcon icon={faColumns} />
                Collections
              </span>
            </li>
            <li className={cx('dropdown-item')}>
              <span className={cx('dropdown-text')}>
                <FontAwesomeIcon icon={faHeart} />
                Highlights
              </span>
            </li>
            <li className={cx('dropdown-item')}>
              <span className={cx('dropdown-text')}>
                <FontAwesomeIcon icon={faPeopleGroup} />
                Members
              </span>
            </li>
            <li className={cx('dropdown-item')}>
              <span className={cx('dropdown-text')}>
                <FontAwesomeIcon icon={faGear} />
                Settings
              </span>
            </li>
            <li className={cx('dropdown-item')}>
              <span className={cx('dropdown-text')}>
                <FontAwesomeIcon icon={faMoneyBill} />
                Billing
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
