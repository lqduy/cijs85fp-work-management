import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePollVertical,
  faImage,
  faHouse,
  faHeart,
  faSuitcase,
  faColumns,
  faPeopleGroup,
  faGear,
  faMoneyBill,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

let cx = classNames.bind(styles);

const Sidebar = ({ onToggleSidebar, sidebarOpen }) => {
  const [workspaces, setWorkspaces] = useState(true);

  const sidebarContainerStyles = cx("sidebar-container", {
    ["open"]: sidebarOpen,
  });
  const iconToggleSidebarStyles = cx("sidebar-icon", {
    ["open"]: sidebarOpen,
  });

  return (
    <div className={cx("sidebar-wrapper")}>
      <FontAwesomeIcon
        icon={sidebarOpen ? faCircleArrowLeft : faCircleArrowRight}
        onClick={onToggleSidebar}
        className={iconToggleSidebarStyles}
      />
      <div className={sidebarContainerStyles}>
        <div className={cx("sidebar-top")}>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faSquarePollVertical} />
            Board
          </Link>
          <Link to={"/templates"}>
            <FontAwesomeIcon icon={faImage} />
            Templates
          </Link>
          <Link to={"/home"}>
            <FontAwesomeIcon icon={faHouse} />
            Home
          </Link>
        </div>
        <div className={cx("divider")}></div>
        <div className={cx("sidebar-workspaces")}>
          <div className={cx("sidebar-workspaces__create")}>
            <span>Workspace views +</span>
          </div>
          <ul className={cx("sidebar-workspaces__list")}>
            <li className={cx("dropdown-item")}>
              <span className={cx("dropdown-text")}>
                <FontAwesomeIcon icon={faSuitcase} />
                Getting started
              </span>
            </li>
            <li className={cx("dropdown-item")}>
              <span className={cx("dropdown-text")}>
                <FontAwesomeIcon icon={faSquarePollVertical} />
                Board
              </span>
            </li>
            <li className={cx("dropdown-item")}>
              <span className={cx("dropdown-text")}>
                <FontAwesomeIcon icon={faColumns} />
                Collections
              </span>
            </li>
            <li className={cx("dropdown-item")}>
              <span className={cx("dropdown-text")}>
                <FontAwesomeIcon icon={faHeart} />
                Highlights
              </span>
            </li>
            <li className={cx("dropdown-item")}>
              <span className={cx("dropdown-text")}>
                <FontAwesomeIcon icon={faPeopleGroup} />
                Members
              </span>
            </li>
            <li className={cx("dropdown-item")}>
              <span className={cx("dropdown-text")}>
                <FontAwesomeIcon icon={faGear} />
                Settings
              </span>
            </li>
            <li className={cx("dropdown-item")}>
              <span className={cx("dropdown-text")}>
                <FontAwesomeIcon icon={faMoneyBill} />
                Billing
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
