import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import UserContext from "../../context/UserContext";

import "./editProfile.scss";
import Slider from "../../components/Slider/Slider";
import { useTranslation } from "react-i18next";
import GoBackIcon from "../../icons/goBackIcon";

export default function EditProfile() {
  const { t } = useTranslation();

  const params = useParams();

  const { users, iconsData, editingProfilePictureSrc } = useContext(UserContext);
  const currentUser = users.find((user) => user.username === params.id);

  return (
    <div className="edit-profile">
      <div
        className="edit-profile__margin-top"
        aria-hidden="true"
      ></div>
      <header className="edit-profile__header">
        <div className="edit-profile__heading-wrapper">
          <Link
            className="edit-profile__go-back-link"
            to={`/ManageProfiles/${params.id}`}
            aria-label="Go Back"
          >
            <GoBackIcon />
          </Link>
          <hgroup>
            <h1 className="edit-profile__heading">{t("editProfile")}</h1>
            <p className="edit-profile__subheading">{t("chooseProfilIcon")}</p>
          </hgroup>
        </div>
        <div className="edit-profile__heading-wrapper">
          <em className="edit-profile__username-text">{currentUser.username}</em>
          <img
            className="edit-profile__user-img"
            src={editingProfilePictureSrc || currentUser.profilImage}
            alt={`${currentUser.username} ${t("profileAvatar")}`}
          />
        </div>
      </header>

      <main className="edit-profile__main-section">
        <h2 className="visually-hidden">{t("selectProfileImage")}</h2>
        <ul className="edit-profile__list">
          {iconsData.map((list) => (
            <li
              className="edit-profile__list-item"
              key={list.name}
            >
              <h3
                className="edit-profile__slider-heading"
                aria-label={list.titleSrc && `${list.name}`}
              >
                {list.titleSrc ? (
                  <>
                    <span className="visually-hidden">
                      {t("title")}: {list.name}
                    </span>
                    <div className="edit-profile__title-img">
                      <img
                        src={list.titleSrc}
                        alt={list.name}
                      />
                    </div>
                  </>
                ) : (
                  list.name
                )}
              </h3>
              <Slider
                data={list}
                currentUser={currentUser}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
