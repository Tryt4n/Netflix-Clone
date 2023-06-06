import { createContext, useEffect, useState } from "react";

import usersData from "../../server/users.json";
import globalIcons from "../../server/editProfileData.json";
// import globalIcons from "../server/editProfileData.json";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(usersData);
  const [user, setUser] = useState("");
  const [editingProfile, setEditingProfile] = useState({});

  const iconsData = globalIcons;

  // useEffect(() => {
  //   console.log(editingProfile);
  // }, [editingProfile]);

  return (
    <UserContext.Provider
      value={{
        users: users,
        setUsers: setUsers,
        user: user,
        setUser: setUser,
        editingProfile: editingProfile,
        setEditingProfile: setEditingProfile,
        iconsData: iconsData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
