// import { useContext } from "react";
// import UserContext from "../../context/UserContext";

import { useTranslation } from "react-i18next";
import "./selectProfilItem.scss";
import EditIcon from "../../icons/EditIcon";

export default function SelectProfilItem({
  user,
  isEdit,
  // setEditProfile,
  // setEditingProfile,
}) {
  const { t } = useTranslation();
  // const { setUser } = useContext(UserContext);

  return (
    <>
      <li key={user.id}>
        <button
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
              src={user.profilImage}
              alt={`${user.username} ${t("avatar")}`}
              aria-hidden="true"
            />
            {isEdit && <EditIcon />}
          </div>
          <span className="select-profil-item__username">{user.username}</span>
        </button>
      </li>
    </>
  );
}
