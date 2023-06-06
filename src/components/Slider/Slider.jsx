// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import "./slider.scss";

export default function Slider({ data }) {
  const { handleProfilePictureChange } = useContext(UserContext);
  const [activeSlider, setActiveSlider] = useState(false);

  let displayedNumberOfSlides = 8;
  //* Calculates the remaining number of components up to a whole number of multiples of 8
  const remainingSlides = displayedNumberOfSlides - (data.icons.length % displayedNumberOfSlides);
  //* Creates an array of additional components, if any
  const additionalSlides = Array.from({ length: remainingSlides }, (_, index) => index);

  return (
    <div
      className={`${activeSlider ? "" : "swiper-wrapper"}`}
      onClickCapture={() => setActiveSlider(true)}
      onTouchStart={() => setActiveSlider(true)}
    >
      <Swiper
        navigation={true}
        modules={[Navigation, A11y]}
        spaceBetween={30}
        loop={true}
        slidesPerView={displayedNumberOfSlides}
        slidesPerGroup={displayedNumberOfSlides}
        className={`mySwiper${data.id === 1 ? "" : data.id}`}
      >
        {/* {data.icons.map((icon) => (
          <SwiperSlide key={icon.id}>
            <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
              <img
                className="slider-img"
                src={icon.src}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}

        {additionalSlides.map((index) => (
          <SwiperSlide key={`additional-${index}`}>
            <div className={`slider-btn${activeSlider ? "" : " margin-left"}`}>
              <img
                className="slider-img"
                src={data.icons[index].src}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))} */}

        {/* //! Causes that when the carousel slider comes to an end, the first slide will be in the first position again */}
        {[...data.icons, ...additionalSlides].map((item, index) => {
          const iconIndex = index % data.icons.length;
          const updatedIcon = data.icons[iconIndex];
          const isAdditionalSlide = index >= data.icons.length;
          const newSrc = isAdditionalSlide ? updatedIcon.src : item.src;

          return (
            <SwiperSlide key={isAdditionalSlide ? `additional-${index}` : updatedIcon.id}>
              <div
                className={`slider-btn${activeSlider ? "" : " margin-left"}`}
                onClick={() => {
                  handleProfilePictureChange(newSrc);
                }}
              >
                <img
                  className="slider-img"
                  src={newSrc}
                  alt={`${data.name} Icon ${item.id}`}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
