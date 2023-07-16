import { useContext, useRef, useState } from "react";
import UserContext from "../../context/UserContext";

import CommonAccountLayout from "../../layout/CommonAccountLayout/CommonAccountLayout";
import PasswordConfirmation from "../../layout/PasswordConfirmation/PasswordConfirmation";
import BtnsWrapperAccount from "../../layout/BtnsWrapperAccount/BtnsWrapperAccount";
import InfoIcon from "../../icons/InfoIcon";

import { useTranslation } from "react-i18next";
import "./pinCodePage.scss";
import CheckboxAccount from "../../components/CheckboxAccount/CheckboxAccount";

export default function PINCodePage() {
  const { t, i18n } = useTranslation();

  const {
    users,
    currentEditingProfile,
    passwordConfirmationPassed,
    resetPasswordConfirmationSettings,
    setUsers,
    setIsCurrentlySaved,
    setDisplayedSavedMessage,
  } = useContext(UserContext);

  const [isBtnDisabled, setIsBtnDisabled] = useState(currentEditingProfile.lock ? false : true);
  const [isLockedUser, setIsLockedUser] = useState(currentEditingProfile.lock);

  //* PIN CODE
  const [codePIN, setCodePIN] = useState(isLockedUser ? currentEditingProfile.PIN : "");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [requirePinForNewAccount, setRequirePinForNewAccount] = useState(
    users[0].requirePinToCreateAccount
  );
  ////////////////////////////////////////////////////////////////////////////////////////*

  const pinCodeRef = useRef(null);

  function handleInputChange() {
    setIsLockedUser(!isLockedUser);
  }

  function handleInputPin(e) {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    } else if (allowedKeys.includes(e.key) && isInputFocused) {
      if (e.key === "ArrowLeft" && selectedCharIndex > 0) {
        setSelectedCharIndex(selectedCharIndex - 1);
      } else if (e.key === "ArrowRight" && selectedCharIndex < codePIN.length - 1) {
        setSelectedCharIndex(selectedCharIndex + 1);
      } else if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Tab") {
        const newCodePIN = [...codePIN];
        newCodePIN[selectedCharIndex] = e.key;
        setCodePIN(newCodePIN.join(""));
        setSelectedCharIndex((selectedCharIndex + 1) % 4);

        if (newCodePIN.length === 4 && selectedCharIndex === 3) {
          pinCodeRef.current.blur();
          const nextElement = pinCodeRef.current.nextElementSibling;
          if (nextElement) {
            nextElement.focus();
          }
        }
      }
    }
  }

  function handleSave() {
    const updatedUsers = users.map((user) => {
      if (user.username === users[0].username && user.username === currentEditingProfile.username) {
        return {
          ...user,
          lock: isLockedUser,
          PIN: isLockedUser ? codePIN : "",
          requirePinToCreateAccount: requirePinForNewAccount,
        };
      } else if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          lock: isLockedUser,
          PIN: isLockedUser ? codePIN : "",
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setIsCurrentlySaved(true);
    setDisplayedSavedMessage(t("profileLockSaveMessage"));
    resetPasswordConfirmationSettings();
    setIsBtnDisabled(true);
    setIsErrorMessageVisible(false);
  }

  function reset() {
    resetPasswordConfirmationSettings();
    setIsBtnDisabled(true);
  }

  return (
    <CommonAccountLayout
      pageTitle={`Profile Lock - ${
        passwordConfirmationPassed ? t("settings") : t("passwordConfirmation")
      }`}
      sectionTitle={t("profileLock")}
    >
      <PasswordConfirmation textDescription={t("profileLockDescription")} />

      {passwordConfirmationPassed && (
        <form className="pin-page">
          <legend className="restriction-confirmation__subheading">{t("lockThisProfile")}</legend>
          <div
            className="pin-page__require-pin-code-wrapper"
            onClick={() => {
              setIsBtnDisabled(false);
            }}
          >
            <input
              type="checkbox"
              name="pin-checkbox"
              id="pin-checkbox"
              className="checkbox-account"
              checked={isLockedUser}
              onChange={handleInputChange}
            />
            <label
              htmlFor="pin-checkbox"
              className="pin-page__label"
            >
              {t("requirePIN")} {currentEditingProfile?.username}
              {i18n.language === "en" ? `'s ${t("profile")}` : ""}.
              <span
                className="pin-page__require-pin-code-tooltip"
                aria-label={t("requirePINTooltip")}
              >
                <InfoIcon />
              </span>
            </label>
          </div>

          {isLockedUser && (
            <>
              <div className="visually-hidden">
                <label htmlFor="pin-code">{t("enterPINCode")}</label>
                <input
                  type="tel"
                  name="pin-code"
                  id="pin-code"
                  maxLength={4}
                  pattern="[0-9]*"
                  autoComplete="off"
                  value={codePIN}
                  aria-errormessage="pin-code-error-message"
                  ref={pinCodeRef}
                  onChange={(e) => e.preventDefault()}
                  onKeyDown={handleInputPin}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => {
                    setIsInputFocused(false);
                    setIsErrorMessageVisible(true);
                  }}
                />
              </div>
              <div
                className="pin-page__characters-container"
                aria-live="polite"
                onClick={() => pinCodeRef.current.focus()}
              >
                <span
                  className={`pin-page__character${
                    (codePIN.length === 0 || selectedCharIndex === 0) && isInputFocused
                      ? " focus"
                      : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => setSelectedCharIndex(0)}
                >
                  {codePIN.charAt(0)}
                </span>
                <span
                  className={`pin-page__character${
                    (codePIN.length === 1 || selectedCharIndex === 1) && isInputFocused
                      ? " focus"
                      : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => setSelectedCharIndex(1)}
                >
                  {codePIN.charAt(1)}
                </span>
                <span
                  className={`pin-page__character${
                    (codePIN.length === 2 || selectedCharIndex === 2) && isInputFocused
                      ? " focus"
                      : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => setSelectedCharIndex(2)}
                >
                  {codePIN.charAt(2)}
                </span>
                <span
                  className={`pin-page__character${
                    (codePIN.length === 3 || selectedCharIndex === 3) && isInputFocused
                      ? " focus"
                      : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => setSelectedCharIndex(3)}
                >
                  {codePIN.charAt(3)}
                </span>
              </div>
              <p
                id="pin-code-error-message"
                className={`pin-page__error-message${
                  isErrorMessageVisible && codePIN.length < 4 ? " visible" : ""
                }`}
                aria-live="assertive"
              >
                {t("PINCodeErrorMessage")}
              </p>

              {currentEditingProfile.username === users[0].username && (
                <CheckboxAccount
                  name="pin-checkbox-create-new-account"
                  text={`${t("require")} ${currentEditingProfile.username}${
                    i18n.language === "en" ? `'s` : ","
                  } ${t("PINToAddNewProfiles")}`}
                  onChangeFunction={() => setRequirePinForNewAccount(!requirePinForNewAccount)}
                />
              )}
            </>
          )}

          <BtnsWrapperAccount
            btnAccentText={t("save")}
            btnAccentPath={`${isBtnDisabled ? "" : "/account"}`}
            btnAccentFunction={handleSave}
            btnLightText={t("cancel")}
            btnLightPath="/account"
            btnLightFunction={reset}
            disabled
            center
            extraSpace
          />
        </form>
      )}
    </CommonAccountLayout>
  );
}
