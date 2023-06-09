import { createContext, useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowsSize";

import usersData from "../../server/users.json";
import iconsData from "../../server/editProfileData.json";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(usersData);
  const [user, setUser] = useState("");
  const [editingProfile, setEditingProfile] = useState({});

  const [editingProfilePictureSrc, setEditingProfilePictureSrc] = useState(null);

  const { width, height } = useWindowSize();

  function handleProfilePictureChange(src) {
    setEditingProfilePictureSrc(src);
  }

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
        width: width,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
