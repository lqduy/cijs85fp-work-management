import React from "react";
import classNames from "classnames/bind";
import styles from "./LandingPage.module.scss";
import Hero from "../../components/Landing/Hero/Hero";
import Footer from "../../components/Landing/Footer/Footer";
import BeforeFooter from "../../components/Landing/BeforeFooter/BeforeFooter";

let cx = classNames.bind(styles);
const LandingPage = () => {
  return (
    <div className={cx("main")}>
      <div className={cx("hero")}>
        <Hero />
      </div>
      <div className={cx("befor-footer")}>
        <BeforeFooter />
      </div>
      <div className={cx("footer")}>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
