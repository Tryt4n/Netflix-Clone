import { useContext, useRef } from "react";
import UserContext from "../../context/UserContext";

import { useTranslation } from "react-i18next";
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
          <section>
            <h2 className="restriction-confirmation__password-subheading">
              {textDescription} {currentEditingProfile?.username}
              {i18n.language === "en" ? `'s ${t("profile")}` : ""}.
            </h2>

            <div className="restriction-confirmation__input-wrapper">
              <form
                className="restriction-confirmation__password-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <label
                  htmlFor="confirmation-password"
                  className="visually-hidden"
                >
                  {t("passwordConfirmation")}
                </label>
                <input
                  className={`restriction-confirmation__password-input${
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
                    className="restriction-confirmation__password-warning-message"
                    aria-live="assertive"
                  >
                    {t("passwordRequired")}
                  </span>
                )}
              </form>
              <a
                href="#"
                className="restriction-confirmation__password-forgot-link"
              >
                {t("forgotPassword")}
              </a>
            </div>
          </section>

          <nav
            className="restriction-confirmation__buttons-container"
            aria-label={t("secondaryNavigation")}
          >
            <h2 className="visually-hidden">{t("secondaryNavigation")}</h2>
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
          </nav>
        </>
      )}
    </>
  );
}
