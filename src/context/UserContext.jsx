import { createContext, useEffect, useState } from "react";

import usersData from "../../server/users.json";
import iconsData from "../../server/editProfileData.json";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(usersData);
  const [user, setUser] = useState("");
  const [editingProfile, setEditingProfile] = useState({});

  const [editingProfilePictureSrc, setEditingProfilePictureSrc] = useState(null);

  function handleProfilePictureChange(src) {
    setEditingProfilePictureSrc(src);
  }

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  return (
    <UserContext.Provider
      value={{
        users: users,
        setUsers: setUsers,
        user: user,
        setUser: setUser,
        editingProfile: editingProfile,
        setEditingProfile: setEditingProfile,
        editingProfilePictureSrc: editingProfilePictureSrc,
        setEditingProfilePictureSrc: setEditingProfilePictureSrc,
        handleProfilePictureChange: handleProfilePictureChange,
        iconsData: iconsData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
