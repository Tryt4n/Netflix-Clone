import { useContext } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import { useTranslation } from "react-i18next";
import "./playbackPage.scss";
import { useState } from "react";

export default function PlaybackPage() {
  const { t } = useTranslation();

  const { currentEditingProfile, users, setUsers, setIsCurrentlySaved, setDisplayedSavedMessage } =
    useContext(UserContext);

  const [autoplayNext, setAutoPlayNext] = useState(currentEditingProfile.autoplayNext);
  const [autoplayPreviews, setAutoPlayPreviews] = useState(currentEditingProfile.autoplayPreviews);
  const [dataUsage, setDataUsage] = useState(currentEditingProfile.dataUsage);

  function handleSave() {
    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          autoplayNext: autoplayNext,
          autoplayPreviews: autoplayPreviews,
          dataUsage: dataUsage,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsCurrentlySaved(true);
    setDisplayedSavedMessage(t("playbackSavedMessage"));
  }

  return (
    <>
      <header>
        <h1 className="visually-hidden">
          {t("settings")} - {t("playback")}
        </h1>
        <NavbarShort />
      </header>

      <div className="playback settings-wrapper">
        <main className="settings-container">
          <header className="subtitles__header">
            <h2 className="subtitles__heading">{t("playbackSettings")}</h2>
            <img
              className="language-change__profile-img"
              src={currentEditingProfile.profileImage}
              alt={`${t("profileAvatar")} ${
                currentEditingProfile.kidsProfile ? t("Kids") : currentEditingProfile.username
              } `}
            />
          </header>

          <form>
            <fieldset>
              <legend className="playback__subheading">
                {t("autoplayControls")}
                {t("for")} {currentEditingProfile.username}
              </legend>
              <div className="playback__inner-checkbox-wrapper">
                <input
                  type="checkbox"
                  name="autoplay-next"
                  id="autoplay-next"
                  className="checkbox-light"
                  checked={autoplayNext}
                  onChange={() => setAutoPlayNext(!autoplayNext)}
                />
                <label
                  htmlFor="autoplay-next"
                  className="checkbox-light-label"
                >
                  {t("autoplayControlsNext")}
                </label>
              </div>
              <div className="playback__inner-checkbox-wrapper">
                <input
                  type="checkbox"
                  name="autoplay-previous"
                  id="autoplay-previous"
                  className="checkbox-light"
                  checked={autoplayPreviews}
                  onChange={() => setAutoPlayPreviews(!autoplayPreviews)}
                />
                <label
                  htmlFor="autoplay-previous"
                  className="checkbox-light-label"
                >
                  {t("autoplayControlsPrev")}
                </label>
              </div>
            </fieldset>

            <hr className="playback__divider" />

            <fieldset>
              <legend className="playback__subheading">{t("dataUsage")}</legend>
              <div className="playback__inner-checkbox-wrapper playback__inner-checkbox-wrapper--data-usage">
                <input
                  type="radio"
                  name="data-usage"
                  id="auto"
                  className="language-change__input"
                  checked={dataUsage === "auto" ? true : false}
                  onChange={() => setDataUsage("auto")}
                />
                <label htmlFor="auto">
                  <span>{t("auto")}</span>
                  <small>{t("autoDescription")}</small>
                </label>
              </div>

              <div className="playback__inner-checkbox-wrapper playback__inner-checkbox-wrapper--data-usage">
                <input
                  type="radio"
                  name="data-usage"
                  id="low"
                  className="language-change__input"
                  checked={dataUsage === "low" ? true : false}
                  onChange={() => setDataUsage("low")}
                />
                <label htmlFor="low">
                  <span>{t("low")}</span>
                  <small>{t("lowDescription")}</small>
                </label>
              </div>

              <div className="playback__inner-checkbox-wrapper playback__inner-checkbox-wrapper--data-usage">
                <input
                  type="radio"
                  name="data-usage"
                  id="medium"
                  className="language-change__input"
                  checked={dataUsage === "medium" ? true : false}
                  onChange={() => setDataUsage("medium")}
                />
                <label htmlFor="medium">
                  <span>{t("medium")}</span>
                  <small>{t("mediumDescription")}</small>
                </label>
              </div>

              <div className="playback__inner-checkbox-wrapper playback__inner-checkbox-wrapper--data-usage">
                <input
                  type="radio"
                  name="data-usage"
                  id="high"
                  className="language-change__input"
                  checked={dataUsage === "high" ? true : false}
                  onChange={() => setDataUsage("high")}
                />
                <label htmlFor="high">
                  <span>{t("high")}</span>
                  <small>{t("highDescription")}</small>
                </label>
              </div>
            </fieldset>

            <div className="playback__btns-wrapper">
              <AccountSettingsBtn
                text={t("save")}
                currentClass="accent"
                path={"/account"}
                onClickFunction={handleSave}
              />

              <AccountSettingsBtn
                text={t("cancel")}
                currentClass="light"
                path={"/account"}
              />
            </div>
          </form>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
