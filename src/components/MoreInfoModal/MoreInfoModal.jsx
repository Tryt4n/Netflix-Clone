import { useEffect, useRef, useState } from "react";

import "./moreInfoModal.scss";
import { useTranslation } from "react-i18next";
import CloseIcon from "../../icons/CloseIcon";
import GamePadIcon from "../../icons/GamePadIcon";
import MailIcon from "../../icons/MailIcon";
import UserIcon from "../../icons/UserIcon";
import Number1Icon from "../../icons/Number1Icon";
import Number2Icon from "../../icons/Number2Icon";
import Number3Icon from "../../icons/Number3Icon";

export default function MoreInfoModal({ isLearnMoreModalOpen, setIsLearnMoreModalOpen }) {
  const { t } = useTranslation();

  const [modalStep, setModalStep] = useState(1);

  const learnMoreModalRef = useRef(null);

  useEffect(() => {
    if (isLearnMoreModalOpen) {
      if (!learnMoreModalRef.current.open) {
        learnMoreModalRef.current.showModal();
        setModalStep(1);
      }
    } else {
      learnMoreModalRef.current.close();
      setModalStep(1);
    }
  }, [isLearnMoreModalOpen]);

  function closeModal() {
    learnMoreModalRef.current.close();
    setIsLearnMoreModalOpen(false);
    setModalStep(1);
  }

  function closeModalOnBackdropClick(e) {
    const dialogDimensions = e.target.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  }

  function handleBackClick() {
    if (modalStep > 1) {
      setModalStep(modalStep - 1);
    }
  }

  function handleNextClick() {
    if (modalStep < 3) {
      setModalStep(modalStep + 1);
    }
  }

  return (
    <dialog
      className="learn-more-modal"
      ref={learnMoreModalRef}
      onClick={(e) => closeModalOnBackdropClick(e)}
    >
      <div className="learn-more-modal__wrapper">
        <button
          className="learn-more-modal__close-btn"
          onClick={() => closeModal()}
          aria-label={t("closeModal")}
        >
          <CloseIcon />
        </button>
        <section className="learn-more-modal__step-container">
          {/* //* Step 1 */}
          {modalStep === 1 && (
            <>
              <img
                className="learn-more-modal__profil-img"
                src="/images/profiles/sassyCat-img.jpg"
                alt={`SassyCat ${t("profileAvatar")}`}
              />
              <span>Alex</span>
              <span className="learn-more-modal__nick-wrapper">
                <GamePadIcon
                  hasClassName
                  hidden
                />
                SassyCat
              </span>
              <h4 className="learn-more-modal__header">{t("yourNameInGames")}</h4>
              <p className="learn-more-modal__text">{t("yourNameInGamesDescription")}</p>
            </>
          )}

          {/* //* Step  */}
          {modalStep === 2 && (
            <>
              <ul className="learn-more-modal__actions-list">
                <li className="learn-more-modal__actions-list-item">
                  <GamePadIcon />
                  <span>SassyCat {t("wantsToPlay")}</span>
                </li>
                <li className="learn-more-modal__actions-list-item">
                  <MailIcon />
                  <span>Sr1acha {t("sentInvite")}</span>
                </li>
                <li className="learn-more-modal__actions-list-item">
                  <UserIcon />
                  <span>S0uless {t("currentlyOnline")}</span>
                </li>
              </ul>
              <h4 className="learn-more-modal__header">{t("playWithOthers")}</h4>
              <p className="learn-more-modal__text">{t("playWithOthersDescription")}</p>
            </>
          )}

          {/* //* Step 3 */}
          {modalStep === 3 && (
            <>
              <ul className="learn-more-modal__place-list">
                <li className="learn-more-modal__place-list-item learn-more-modal__place-list-item--first">
                  <Number1Icon />
                  <span>SassyCat</span>
                </li>
                <li className="learn-more-modal__place-list-item learn-more-modal__place-list-item--second">
                  <Number2Icon />
                  <span>Sr1acha</span>
                </li>
                <li className="learn-more-modal__place-list-item learn-more-modal__place-list-item--third">
                  <Number3Icon />
                  <span>S0uless</span>
                </li>
              </ul>
              <h4 className="learn-more-modal__header">{t("climbLeaderboards")}</h4>
              <p className="learn-more-modal__text">{t("climbLeaderboardsDescription")}</p>
            </>
          )}
        </section>

        <nav className="learn-more-modal__navigation">
          <h4 className="visually-hidden">{t("modalNavigation")}</h4>
          {modalStep !== 1 ? (
            <div>
              <button
                className="learn-more-modal__btn learn-more-modal__btn--back"
                onClick={handleBackClick}
              >
                {t("back")}
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <div
            className="learn-more-modal__dot-container"
            aria-hidden="true"
          >
            <span className={`learn-more-modal__dot${modalStep === 1 ? " active" : ""}`}></span>
            <span className={`learn-more-modal__dot${modalStep === 2 ? " active" : ""}`}></span>
            <span className={`learn-more-modal__dot${modalStep === 3 ? " active" : ""}`}></span>
          </div>
          <div className="btn-next-wrapper">
            <button
              className="learn-more-modal__btn learn-more-modal__btn--next"
              onClick={modalStep === 3 ? closeModal : handleNextClick}
            >
              {modalStep === 3 ? t("done") : t("next")}
            </button>
          </div>
        </nav>
      </div>
    </dialog>
  );
}
