import { createContext, useEffect, useState } from "react";

import usersData from "../../server/users.json";
import iconsData from "../../server/editProfileData.json";
import { useLocalStorage, useSessionStorage } from "../hooks/useStorage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers, removeUsers] = useLocalStorage("usersData", usersData);
  const [user, setUser] = useState("");
  const [editingProfile, setEditingProfile] = useState({});

  const [editingUserLanguage, setEditingUserLanguage] = useState(null);
  const [editingProfilePictureSrc, setEditingProfilePictureSrc] = useState(null);
  const [currentEditingProfile, setCurrentEditingProfile, removeCurrentEditingProfile] =
    useSessionStorage("currentProfile", users[0]);

  const [isCurrentlySaved, setIsCurrentlySaved] = useState(false);
  const [displayedSavedMessage, setDisplayedSavedMessage] = useState("");

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

  useEffect(() => {
    console.log(users);
  }, [users]);

  //* Password Confirmation Logic
  const [isConfirmationPasswordValid, setIsConfirmationPasswordValid] = useState(true);
  const [passwordConfirmationPassed, setPasswordConfirmationPassed] = useState(false);

  function resetPasswordConfirmationSettings() {
    setIsConfirmationPasswordValid(true);
    setPasswordConfirmationPassed(false);
  }
  //* ////////////////////////////////////////////////////////////////////////////////

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
        currentEditingProfile: currentEditingProfile,
        setCurrentEditingProfile: setCurrentEditingProfile,
        removeCurrentEditingProfile: removeCurrentEditingProfile,
        isCurrentlySaved: isCurrentlySaved,
        setIsCurrentlySaved: setIsCurrentlySaved,
        displayedSavedMessage: displayedSavedMessage,
        setDisplayedSavedMessage: setDisplayedSavedMessage,
        iconsData: iconsData,
        isConfirmationPasswordValid: isConfirmationPasswordValid,
        setIsConfirmationPasswordValid: setIsConfirmationPasswordValid,
        passwordConfirmationPassed: passwordConfirmationPassed,
        setPasswordConfirmationPassed: setPasswordConfirmationPassed,
        resetPasswordConfirmationSettings: resetPasswordConfirmationSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
