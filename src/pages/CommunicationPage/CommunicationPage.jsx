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
    setDisplayedSavedMessage("Communication settings saved.");
  }

  return (
    <>
      <header>
        <h1 className="visually-hidden">{t("settings")} - Communication</h1>
        <NavbarShort />
      </header>

      <div className="settings-wrapper">
        <main className="settings-container">
          <header className="subtitles__header">
            <h2 className="subtitles__heading">Communication Settings</h2>
            <img
              className="language-change__profile-img"
              src={user.profileImage}
              alt={`${t("profileAvatar")} ${user.kidsProfile ? t("Kids") : user.username} `}
            />
          </header>

          <form>
            <fieldset>
              <h3>Email Messages for {user.username}</h3>
              <legend>Email address: {accountPreferences.email}</legend>
              <div>
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
                  className="checkbox-light-label"
                >
                  <span>Netflix Updates</span>
                  <small>
                    New and enhanced features and tips for getting the most out of the Netflix
                    service.
                  </small>
                </label>
              </div>
              <div>
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
                  className="checkbox-light-label"
                >
                  <span>Now on Netflix</span>
                  <small>
                    Newly added movies, TV shows, and seasons plus personalized suggestions and
                    alerts.
                  </small>
                </label>
              </div>
              <div>
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
                  className="checkbox-light-label"
                >
                  <span>Netflix Offers</span>
                  <small>Receive special offers and promotions from Netflix.</small>
                </label>
              </div>
              <div>
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
                  className="checkbox-light-label"
                >
                  <span>Netflix Surveys</span>
                  <small>
                    Make your opinions heard! Give us feedback on how to make Netflix a better
                    product for you.
                  </small>
                </label>
              </div>
              <div>
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
                  className="checkbox-light-label"
                >
                  <span>Netflix Kids & Family</span>
                  <small>
                    Get updates about parental controls, kids activity, recommendations and more.
                  </small>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <h3>Text Messages for {user.username}</h3>
              <legend>Phone number: {accountPreferences.phoneNumber}</legend>
              <div>
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
                  className="checkbox-light-label"
                >
                  <span>Account Messages</span>
                  <small>Important messages related to your account and biling.</small>
                </label>
              </div>
              <div>
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
                  className="checkbox-light-label"
                >
                  <span>Netflix Information</span>
                  <small>
                    Updates and information from Netflix including newly added TV shows and movies
                    and offers.
                  </small>
                </label>
              </div>
            </fieldset>

            <hr />

            <div>
              <div>
                <input
                  type="checkbox"
                  name="not-send"
                  id="not-send"
                  className="checkbox-light"
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
                  className="checkbox-light-label"
                >
                  Do not send me any emails or text messages.
                </label>
              </div>
              <em>Note: You will always receive transactional email related to your account.</em>
            </div>

            <div className="playback__btns-wrapper">
              <AccountSettingsBtn
                // text={t("update")}
                text="Update"
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
