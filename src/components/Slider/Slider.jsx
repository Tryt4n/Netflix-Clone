// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./slider.scss";

// import required modules
import { Navigation, A11y } from "swiper";
import { useState } from "react";

export default function Slider() {
  const [activeSlider, setActiveSlider] = useState(false);

  return (
    <div
      className={`${activeSlider ? null : "swiper-wrapper"}`}
      onClickCapture={() => setActiveSlider(true)}
      onTouchStart={() => setActiveSlider(true)}
    >
      <Swiper
        navigation={true}
        modules={[Navigation, A11y]}
        spaceBetween={30}
        loop={true}
        slidesPerView={8}
        slidesPerGroup={8}
        className={`mySwiper`}
      >
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/1.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/2.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/3.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/4.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/5.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/6.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/7.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/8.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/9.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/10.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/11.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/12.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/13.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/14.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/15.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/16.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/17.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/18.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
            <img
              className="slider-img"
              src="/images/profiles/profile-images_edit/Classic/19.png"
              alt="saf"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
