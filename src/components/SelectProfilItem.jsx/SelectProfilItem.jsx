import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

import AddNewProfile from "../AddNewProfile/AddNewProfile";

import EditIcon from "../../icons/EditIcon";
import PadlockIcon from "../../icons/PadlockIcon";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./selectProfilItem.scss";

export default function SelectProfilItem({ user, isEdit, isCorrectPIN, areAllUsers, selectUser }) {
  const { t } = useTranslation();

  const { setSelectedUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedUser({});
  }, []);

  useEffect(() => {
    if (user.PIN !== "" && isCorrectPIN) {
      setSelectedUser(user);
      navigate("/home");
    }
  }, [user, isCorrectPIN, setSelectedUser, navigate]);

  return (
    <>
      {areAllUsers ? (
        <Link
          to={"/add-new-profile"}
          className="select-profil-item"
        >
          <div className="select-profil-item__img-wrapper add-new-profile-icon">
            <AddNewProfile styles={`select-profil-item__profile-img${isEdit ? " edit" : ""}`} />
          </div>
          <span className="select-profil-item__username">Add Profile</span>
        </Link>
      ) : (
        <button
          className="select-profil-item"
          aria-label={`${user.username} ${t("profile")}`}
          onClick={() => selectUser(user)}
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
        </button>
      )}
    </>
  );
}
