// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { useContext, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

import "./slider.scss";
import useWindowSize from "../../hooks/useWindowSize.js";
import { useTranslation } from "react-i18next";
import ArrowIndicatorIcon from "../../icons/ArrowIndicatorIcon";
import LeftArrow from "../../icons/LeftArrow";

export default function Slider({ data, currentUser }) {
  const { t } = useTranslation();

  const params = useParams();

  const { users, editingProfilePictureSrc, setEditingProfilePictureSrc } = useContext(UserContext);
  const [activeSlider, setActiveSlider] = useState(false);
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);

  const editProfileConfirmationModal = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const { width } = useWindowSize();

  let displayedNumberOfSlides;
  switch (true) {
    case width > 1375:
      displayedNumberOfSlides = 8;
      break;
    case width <= 1375 && width > 1200:
      displayedNumberOfSlides = 7;
      break;
    case width <= 1200 && width > 1024:
      displayedNumberOfSlides = 6;
      break;
    case width <= 1024 && width > 915:
      displayedNumberOfSlides = 7;
      break;
    case width <= 915 && width > 700:
      displayedNumberOfSlides = 6;
      break;
    case width <= 700 && width > 600:
      displayedNumberOfSlides = 5;
      break;
    case width <= 600:
      displayedNumberOfSlides = 4;
      break;
  }

  const handlePrevSlide = () => {
    setFirstVisibleIndex((prevIndex) => prevIndex - displayedNumberOfSlides);
  };

  const handleNextSlide = () => {
    setFirstVisibleIndex((prevIndex) => prevIndex + displayedNumberOfSlides);
  };

  function handleModalOpen(newSrc) {
    setEditingProfilePictureSrc(newSrc);
    editProfileConfirmationModal.current.showModal();
  }

  function handleModalClose() {
    setEditingProfilePictureSrc(null);
    editProfileConfirmationModal.current.close();
  }

  const alreadyUsedProfileIcons = users.map((user) => user.profileImage);
  const availableIcons = [...data.icons].filter(
    (icon) => !alreadyUsedProfileIcons.includes(icon.src)
  );

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
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Navigation, A11y]}
        spaceBetween={30}
        loop={true}
        slidesPerView={displayedNumberOfSlides}
        slidesPerGroup={displayedNumberOfSlides}
        simulateTouch={false}
        className={`mySwiper${data.id === 1 ? "" : data.id}`}
      >
        <button
          className="slider-navigation-btn--prev"
          aria-label={t("seePreviousIcons")}
          ref={navigationPrevRef}
          onClick={handlePrevSlide}
        >
          <LeftArrow label={t("arrowLeft")} />
        </button>
        {/* //! Causes that when the carousel slider comes to an end, the first slide will be in the first position again */}
        {[...availableIcons, ...additionalSlides].map((item, index) => {
          const iconIndex = index % availableIcons.length;
          const updatedIcon = availableIcons[iconIndex];
          const isAdditionalSlide = index >= availableIcons.length;
          const newSrc = isAdditionalSlide ? updatedIcon.src : item.src;

          return (
            <SwiperSlide key={isAdditionalSlide ? `additional-${index}` : updatedIcon.id}>
              <button
                className="slider-btn"
                onClick={() => handleModalOpen(newSrc)}
                disabled={
                  index < firstVisibleIndex || index >= firstVisibleIndex + displayedNumberOfSlides
                }
              >
                <img
                  className="slider-img"
                  src={newSrc}
                  alt={`${data.name} ${t("icon")} ${item.id}`}
                  loading="lazy"
                />
              </button>

              <dialog
                className="edit-profile-confirmation-modal"
                ref={editProfileConfirmationModal}
              >
                <span
                  className="edit-profile-confirmation-modal__heading"
                  aria-label={t("changeProfileLabel")}
                >
                  {t("changeProfileIcon")}
                </span>
                <hr />

                <div className="edit-profile-confirmation-modal__img-wrapper">
                  <figure>
                    <img
                      src={currentUser.profileImage}
                      alt={`${currentUser.username} ${t("currentProfileImage")}`}
                    />
                    <figcaption>{t("current")}</figcaption>
                  </figure>
                  <ArrowIndicatorIcon />
                  <figure>
                    <img
                      src={editingProfilePictureSrc}
                      alt={t("chosenProfileAvatar")}
                    />
                    <figcaption>{t("new")}</figcaption>
                  </figure>
                </div>

                <hr />
                <div className="edit-profile-confirmation-modal__btn-wrapper">
                  <Link
                    to={`/ManageProfiles/${params.id}`}
                    className="edit-profile-confirmation-modal__btn edit-profile-confirmation-modal__btn--confirm"
                  >
                    {t("letsDoIt")}
                  </Link>
                  <button
                    className="edit-profile-confirmation-modal__btn edit-profile-confirmation-modal__btn--cancel"
                    onClick={handleModalClose}
                  >
                    {t("notYet")}
                  </button>
                </div>
              </dialog>
            </SwiperSlide>
          );
        })}
        <button
          className="slider-navigation-btn--next"
          aria-label={t("seeMoreIcons")}
          ref={navigationNextRef}
          onClick={handleNextSlide}
        >
          <LeftArrow label={t("arrowRight")} />
        </button>
      </Swiper>
    </div>
  );
}
