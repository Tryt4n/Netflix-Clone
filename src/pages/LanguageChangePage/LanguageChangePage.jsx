import { useContext } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import { useTranslation } from "react-i18next";

import "./languageChangePage.scss";
import displayLanguageOptions from "../../../server/languageOptions.json";
import moviesLanguageOptions from "../../../server/languageOptionsMovies.json";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

export default function LanguageChangePage() {
  const { t } = useTranslation();

  const { currentEditingProfile } = useContext(UserContext);

  return (
    <>
      <header>
        <h1 className="visually-hidden">{t("settings")} - Language Change</h1>
        <NavbarShort />
      </header>
      <div className="language-change">
        <main className="settings-container">
          <article className="language-change__article">
            <div className="language-change__heading-wrapper">
              <hgroup>
                <h2 className="language-change__heading">Display Language</h2>
                <p className="language-change__heading-description">
                  Would you like to change the language of the text you see on Netflix?
                </p>
              </hgroup>
              <img
                className="language-change__profile-img"
                src={currentEditingProfile.profileImage}
                alt={`${t("profileAvatar")} ${
                  currentEditingProfile.kidsProfile ? t("Kids") : currentEditingProfile.username
                } `}
              />
            </div>

            <ul className="language-change__languages-list">
              {displayLanguageOptions.map((language) => (
                <li
                  key={language}
                  className="language-change__list-item"
                >
                  <input
                    type="radio"
                    name="select-language"
                    id={`${language}-display`}
                    className="language-change__input"
                  />
                  <label
                    htmlFor={`${language}-display`}
                    className="language-change__label"
                  >
                    {language}
                  </label>
                </li>
              ))}
            </ul>
          </article>

          <article className="language-change__article">
            <hgroup>
              <h2 className="language-change__heading">Shows & Movies Languages</h2>
              <p className="language-change__heading-description">
                Which languages do you like to watch shows and movies in? Letting us know helps set
                up your audio and subtitles.
              </p>
            </hgroup>

            <ul className="language-change__languages-list">
              {moviesLanguageOptions.map((language) => (
                <li
                  key={language}
                  className="language-change__list-item"
                >
                  <input
                    type="checkbox"
                    name="select-language"
                    id={language}
                    className="checkbox-light language-change__checkbox"
                    // disabled
                    // defaultChecked
                  />
                  <label
                    htmlFor={language}
                    className="checkbox-light-label language-change__label"
                  >
                    {language}
                  </label>
                </li>
              ))}
            </ul>

            <nav
              className="restriction-confirmation__buttons-container"
              aria-label={t("secondaryNavigation")}
            >
              <h2 className="visually-hidden">{t("secondaryNavigation")}</h2>
              <AccountSettingsBtn
                text={t("save")}
                currentClass="accent"
              />
              <AccountSettingsBtn
                text={t("cancel")}
                currentClass="light"
                path={"/account"}
              />
            </nav>
          </article>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
