import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

import EditIcon from "../../icons/EditIcon";
import PadlockIcon from "../../icons/PadlockIcon";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./selectProfilItem.scss";

export default function SelectProfilItem({ user, isEdit, isCorrectPIN }) {
  const { t } = useTranslation();

  const { setSelectedUser } = useContext(UserContext);

  const navigate = useNavigate();

  function selectUser() {
    if (!isEdit) {
      if (user.PIN === "") {
        setSelectedUser(user);
        navigate("/home");
      } else if (user.PIN !== "" && isCorrectPIN) {
        setSelectedUser(user);
        navigate("/home");
      }
    }
  }

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
    <div
      className="select-profil-item"
      aria-label={`${user.username} ${t("profile")}`}
      onClick={selectUser}
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
