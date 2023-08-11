import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Templates.module.scss';
import bckThemesIconData from '../../utils/backgroundThemesIconData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SidebarLayout from '../../layouts/SidebarLayout/SidebarLayout';
import {
  boardsListStorage,
  cardsListStorage,
  columnsListStorage,
} from '../../utils/local-storage';
import ThemeContext from '../../contexts/ThemeContext';
let cx = classNames.bind(styles);

const Templates = () => {
  const { setCurrentImg } = useContext(ThemeContext);
  // Prev Templates
  const handleGetTemplateByType = (img) => {
    setCurrentImg(img);
  };
  return (
    <SidebarLayout>
      <div className={cx("wrapper")}>
        <div className={cx("theme-top")}>
          <div className={cx("theme-title")}>
            <p>Featured categories</p>
            <form className={cx("theme-form")}>
              <input placeholder={cx("Find Template")} />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </form>
          </div>
          <ul className={cx("theme-list-categories")}>
            {bckThemesIconData.map((item) => {
              return (
                <Link
                  to={`/templates/preview/${item.data.board.boardId}`}
                  onClick={() =>
                    handleGetTemplateByType(item.data.board.boardImageBg)
                  }
                >
                  <li>
                    <img src={item.img} alt={item.title} />
                    <span>{item.title}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Templates;
