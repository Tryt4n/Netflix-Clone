import { createContext, useEffect, useState } from "react";

import usersData from "../../server/users.json";
import iconsData from "../../server/editProfileData.json";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(usersData);
  const [user, setUser] = useState("");
  const [editingProfile, setEditingProfile] = useState({});

  const [editingUserLanguage, setEditingUserLanguage] = useState(null);
  const [editingProfilePictureSrc, setEditingProfilePictureSrc] = useState(null);

  const languageCodes = {
    "Bahasa Indonesia": "id",
    "Bahasa Melayu": "ms",
    Dansk: "da",
    Deutsch: "de",
    English: "en",
    Español: "es",
    Filipino: "fil",
    Français: "fr",
    Hrvatski: "hr",
    Italiano: "it",
    Magyar: "hu",
    Nederlands: "nl",
    "Norsk bokmål": "nb",
    Polski: "pl",
    Português: "pt",
    Română: "ro",
    Suomi: "fi",
    Svenska: "sv",
    "Tiếng Việt": "vi",
    Türkçe: "tr",
    Čeština: "cs",
    Ελληνικά: "el",
    Русский: "ru",
    Українська: "uk",
    עברית: "he",
    العربية: "ar",
    हिन्दी: "hi",
    ไทย: "th",
    中文: "zh",
    日本語: "ja",
    한국어: "ko",
  };
  const currentLanguageCode = languageCodes[editingUserLanguage];

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
        currentLanguageCode: currentLanguageCode,
        editingUserLanguage: editingUserLanguage,
        setEditingUserLanguage: setEditingUserLanguage,
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
