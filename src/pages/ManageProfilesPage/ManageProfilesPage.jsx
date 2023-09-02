import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../../context/UserContext";
import SelectProfilItem from "../../components/SelectProfilItem.jsx/SelectProfilItem";

import "./manageProfilesPage.scss";
import { useTranslation } from "react-i18next";

export default function ManageProfilesPage() {
  const { t, i18n } = useTranslation();

  const { users, currentLanguageCode, setEditingProfilePictureSrc } = useContext(UserContext);

  const navigate = useNavigate();

  function selectUser(user) {
    navigate(`./${user.username}`);
  }

  return (
    <main className="choose-profile">
      <h1 className="choose-profile__header">{t("manageProfiles")}:</h1>

      <ul
        className="choose-profile__list"
        aria-label={t("chooseProfil")}
      >
        {users.map((user, index) => (
          <React.Fragment key={user.id}>
            <li key={user.id}>
              <SelectProfilItem
                user={user}
                isEdit
                selectUser={selectUser}
              />
            </li>

            {index === users.length - 1 && users.length < 5 && (
              <li>
                <SelectProfilItem
                  user={user}
                  isEdit
                  areAllUsers
                />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>

      <Link
        to="/"
        className="choose-profile__manage-profiles manage-profile__done"
        onClick={() => {
          i18n.changeLanguage(currentLanguageCode);
          setEditingProfilePictureSrc(null);
        }}
      >
        {t("done")}
      </Link>
    </main>
  );
}
