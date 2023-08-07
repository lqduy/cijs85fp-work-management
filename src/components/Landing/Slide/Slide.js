import React from "react";
import classNames from "classnames/bind";
import styles from "./Slide.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
let cx = classNames.bind(styles);
const Slide = ({ item }) => {
  return (
    <div className={cx("slide-item")} >
      <div className={cx("slide-top")} style={{ backgroundColor: item.color,}}>
      <div className={cx("slide-icon")} >
        <FontAwesomeIcon icon={item.icon} style={{ color: item.color}}/>
      </div>
      </div>
      <div className={cx("slide-item-text")}>
        <h3>{item.title}</h3>
        <p>{item.detail}</p>
      </div>
    </div>
  );
};

export default Slide;
