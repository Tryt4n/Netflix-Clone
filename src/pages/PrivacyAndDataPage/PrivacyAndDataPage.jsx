import { useContext, useState, useRef } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

import Footer from "../../layout/Footer/Footer";
import Navbar from "../../layout/Navbar/Navbar";

import Switch from "../../components/Switch/Switch";
import Divider from "../../components/Divider/Divider";

import ArrowIndicatorLightIcon from "../../icons/ArrowIndicatorLightIcon";
import HandshakeIcon from "../../icons/HandshakeIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import CheckIcon2 from "../../icons/CheckIcon2";

import "./privacyAndDataPage.scss";
import { useTranslation } from "react-i18next";

export default function PrivacyAndDataPage() {
  const { t } = useTranslation();

  const { currentEditingProfile, users, setUsers } = useContext(UserContext);

  const [communicationsCheckbox, setCommunicationsCheckbox] = useState(
    currentEditingProfile.privacyAndDataCommunication
  );
  const [showCommunicationInfo, setShowCommunicationInfo] = useState(false);
  const [communicationInfoTimeout, setCommunicationInfoTimeout] = useState(null);
  const [isOpted, setIsOpted] = useState(currentEditingProfile.dataSharingOpted);

  const privacyAndDataSettingsModal = useRef(null);

  function handleSave(propertyName, propertyValue) {
    const updatedUsers = users.map((user) => {
      if (user.id === currentEditingProfile.id) {
        return {
          ...user,
          [propertyName]: propertyValue,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  }

  function handleSwitch() {
    clearTimeout(communicationInfoTimeout);
    setCommunicationsCheckbox(!communicationsCheckbox);
    handleSave("privacyAndDataCommunication", !communicationsCheckbox);
    setShowCommunicationInfo(true);
    setNewTimeout();
  }

  function handleOpt() {
    setIsOpted(true);
    handleSave("dataSharingOpted", true);
    closeModal();
  }

  function setNewTimeout() {
    const newTimeout = setTimeout(() => {
      setShowCommunicationInfo(false);
    }, 3000);
    setCommunicationInfoTimeout(newTimeout);
  }

  function openModal() {
    privacyAndDataSettingsModal.current.showModal();
  }

  function closeModal() {
    privacyAndDataSettingsModal.current.close();
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

  return (
    <>
      <header>
        <h1 className="visually-hidden">{t("PrivacyAndData")}</h1>
        <Navbar />
      </header>

      {showCommunicationInfo && (
        <div
          className="privacy-and-data__preferences-notification"
          role="alert"
          aria-live="polite"
        >
          <CheckIcon2 />
          <p>{t("preferencesUpdated")}</p>
        </div>
      )}

      <div className="settings-wrapper">
        <main className="settings-container privacy-and-data">
          <div className="privacy-and-data__back-link-wrapper">
            <Link
              to="/account"
              className="privacy-and-data__back-link"
            >
              <ArrowIndicatorLightIcon />
              {t("back")}
            </Link>
          </div>

          <header className="privacy-and-data__header-wrapper">
            <HandshakeIcon />
            <h2 className="privacy-and-data__heading">{t("privacyAndDataSettings")}</h2>
            <p className="privacy-and-data__text">{t("privacyAndDataSettingsDescription")}</p>
          </header>

          {currentEditingProfile.id === users[0].id && (
            <article>
              <h2 className="visually-hidden">{t("downloadPersonalInfo")}</h2>
              <button className="privacy-and-data__download-wrapper">
                <DownloadIcon />
                <span className="privacy-and-data__download-text">{t("downloadPersonalInfo")}</span>
                <ArrowIndicatorLightIcon />
              </button>
            </article>
          )}

          <article>
            <h2 className="privacy-and-data__subheader">{t("manageProfile")}</h2>
            <div className="privacy-and-data__container">
              <form onSubmit={(e) => e.preventDefault()}>
                {currentEditingProfile.id === users[0].id ? (
                  <>
                    <legend className="privacy-and-data__legend">{t("allowCommunication")}</legend>
                    <div className="privacy-and-data__form-wrapper">
                      <p className="privacy-and-data__form-text">
                        {t("allowCommunicationDescription1")} <a href="#">{t("learnMore")}</a>{" "}
                        {t("allowCommunicationDescription2")}
                      </p>
                      <Switch
                        name="communications"
                        text={t("allowCommunication")}
                        checked={communicationsCheckbox}
                        onChangeFunction={() => handleSwitch()}
                      />
                    </div>
                  </>
                ) : (
                  <p className="privacy-and-data__form-text">
                    {t("allowCommunicationDescription3")}
                  </p>
                )}

                <Divider
                  spaceSmall
                  customColor="rgba(128, 128, 128, 0.2)"
                />
                <button
                  className="privacy-and-data__form-btn"
                  disabled={isOpted}
                  onClick={openModal}
                >
                  {currentEditingProfile.id === users[0].id ? t("optAll") : t("optAll2")}
                </button>
                <dialog
                  className="privacy-and-data__modal"
                  ref={privacyAndDataSettingsModal}
                  onClick={closeModalOnBackdropClick}
                >
                  <h2 className="privacy-and-data__modal-heading">{t("optModalHeading")}</h2>
                  <p className="privacy-and-data__modal-text">{t("optModalDescription")}</p>
                  <button
                    className="privacy-and-data__modal-btn privacy-and-data__modal-btn--accent"
                    onClick={handleOpt}
                  >
                    {t("confirm")}
                  </button>
                  <button
                    className="privacy-and-data__modal-btn"
                    onClick={closeModal}
                  >
                    {t("cancel")}
                  </button>
                </dialog>
              </form>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
