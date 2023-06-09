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
          return { ...user, username, gameHandle, profilImage: editingProfilePictureSrc };
        }
        return user;
      });
      setShowGameHandleWarningInfo(false);
      setEditingProfilePictureSrc(null);
      setUsers(updatedUsers);
    }
  }

  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);

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

          <section className="user-settings__language-select-container">
            <label htmlFor="language-select">
              <h3 className="user-settings__language-select-header">{t("language")}:</h3>
            </label>
            <select
              name="language-select"
              id="language-select"
            >
              {languageOptions.map((language) => (
                <option
                  key={language}
                  value={language}
                  selected={userLanguage === language}
                >
                  {language}
                </option>
              ))}
            </select>
          </section>

          <section>
            <label htmlFor="game-handle">
              <h3>{t("gameHandle")}:</h3>
            </label>
            <p id="gamesHandleDescription">
              {t("gameHandleDescription")}
              <button onClick={() => setIsLearnMoreModalOpen(true)}>{t("learnMore")}</button>
            </p>
            <input
              id="game-handle"
              className="user-settings__input"
              type="text"
              placeholder={t("gameHandlePlaceholder")}
              aria-describedby="gamesHandleDescription"
              aria-invalid="false"
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
              <div>
                {isGameHandleValid && gameHandle !== "" && (
                  <p
                    id="gameHandleMessageText"
                    className={`${!isGameHandleValid ? "invalid" : ""}`}
                    aria-live="assertive"
                  >
                    {t("available")}
                  </p>
                )}
                {!isGameHandleValid && gameHandle !== "" && (
                  <p
                    id="gameHandleMessageText"
                    className={`${!isGameHandleValid ? "invalid" : ""}`}
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
                    className={`${!isGameHandleValid ? "invalid" : ""}`}
                    aria-live="assertive"
                  >
                    {t("createNewGameHandle")}
                  </p>
                )}
                {showGameHandleLength && <p>{gameHandle.length}/16</p>}
              </div>
            )}
            <MoreInfoModal
              isLearnMoreModalOpen={isLearnMoreModalOpen}
              setIsLearnMoreModalOpen={setIsLearnMoreModalOpen}
            />
          </section>

          <hr />

          <section>
            <h3>{t("maturitySettings")}:</h3>
            <strong>{t("allMaturityRatings")}</strong>
            <p>
              {t("showTitlesOf")} <b>{t("allMaturityRatings")}</b> {t("forThisProfile")}.
            </p>
            {/* //! Change for <Link/> */}
            <button aria-label={t("editLabel")}>{t("edit")}</button>
          </section>

          <hr />

          <section>
            <h3>{t("autoplayControls")}</h3>
            <div>
              <input
                type="checkbox"
                name="autoplay-next-episode"
                id="autoplay-next-episode"
                //! change for checked
                defaultChecked
              />
              <label htmlFor="autoplay-next-episode">{t("autoplayControlsNext")}</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="autoplay-previews"
                id="autoplay-previews"
                //! change for checked
                defaultChecked
              />
              <label htmlFor="autoplay-previews">{t("autoplayControlsPrev")}</label>
            </div>
          </section>
        </article>
      </div>

      <hr />

      <section>
        <h2 className="visually-hidden">{t("confirmation")}</h2>
        {!isNameValid || !isGameHandleValid ? (
          <a href="#">{t("save")}</a>
        ) : (
          <Link
            to="/ManageProfiles"
            onClick={handleSave}
          >
            {t("save")}
          </Link>
        )}
        <Link
          to="/ManageProfiles"
          onClick={() => setEditingProfilePictureSrc(null)}
        >
          {t("cancel")}
        </Link>
      </section>
    </main>
  );
}
