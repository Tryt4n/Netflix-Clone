import { createContext, useEffect, useState } from "react";

import usersData from "../../server/users.json";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(usersData);
  const [user, setUser] = useState("");
  const [editingProfile, setEditingProfile] = useState({});

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
