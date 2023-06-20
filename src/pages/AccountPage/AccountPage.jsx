import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import MemberSinceIcon from "../../icons/MemberSicnceIcon";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import CheckIcon from "../../icons/CheckIcon";

import "./accountPage.scss";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import UltraHDIcon from "../../icons/UltraHDicon";

export default function AccountPage() {
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

          <article className="account__article">
            <header className="account__article-header">
              <h2 className="account__article-header-heading">membership & billing</h2>
              <AccountSettingsBtn
                text={"Cancel Membership"}
                currentClass={"light"}
              />
            </header>
            <div className="account__article-sections-wrapper">
              <section className="account__article-section">
                <div>
                  <strong>placeholder@gmail.com</strong>
                  <a href="#"> Change email</a>
                </div>
                <div>
                  <span className="account__article-text--accent">Password: ********</span>
                  <a href="#">Change password</a>
                </div>
                <div>
                  <span className="account__article-text--accent">Phone: 666 777 888</span>
                  <a href="#">Change phone number</a>
                </div>
              </section>
              <hr />
              <section className="account__article-section">
                <div>
                  <div className="account__article-section-card-information-wrapper">
                    <img
                      src="/images/icons/VISA.png"
                      alt="visa logo"
                    />
                    <strong>•••• •••• •••• 1111</strong>
                  </div>
                  <a href="#">Manage payment info</a>
                </div>
                <div>
                  {/* //? Change biling date */}
                  <span>Your next billing date is June 26, 2023.</span>
                  <a href="#">Add backup payment method</a>
                </div>
                <div>
                  <a href="#">Biling details</a>
                </div>
                <div>
                  <a href="#">Change biling day</a>
                </div>
              </section>
              <hr />
              <section className="account__article-section">
                <div>
                  <a href="#">Reedem gift card or promo card</a>
                </div>
                <div>
                  <a href="#">Where to buy gift cards</a>
                </div>
              </section>
            </div>
          </article>

          <hr />

          <article className="account__article">
            <header className="account__article-header">
              <h2 className="account__article-header-heading">plan details</h2>
            </header>
            <div className="account__article-sections-wrapper">
              <section className="account__article-section">
                <div>
                  <div className="account__article-plan-details-wrapper">
                    <strong>Premium</strong>
                    <UltraHDIcon />
                  </div>
                  <a href="#">Change plan</a>
                </div>
              </section>
            </div>
          </article>

          <hr />

          {/* <article className="account__article">
            <header className="account__article-header">
              <h2 className="account__article-header-heading">security & privacy</h2>
            </header>
            <section className="account__article-section">
              <div className="account__article-sections-wrapper">
                <div className="account__article-sections-inner-wrapper">
                  <span className="account__article-section-description-text">
                    Control access to this account, view the most recently active devices and more.
                  </span>
                  <div className="account__article-links-wrapper">
                    <a href="#">
                      <span className="account__new-badge">new</span>Manage access and devices
                    </a>
                    <a href="#">Sign out of all devices</a>
                  </div>
                </div>
              </div>
            </section>
          </article>

          <hr />

          <article className="account__article">
            <header className="account__article-header">
              <h2 className="account__article-header-heading">security & privacy</h2>
            </header>
            <section className="account__article-section">
              <div className="account__article-sections-wrapper">
                <div className="account__article-sections-inner-wrapper">
                  <span className="account__article-section-description-text">
                    Control access to this account, view the most recently active devices and more.
                  </span>
                  <div className="account__article-links-wrapper">
                    <a href="#">
                      <span className="account__new-badge">new</span>Manage access and devices
                    </a>
                    <a href="#">Sign out of all devices</a>
                  </div>
                </div>
              </div>
            </section>
          </article> */}
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
