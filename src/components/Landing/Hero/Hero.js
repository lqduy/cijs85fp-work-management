import React from "react";
import classNames from "classnames/bind";
import styles from "./Hero.module.scss";

let cx = classNames.bind(styles);
const Hero = () => {
  return (
    <div className={cx("hero")}>
      <div className={cx("hero-top")}>
        <div className={cx("hero-top-left")}>
          <div className={cx("descript")}>
            <h1>
              Trello tập hợp tất cả nhiệm vụ, thành viên nhóm và công cụ của bạn
              lại với nhau
            </h1>
            <p>
              Duy trì mọi thứ ở cùng một nơi—dù cho nhóm của bạn không ở cùng
              nhau.
            </p>
          </div>
          <div className={cx("singup")}>
            <button>Đăng ký - hoàn toàn miễn phí!</button>
          </div>
        </div>
        <div className={cx("hero-top-right")}>
          <div className={cx("imgBck")}>
            <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp" />
          </div>
        </div>
      </div>
      <div className={cx("hero-mid")}>
        <div className={cx("infoBasic")}>

        </div>
        <div className="infoDesgi">

        </div>
      </div>
      <div className={cx("hero-footer")}></div>
    </div>
  );
};

export default Hero;
