import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import { useTranslation } from "react-i18next";
import "./communicationPage.scss";

export default function PlaybackPage() {
  const { t } = useTranslation();

  const { users, setUsers, setIsCurrentlySaved, setDisplayedSavedMessage } =
    useContext(UserContext);

  const user = users[0];
  const accountPreferences = user.accountData;
  const emailPreferences = user.accountData.emailCommunication;
  const phonePreferences = user.accountData.phoneCommunication;

  const [accountCommunicationPreferences, setAccountCommunicationPreferences] = useState({
    emailCommunication: {
      updates: emailPreferences.updates,
      now: emailPreferences.now,
      offers: emailPreferences.offers,
      surveys: emailPreferences.surveys,
      kidsFamily: emailPreferences.kidsFamily,
    },
    phoneCommunication: {
      accountMessages: phonePreferences.accountMessages,
      informations: phonePreferences.informations,
    },
  });

  function changeCheckboxStatus(propertyName, phone) {
    setAccountCommunicationPreferences((prevState) => {
      if (phone) {
        return {
          ...prevState,
          phoneCommunication: {
            ...prevState.phoneCommunication,
            [propertyName]: !prevState.phoneCommunication[propertyName],
          },
        };
      } else {
        return {
          ...prevState,
          emailCommunication: {
            ...prevState.emailCommunication,
            [propertyName]: !prevState.emailCommunication[propertyName],
          },
        };
      }
    });
  }

  function resetCheckboxStatus() {
    setAccountCommunicationPreferences((prevState) => {
      const resetEmailCommunication = Object.keys(prevState.emailCommunication).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      );

      const resetPhoneCommunication = Object.keys(prevState.phoneCommunication).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      );

      return {
        emailCommunication: resetEmailCommunication,
        phoneCommunication: resetPhoneCommunication,
      };
    });
  }

  function handleSave() {
    const updatedAccountData = {
      ...user.accountData,
      emailCommunication: {
        ...user.accountData.emailCommunication,
        ...accountCommunicationPreferences.emailCommunication,
      },
      phoneCommunication: {
        ...user.accountData.phoneCommunication,
        ...accountCommunicationPreferences.phoneCommunication,
      },
    };

    const updatedUser = {
      ...user,
      accountData: updatedAccountData,
    };

    const updatedUsers = users.map((u) => (u.username === user.username ? updatedUser : u));

    setUsers(updatedUsers);
    setIsCurrentlySaved(true);
    setDisplayedSavedMessage(t("communicationSavedMessage"));
  }

  return (
    <>
      <header>
        <h1 className="visually-hidden">
          {t("settings")} - {t("communication")}
        </h1>
        <NavbarShort />
      </header>

      <div className="communication settings-wrapper">
        <main className="settings-container">
          <header className="subtitles__header">
            <h2 className="subtitles__heading">{t("communicationSettings")}</h2>
            <img
              className="language-change__profile-img"
              src={user.profileImage}
              alt={`${t("profileAvatar")} ${user.kidsProfile ? t("Kids") : user.username} `}
            />
          </header>

          <form>
            <fieldset>
              <legend>
                <div className="communication__legend-heading">
                  {t("emailMessages")} {user.username}
                </div>
                <div className="communication__legend-subheading">
                  {t("emailAddress")} {accountPreferences.email}
                </div>
              </legend>
              <div className="communication__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="updates"
                  id="updates"
                  className="checkbox-light"
                  checked={accountCommunicationPreferences.emailCommunication.updates}
                  onChange={() => changeCheckboxStatus("updates")}
                />
                <label
                  htmlFor="updates"
                  className="checkbox-light-label communication__label-wrapper"
                >
                  <span>{t("netflixUpdates")}</span>
                  <small>{t("netflixUpdatesDescription")}</small>
                </label>
              </div>
              <div className="communication__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="now"
                  id="now"
                  className="checkbox-light"
                  checked={accountCommunicationPreferences.emailCommunication.now}
                  onChange={() => changeCheckboxStatus("now")}
                />
                <label
                  htmlFor="now"
                  className="checkbox-light-label communication__label-wrapper"
                >
                  <span>{t("nowOnNetflix")}</span>
                  <small>{t("nowOnNetflixDescription")}</small>
                </label>
              </div>
              <div className="communication__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="offers"
                  id="offers"
                  className="checkbox-light"
                  checked={accountCommunicationPreferences.emailCommunication.offers}
                  onChange={() => changeCheckboxStatus("offers")}
                />
                <label
                  htmlFor="offers"
                  className="checkbox-light-label communication__label-wrapper"
                >
                  <span>{t("netflixOffers")}</span>
                  <small>{t("netflixOffersDescription")}</small>
                </label>
              </div>
              <div className="communication__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="surveys"
                  id="surveys"
                  className="checkbox-light"
                  checked={accountCommunicationPreferences.emailCommunication.surveys}
                  onChange={() => changeCheckboxStatus("surveys")}
                />
                <label
                  htmlFor="surveys"
                  className="checkbox-light-label communication__label-wrapper"
                >
                  <span>{t("netflixSurveys")}</span>
                  <small>{t("netflixSurveysDescription")}</small>
                </label>
              </div>
              <div className="communication__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="kids-family"
                  id="kids-family"
                  className="checkbox-light"
                  checked={accountCommunicationPreferences.emailCommunication.kidsFamily}
                  onChange={() => changeCheckboxStatus("kidsFamily")}
                />
                <label
                  htmlFor="kids-family"
                  className="checkbox-light-label communication__label-wrapper"
                >
                  <span>{t("netflixKidsFamily")}</span>
                  <small>{t("netflixKidsFamilyDescription")}</small>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <div className="communication__legend-heading">
                  {t("textMessagesFor")} {user.username}
                </div>
                <div className="communication__legend-subheading">
                  {t("phoneNumber2")} {accountPreferences.phoneNumber}
                </div>
              </legend>
              <div className="communication__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="account-messages"
                  id="account-messages"
                  className="checkbox-light"
                  checked={accountCommunicationPreferences.phoneCommunication.accountMessages}
                  onChange={() => changeCheckboxStatus("accountMessages", true)}
                />
                <label
                  htmlFor="account-messages"
                  className="checkbox-light-label communication__label-wrapper"
                >
                  <span>{t("accountMessages")}</span>
                  <small>{t("accountMessagesDescription")}</small>
                </label>
              </div>
              <div className="communication__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="informations"
                  id="informations"
                  className="checkbox-light"
                  checked={accountCommunicationPreferences.phoneCommunication.informations}
                  onChange={() => changeCheckboxStatus("informations", true)}
                />
                <label
                  htmlFor="informations"
                  className="checkbox-light-label communication__label-wrapper"
                >
                  <span>{t("netflixInformations")}</span>
                  <small>{t("netflixInformationsDescription")}</small>
                </label>
              </div>
            </fieldset>

            <hr className="communication__divider" />

            <div>
              <div
                className="communication__checkbox-wrapper"
                aria-labelledby="checkbox-label"
              >
                <input
                  type="checkbox"
                  name="not-send"
                  id="not-send"
                  className="checkbox-light"
                  aria-describedby="additional-info"
                  checked={
                    Object.values(accountCommunicationPreferences.emailCommunication).every(
                      (value) => !value
                    ) &&
                    Object.values(accountCommunicationPreferences.phoneCommunication).every(
                      (value) => !value
                    )
                  }
                  onChange={resetCheckboxStatus}
                />
                <label
                  htmlFor="not-send"
                  className="checkbox-light-label communication__label-wrapper"
                >
                  {t("noneOffer")}
                </label>
              </div>
              <em
                id="additional-info"
                className="communication__note-text"
              >
                {t("noneOfferNote")}
              </em>
            </div>

            <div className="communication__btns-wrapper">
              <AccountSettingsBtn
                text={t("update")}
                currentClass="accent"
                path={"/account"}
                onClickFunction={handleSave}
              />

              <AccountSettingsBtn
                text={t("cancel")}
                currentClass="light"
                path={"/account"}
              />
            </div>
          </form>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
