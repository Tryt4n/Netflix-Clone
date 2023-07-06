import { useContext, useRef } from "react";
import UserContext from "../../context/UserContext";

import { useTranslation } from "react-i18next";

import "./passwordConfirmation.scss";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

export default function PasswordConfirmation({ textDescription }) {
  const { t, i18n } = useTranslation();

  const {
    currentEditingProfile,
    isConfirmationPasswordValid,
    setIsConfirmationPasswordValid,
    passwordConfirmationPassed,
    setPasswordConfirmationPassed,
    resetPasswordConfirmationSettings,
  } = useContext(UserContext);

  const confirmationPasswordInputRef = useRef(null);

  function handleConfirmationOnKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (confirmationPasswordInputRef.current.value !== "") {
        setIsConfirmationPasswordValid(true);
        setPasswordConfirmationPassed(true);
      } else {
        setIsConfirmationPasswordValid(false);
      }
    }
  }

  function goNext() {
    if (confirmationPasswordInputRef.current.value === "") {
      setIsConfirmationPasswordValid(false);
    }

    if (confirmationPasswordInputRef.current.value !== "") {
      setIsConfirmationPasswordValid(true);
      setPasswordConfirmationPassed(true);
    }
  }

  return (
    <>
      {!passwordConfirmationPassed && (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <legend className="password-confirmation__subheading">
              {textDescription} {currentEditingProfile?.username}
              {i18n.language === "en" ? `'s ${t("profile")}` : ""}.
            </legend>

            <div className="password-confirmation__input-wrapper">
              <label
                htmlFor="confirmation-password"
                className="visually-hidden"
              >
                {t("passwordConfirmation")}
              </label>
              <input
                className={`password-confirmation__input${
                  !isConfirmationPasswordValid ? " invalid" : ""
                }`}
                type="password"
                name="confirmation-password"
                id="confirmation-password"
                ref={confirmationPasswordInputRef}
                required
                autoFocus
                aria-invalid={!isConfirmationPasswordValid}
                aria-errormessage="password-confirmation-error-text"
                onKeyDown={handleConfirmationOnKeyDown}
              />
              {!isConfirmationPasswordValid && (
                <span
                  id="password-confirmation-error-text"
                  className="password-confirmation__warning-message"
                  aria-live="assertive"
                >
                  {t("passwordRequired")}
                </span>
              )}
              <a
                href="#"
                className="password-confirmation__forgot-link"
              >
                {t("forgotPassword")}
              </a>
            </div>

            <div className="restriction-confirmation__buttons-container">
              <AccountSettingsBtn
                text={t("continue")}
                currentClass="accent"
                onClickFunction={goNext}
              />
              <AccountSettingsBtn
                text={t("cancel")}
                currentClass="light"
                path={"/account"}
                onClickFunction={resetPasswordConfirmationSettings}
              />
            </div>
          </form>
        </>
      )}
    </>
  );
}
