// import { useContext } from "react";
// import UserContext from "../../context/UserContext";

import "./selectProfilItem.scss";

export default function SelectProfilItem({
  user,
  isEdit,
  // setEditProfile,
  // setEditingProfile,
  editIcon,
}) {
  // const { setUser } = useContext(UserContext);

  return (
    <>
      <li key={user.id}>
        <button
          className="select-profil-item"
          aria-label={`${user.username} Profil`}
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
              alt=""
              aria-hidden="true"
            />
            {isEdit && <>{editIcon}</>}
          </div>
          <span className="select-profil-item__username">{user.username}</span>
        </button>
      </li>
    </>
  );
}
