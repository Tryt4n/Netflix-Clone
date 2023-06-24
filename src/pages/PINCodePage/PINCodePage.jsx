import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import PasswordConfirmation from "../../layout/PasswordConfirmation/PasswordConfirmation";

import { useTranslation } from "react-i18next";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

export default function PINCodePage() {
  const { t } = useTranslation();

  const { currentEditingProfile, passwordConfirmationPassed, resetPasswordConfirmationSettings } =
    useContext(UserContext);

  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

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
            <h1 className="restriction-confirmation__heading">{t("viewingRestrictions")}</h1>
            <img
              className="restriction-confirmation__profile-img"
              src={currentEditingProfile?.profileImage}
              alt={`${t("profileAvatar")} ${currentEditingProfile?.username}`}
            />
          </header>
          <PasswordConfirmation
            textDescription={"Wprowadź hasło do konta, aby edytować blokadę profilu użytkownika"}
          />

          {passwordConfirmationPassed && (
            <>
              <section>
                <h2 className="restriction-confirmation__subheading">
                  Ustaw blokadę profilu, wybierając 4-cyfrowy kod PIN.
                </h2>
                <form
                  onClick={(e) => {
                    e.preventDefault();
                    setIsBtnDisabled(false);
                  }}
                >
                  <input
                    type="checkbox"
                    name="pin-checkbox"
                    id="pin-checkbox"
                  />
                  <label htmlFor="pin-checkbox">Żądaj podania kodu PIN do profilu Marcin.</label>
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
                  // onClickFunction={changeRestriction}
                  onClickFunction={() => {
                    resetPasswordConfirmationSettings();
                    setIsBtnDisabled(true);
                  }}
                />
                <AccountSettingsBtn
                  text={t("cancel")}
                  currentClass="light"
                  path={"/account"}
                  //   onClickFunction={resetPasswordConfirmationSettings}
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
