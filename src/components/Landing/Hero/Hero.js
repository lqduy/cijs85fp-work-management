import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Hero.module.scss';
import {
  imgHeroLandingPage,
  imgHeroEndPage,
  imgHeroRdLandingPage,
} from '../../../utils/imgHeroLandingPage';
import Carousel from '../Carousel/Carousel';
import Slide from '../Slide/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleDot,
  faCircleLeft,
  faCircleRight,
} from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { arrowRightIcon } from '../../../utils/icons';
let cx = classNames.bind(styles);
const Hero = () => {
  const { currentUser } = useAuth();
  const hasCurrentUser = !!currentUser;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= imgHeroLandingPage.length) {
      newIndex = imgHeroLandingPage.length - 1;
    }
    setActiveIndex(newIndex);
  };
  const updateSlideIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= imgHeroRdLandingPage.length) {
      newIndex = imgHeroRdLandingPage.length - 1;
    }
    setActiveSlideIndex(newIndex);
  };
  return (
    <div className={cx('hero')}>
      <div className={cx('hero-top')}>
        <div className={cx('hero-top-left')}>
          <div className={cx('descript')}>
            <h1>
              Work Management tập hợp tất cả nhiệm vụ, thành viên nhóm và công
              cụ của bạn lại với nhau
            </h1>
            <p>
              Duy trì mọi thứ ở cùng một nơi—dù cho nhóm của bạn không ở cùng
              nhau.
            </p>
          </div>
          <div className={cx('singup')}>
            <Link to={!hasCurrentUser ? '/signup' : '/u/home'}>
              <button>
                <span>
                  {!hasCurrentUser
                    ? 'Đăng ký - hoàn toàn miễn phí!'
                    : 'Đến trang người dùng của bạn'}
                </span>
                <span>{arrowRightIcon}</span>
              </button>
            </Link>
          </div>
        </div>
        <div className={cx('hero-top-right')}>
          <div className={cx('imgBck')}>
            <img
              src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp"
              alt="detail"
            />
          </div>
        </div>
      </div>
      <div className={cx('hero-mid')}>
        <div className={cx('infoBasic')}>
          <h3>Thông tin cơ bản về Work Management</h3>
          <h2>Đỉnh cao về năng suất</h2>
        </div>
        <div className={cx('infoCarousel')}>
          <div
            className={cx('imgDetail')}
            style={{ transform: `translate(-${activeIndex * 100}%)` }}
          >
            {imgHeroLandingPage.map((item) => {
              return <Carousel item={item} width={'100%'} />;
            })}
          </div>
          <div className={cx('btnSlide')}>
            {imgHeroLandingPage.map((item, index) => {
              return (
                <button onClick={() => updateIndex(index)}>
                  <span
                    className={cx(
                      'symbol',
                      `${index === activeIndex ? 'active' : ''}`
                    )}
                  >
                    <FontAwesomeIcon icon={faCircleDot} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className={cx('hero-3rd')}>
        <div className={cx('infoBasic')}>
          <h3>TRELLO TRONG THỰC TIỄN</h3>
          <h2>Quy trình làm việc cho mọi dự án, bất kể nhỏ to</h2>
        </div>
        <div className={cx('carousel')}>
          <div className={cx('btnCarousel')}>
            <FontAwesomeIcon
              icon={faCircleLeft}
              onClick={() => updateSlideIndex(activeSlideIndex - 1)}
            />
            <FontAwesomeIcon
              icon={faCircleRight}
              onClick={() => updateSlideIndex(activeSlideIndex + 1)}
            />
          </div>
          <div
            className={cx('itemCarousel')}
            style={{ transform: `translate(-${activeSlideIndex * 100}%)` }}
          >
            {imgHeroRdLandingPage.map((item) => {
              return <Slide item={item} />;
            })}
          </div>
        </div>
      </div>
      <div className={cx('hero-footer')}>
        <div className={cx('hero-footer-title')}>
          <h2>Theo dõi công việc theo một cách hoàn toàn mới</h2>
          <h3>
            Xem các dự án của nhóm từ mọi góc độ và mang lại góc nhìn mới mẻ cho
            nhiệm vụ đang thực hiện.
          </h3>
        </div>
        {imgHeroEndPage.map((item) => {
          return (
            <div className={cx('hero-footer-img')}>
              <img src={item.img} alt={item.title} />
              <div className={cx('hero-footer-img-title')}>
                <h3>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: item.color }}
                  />
                  {item.title}
                </h3>
                <p>{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
