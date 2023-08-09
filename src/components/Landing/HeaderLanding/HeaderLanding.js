import React from 'react'
import classNames from "classnames/bind";
import styles from "./HeaderLanding.module.scss";

let cx = classNames.bind(styles);
const Header = () => {
  return (
    <div>
        <div>
        <img width="200" height="80" src="/assets/logo.png" alt="logo" />
        </div>
       

    </div>
  )
}

export default Header