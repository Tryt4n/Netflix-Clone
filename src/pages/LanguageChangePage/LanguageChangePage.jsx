import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import { useTranslation } from "react-i18next";

import "./languageChangePage.scss";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import displayLanguageOptions from "../../../server/languageOptions.json";
import moviesLanguageOptions from "../../../server/languageOptionsMovies.json";
import CheckboxAccount from "../../components/CheckboxAccount/CheckboxAccount";
import BtnsWrapperAccount from "../../layout/BtnsWrapperAccount/BtnsWrapperAccount";

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
    const displayLanguage = e;
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
    setDisplayedSavedMessage(t("languageSettingSaved"));
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
          <h2 className="visually-hidden">{t("languageSettings")}</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset className="language-change__article">
              <div className="language-change__heading-wrapper">
                <div>
                  <legend className="language-change__heading">{t("displayLanguage")}</legend>
                  <p className="language-change__heading-description">
                    {t("displayLanguageDescription")}
                  </p>
                </div>
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
                    <CheckboxAccount
                      radio
                      name="select-language"
                      id={`${language}-display`}
                      value={language}
                      checked={language === selectedDisplayLanguage}
                      onChangeFunction={handleDisplayLanguageChange}
                      passValueToFunction
                      text={language}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className="language-change__article">
              <div>
                <legend className="language-change__heading">{t("showsAndMoviesLanguages")}</legend>
                <p className="language-change__heading-description">
                  {t("showsAndMoviesLanguagesDescription")}
                </p>
              </div>

              <ul className="language-change__languages-list">
                {moviesLanguageOptions.map((language) => (
                  <li
                    key={language}
                    className="language-change__list-item"
                  >
                    <CheckboxAccount
                      name={`select-movie-${language}`}
                      id={language}
                      value={language}
                      checked={selectedMovieLanguages.includes(language)}
                      disabled={language === selectedDisplayLanguage}
                      onChangeFunction={() => handleMovieLanguageChange(language)}
                      text={language}
                    />
                  </li>
                ))}
              </ul>

              <BtnsWrapperAccount
                btnAccentText={t("save")}
                btnAccentFunction={handleSave}
                btnAccentPath="/account"
                btnLightText={t("cancel")}
                btnLightPath="/account"
                center
              />
            </fieldset>
          </form>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
