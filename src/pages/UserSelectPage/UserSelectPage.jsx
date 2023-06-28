import { Link } from "react-router-dom";

import "./userSelectPage.scss";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/UserContext";
import SelectProfilItem from "../../components/SelectProfilItem.jsx/SelectProfilItem";

import CloseIcon from "../../icons/CloseIcon";

import { useTranslation } from "react-i18next";

export default function UserSelectPage() {
  const { t } = useTranslation();

  const { users, currentEditingProfile, setCurrentEditingProfile } = useContext(UserContext);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isCorrectPIN, setIsCorrectPIN] = useState(true);

  const userRef = useRef(null);
  const lockModalRef = useRef(null);

  function openLockModal(userData) {
    setCurrentEditingProfile(userData);
    setTimeout(() => {
      lockModalRef.current.showModal();
    }, 100);
  }

  function closeLockModal() {
    lockModalRef.current.close();
    setCurrentEditingProfile("");
    setIsErrorVisible(false);
    setIsCorrectPIN(true);
  }

  function handleFormFocus() {
    if (lockModalRef.current !== null) {
      const inputs = Array.from(lockModalRef.current.getElementsByTagName("input"));
      const hasFocus = inputs.some((input) => input === document.activeElement);
      const hasEmptyValue = inputs.some((input) => !input.value);
      const isValid = inputs.every(
        (input, index) => input.value === currentEditingProfile.PIN[index]
      );

      setIsCorrectPIN(hasEmptyValue || isValid);
      setIsErrorVisible(!hasFocus && hasEmptyValue);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setIsErrorVisible(false);
    if (value.length === 1) {
      const inputs = Array.from(lockModalRef.current.getElementsByTagName("input"));
      const currentIndex = inputs.findIndex((input) => input.name === name);
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }
    }
  }

  function handleInputKeyDown(e) {
    const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Tab", "Backspace"];
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    const { name } = e.target;
    const inputs = Array.from(lockModalRef.current.getElementsByTagName("input"));
    if (lockModalRef.current == null) return;
    const currentIndex = inputs.findIndex((input) => input.name === name);
    if (e.key === "Backspace" && currentIndex > 0 && !inputs[currentIndex].value) {
      inputs[currentIndex - 1].focus();
    }
  }

  useEffect(() => {
    setCurrentEditingProfile("");
  }, []);

  const movies = [
    {
      name: "The Mother",
      watched: true,
      watchTime: 117,
      whenWatched: "27.06.2023",
    },
    {
      name: "Shrek",
      watched: false,
      watchTime: 32,
      whenWatched: "27.06.2023",
    },
  ];

  return (
    <main className="choose-profile">
      <h1 className="choose-profile__header">{t("whosWatching")}</h1>

      <ul
        className="choose-profile__list"
        aria-label="Choose Profile"
      >
        {users.map((user) => (
          <li
            key={user.id}
            ref={userRef}
            onClick={user.lock ? () => openLockModal(user) : null}
          >
            <SelectProfilItem user={user} />
          </li>
        ))}
      </ul>

      {currentEditingProfile.lock && (
        <dialog
          className="choose-profile__lock-modal"
          ref={lockModalRef}
          onKeyDown={(e) => (e.key === "Escape" ? closeLockModal() : null)}
          onFocus={handleFormFocus}
          onBlur={handleFormFocus}
        >
          <hgroup>
            <p className="choose-profile__lock-subheading">{t("LockON")}</p>
            <h2 className={`choose-profile__lock-heading${!isCorrectPIN ? " incorrect" : ""}`}>
              {isCorrectPIN ? t("enterPinHeading") : t("enterPinHeadingWrong")}
            </h2>
          </hgroup>
          <form
            className="choose-profile__lock-form"
            aria-errormessage="lock-modal-error-message"
          >
            <div className="choose-profile__pin-wrapper">
              <label
                htmlFor="first-digit"
                className="visually-hidden"
              >
                {t("enterFirstDigit")}
              </label>
              <input
                type="password"
                name="first-digit"
                id="first-digit"
                maxLength={1}
                onBlur={handleFormFocus}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                autoFocus
              />
              <label
                htmlFor="second-digit"
                className="visually-hidden"
              >
                {t("enterSecondDigit")}
              </label>
              <input
                type="password"
                name="second-digit"
                id="second-digit"
                maxLength={1}
                onBlur={handleFormFocus}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
              />
              <label
                htmlFor="third-digit"
                className="visually-hidden"
              >
                {t("enterThirdDigit")}
              </label>
              <input
                type="password"
                name="third-digit"
                id="third-digit"
                maxLength={1}
                onBlur={handleFormFocus}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
              />
              <label
                htmlFor="fourth-digit"
                className="visually-hidden"
              >
                {t("enterFourthDigit")}
              </label>
              <input
                type="password"
                name="fourth-digit"
                id="fourth-digit"
                maxLength={1}
                onBlur={handleFormFocus}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
              />
            </div>
            {isErrorVisible && (
              <p
                id="lock-modal-error-message"
                className="choose-profile__lock-error-message"
                aria-live="assertive"
              >
                {t("PINCodeErrorMessage")}
              </p>
            )}
          </form>
          <Link
            to={"/settings/lock"}
            className="choose-profile__forgot-link"
          >
            {t("forgotPIN")}
          </Link>
          <button
            className="choose-profile__lock-close-btn"
            onClick={() => closeLockModal()}
          >
            <CloseIcon />
            <span className="visually-hidden">{t("close")}</span>
          </button>
        </dialog>
      )}

      <Link
        to="/ManageProfiles"
        className="choose-profile__manage-profiles"
      >
        {t("manageProfiles")}
      </Link>
    </main>
  );
}
