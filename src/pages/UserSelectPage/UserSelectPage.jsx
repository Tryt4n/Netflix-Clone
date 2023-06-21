import { Link } from "react-router-dom";

import "./userSelectPage.scss";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import SelectProfilItem from "../../components/SelectProfilItem.jsx/SelectProfilItem";

import { useTranslation } from "react-i18next";

export default function UserSelectPage() {
  const { t } = useTranslation();

  const { users } = useContext(UserContext);

  return (
    <main className="choose-profile">
      <h1 className="choose-profile__header">{t("whosWatching")}</h1>

      <ul
        className="choose-profile__list"
        aria-label="Choose Profile"
      >
        {users.map((user) => (
          <li key={user.id}>
            <SelectProfilItem user={user} />
          </li>
        ))}
      </ul>

      <Link
        to="/ManageProfiles"
        className="choose-profile__manage-profiles"
      >
        {t("manageProfiles")}
      </Link>
    </main>
  );
}
