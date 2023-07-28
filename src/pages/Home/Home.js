import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import classNames from 'classnames/bind';
import styles from "./Home.module.scss"
let cx = classNames.bind(styles);
const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("sideBody")}></div>
    </div>
  );
};

export default Home;
