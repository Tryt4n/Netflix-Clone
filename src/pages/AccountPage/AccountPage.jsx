import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import MemberSinceIcon from "../../icons/MemberSicnceIcon";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

import CheckIcon from "../../icons/CheckIcon";
import UltraHDIcon from "../../icons/UltraHDIcon";
import ChevronDown from "../../icons/ChevronDown";

import "./accountPage.scss";
import CheckboxLight from "../../components/CheckboxLight/CheckboxLight";

export default function AccountPage() {
  const { t } = useTranslation();

  const { users, setCurrentEditingProfile } = useContext(UserContext);

  const [expandedIndexes, setExpandedIndexes] = useState([]);

  function expandUser(index) {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  }

  return (
    <>
      <NavbarShort />

      <div className="account">
        <main className="account__container">
          <div className="account__heading-wrapper">
            <h1 className="account__main-heading">Account</h1>
            <div className="account__heading-member-container">
              <MemberSinceIcon />
              <span>Member Since October 2022</span>
            </div>
          </div>
          <div className="account__heading-restrictions-saved">
            <CheckIcon />
            <span>Viewing Restrictions saved.</span>
          </div>

          <hr />

          <article className="account__article-membership-billing">
            <header className="account__article-header">
              <h2 className="account__article-header-heading">Membership & Billing</h2>
              <AccountSettingsBtn
                text={"Cancel Membership"}
                currentClass={"light"}
              />
            </header>
            <div className="account__article-sections-wrapper">
              <section className="account__article-section">
                <h2 className="visually-hidden">Basic account information</h2>
                <div>
                  <strong>placeholder@gmail.com</strong>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    {" "}
                    Change email
                  </a>
                </div>
                <div>
                  <span className="account__article-text--accent">Password: ********</span>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    Change password
                  </a>
                </div>
                <div>
                  <span className="account__article-text--accent">Phone: 666 777 888</span>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    Change phone number
                  </a>
                </div>
              </section>
              <hr />
              <section className="account__article-section">
                <h2 className="visually-hidden">Payment account information</h2>
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
                    Manage payment info
                  </a>
                </div>
                <div>
                  {/* //? Change biling date */}
                  <span>Your next billing date is June 26, 2023.</span>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    Add backup payment method
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    Biling details
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    Change biling day
                  </a>
                </div>
              </section>
              <hr />
              <section className="account__article-section">
                <h2 className="visually-hidden">Gift card informations</h2>
                <div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    Reedem gift card or promo card
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="account__article-link"
                  >
                    Where to buy gift cards
                  </a>
                </div>
              </section>
            </div>
          </article>

          <hr />

          <article className="account__article">
            <header className="account__article-header-heading">
              <h2 className="account__article-header-heading">Plan Details</h2>
            </header>
            <section className="account__section-wrapper">
              <h2 className="visually-hidden">Chosen plan</h2>
              <div className="account__plan-wrapper">
                <strong>Premium</strong>
                <UltraHDIcon />
              </div>
              <div className="account__article-links-wrapper">
                <a
                  href="#"
                  className="account__article-link"
                >
                  Change plan
                </a>
              </div>
            </section>
          </article>

          <hr />

          <article className="account__article">
            <header className="account__article-header-heading">
              <h2 className="account__article-header-heading">Security & Privacy</h2>
            </header>
            <section className="account__section-wrapper">
              <h2 className="visually-hidden">Security and Privacy</h2>
              <p className="account__section-text">
                Control access to this account, view the most recently active devices and more.
              </p>
              <div className="account__article-links-wrapper">
                <a
                  href="#"
                  className="account__article-link"
                >
                  <span
                    className="account__new-badge"
                    aria-label="badge"
                  >
                    new
                  </span>
                  Manage access and devices
                </a>
                <a
                  href="#"
                  className="account__article-link"
                >
                  Sign out of all devices
                </a>
              </div>
            </section>
          </article>
          <hr />

          <article className="account__article">
            <header className="account__article-header-heading">
              <h2 className="account__article-header-heading">
                Extra Members{" "}
                <span
                  className="account__new-badge account__new-badge--accent"
                  aria-label="badge"
                >
                  new
                </span>
              </h2>
            </header>
            <section className="account__section-wrapper">
              <h2 className="visually-hidden">Extra Members</h2>
              <p className="account__section-text">
                Share your Netflix with someone who doesn&apos;t live with you by adding an extra
                member. Learn more in our <a href="#">Help Center</a>.
              </p>
              <div className="account__article-links-wrapper">
                <a
                  href="#"
                  className="account__article-link"
                >
                  Buy an extra member slot
                </a>
              </div>
            </section>
          </article>

          <hr />

          <article className="account__article">
            <header className="account__article-header-heading">
              <h2 className="account__article-header-heading">Profile & Parental Controls</h2>
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
                          <p className="account__profile-heading-description">
                            {user.maturityRating === "all"
                              ? t("all")
                              : user.maturityRating === "18+"
                              ? t("allMaturityRatings")
                              : `${user.maturityRating} ${t("andBelow")}`}
                          </p>
                        </div>
                        <button
                          className={`account__profile-btn${isProfileExpanded ? " expanded" : ""}`}
                          aria-label="Expand the profile menu"
                          aria-controls={`account-profile-list-${user.id}`}
                          onClick={() => expandUser(index)}
                        >
                          <ChevronDown label={"Chevron Down Icon"} />
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
                                <h3 className="account__profile-heading">Language</h3>
                                <em className="account__profile-heading-description">
                                  {user.language}
                                </em>
                              </div>
                              <span className="account__profile-accent-text">Change</span>
                            </a>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <Link
                              to={"/Viewing-Restriction"}
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">Viewing Restrictions</h3>
                                {/* //? Change */}
                                <em className="account__profile-heading-description">
                                  No Restrictions.
                                </em>
                              </div>
                              <span className="account__profile-accent-text">Change</span>
                            </Link>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">Profile Lock</h3>
                                <em className="account__profile-heading-description">
                                  {user.lock ? "On" : "Off"}
                                </em>
                              </div>
                              <span className="account__profile-accent-text">Change</span>
                            </a>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">
                                  Transfer this profile
                                  <span
                                    className="account__new-badge"
                                    aria-label="badge"
                                  >
                                    new
                                  </span>
                                </h3>
                              </div>
                              <span className="account__profile-accent-text">Transfer</span>
                            </a>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">Viewing activity</h3>
                              </div>
                              <span className="account__profile-accent-text">View</span>
                            </a>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">Ratings</h3>
                              </div>
                              <span className="account__profile-accent-text">View</span>
                            </a>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">Subtitle appearance</h3>
                              </div>
                              <span className="account__profile-accent-text">Change</span>
                            </a>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">Playback settings</h3>
                                <em className="account__profile-heading-description account__profile-heading-description--lowercase">
                                  {user.autoplayNext && "Autoplay next episode. "}
                                  {user.autoplayPreviews && "Autoplay previews. "}Best video and
                                  audio quality.
                                </em>
                              </div>
                              <span className="account__profile-accent-text">Change</span>
                            </a>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">Communication settings</h3>
                              </div>
                              <span className="account__profile-accent-text">Change</span>
                            </a>
                          </li>

                          <li className="account__profile-list-item-wrapper">
                            <a
                              href="#"
                              className="account__profile-list-item"
                            >
                              <div>
                                <h3 className="account__profile-heading">
                                  Privacy and data settings
                                </h3>
                              </div>
                              <span className="account__profile-accent-text">Change</span>
                            </a>
                          </li>

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
            <h2 className="account__article-header-heading">Settings</h2>
            <div className="account__settings-wrapper">
              <a
                href="#"
                className="account__article-link"
              >
                Turn off profile transfers
                <span
                  className="account__new-badge"
                  aria-label="badge"
                >
                  new
                </span>
              </a>
              <a
                href="#"
                className="account__article-link"
              >
                Test participation
              </a>
              <a
                href="#"
                className="account__article-link"
              >
                Manage download devices
              </a>
            </div>
          </article>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
