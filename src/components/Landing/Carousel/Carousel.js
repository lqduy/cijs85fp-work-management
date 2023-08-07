import React from "react";
import classNames from "classnames/bind";
import styles from "./Carousel.module.scss";

let cx = classNames.bind(styles);
const Carousel = ({ item, width }) => {
  return (
    <div className={cx("carousel-item")} style={{ width: width }}>
      <img className={cx("carousel-img")} src={item.img} />
      <div className={cx("carousel-item-text")}>
        <h3>{item.title}</h3>
        <p>{item.detail}</p>
      </div>
    </div>
  );
};

export default Carousel;
