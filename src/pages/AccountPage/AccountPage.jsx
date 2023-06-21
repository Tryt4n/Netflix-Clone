import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import MemberSinceIcon from "../../icons/MemberSicnceIcon";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import CheckboxLight from "../../components/CheckboxLight/CheckboxLight";
import NewBadge from "./components/NewBadge";

import CheckIcon from "../../icons/CheckIcon";
import UltraHDIcon from "../../icons/UltraHDIcon";
import ChevronDown from "../../icons/ChevronDown";

import "./accountPage.scss";

export default function AccountPage() {
  const { t, i18n } = useTranslation();

  const { users, setCurrentEditingProfile } = useContext(UserContext);

  const [expandedIndexes, setExpandedIndexes] = useState([]);

  function expandUser(index) {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  }

  console.log(i18n.language);

  return (
    <>
      <header>
        <h1 className="visually-hidden">
          {t("account")} - {t("settings")}
        </h1>
        <NavbarShort />
      </header>

      <div className="account">
        <main className="account__container">
          <div className="account__heading-wrapper">
            <h2 className="account__main-heading">{t("account")}</h2>
            <div className="account__heading-member-container">
              <MemberSinceIcon />
              <span>{t("memberSince")}</span>
            </div>
          </div>
          <div className="account__heading-restrictions-saved">
            <CheckIcon />
            <span>
              {t("viewingRestrictions")} {t("saved")}.
            </span>
          </div>

          <hr />

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
                  <strong>placeholder@gmail.com</strong>
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
                    {t("phoneNumber")}: 666 777 888
                  </span>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {t("change")} {t("phoneNumber")}
                  </a>
                </div>
              </section>

              <hr />

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
                  {/* //? Change biling date */}
                  <span>{t("nextBilingDateDescription")} June 26, 2023.</span>
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

              <hr />

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

          <hr />

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

          <hr />

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
                  {t("manageAccess")}
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

          <hr />

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

          <hr />

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
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">{t("language")}</h3>
                                <em className="account__profile-heading-description">
                                  {user.language}
                                </em>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </a>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/Viewing-Restriction"}
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">
                                  {t("viewingRestrictions")}
                                </h3>
                                {/* //? Change */}
                                <em className="account__profile-heading-description">
                                  No Restrictions.
                                </em>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </Link>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">{t("profileLock")}</h3>
                                <em className="account__profile-heading-description">
                                  {user.lock ? t("on") : t("off")}
                                </em>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </a>
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
                                <span className="account__profile-accent-text">Transfer</span>
                              </a>
                            </li>
                          )}
                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">{t("viewingActivity")}</h3>
                              </div>
                              <span className="account__profile-accent-text">{t("view")}</span>
                            </a>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">{t("ratings")}</h3>
                              </div>
                              <span className="account__profile-accent-text">{t("view")}</span>
                            </a>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">
                                  {t("subtitleAppearance")}
                                </h3>
                              </div>
                              <span className="account__profile-accent-text">{t("change")}</span>
                            </a>
                          </li>
                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
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
                            </a>
                          </li>

                          {!user.kidsProfile && (
                            <>
                              <li className="account__profile-list-item-wrapper">
                                <a
                                  href="#"
                                  className="account__profile-list-item"
                                >
                                  <div>
                                    <h3 className="account__profile-heading">
                                      {t("communicationSettings")}
                                    </h3>
                                  </div>
                                  <span className="account__profile-accent-text">
                                    {t("change")}
                                  </span>
                                </a>
                              </li>

                              <li className="account__profile-list-item-wrapper">
                                <a
                                  href="#"
                                  className="account__profile-list-item"
                                >
                                  <div>
                                    <h3 className="account__profile-heading">
                                      {t("privacyAndData")}
                                    </h3>
                                  </div>
                                  <span className="account__profile-accent-text">
                                    {t("change")}
                                  </span>
                                </a>
                              </li>
                            </>
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
                    {index !== users.length - 1 && <hr />}
                  </React.Fragment>
                );
              })}
            </div>
          </article>

          <hr />

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