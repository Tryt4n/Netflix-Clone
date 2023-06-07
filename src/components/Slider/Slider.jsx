// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Link, useParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import UserContext from "../../context/UserContext";

import "./slider.scss";

export default function Slider({ data, currentUser }) {
  const params = useParams();
  console.log(currentUser);

  const { editingProfilePictureSrc, setEditingProfilePictureSrc } = useContext(UserContext);
  const [activeSlider, setActiveSlider] = useState(false);

  const editProfileConfirmationModal = useRef(null);

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
                  setEditingProfilePictureSrc(newSrc);
                  editProfileConfirmationModal.current.showModal();
                }}
              >
                <img
                  className="slider-img"
                  src={newSrc}
                  alt={`${data.name} Icon ${item.id}`}
                  loading="lazy"
                />
              </div>
              <dialog
                className="edit-profile-confirmation-modal"
                ref={editProfileConfirmationModal}
              >
                <h3 className="edit-profile-confirmation-modal__heading">Change profile icon?</h3>
                <hr />

                <div className="edit-profile-confirmation-modal__img-wrapper">
                  <figure>
                    <img
                      src={currentUser.profilImage}
                      alt={`${currentUser.username} Current Profile Image`}
                    />
                    <figcaption>Current</figcaption>
                  </figure>
                  <svg
                    aria-label="Arrow Indicator Right Icon"
                    fill="currentColor"
                    viewBox="0 0 490 490"
                  >
                    <g>
                      <polygon points="332.668,490 82.631,244.996 332.668,0 407.369,76.493 235.402,244.996 407.369,413.507 		" />
                    </g>
                  </svg>
                  <figure>
                    <img
                      src={editingProfilePictureSrc}
                      alt="Chosen Profile Image"
                    />
                    <figcaption>New</figcaption>
                  </figure>
                </div>

                <hr />
                <div className="edit-profile-confirmation-modal__btn-wrapper">
                  <Link
                    to={`/ManageProfiles/${params.id}`}
                    className="edit-profile-confirmation-modal__btn edit-profile-confirmation-modal__btn--confirm"
                  >
                    Let&apos;s Do It
                  </Link>
                  <button
                    className="edit-profile-confirmation-modal__btn edit-profile-confirmation-modal__btn--cancel"
                    onClick={() => {
                      setEditingProfilePictureSrc(null);
                      editProfileConfirmationModal.current.close();
                    }}
                  >
                    Not Yet
                  </button>
                </div>
              </dialog>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
