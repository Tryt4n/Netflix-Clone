import { Link, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

import "../UserSettingsPage/userSettingsPage.scss";

import languageOptions from "../../../server/languageOptions.json";
import MoreInfoModal from "../../components/MoreInfoModal/MoreInfoModal";
import { useTranslation } from "react-i18next";
import EditIcon from "../../icons/EditIcon";
import WarningIcon from "../../icons/WarningIcon";

export default function UserSettingsPage() {
  const { t } = useTranslation();

  const params = useParams();

  const { users, setUsers, editingProfilePictureSrc, setEditingProfilePictureSrc } =
    useContext(UserContext);

  const currentUser = users.find((user) => user.username === params.id);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isGameHandleValid, setIsGameHandleValid] = useState(true);

  const [username, setUsername] = useState(currentUser.username);
  const [userLanguage, setUserLanguage] = useState(currentUser.language);
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);
  const [gameHandle, setGameHandle] = useState(currentUser.gameHandle);
  const [isGameHandleExist, setIsGameHandleExist] = useState(false);
  const [showGameHandleLength, setShowGameHandleLength] = useState(false);
  const [showGameHandleWarningInfo, setShowGameHandleWarningInfo] = useState(false);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  useEffect(() => {
    username === "" || username.length > 50 ? setIsNameValid(false) : setIsNameValid(true);
  }, [username]);

  function handleLanguageChange(e) {
    setUserLanguage(e.target.value);
  }

  function handleGameHandleChange(e) {
    setGameHandle(e.target.value);
  }
  useEffect(() => {
    if (!isGameHandleExist) {
      setIsGameHandleValid(true);
    } else if (gameHandle.length <= 2 || gameHandle.length > 16 || /\W/.test(gameHandle)) {
      setIsGameHandleValid(false);
    } else {
      setIsGameHandleValid(true);
    }
  }, [isGameHandleExist, gameHandle, isGameHandleValid]);

  function handleSave() {
    if (!isNameValid || !isGameHandleValid) {
      setIsNameValid(username.trim() !== "");
      return;
    } else {
      const updatedUsers = users.map((user) => {
        if (user.username === params.id) {
          return {
            ...user,
            username,
            language: userLanguage,
            gameHandle,
            profilImage: editingProfilePictureSrc || currentUser.profilImage,
          };
        }
        return user;
      });
      setShowGameHandleWarningInfo(false);
      setEditingProfilePictureSrc(null);
      setUsers(updatedUsers);
    }
  }

  return (
    <main className="user-settings__wrapper">
      <h1 className="user-settings__header">{t("editProfile")}</h1>

      <hr />

      <div className="user-settings__container">
        <aside className="user-settings__image-edit">
          <h2 className="visually-hidden">{t("profileImageEdition")}</h2>
          <img
            className="user-settings__img"
            src={(currentUser && editingProfilePictureSrc) || currentUser.profilImage}
            alt={`${currentUser.username} ${t("profileAvatar")}`}
          />
          <Link
            to={{
              pathname: `/ManageProfiles/${params.id}/EditProfile`,
            }}
            className="user-settings__edit-btn"
            aria-label={t("changeProfileImage")}
          >
            <EditIcon />
          </Link>
        </aside>

        <article>
          <h2 className="visually-hidden">{t("profileSettings")}</h2>
          <section>
            <label
              htmlFor="profile-name-entry"
              id="profile-name-entry-label"
              className="visually-hidden"
            >
              <h3>{t("profileName")}</h3>
            </label>
            <input
              id="profile-name-entry"
              className={`user-settings__input ${isNameValid ? "" : " invalid"}`}
              type="text"
              placeholder="Name"
              value={username}
              onChange={handleUsernameChange}
              autoFocus
            />
            {!isNameValid && (
              <p className="user-settings__invalid-message">
                {username.length > 50 ? t("nameWarningCharacters") : t("nameWarningEmpty")}
              </p>
            )}
          </section>

          <section>
            <label htmlFor="language-select">
              <h3 className="user-settings__section-heading user-settings__language-select-heading">
                {t("language")}:
              </h3>
            </label>
            <select
              name="language-select"
              id="language-select"
              value={userLanguage}
              onChange={handleLanguageChange}
            >
              {languageOptions.map((language) => (
                <option
                  key={language}
                  value={language}
                >
                  {language}
                </option>
              ))}
            </select>
          </section>

          <section>
            <label htmlFor="game-handle">
              <h3 className="user-settings__section-heading">{t("gameHandle")}:</h3>
            </label>
            <p
              id="gamesHandleDescription"
              className="user-settings__game-handle-text"
            >
              {t("gameHandleDescription")}
              &nbsp;
              <button
                className="user-settings__learn-more-btn"
                onClick={() => setIsLearnMoreModalOpen(true)}
              >
                {t("learnMore")}
              </button>
            </p>
            <input
              id="game-handle"
              className={`user-settings__input${
                isGameHandleValid && gameHandle.length !== 0 ? " available" : ""
              } ${!isGameHandleValid ? " invalid" : ""}`}
              type="text"
              placeholder={t("gameHandlePlaceholder")}
              aria-describedby="gamesHandleDescription"
              aria-invalid={!isGameHandleValid}
              aria-errormessage="gameHandleMessageText"
              value={gameHandle}
              onChange={(e) => {
                handleGameHandleChange(e);
                setIsGameHandleExist(true);
              }}
              onFocus={() => {
                setShowGameHandleLength(true);
                setShowGameHandleWarningInfo(true);
              }}
            />
            {showGameHandleWarningInfo && (
              <div className="user-settings__game-handle-warning-info-container">
                {isGameHandleValid && gameHandle !== "" && (
                  <p
                    id="gameHandleMessageText"
                    className={`${!isGameHandleValid ? "invalid" : "available"}`}
                    aria-live="assertive"
                  >
                    {t("available")}
                  </p>
                )}
                {!isGameHandleValid && gameHandle !== "" && (
                  <p
                    id="gameHandleMessageText"
                    className={`user-settings__game-handle-warning-info-wrapper user-settings__invalid-message${
                      !isGameHandleValid ? " invalid" : ""
                    }`}
                    aria-live="assertive"
                  >
                    {gameHandle.length <= 2 && (
                      <>
                        <WarningIcon />
                        {t("gameHandleWarningShort")}
                      </>
                    )}
                    {gameHandle.length > 16 && (
                      <>
                        <WarningIcon />
                        {t("gameHandleWarningLong")}
                      </>
                    )}
                    {/\W/.test(gameHandle) && gameHandle.length > 2 && gameHandle.length <= 16 && (
                      <>
                        <WarningIcon />
                        {t("gameHandleWarningSpecial")}
                      </>
                    )}
                  </p>
                )}
                {isGameHandleExist && gameHandle.length === 0 && (
                  <p
                    id="gameHandleMessageText"
                    className={`user-settings__invalid-message${
                      !isGameHandleValid ? " invalid" : ""
                    }`}
                    aria-live="assertive"
                  >
                    {t("createNewGameHandle")}
                  </p>
                )}
                {showGameHandleLength && (
                  <p className="user-settings__game-handle-length">{gameHandle.length}/16</p>
                )}
              </div>
            )}
            <MoreInfoModal
              isLearnMoreModalOpen={isLearnMoreModalOpen}
              setIsLearnMoreModalOpen={setIsLearnMoreModalOpen}
            />
          </section>

          <hr />

          <section className="user-settings__maturity-section">
            <h3 className="user-settings__section-heading">{t("maturitySettings")}:</h3>
            <strong className="user-settings__text-box">{t("allMaturityRatings")}</strong>
            <p className="user-settings__maturity-text">
              {t("showTitlesOf")} <b>{t("allMaturityRatings")}</b> {t("forThisProfile")}.
            </p>
            <Link
              className="user-settings__maturity-edit-btn"
              aria-label={t("editLabel")}
            >
              {t("edit")}
            </Link>
          </section>

          <hr />

          <section>
            <h3 className="user-settings__section-heading">{t("autoplayControls")}</h3>
            <div className="user-settings__autoplay-wrapper">
              <input
                type="checkbox"
                name="autoplay-next-episode"
                id="autoplay-next-episode"
                className="user-settings__autoplay-checkbox"
                defaultChecked
              />
              <label
                htmlFor="autoplay-next-episode"
                className="user-settings__autoplay-checkbox-label"
              >
                {t("autoplayControlsNext")}
              </label>
            </div>
            <div className="user-settings__autoplay-wrapper">
              <input
                type="checkbox"
                name="autoplay-previews"
                id="autoplay-previews"
                className="user-settings__autoplay-checkbox"
                defaultChecked
              />
              <label
                htmlFor="autoplay-previews"
                className="user-settings__autoplay-checkbox-label"
              >
                {t("autoplayControlsPrev")}
              </label>
            </div>
          </section>
        </article>
      </div>

      <hr />

      <section className="user-settings__confirmation-section">
        <h2 className="visually-hidden">{t("confirmation")}</h2>
        {!isNameValid || !isGameHandleValid ? (
          <a href="#">{t("save")}</a>
        ) : (
          <Link
            to="/ManageProfiles"
            className="user-settings__confirmation-btn user-settings__confirmation-btn--accent"
            onClick={handleSave}
          >
            {t("save")}
          </Link>
        )}
        <Link
          to="/ManageProfiles"
          className="user-settings__confirmation-btn"
          onClick={() => setEditingProfilePictureSrc(null)}
        >
          {t("cancel")}
        </Link>
        {currentUser.id !== 1 && <button>{t("deleteProfile")}</button>}
      </section>
    </main>
  );
}
