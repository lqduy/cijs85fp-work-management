import React from "react";
import classNames from "classnames/bind";
import styles from "./BeforeFooter.module.scss";

let cx = classNames.bind(styles);
const BeforeFooter = () => {
  return (
    <div className={cx("before-footer")}>
      <div className={cx("title")}>
        <h2>Bắt đầu sử dụng Work Management ngay hôm nay</h2>
        <button>Đăng ký - hoàn toàn miễn phí!</button>
      </div>
    </div>
  );
};

export default BeforeFooter;
