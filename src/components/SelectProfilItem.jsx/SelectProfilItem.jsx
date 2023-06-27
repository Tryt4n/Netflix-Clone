// import { useContext } from "react";
// import UserContext from "../../context/UserContext";

import { useTranslation } from "react-i18next";

import EditIcon from "../../icons/EditIcon";
import PadlockIcon from "../../icons/PadlockIcon";

import "./selectProfilItem.scss";

export default function SelectProfilItem({
  user,
  isEdit,
  // setEditProfile,
  // setEditingProfile,
}) {
  const { t } = useTranslation();
  // const { setUser } = useContext(UserContext);

  return (
    <div
      className="select-profil-item"
      aria-label={`${user.username} ${t("profile")}`}
      // onClick={() => {
      //   if (!isEdit) {
      //     setUser(user);
      //   } else {
      //     setEditProfile(true);
      //     setEditingProfile(user);
      //   }
      // }}
    >
      <div className="select-profil-item__img-wrapper">
        <img
          className={`select-profil-item__profile-img${isEdit ? " edit" : ""}`}
          src={user.profileImage}
          alt={`${user.username} ${t("avatar")}`}
          aria-hidden="true"
        />
        {isEdit && <EditIcon />}
      </div>
      <span className="select-profil-item__username">
        {user.username === "Kids" ? t("Kids") : user.username}
      </span>
      {user.lock && <PadlockIcon />}
    </div>
  );
}
