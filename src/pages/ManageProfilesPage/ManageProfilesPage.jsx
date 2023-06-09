import { Link } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../../context/UserContext";
import SelectProfilItem from "../../components/SelectProfilItem.jsx/SelectProfilItem";

import "./manageProfilesPage.scss";

const editIcon = (
  <svg
    aria-label="Edit Icon"
    className="edit-icon"
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

export default function ManageProfilesPage() {
  const { users } = useContext(UserContext);

  return (
    <main className="choose-profile">
      <h1 className="choose-profile__header">Manage Profiles:</h1>

      <ul
        className="choose-profile__list"
        aria-label="Choose Profile"
      >
        {users.map((user) => (
          <Link
            key={user.id}
            to={`./${user.username}`}
          >
            <SelectProfilItem
              user={user}
              isEdit
              editIcon={editIcon}
            />
          </Link>
        ))}
      </ul>

      <Link
        to="/"
        // className="choose-profile__manage-profiles manage-profile__done"
        className="choose-profile__manage-profiles manage-profile__done"
      >
        Done
      </Link>
    </main>
  );
}
