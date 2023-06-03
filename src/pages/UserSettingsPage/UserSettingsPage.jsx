import { Link, useParams } from "react-router-dom";

import { useContext, useRef, useState } from "react";
import UserContext from "../../context/UserContext";

// import "./manageProfilesPage.scss";
import "../ManageProfilesPage/manageProfilesPage.scss";

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

export default function UserSettingsPage() {
  const params = useParams();

  const { users, setUserSettings } = useContext(UserContext);

  const currentUser = users.find((user) => user.username === params.id);
  console.log(currentUser);
  //   const [editProfile, setEditProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(currentUser);

  const [isNameValid, setIsNameValid] = useState(true);
  //   const nameRef = useRef(null);

  //   function handleInputName(e) {
  //     setEditingProfile((prevState) => ({
  //       ...prevState,
  //       username: e.target.value,
  //     }));
  //   }

  //   function changeUserSettings() {
  //     const id = editingProfile.id;
  //     const index = id - 1;

  //     setUserSettings(editingProfile);
  //     console.log(users[index]);
  //   }

  return (
    <main className="manage-profile__wrapper">
      <h1 className="manage-profile__header">Edit Profile</h1>

      <hr />

      <div className="manage-profile__container">
        <aside className="manage-profile__image-edit">
          <h2 className="visually-hidden">Profil Image Edition</h2>
          <img
            className="manage-profile__img"
            src={editingProfile.profilImage}
            alt={editingProfile.username}
          />
          <button
            className="manage-profile__edit-btn"
            aria-label="Change profile image"
          >
            {editIcon}
          </button>
        </aside>

        <article>
          <h2 className="visually-hidden">Profil Settings</h2>
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
              //   value={editingProfile.username}
              //   ref={nameRef}
              //   onChange={handleInputName}
            />
            {!isNameValid && <p className="manage-profile__invalid-message">Please enter a name</p>}
          </section>

          <section className="manage-profile__language-select-container">
            <label htmlFor="language-select">
              <h3 className="manage-profile__language-select-header">Language:</h3>
            </label>
            <select
              name="language-select"
              id="language-select"
            >
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bahasa Melayu">Bahasa Melayu</option>
              <option value="Dansk">Dansk</option>
              <option value="Deutsch">Deutsch</option>
              <option
                // selected
                value="English"
              >
                English
              </option>
              <option value="Español">Español</option>
              <option value="Filipino">Filipino</option>
              <option value="Français">Français</option>
              <option value="Hrvatski">Hrvatski</option>
              <option value="Italiano">Italiano</option>
              <option value="Magyar">Magyar</option>
              <option value="Nederlands">Nederlands</option>
              <option value="Norsk bokmål">Norsk bokmål</option>
              <option value="Polski">Polski</option>
              <option value="Português">Português</option>
              <option value="Română">Română</option>
              <option value="Suomi">Suomi</option>
              <option value="Svenska">Svenska</option>
              <option value="Tiếng Việt">Tiếng Việt</option>
              <option value="Türkçe">Türkçe</option>
              <option value="Čeština">Čeština</option>
              <option value="Ελληνικά">Ελληνικά</option>
              <option value="Русский">Русский</option>
              <option value="Українська">Українська</option>
              <option value="עברית">עברית</option>
              <option value="العربية">العربية</option>
              <option value="हिन्दी">हिन्दी</option>
              <option value="ไทย">ไทย</option>
              <option value="中文">中文</option>
              <option value="日本語">日本語</option>
              <option value="한국어">한국어</option>
            </select>
          </section>

          <section>
            <label htmlFor="game-handle">
              <h3>Game Handle:</h3>
            </label>
            <p id="gamesHandleDescription">
              Your handle is a unique name that&apos;ll be used for playing with other Netflix
              members across all Netflix Games.
              <button>Learn more</button>
            </p>
            <input
              id="game-handle"
              className="manage-profile__input"
              type="text"
              placeholder="Create Game Handle"
              aria-describedby="gamesHandleDescription"
              aria-invalid="false"
              aria-errormessage="gamesHandleMessageText"
            />
            <div>
              <p
                aria-live="assertive"
                id="gamesHandleMessageText"
              >
                <svg
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
                Must be shorter than 16 characters
              </p>
              <p>0/16</p>
            </div>
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
        {/* <button onClick={changeUserSettings}>Save</button>
        <button>Cancel</button> */}
        <Link
          to={"/ManageProfiles"}
          //   onClick={changeUserSettings}
        >
          Save
        </Link>
        <Link to={"/ManageProfiles"}>Cancel</Link>
      </section>
    </main>
  );
}
