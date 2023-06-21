import { Link, useParams } from "react-router-dom";

import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/UserContext";

import "./userSettingsPage.scss";

import languageOptions from "../../../server/languageOptions.json";
import MoreInfoModal from "../../components/MoreInfoModal/MoreInfoModal";
import { useTranslation } from "react-i18next";
import EditIcon from "../../icons/EditIcon";
import WarningIcon from "../../icons/WarningIcon";

export default function UserSettingsPage() {
  const { t } = useTranslation();

  const params = useParams();

  const {
    users,
    setUsers,
    setEditingUserLanguage,
    editingProfilePictureSrc,
    setEditingProfilePictureSrc,
    setCurrentEditingProfile,
  } = useContext(UserContext);

  const currentUser = users.find((user) => user.username === params.id);
  const sessionStorageUserData = {
    username: currentUser.username,
    profileImage: currentUser.profileImage,
    language: currentUser.language,
    maturityRating: currentUser.maturityRating,
    blockedMovies: currentUser?.blockedMovies,
  };
  useEffect(() => {
    setCurrentEditingProfile(sessionStorageUserData);
  }, [currentUser, setCurrentEditingProfile]);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isNameAlreadyExist, setIsNameAlreadyExist] = useState(false);
  const [isGameHandleValid, setIsGameHandleValid] = useState(true);
  const [isGameHandleActive, setIsGameHandleActive] = useState(false);

  const [username, setUsername] = useState(currentUser.username);
  const [userLanguage, setUserLanguage] = useState(currentUser.language);
  const [gameHandle, setGameHandle] = useState(currentUser.gameHandle);
  const [autoplayNextInputChecked, setAutoplayNextInputChecked] = useState(
    currentUser.autoplayNext !== undefined ? currentUser.autoplayNext : true
  );
  const [autoplayPreviewsInputChecked, setAutoplayPreviewsInputChecked] = useState(
    currentUser.autoplayPrevious !== undefined ? currentUser.autoplayPrevious : true
  );

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);
  const [isGameHandleExist, setIsGameHandleExist] = useState(false);
  const [showGameHandleLength, setShowGameHandleLength] = useState(false);
  const [showGameHandleWarningInfo, setShowGameHandleWarningInfo] = useState(false);

  const autoplayNextInputRef = useRef(true);
  const autoplayPreviousInputRef = useRef(true);

  const isDuplicate = users.some((user) => user.username.toLowerCase() === username.toLowerCase());

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  useEffect(() => {
    username === "" || username.length > 50 ? setIsNameValid(false) : setIsNameValid(true);
  }, [username]);
  useEffect(() => {
    username !== currentUser.username && isDuplicate
      ? setIsNameAlreadyExist(false)
      : setIsNameAlreadyExist(true);
  }, [username, isDuplicate, currentUser.username]);

  function handleLanguageChange(selectedLanguage) {
    setUserLanguage(selectedLanguage);
    setIsLanguageMenuOpen(false);
  }

  function handleLanguageChangeOnKeyDown(e, selectedLanguage) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault();
      handleLanguageChange(selectedLanguage);
    }
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
            gameHandle: gameHandle,
            profileImage: editingProfilePictureSrc || currentUser.profileImage,
            autoplayNext: autoplayNextInputChecked,
            autoplayPreviews: autoplayPreviewsInputChecked,
          };
        }
        return user;
      });
      setShowGameHandleWarningInfo(false);
      setEditingUserLanguage(userLanguage);
      setEditingProfilePictureSrc(null);
      setUsers(updatedUsers);
      setCurrentEditingProfile(null);
    }
  }

  function handleCancel() {
    setEditingProfilePictureSrc(null);
    setCurrentEditingProfile(null);
  }

  function deleteUser() {
    const updatedUsers = users.filter((user) => user !== currentUser);
    setUsers(updatedUsers);
    setCurrentEditingProfile(null);
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
            src={(currentUser && editingProfilePictureSrc) || currentUser.profileImage}
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
              autoComplete="off"
              value={username === "Kids" ? t("Kids") : username}
              onChange={handleUsernameChange}
              autoFocus
            />
            {!isNameValid && (
              <p className="user-settings__invalid-message">
                {username.length > 50 ? t("nameWarningCharacters") : t("nameWarningEmpty")}
              </p>
            )}
            {!isNameAlreadyExist && (
              <p className="user-settings__invalid-message">{t("nameWarningAlreadyExist")}</p>
            )}
          </section>

          <hr className="visually-hidden" />

          <section>
            <h3
              id="user-settings-language"
              className="user-settings__section-heading user-settings__language-select-heading"
            >
              {t("language")}:
            </h3>
            <button
              className="user-settings__language-label-btn"
              aria-haspopup="true"
              aria-expanded={isLanguageMenuOpen}
              aria-labelledby="user-settings-language"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              {userLanguage}
              <span
                className="arrow"
                aria-hidden="true"
              ></span>
            </button>
            {isLanguageMenuOpen && (
              <ul
                className="user-settings__language-select-list"
                role="menu"
              >
                {languageOptions.map((language) => (
                  <li
                    key={language}
                    className="user-settings__language-select-list-item"
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleLanguageChange(language)}
                    onKeyDown={(e) => handleLanguageChangeOnKeyDown(e, language)}
                  >
                    {language}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {!currentUser.kidsProfile && (
            <>
              <hr />

              <section className="user-settings__game-handle-section">
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
                    isGameHandleValid && gameHandle.length !== 0 && isGameHandleActive
                      ? " available"
                      : ""
                  } ${!isGameHandleValid ? " invalid" : ""}`}
                  type="text"
                  placeholder={t("gameHandlePlaceholder")}
                  autoComplete="off"
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
                    setIsGameHandleActive(true);
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
                        {/\W/.test(gameHandle) &&
                          gameHandle.length > 2 &&
                          gameHandle.length <= 16 && (
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
            </>
          )}

          <hr />

          <section className="user-settings__maturity-section">
            <h3 className="user-settings__section-heading">{t("maturitySettings")}:</h3>
            {currentUser.kidsProfile && (
              <strong className="user-settings__text-box user-settings__kids-badge">
                {t("Kids")}
              </strong>
            )}
            <strong className="user-settings__text-box">
              {currentUser.maturityRating === "18+"
                ? t("allMaturityRatings")
                : currentUser.maturityRating}
            </strong>
            <p className="user-settings__maturity-text">
              {t("showTitlesOf")} <b>{t("allMaturityRatings")}</b> {t("forThisProfile")}.
            </p>
            <Link
              to={"/Viewing-Restriction"}
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
                ref={autoplayNextInputRef}
                checked={autoplayNextInputChecked}
                onChange={() => setAutoplayNextInputChecked(!autoplayNextInputChecked)}
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
                ref={autoplayPreviousInputRef}
                checked={autoplayPreviewsInputChecked}
                onChange={() => setAutoplayPreviewsInputChecked(!autoplayPreviewsInputChecked)}
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
        {!isNameValid || !isGameHandleValid || !isNameAlreadyExist ? (
          <a
            href="#"
            className="user-settings__confirmation-btn user-settings__confirmation-btn--accent"
          >
            {t("save")}
          </a>
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
          onClick={handleCancel}
        >
          {t("cancel")}
        </Link>
        {currentUser.id !== 1 && (
          <Link
            to="/ManageProfiles"
            className="user-settings__confirmation-btn"
            onClick={deleteUser}
          >
            {t("deleteProfile")}
          </Link>
        )}
      </section>
    </main>
  );
}
