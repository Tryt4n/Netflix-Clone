import { useContext, useState } from "react";
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

  const { currentEditingProfile, users, setUsers, setIsCurrentlySaved, setDisplayedSavedMessage } =
    useContext(UserContext);

  const [selectedDisplayLanguage, setSelectedDisplayLanguage] = useState(
    currentEditingProfile.language
  );
  const [selectedMovieLanguages, setSelectedMovieLanguages] = useState(
    currentEditingProfile.moviesLanguages
  );

  function handleDisplayLanguageChange(e) {
    const displayLanguage = e.target.value;
    setSelectedDisplayLanguage(displayLanguage);

    setSelectedMovieLanguages((prevState) => {
      const updatedLanguages = prevState.filter((lang) => lang !== selectedDisplayLanguage);
      return [...updatedLanguages, displayLanguage];
    });
  }

  function handleMovieLanguageChange(language) {
    const isLanguageSelected = selectedMovieLanguages.includes(language);

    if (isLanguageSelected) {
      setSelectedMovieLanguages((prevState) => prevState.filter((lang) => lang !== language));
    } else {
      setSelectedMovieLanguages((prevState) => [...prevState, language]);
    }
  }

  function handleSave() {
    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          language: selectedDisplayLanguage,
          moviesLanguages: selectedMovieLanguages,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setIsCurrentlySaved(true);
    setDisplayedSavedMessage("Language settings saved.");
  }

  return (
    <>
      <header>
        <h1 className="visually-hidden">
          {t("settings")} - {t("languageChange")}
        </h1>
        <NavbarShort />
      </header>
      <div className="language-change">
        <main className="settings-container">
          <article className="language-change__article">
            <div className="language-change__heading-wrapper">
              <hgroup>
                <h2 className="language-change__heading">{t("displayLanguage")}</h2>
                <p className="language-change__heading-description">
                  {t("displayLanguageDescription")}
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
                    value={language}
                    checked={language === selectedDisplayLanguage}
                    onChange={handleDisplayLanguageChange}
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
              <h2 className="language-change__heading">{t("showsAndMoviesLanguages")}</h2>
              <p className="language-change__heading-description">
                {t("showsAndMoviesLanguagesDescription")}
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
                    value={language}
                    disabled={language === selectedDisplayLanguage}
                    checked={selectedMovieLanguages.includes(language)}
                    onChange={() => handleMovieLanguageChange(language)}
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
                path={"/account"}
                onClickFunction={handleSave}
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
