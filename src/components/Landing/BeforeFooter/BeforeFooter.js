import React from "react";
import classNames from "classnames/bind";
import styles from "./BeforeFooter.module.scss";
import { Link } from "react-router-dom";
let cx = classNames.bind(styles);
const BeforeFooter = () => {
  return (
    <div className={cx("before-footer")}>
      <div className={cx("title")}>
        <h2>Bắt đầu sử dụng Work Management ngay hôm nay</h2>
        <Link to={"/login"}>
          <button>Đăng ký - hoàn toàn miễn phí!</button>
        </Link>
      </div>
    </div>
  );
};

export default BeforeFooter;
