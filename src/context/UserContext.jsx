import { createContext, useEffect, useState } from "react";

import users from "../../server/users.json";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [userSettings, setUserSettings] = useState([]);

  // useEffect(() => {
  //   console.log(userSettings);
  // }, [userSettings]);

  return (
    <UserContext.Provider
      value={{
        users: users,
        user: user,
        userSettings: userSettings,
        setUserSettings: setUserSettings,
        setUser: setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
