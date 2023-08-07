import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { imgHeroFooterPage, imgHeroFooterEndPage } from "../../../utils/imgHeroLandingPage";
let cx = classNames.bind(styles);
const Footer = () => {
  return (
    <div className={cx("footer")}>
      <div className={cx("footer-top")}>
        <div className={cx("descript")}>
          <img width="200" height="80" src="/assets/logo.png" alt="logo" />
        </div>
        {imgHeroFooterPage.map((item) => {
          return (
            <div className={cx("descript", "text")}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          );
        })}
      </div>
      <hr />
      <div className={cx("footer-bot")}>
        <div className={cx("descript")}></div>
        {/* {imgHeroFooterPage.map((item) => {
          return (
            <div className={cx("descript", "text")}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          )
        })} */}
      </div>
    </div>
  );
};

export default Footer;
