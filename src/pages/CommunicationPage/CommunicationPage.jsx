import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import CheckboxAccount from "../../components/CheckboxAccount/CheckboxAccount";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import { useTranslation } from "react-i18next";
import "./communicationPage.scss";
import Divider from "../../components/Divider/Divider";

export default function CommunicationPage() {
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
      const communicationType = phone ? "phoneCommunication" : "emailCommunication";
      const communication = prevState[communicationType];

      return {
        ...prevState,
        [communicationType]: {
          ...communication,
          [propertyName]: !communication[propertyName],
        },
      };
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

          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>
                <div className="communication__legend-heading">
                  {t("emailMessages")} {user.username}
                </div>
                <div className="communication__legend-subheading">
                  {t("emailAddress")} {accountPreferences.email}
                </div>
              </legend>
              <CheckboxAccount
                name="updates"
                checked={accountCommunicationPreferences.emailCommunication.updates}
                onChangeFunction={changeCheckboxStatus}
                text={t("netflixUpdates")}
                textSmall={t("netflixUpdatesDescription")}
              />

              <CheckboxAccount
                name="now"
                checked={accountCommunicationPreferences.emailCommunication.now}
                onChangeFunction={changeCheckboxStatus}
                text={t("nowOnNetflix")}
                textSmall={t("nowOnNetflixDescription")}
              />

              <CheckboxAccount
                name="offers"
                checked={accountCommunicationPreferences.emailCommunication.offers}
                onChangeFunction={changeCheckboxStatus}
                text={t("netflixOffers")}
                textSmall={t("netflixOffersDescription")}
              />

              <CheckboxAccount
                name="surveys"
                checked={accountCommunicationPreferences.emailCommunication.surveys}
                onChangeFunction={changeCheckboxStatus}
                text={t("netflixSurveys")}
                textSmall={t("netflixSurveysDescription")}
              />

              <CheckboxAccount
                name="kids-family"
                checked={accountCommunicationPreferences.emailCommunication.kidsFamily}
                onChangeFunction={changeCheckboxStatus}
                text={t("netflixKidsFamily")}
                textSmall={t("netflixKidsFamilyDescription")}
              />
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
              <CheckboxAccount
                name="account-messages"
                checked={accountCommunicationPreferences.phoneCommunication.accountMessages}
                onChangeFunction={changeCheckboxStatus}
                text={t("accountMessages")}
                textSmall={t("accountMessagesDescription")}
                trueValue={true}
              />

              <CheckboxAccount
                name="informations"
                checked={accountCommunicationPreferences.phoneCommunication.informations}
                onChangeFunction={changeCheckboxStatus}
                text={t("netflixInformations")}
                textSmall={t("netflixInformationsDescription")}
                trueValue={true}
              />
            </fieldset>

            <Divider />

            <div>
              <CheckboxAccount
                name="not-send"
                checked={
                  Object.values(accountCommunicationPreferences.emailCommunication).every(
                    (value) => !value
                  ) &&
                  Object.values(accountCommunicationPreferences.phoneCommunication).every(
                    (value) => !value
                  )
                }
                onChangeFunction={resetCheckboxStatus}
                text={t("noneOffer")}
              />
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
