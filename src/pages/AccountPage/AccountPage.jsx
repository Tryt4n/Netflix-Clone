import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import "moment/locale/pl";

import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import MemberSinceIcon from "../../icons/MemberSinceIcon";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import Divider from "../../components/Divider/Divider";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import CheckboxLight from "../../components/CheckboxLight/CheckboxLight";
import NewBadge from "./components/NewBadge";

import CheckIcon from "../../icons/CheckIcon";
import UltraHDIcon from "../../icons/UltraHDIcon";
import ChevronDown from "../../icons/ChevronDown";
import PadlockIcon from "../../icons/PadlockIcon";

import "./accountPage.scss";

export default function AccountPage() {
  const { t, i18n } = useTranslation();

  const {
    users,
    setCurrentEditingProfile,
    isCurrentlySaved,
    setIsCurrentlySaved,
    displayedSavedMessage,
    setWatchingActivity,
  } = useContext(UserContext);

  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [displayMessage, setDisplayMessage] = useState(false);

  function expandUser(index) {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  }

  const nextBillingDate = moment().startOf("month").add(1, "month");

  function formattedDate() {
    if (i18n.language === "pl") {
      return nextBillingDate.format("D MMMM YYYY");
    } else {
      return nextBillingDate.format("MMMM D, YYYY");
    }
  }

  useEffect(() => {
    if (i18n.language === "pl") {
      moment.locale("pl");
    } else {
      moment.locale("en");
    }
  }, [i18n.language]);

  //* Displaying saving message only on save
  useEffect(() => {
    setTimeout(() => {
      setIsCurrentlySaved(false);
    }, 1000);
  }, []);
  useEffect(() => {
    if (isCurrentlySaved) {
      setDisplayMessage(true);
    }
  }, []);
  //////////////////////////////////////////*

  return (
    <>
      <header>
        <h1 className="visually-hidden">
          {t("account")} - {t("settings")}
        </h1>
        <NavbarShort />
      </header>

      <div className="account">
        <main className="settings-container">
          <div className="account__heading-wrapper">
            <h2 className="account__main-heading">{t("account")}</h2>
            <div className="account__heading-member-container">
              <MemberSinceIcon />
              <span>{t("memberSince")}</span>
            </div>
          </div>
          {displayMessage && (
            <div className="account__heading-restrictions-saved">
              <CheckIcon />
              <span>{displayedSavedMessage}</span>
            </div>
          )}
          <Divider
            customColor={"hsl(0,0%,50%)"}
            spaceSmall
          />
          <article className="account__article-membership-billing">
            <header className="account__article-header">
              <h2 className="account__article-header-heading">{t("membershipBiling")}</h2>
              <AccountSettingsBtn
                text={t("cancelMembership")}
                currentClass={"light"}
              />
            </header>
            <div className="account__article-sections-wrapper">
              <section className="account__article-section">
                <h2 className="visually-hidden">{t("basicAccountInformation")}</h2>
                <div>
                  <strong className="account__article-email-text">
                    {users[0].accountData.email}
                  </strong>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("change")} {t("email")}
                  </a>
                </div>
                <div>
                  <span className="account__article-text--accent account__article-text--capitalize">
                    {t("password")}: ********
                  </span>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("change")} {t("password")}
                  </a>
                </div>
                <div>
                  <span className="account__article-text--accent account__article-text--capitalize">
                    {i18n.language === "pl" ? t("phone") : t("phoneNumber")}:{" "}
                    {users[0].accountData.phoneNumber}
                  </span>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("change")} {t("phoneNumber")}
                  </a>
                </div>
              </section>

              <Divider
                customColor={"hsl(0,0%,50%)"}
                spaceSmall
              />

              <section className="account__article-section">
                <h2 className="visually-hidden">{t("paymentAccountInformation")}</h2>
                <div>
                  <div className="account__article-section-card-information-wrapper">
                    <img
                      src="/images/icons/VISA.png"
                      alt="visa logo"
                    />
                    <strong>•••• •••• •••• 1111</strong>
                  </div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("managePaymentInfo")}
                  </a>
                </div>
                <div>
                  <span>
                    {t("nextBilingDateDescription")} {formattedDate()}.
                  </span>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("backupPayment")}
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("bilingDetails")}
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("change")} {t("bilingDay")}
                  </a>
                </div>
              </section>

              <Divider
                customColor={"hsl(0,0%,50%)"}
                spaceSmall
              />

              <section className="account__article-section">
                <h2 className="visually-hidden">{t("giftCardInformations")}</h2>
                <div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("reedemGiftCard")}
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("whereToBuyGiftCards")}
                  </a>
                </div>
              </section>
            </div>
          </article>

          <Divider
            customColor={"hsl(0,0%,50%)"}
            spaceSmall
          />

          <article className="account__article">
            <header className="account__article-header-heading">
              <h2 className="account__article-header-heading">{t("planDetails")}</h2>
            </header>
            <section className="account__section-wrapper">
              <h2 className="visually-hidden">{t("chosenPlan")}</h2>
              <div className="account__plan-wrapper">
                <strong>{t("premium")}</strong>
                <UltraHDIcon />
              </div>
              <div className="account__article-links-wrapper">
                <a
                  href="#"
                  className="account__article-link"
                >
                  {t("change")} {t("plan")}
                </a>
              </div>
            </section>
          </article>

          <Divider
            customColor={"hsl(0,0%,50%)"}
            spaceSmall
          />

          <article className="account__article">
            <header className="account__article-header-heading">
              <h2 className="account__article-header-heading">{t("securityPrivacy")}</h2>
            </header>
            <section className="account__section-wrapper">
              <h2 className="visually-hidden">{t("securityAndPrivacy")}</h2>
              <p className="account__section-text">{t("securityPrivacyDescription")}</p>
              <div className="account__article-links-wrapper">
                <a
                  href="#"
                  className="account__article-link"
                >
                  <NewBadge />
                  <span>{t("manageAccess")}</span>
                </a>
                <a
                  href="#"
                  className="account__article-link"
                >
                  {t("signOutDevices")}
                </a>
              </div>
            </section>
          </article>

          <Divider
            customColor={"hsl(0,0%,50%)"}
            spaceSmall
          />

          <article className="account__article">
            <header className="account__article-header-heading">
              <h2 className="account__article-header-heading">
                {t("extraMembers")} {""}
                <NewBadge accent />
              </h2>
            </header>
            <section className="account__section-wrapper">
              <h2 className="visually-hidden">{t("extraMembers")}</h2>
              <p className="account__section-text">
                {t("extraMembersDescription")}&nbsp;
                <a href="#">{t("helpCenter")}</a>.
              </p>
              <div className="account__article-links-wrapper">
                <a
                  href="#"
                  className="account__article-link"
                >
                  {t("buyMemberSlot")}
                </a>
              </div>
            </section>
          </article>

          <Divider
            customColor={"hsl(0,0%,50%)"}
            spaceSmall
          />

          <article className="account__article">
            <header className="account__article-header-heading">
              <h2 className="account__article-header-heading">{t("parentalControls")}</h2>
            </header>
            <div className="account__profiles-wrapper">
              {users.map((user, index) => {
                const isProfileExpanded = expandedIndexes.includes(index);

                return (
                  <React.Fragment key={user.id}>
                    <section>
                      <div
                        className="account__profile-section"
                        onClick={() => expandUser(index)}
                      >
                        <img
                          className="account__profile-img"
                          src={user.profileImage}
                          alt={`${t("profileAvatar")} ${
                            user.kidsProfile ? t("Kids") : user.username
                          } `}
                        />
                        <div className="account__profile-heading-wrapper">
                          <h2 className="account__profile-heading account__profile-heading--bold">
                            {user.kidsProfile ? t("Kids") : user.username}
                          </h2>
                          <p
                            className={`account__profile-heading-description${
                              user.maturityRating !== "all" && user.maturityRating !== "18+"
                                ? " account__profile-heading-description--lowercase"
                                : ""
                            }`}
                          >
                            {user.maturityRating === "all"
                              ? t("all")
                              : user.maturityRating === "18+"
                              ? t("allMaturityRatings")
                              : i18n.language === "pl"
                              ? `${user.maturityRating} ${t("andYounger")}`
                              : `${user.maturityRating} ${t("andBelow")}`}
                          </p>
                        </div>
                        <button
                          className={`account__profile-btn${isProfileExpanded ? " expanded" : ""}`}
                          aria-label={t("expandProfileMenu")}
                          aria-controls={`account-profile-list-${user.id}`}
                          onClick={() => expandUser(index)}
                        >
                          {user.lock && <PadlockIcon />}
                          <ChevronDown
                            label={isProfileExpanded ? t("chevronOpenLabel") : t("chevronLabel")}
                          />
                        </button>
                      </div>

                      {isProfileExpanded && <hr className="divider" />}

                      <div
                        className={`account__profiles-list${isProfileExpanded ? " expanded" : ""}`}
                      >
                        <ul
                          id={`account-profile-list-${user.id}`}
                          aria-expanded={isProfileExpanded}
                        >
                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/settings/language"}
                              className="account__profile-list-item"
                              onClick={() => setCurrentEditingProfile(user)}
                            >
                              <div>
                                <h3 className="account__profile-heading">{t("language")}</h3>
                                <em className="account__profile-heading-description">
                                  {user.language}
                                </em>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </Link>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/settings/viewing-restriction"}
                              className="account__profile-list-item"
                              onClick={() => setCurrentEditingProfile(user)}
                            >
                              <div>
                                <h3 className="account__profile-heading">
                                  {t("viewingRestrictions")}
                                </h3>
                                <em className="account__profile-heading-description account__profile-heading-description--lowercase">
                                  {user.maturityRating === "all"
                                    ? t("all")
                                    : user.maturityRating === "18+"
                                    ? t("noRestriction")
                                    : i18n.language === "pl"
                                    ? `${user.maturityRating} ${t("andYounger")}`
                                    : `${user.maturityRating} ${t("andBelow")}`}
                                </em>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </Link>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/settings/lock"}
                              className="account__profile-list-item"
                              onClick={() => setCurrentEditingProfile(user)}
                            >
                              <div>
                                <h3 className="account__profile-heading">{t("profileLock")}</h3>
                                <em className="account__profile-heading-description">
                                  {user.lock ? t("on") : t("off")}
                                </em>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </Link>
                          </li>
                          {!user.kidsProfile && (
                            <li className="account__profile-list-item-wrapper">
                              <a
                                href="#"
                                className="account__profile-list-item"
                              >
                                <div>
                                  <h3 className="account__profile-heading">
                                    {t("transferProfile")}
                                    <NewBadge />
                                  </h3>
                                </div>
                                <span className="account__profile-accent-text">
                                  {t("transfer")}
                                </span>
                              </a>
                            </li>
                          )}
                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/settings/viewed"}
                              className="account__profile-list-item"
                              onClick={() => {
                                setCurrentEditingProfile(user);
                                setWatchingActivity("watching");
                              }}
                            >
                              <div>
                                <h3 className="account__profile-heading">{t("viewingActivity")}</h3>
                              </div>
                              <span className="account__profile-accent-text">{t("view")}</span>
                            </Link>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/settings/viewed"}
                              className="account__profile-list-item"
                              onClick={() => {
                                setCurrentEditingProfile(user);
                                setWatchingActivity("rating");
                              }}
                            >
                              <div>
                                <h3 className="account__profile-heading">{t("ratings")}</h3>
                              </div>
                              <span className="account__profile-accent-text">{t("view")}</span>
                            </Link>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/settings/subtitles"}
                              onClick={() => setCurrentEditingProfile(user)}
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">
                                  {t("subtitleAppearance")}
                                </h3>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </Link>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/settings/playback"}
                              className="account__profile-list-item"
                              onClick={() => setCurrentEditingProfile(user)}
                            >
                              <div>
                                <h3 className="account__profile-heading">
                                  {t("playbackSettings")}
                                </h3>
                                <em className="account__profile-heading-description account__profile-heading-description--lowercase">
                                  {user.autoplayNext && t("autoplayNext")}
                                  {user.autoplayPreviews && t("autoplayPrev")}
                                  {t("playbackQuality")}
                                </em>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </Link>
                          </li>

                          {index === 0 && (
                            <li className="account__profile-list-item-wrapper">
                              <Link
                                to={"/settings/communicationPreference"}
                                className="account__profile-list-item"
                                onClick={() => setCurrentEditingProfile(user)}
                              >
                                <div>
                                  <h3 className="account__profile-heading">
                                    {t("communicationSettings")}
                                  </h3>
                                </div>
                                <span className="account__profile-accent-text">{t("change")}</span>
                              </Link>
                            </li>
                          )}

                          {!user.kidsProfile && (
                            <li className="account__profile-list-item-wrapper">
                              <Link
                                to={"/settings/privacy"}
                                className="account__profile-list-item"
                                onClick={() => setCurrentEditingProfile(user)}
                              >
                                <div>
                                  <h3 className="account__profile-heading">
                                    {t("privacyAndData")}
                                  </h3>
                                </div>
                                <span className="account__profile-accent-text">{t("change")}</span>
                              </Link>
                            </li>
                          )}

                          <li>
                            <form
                              className="account__profile-animation-form"
                              onSubmit={(e) => e.preventDefault()}
                            >
                              <CheckboxLight data={user} />
                            </form>
                          </li>
                        </ul>
                      </div>
                    </section>
                    {index !== users.length - 1 && (
                      <Divider
                        customColor={"hsl(0,0%,50%)"}
                        spaceSmall
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </article>

          <Divider
            customColor={"hsl(0,0%,50%)"}
            spaceSmall
          />

          <article className="account__article">
            <h2 className="account__article-header-heading">{t("settings")}</h2>
            <div className="account__settings-wrapper">
              <a
                href="#"
                className="account__article-link"
              >
                {t("turnTransfers")}
                <NewBadge />
              </a>
              <a
                href="#"
                className="account__article-link"
              >
                {t("testParticipation")}
              </a>
              <a
                href="#"
                className="account__article-link"
              >
                {t("manageDownload")}
              </a>
            </div>
          </article>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
