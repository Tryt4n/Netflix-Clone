import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../../context/UserContext";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Divider from "../../components/Divider/Divider";

import "./addNewProfilePage.scss";

export default function AddNewProfilePage() {
  const { t, i18n } = useTranslation();

  const { users, setUsers, languageCodes } = useContext(UserContext);

  const [nameInputValue, setNameInputValue] = useState("");
  const [kidCheckStatus, setKidCheckStatus] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const nameInputRef = useRef();

  const navigate = useNavigate();

  const languageName = Object.keys(languageCodes).find(
    (key) => languageCodes[key] === i18n.language
  );

  const numbersOfAlreadyExistingAvatars = users.map((user) => {
    const match = user.profileImage.match(/(\d+)\.png$/);
    return match ? parseInt(match[1], 10) : null;
  });
  const availableNumbersOfAvatars = [17, 18, 19, 20, 21, 22].filter(
    (num) => !numbersOfAlreadyExistingAvatars.includes(num)
  );

  useEffect(() => {
    const uniqueNumber = availableNumbersOfAvatars[0];

    setProfileImage(`/images/profiles/Classic/${uniqueNumber}.png`);
  }, []);

  function handleNameInputChange() {
    setNameInputValue(nameInputRef.current.value);
    if (nameInputRef.current.value !== "" && nameInputRef.current.value.length < 50) {
      setIsNameValid(true);
    }
  }
  function handleCheckboxChange(e) {
    setKidCheckStatus(e.target.checked);
  }

  function createNewAccount() {
    if (nameInputValue !== "" && nameInputValue.length < 50) {
      const newUser = {
        id: crypto.randomUUID(),
        username: nameInputValue,
        profileImage: profileImage,
        language: languageName,
        moviesLanguages: [languageName],
        lock: false,
        PIN: "",
        gameHandle: "",
        maturityRating: kidCheckStatus ? "12+" : "18+",
        autoplayNext: true,
        autoplayPreviews: true,
        reduceAnimationsOnTV: false,
        dataUsage: "high",
        dataSharingOpted: false,
        notifications: [],
        movies: [],
        series: [],
        ratings: [],
      };

      const updatedUsers = [...users, newUser];

      setUsers(updatedUsers);
      navigate("/");
    } else {
      setIsNameValid(false);
    }
  }

  function abortCreatingNewAccount() {
    navigate("/");
  }

  return (
    <>
      <header>
        <h1>{t("addProfile")}</h1>
        <p>{t("addProfileDescription")}</p>
      </header>

      <Divider />

      <main>
        <img
          src={profileImage}
          alt={t("newAccountDescription")}
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="name"
            className="visually-hidden"
          >
            {t("enterName")}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={nameInputValue}
            ref={nameInputRef}
            placeholder={t("name")}
            autoFocus
            autoComplete="off"
            aria-invalid={!isNameValid}
            aria-errormessage="name-error-message"
            onChange={handleNameInputChange}
          />

          <input
            type="checkbox"
            name="isKid"
            id="isKid"
            checked={kidCheckStatus}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="isKid">{t("kid")}?</label>
          <span
            id="name-error-message"
            className={`${isNameValid ? "valid" : "invalid"}`}
            aria-live="assertive"
          >
            {nameInputValue === "" ? t("pleaseEnterName") : t("nameToLong")}
          </span>

          <Divider />

          <button onClick={createNewAccount}>{t("continue")}</button>
          <button onClick={abortCreatingNewAccount}>{t("cancel")}</button>
        </form>
      </main>
    </>
  );
}
