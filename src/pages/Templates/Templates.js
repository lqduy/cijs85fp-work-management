import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import classNames from 'classnames/bind';
import styles from "./Templates.module.scss"
let cx = classNames.bind(styles);
const Templates = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('sideBody')}></div>
    </div>
  )
}

export default Templates