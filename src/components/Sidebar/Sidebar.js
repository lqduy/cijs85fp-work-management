import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
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
import ThemeContext from "../../contexts/ThemeContext";

let cx = classNames.bind(styles);

const Sidebar = () => {
  const { setSidebarOpen, sidebarOpen } = useContext(ThemeContext);
  const [workspaces, setWorkspaces] = useState(true);

  return (
    <div className={cx("sidebar")}>
      <div className={cx("side-bars-icon")}>
        <FontAwesomeIcon
          icon={sidebarOpen ? faCircleArrowLeft : faCircleArrowRight}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      <nav className={sidebarOpen ? cx("side-menu active") : cx("side-menu")}>
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
        <hr></hr>
        <div className={cx("sidebar-workspaces")}>
          <div className={cx("workspace-create")}>
            <span>WorkSpaces</span>
            <span>+</span>
          </div>
          <div className={cx("dropdown")}>
            <div className={cx("dropdown-select")} onClick={() => setWorkspaces(!workspaces)}>
              <span className={cx("dropdown-click")}>
                Your Workspace
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            </div>
            <ul className={workspaces ? cx("dropdown-list open") : cx("dropdown-list")}>
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
      </nav>
    </div>
  );
};

export default Sidebar;
