import { useRef, useState } from "react";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import NavbarShort from "../../layout/NavbarShort/NavbarShort";

import "../PasswordConfirmationPage/passwordConfirmationPage.scss";

export default function PasswordConfirmationPage() {
  const [isConfirmationPasswordValid, setIsConfirmationPasswordValid] = useState(false);
  const confirmationPasswordInputRef = useRef(null);

  return (
    <div className="password-confirmation">
      <NavbarShort />

      <div className="password-confirmation__content-container">
        <header className="password-confirmation__header">
          <h1 className="password-confirmation__heading">Viewing Restrictions</h1>
          <img
            className="password-confirmation__profile-img"
            //? Change src and alt for current profile data
            src="/images/profiles/Classic/17.png"
            alt="Profile Avatar"
          />
        </header>
        <main>
          <h2 className="password-confirmation__text">
            Enter your account password to edit Profile Maturity Rating and Title Restrictions for{" "}
            {/* //? Change profile name */}
            Marcin's profile.
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
                Confirmation Password
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
                  Password is required.
                </span>
              )}
            </form>
            <a
              href="#"
              className="password-confirmation__forgot-link"
            >
              Forgot password?
            </a>
          </div>

          <div className="password-confirmation__buttons-container">
            {/* //? ADD LINKS */}
            <button
              className="password-confirmation__btn password-confirmation__btn--accent"
              onClick={() =>
                confirmationPasswordInputRef.current.value !== ""
                  ? setIsConfirmationPasswordValid(false)
                  : setIsConfirmationPasswordValid(true)
              }
            >
              Continue
            </button>
            <button className="password-confirmation__btn password-confirmation__btn--light">
              Cancel
            </button>
          </div>
        </main>
      </div>
      <AccountFooter />
    </div>
  );
}
