import { Link } from "react-router-dom";

import "./userSelectPage.scss";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import SelectProfilItem from "../../components/SelectProfilItem.jsx/SelectProfilItem";

export default function UserSelectPage() {
  const { users } = useContext(UserContext);

  return (
    <main className="choose-profile">
      <h1 className="choose-profile__header">Who&apos;s watching?</h1>

      <ul
        className="choose-profile__list"
        aria-label="Choose Profile"
      >
        {users.map((user) => (
          <SelectProfilItem
            key={user.id}
            user={user}
          />
        ))}
      </ul>

      <Link
        to="/ManageProfiles"
        className="choose-profile__manage-profiles"
      >
        Manage Profiles
      </Link>
    </main>
  );
}
