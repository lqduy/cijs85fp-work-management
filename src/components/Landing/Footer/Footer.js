import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import {
  imgHeroFooterPage,
  imgHeroFooterEndPage,
} from "../../../utils/imgHeroLandingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
let cx = classNames.bind(styles);
const Footer = () => {
  const footerLaws = imgHeroFooterEndPage.laws;
  const footerContact = imgHeroFooterEndPage.contact;
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
        <div className={cx("translate")}>
          <FontAwesomeIcon icon={faGlobe} />
          <select className="form-select" aria-label="Default select example">
            <option value={1}>Tiếng Việt</option>
            <option value={2}>English</option>
            <option value={3}>中文 (繁體)</option>
          </select>
        </div>
        <div className={cx("laws")}>
          {footerLaws.map((item) => {
            return (
              <div className={cx("law-item")}>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
        <div className={cx("contact")}>
          {footerContact.map((item) => {
            return (
              <div className={cx("contact-item")}>
                <a href={item.link} target="_blank">
                  <FontAwesomeIcon icon={item.icon} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
