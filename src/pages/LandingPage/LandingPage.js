import React from 'react'
import classNames from "classnames/bind";
import styles from "./LandingPage.module.scss";
import Hero from '../../components/Landing/Hero/Hero';

let cx = classNames.bind(styles);
const LandingPage = () => {
  return (
    <div className={cx("hero")}>
        <Hero/>

    </div>
  )
}

export default LandingPage