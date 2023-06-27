import { useContext, useRef, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import PasswordConfirmation from "../../layout/PasswordConfirmation/PasswordConfirmation";

import { useTranslation } from "react-i18next";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

import "./pinCodePage.scss";
import InfoIcon from "../../icons/InfoIcon";

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

  return (
    <>
      <header>
        <h2 className="visually-hidden">
          {`Profile Lock - ${
            passwordConfirmationPassed ? t("settings") : t("passwordConfirmation")
          }`}
        </h2>
        <NavbarShort />
      </header>
      <div className="restriction-confirmation">
        <main className="restriction-confirmation__content-container">
          <header className="restriction-confirmation__header">
            <h1 className="restriction-confirmation__heading">{t("profileLock")}</h1>
            <img
              className="restriction-confirmation__profile-img"
              src={currentEditingProfile?.profileImage}
              alt={`${t("profileAvatar")} ${currentEditingProfile?.username}`}
            />
          </header>
          <PasswordConfirmation textDescription={t("profileLockDescription")} />

          {passwordConfirmationPassed && (
            <>
              <section>
                <h2 className="restriction-confirmation__subheading">{t("lockThisProfile")}</h2>
                <form
                  onClick={() => {
                    setIsBtnDisabled(false);
                  }}
                >
                  <div className="pin-page__require-pin-code-wrapper">
                    <input
                      type="checkbox"
                      name="pin-checkbox"
                      id="pin-checkbox"
                      className="checkbox-light"
                      checked={isLockedUser}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="pin-checkbox"
                      className="checkbox-light-label pin-page__label"
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
                        <div className="pin-page__require-pin-code-wrapper">
                          <input
                            type="checkbox"
                            name="pin-checkbox-create-new-account"
                            id="pin-checkbox-create-new-account"
                            className="checkbox-light"
                            checked={requirePinForNewAccount}
                            onChange={() => setRequirePinForNewAccount(!requirePinForNewAccount)}
                          />
                          <label
                            htmlFor="pin-checkbox-create-new-account"
                            className="checkbox-light-label pin-page__label"
                          >
                            {t("require")} {currentEditingProfile.username}
                            {i18n.language === "en" ? `'s` : ","} {t("PINToAddNewProfiles")}.
                          </label>
                        </div>
                      )}
                    </>
                  )}
                </form>
              </section>

              <nav
                className="restriction-confirmation__buttons-container"
                aria-label={t("secondaryNavigation")}
              >
                <h2 className="visually-hidden">{t("secondaryNavigation")}</h2>
                <AccountSettingsBtn
                  text={t("save")}
                  currentClass="accent"
                  path={`${isBtnDisabled ? "" : "/account"}`}
                  isDisabled={isBtnDisabled}
                  onClickFunction={handleSave}
                />
                <AccountSettingsBtn
                  text={t("cancel")}
                  currentClass="light"
                  path={"/account"}
                  onClickFunction={() => {
                    resetPasswordConfirmationSettings();
                    setIsBtnDisabled(true);
                  }}
                />
              </nav>
            </>
          )}
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
