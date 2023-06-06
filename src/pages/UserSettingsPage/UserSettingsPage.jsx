import { Link, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

import "../ManageProfilesPage/manageProfilesPage.scss";

import languageOptions from "../../../server/languageOptions.json";
import MoreInfoModal from "../../components/MoreInfoModal/MoreInfoModal";

const editIcon = (
  <svg
    aria-label="Edit Icon"
    className="edit-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z"
      fill="currentColor"
    ></path>
  </svg>
);
const warningIcon = (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-name="Warning"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.22353 1.60522C8.67651 0.670007 7.32485 0.67 6.77783 1.60522L0.190097 12.8681C-0.3623 13.8125 0.318834 15 1.41295 15H14.5884C15.6825 15 16.3637 13.8125 15.8113 12.8681L9.22353 1.60522ZM1.55823 13.5L8.00068 2.48553L14.4431 13.5H1.55823ZM9.00132 6.66677H7.00132L7.33465 9.33344H8.66799L9.00132 6.66677ZM9.00132 11.0002C9.00132 10.4479 8.5536 10.0002 8.00132 10.0002C7.44903 10.0002 7.00132 10.4479 7.00132 11.0002C7.00132 11.5524 7.44903 12.0002 8.00132 12.0002C8.5536 12.0002 9.00132 11.5524 9.00132 11.0002Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default function UserSettingsPage() {
  const params = useParams();

  const { users, setUsers, editingProfile, setEditingProfile } = useContext(UserContext);

  const currentUser = users.find((user) => user.username === params.id);
  // useEffect(() => {
  //   setEditingProfile(currentUser);
  // }, [currentUser, setEditingProfile, editingProfile]);

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
          return { ...user, username, gameHandle };
        }
        return user;
      });
      setShowGameHandleWarningInfo(false);
      setUsers(updatedUsers);
    }
  }

  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);

  return (
    <main className="manage-profile__wrapper">
      <h1 className="manage-profile__header">Edit Profile</h1>

      <hr />

      <div className="manage-profile__container">
        <aside className="manage-profile__image-edit">
          <h2 className="visually-hidden">Profile Image Edition</h2>
          <img
            className="manage-profile__img"
            src={currentUser.profilImage}
            alt={currentUser.username}
          />
          {/* //! Change for link */}
          <Link
            // to={`/ManageProfiles/${params.id}/EditProfile`}
            to={{
              pathname: `/ManageProfiles/${params.id}/EditProfile`,
              // state: { editingProfile: editingProfile },
              state: { currentUser: currentUser },
            }}
            className="manage-profile__edit-btn"
            aria-label="Change profile image"
          >
            {editIcon}
          </Link>
        </aside>

        <article>
          <h2 className="visually-hidden">Profile Settings</h2>
          <section>
            <label
              htmlFor="profile-name-entry"
              id="profile-name-entry-label"
              className="visually-hidden"
            >
              <h3>Profile Name</h3>
            </label>
            <input
              id="profile-name-entry"
              className={`manage-profile__input ${isNameValid ? "" : " invalid"}`}
              type="text"
              placeholder="Name"
              value={username}
              onChange={handleUsernameChange}
              autoFocus
            />
            {!isNameValid && (
              <p className="manage-profile__invalid-message">
                {username.length > 50
                  ? "Sorry, names must be less than 50 characters"
                  : "Please enter a name"}
              </p>
            )}
          </section>

          <section className="manage-profile__language-select-container">
            <label htmlFor="language-select">
              <h3 className="manage-profile__language-select-header">Language:</h3>
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
              <h3>Game Handle:</h3>
            </label>
            <p id="gamesHandleDescription">
              Your handle is a unique name that&apos;ll be used for playing with other Netflix
              members across all Netflix Games.
              <button onClick={() => setIsLearnMoreModalOpen(true)}>Learn more</button>
            </p>
            <input
              id="game-handle"
              className="manage-profile__input"
              type="text"
              placeholder="Create Game Handle"
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
                    Available
                  </p>
                )}
                {!isGameHandleValid && gameHandle !== "" && (
                  <p
                    id="gameHandleMessageText"
                    className={`${!isGameHandleValid ? "invalid" : ""}`}
                    aria-live="assertive"
                  >
                    {gameHandle.length <= 2 && <>{warningIcon}Must be longer than 2 characters</>}
                    {gameHandle.length > 16 && <>{warningIcon}Must be shorter than 16 characters</>}
                    {/\W/.test(gameHandle) && gameHandle.length > 2 && gameHandle.length <= 16 && (
                      <>{warningIcon}Use only numbers or letters</>
                    )}
                  </p>
                )}
                {isGameHandleExist && gameHandle.length === 0 && (
                  <p
                    id="gameHandleMessageText"
                    className={`${!isGameHandleValid ? "invalid" : ""}`}
                    aria-live="assertive"
                  >
                    Create new Game Handle
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
            <h3>Maturity Settings:</h3>
            <strong>All Maturity Ratings</strong>
            <p>
              Show titles of <b>all maturity ratings</b> for this profile.
            </p>
            {/* //! Change for <Link/> */}
            <button aria-label="Edit maturity settings">Edit</button>
          </section>

          <hr />

          <section>
            <h3>Autoplay controls</h3>
            <div>
              <input
                type="checkbox"
                name="autoplay-next-episode"
                id="autoplay-next-episode"
                //! change for checked
                defaultChecked
              />
              <label htmlFor="autoplay-next-episode">
                Autoplay next episode in a series on all devices.
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                name="autoplay-previews"
                id="autoplay-previews"
                //! change for checked
                defaultChecked
              />
              <label htmlFor="autoplay-previews">
                Autoplay previews while browsing on all devices.
              </label>
            </div>
          </section>
        </article>
      </div>

      <hr />

      <section>
        <h2 className="visually-hidden">Confirmation</h2>
        {!isNameValid || !isGameHandleValid ? (
          <a href="#">Save</a>
        ) : (
          <Link
            to="/ManageProfiles"
            onClick={handleSave}
          >
            Save
          </Link>
        )}
        <Link to="/ManageProfiles">Cancel</Link>
      </section>
    </main>
  );
}
