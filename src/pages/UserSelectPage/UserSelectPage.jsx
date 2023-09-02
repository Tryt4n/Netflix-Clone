import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/UserContext";

import SelectProfilItem from "../../components/SelectProfilItem.jsx/SelectProfilItem";

import CloseIcon from "../../icons/CloseIcon";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./userSelectPage.scss";

export default function UserSelectPage() {
  const { t } = useTranslation();

  const { users, currentEditingProfile, setCurrentEditingProfile } = useContext(UserContext);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isCorrectPINMessage, setIsCorrectPINMessage] = useState(true);
  const [isCorrectPIN, setIsCorrectPIN] = useState(false);

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
    setIsCorrectPINMessage(true);
  }

  function handleFormFocus() {
    if (lockModalRef.current !== null) {
      const inputs = Array.from(lockModalRef.current.getElementsByTagName("input"));
      const hasFocus = inputs.some((input) => input === document.activeElement);
      const hasEmptyValue = inputs.some((input) => !input.value);
      const isValid = inputs.every(
        (input, index) => input.value === currentEditingProfile.PIN[index]
      );

      setIsCorrectPINMessage(hasEmptyValue || isValid);
      setIsCorrectPIN(isValid);
      setIsErrorVisible(!hasFocus && hasEmptyValue);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setIsErrorVisible(false);
    if (value.length === 1) {
      const inputs = Array.from(lockModalRef.current.getElementsByTagName("input"));
      const currentIndex = inputs.findIndex((input) => input.name === name);
      //* if PIN is correct input loses focus to redirect page
      if (inputs.length === 4) {
        inputs[1].focus();
        inputs[3].focus();
      }
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

  const navigate = useNavigate();
  const { setSelectedUser } = useContext(UserContext);
  function selectUser(user) {
    if (user.PIN === "") {
      setSelectedUser(user);
      navigate("/home");
    } else if (user.PIN !== "" && isCorrectPIN) {
      setSelectedUser(user);
      navigate("/home");
    }
  }

  useEffect(() => {
    setCurrentEditingProfile("");
  }, []);

  return (
    <main className="choose-profile">
      <h1 className="choose-profile__header">{t("whosWatching")}</h1>

      <ul
        className="choose-profile__list"
        aria-label="Choose Profile"
      >
        {users.map((user, index) => (
          <React.Fragment key={user.id}>
            <li
              key={user.id}
              ref={userRef}
              onClick={user.lock ? () => openLockModal(user) : null}
            >
              <SelectProfilItem
                user={user}
                isCorrectPIN={isCorrectPIN}
                selectUser={selectUser}
              />
            </li>

            {index === users.length - 1 && users.length < 5 && (
              <li>
                <SelectProfilItem
                  user={user}
                  isCorrectPIN={isCorrectPIN}
                  areAllUsers
                />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>

      {currentEditingProfile?.lock && (
        <dialog
          className="choose-profile__lock-modal"
          ref={lockModalRef}
          onKeyDown={(e) => (e.key === "Escape" ? closeLockModal() : null)}
          onFocus={handleFormFocus}
          onBlur={handleFormFocus}
        >
          <hgroup>
            <p className="choose-profile__lock-subheading">{t("LockON")}</p>
            <h2
              className={`choose-profile__lock-heading${!isCorrectPINMessage ? " incorrect" : ""}`}
            >
              {isCorrectPINMessage ? t("enterPinHeading") : t("enterPinHeadingWrong")}
            </h2>
          </hgroup>
          <form
            className="choose-profile__lock-form"
            aria-errormessage="lock-modal-error-message"
          >
            <div className="choose-profile__pin-wrapper">
              {[1, 2, 3, 4].map((index) => (
                <React.Fragment key={index}>
                  <label
                    htmlFor={`digit-${index}`}
                    className="visually-hidden"
                  >
                    {t(
                      `enter${
                        index === 1
                          ? "First"
                          : index === 2
                          ? "Second"
                          : index === 3
                          ? "Third"
                          : "Fourth"
                      }Digit`
                    )}
                  </label>
                  <input
                    type="password"
                    name={`digit-${index}`}
                    id={`digit-${index}`}
                    maxLength={1}
                    onBlur={handleFormFocus}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    autoFocus={index === 1}
                  />
                </React.Fragment>
              ))}
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
