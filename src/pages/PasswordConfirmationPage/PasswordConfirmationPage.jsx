import { useContext, useRef, useState } from "react";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import NavbarShort from "../../layout/NavbarShort/NavbarShort";

import UserContext from "../../context/UserContext";

import "./passwordConfirmationPage.scss";
import { useTranslation } from "react-i18next";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

export default function PasswordConfirmationPage() {
  const { t, i18n } = useTranslation();

  const { currentEditingProfile } = useContext(UserContext);

  const [isConfirmationPasswordValid, setIsConfirmationPasswordValid] = useState(false);
  const confirmationPasswordInputRef = useRef(null);

  function goNext() {
    confirmationPasswordInputRef.current.value !== ""
      ? setIsConfirmationPasswordValid(false)
      : setIsConfirmationPasswordValid(true);
  }

  return (
    <div className="password-confirmation">
      <NavbarShort />

      <div className="password-confirmation__content-container">
        <header className="password-confirmation__header">
          <h1 className="password-confirmation__heading">{t("viewingRestrictions")}</h1>
          <img
            className="password-confirmation__profile-img"
            src={currentEditingProfile.profilImage}
            alt={`${currentEditingProfile.username} ${t("profileAvatar")}`}
          />
        </header>
        <main>
          <h2 className="password-confirmation__text">
            {t("viewingRestrictionsDescription")} {currentEditingProfile.username}
            {i18n.language === "en" ? `'s ${t("profile")}` : ""}.
          </h2>

          <div className="password-confirmation__input-wrapper">
            <form
              className="password-confirmation__form"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="confirmation-password"
                className="visually-hidden"
              >
                {t("passwordConfirmation")}
              </label>
              <input
                className={`password-confirmation__password-input${
                  isConfirmationPasswordValid ? " invalid" : ""
                }`}
                type="password"
                name="confirmation-password"
                id="confirmation-password"
                ref={confirmationPasswordInputRef}
                required
                aria-invalid={isConfirmationPasswordValid}
                aria-errormessage="password-confirmation-error-text"
              />
              {isConfirmationPasswordValid && (
                <span
                  id="password-confirmation-error-text"
                  className="password-confirmation__warning-message"
                  aria-live="assertive"
                >
                  {t("passwordRequired")}
                </span>
              )}
            </form>
            <a
              href="#"
              className="password-confirmation__forgot-link"
            >
              {t("forgotPassword")}
            </a>
          </div>

          <div className="password-confirmation__buttons-container">
            {/* //? ADD LINKS */}
            <AccountSettingsBtn
              text={t("continue")}
              currentClass="accent"
              onClickFunction={goNext}
            />
            <AccountSettingsBtn
              text={t("cancel")}
              currentClass="light"
            />
          </div>
        </main>
      </div>
      <AccountFooter />
    </div>
  );
}
