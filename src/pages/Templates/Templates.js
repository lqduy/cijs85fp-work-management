import React from "react";
import classNames from "classnames/bind";
import styles from "./Templates.module.scss";
import bckThemesIconData from "../../utils/backgroundThemesIconData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
let cx = classNames.bind(styles);
const Templates = () => {
  return (
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
              <li>
                <img src={item.img} alt={item.title} />
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Templates;
