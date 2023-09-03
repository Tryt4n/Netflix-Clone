import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../../context/UserContext";
import useWindowSize from "../../hooks/useWindowSize";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Divider from "../../components/Divider/Divider";

import "./addNewProfilePage.scss";
import "../UserSelectPage/userSelectPage.scss";

export default function AddNewProfilePage() {
  const { t, i18n } = useTranslation();

  const { users, setUsers, languageCodes } = useContext(UserContext);

  const [nameInputValue, setNameInputValue] = useState("");
  const [kidCheckStatus, setKidCheckStatus] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const nameInputRef = useRef();

  const navigate = useNavigate();

  const { width } = useWindowSize();

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

  function handleCheckboxChangeOnEnter(e) {
    if (e.key === "Enter") {
      setKidCheckStatus(!kidCheckStatus);
    }
  }

  function createNewAccount() {
    if (nameInputValue !== "" && nameInputValue.length < 50) {
      const newUser = {
        id: crypto.randomUUID(),
        username: nameInputValue,
        profileImage: profileImage,
        kidsProfile: kidCheckStatus,
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
      <main className="choose-profile add-new-profile">
        <h1 className="choose-profile__header">{t("addProfile")}</h1>
        <p className="add-new-profile__subheader">{t("addProfileDescription")}</p>

        <Divider
          spaceSmall={width > 1024 ? false : true}
          customColor={"#333"}
        />

        <form
          className="add-new-profile__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="add-new-profile__img-wrapper">
            <img
              src={profileImage}
              alt={t("newAccountDescription")}
              className="add-new-profile__img"
            />
          </div>

          <div className="add-new-profile__wrapper">
            <div className="add-new-profile__inner-wrapper">
              <div>
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
                  className="add-new-profile__text-input"
                  value={nameInputValue}
                  ref={nameInputRef}
                  placeholder={t("name")}
                  autoFocus
                  autoComplete="off"
                  aria-invalid={!isNameValid}
                  aria-errormessage="name-error-message"
                  onChange={handleNameInputChange}
                />
              </div>
              <div className="add-new-profile__checkbox-tooltip-wrapper">
                <input
                  type="checkbox"
                  name="isKid"
                  id="isKid"
                  className="add-new-profile__checkbox-input"
                  checked={kidCheckStatus}
                  aria-describedby="checkbox-tooltip"
                  aria-haspopup="true"
                  aria-controls="checkbox-tooltip"
                  onChange={handleCheckboxChange}
                  onKeyDown={handleCheckboxChangeOnEnter}
                />
                <label htmlFor="isKid">{t("kid")}?</label>
                <span
                  id="checkbox-tooltip"
                  className="add-new-profile__checkbox-tooltip"
                >
                  {t("kidsTooltip")}
                </span>
              </div>
            </div>

            <span
              id="name-error-message"
              className={`add-new-profile__warning-info${isNameValid ? "" : " invalid"}`}
              aria-live="assertive"
            >
              {nameInputValue === "" ? t("pleaseEnterName") : t("nameToLong")}
            </span>
          </div>
        </form>

        <Divider
          spaceSmall={width > 1024 ? false : true}
          customColor={"#333"}
        />

        <div className="add-new-profile__btns-wrapper">
          <button
            className="add-new-profile__btn add-new-profile__btn--accent"
            onClick={createNewAccount}
          >
            {t("continue")}
          </button>
          <button
            className="add-new-profile__btn add-new-profile__btn--basic"
            onClick={abortCreatingNewAccount}
          >
            {t("cancel")}
          </button>
        </div>
      </main>
    </>
  );
}
