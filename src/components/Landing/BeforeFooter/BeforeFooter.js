import React from "react";
import classNames from "classnames/bind";
import styles from "./BeforeFooter.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
let cx = classNames.bind(styles);
const BeforeFooter = () => {
  const { currentUser } = useAuth();
  const hasCurrentUser = !!currentUser;
  return (
    <div className={cx("before-footer")}>
      <div className={cx("title")}>
        <h2>Bắt đầu sử dụng Work Management ngay hôm nay</h2>
        <Link to={!hasCurrentUser ? "/signup" : "/home"}>
          <button>Đăng ký - hoàn toàn miễn phí!</button>
        </Link>
      </div>
    </div>
  );
};

export default BeforeFooter;
