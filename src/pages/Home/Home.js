import classNames from "classnames/bind";
import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";

import styles from "./Home.module.scss";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <SidebarLayout>
      <div className={cx("wrapper")}>
        <div className={cx("sideBody")}></div>
      </div>
    </SidebarLayout>
  );
};

export default Home;
