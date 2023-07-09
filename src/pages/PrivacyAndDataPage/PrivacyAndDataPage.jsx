import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

import Footer from "../../layout/Footer/Footer";
import Navbar from "../../layout/Navbar/Navbar";

import Switch from "../../components/Switch/Switch";
import Divider from "../../components/Divider/Divider";

import ArrowIndicatorLightIcon from "../../icons/ArrowIndicatorLightIcon";
import HandshakeIcon from "../../icons/HandshakeIcon";
import DownloadIcon from "../../icons/DownloadIcon";

import "./privacyAndDataPage.scss";

export default function PrivacyAndDataPage() {
  const { currentEditingProfile, users } = useContext(UserContext);

  return (
    <>
      <header>
        <h1 className="visually-hidden">Privacy and Data</h1>
        <Navbar />
      </header>

      <div className="settings-wrapper">
        <main className="settings-container privacy-and-data">
          <div className="privacy-and-data__back-link-wrapper">
            <Link
              to="/account"
              className="privacy-and-data__back-link"
            >
              <ArrowIndicatorLightIcon />
              Back
            </Link>
          </div>

          <header className="privacy-and-data__header-wrapper">
            <HandshakeIcon />
            <h2 className="privacy-and-data__heading">Privacy and Data Settings</h2>
            <p className="privacy-and-data__text">
              Here you can download information collected from you or manage how it is used.
            </p>
          </header>

          {currentEditingProfile.id === users[0].id && (
            <article>
              <h2 className="visually-hidden">Download personal information</h2>
              <button className="privacy-and-data__download-wrapper">
                <DownloadIcon />
                <span className="privacy-and-data__download-text">
                  Download personal information
                </span>
                <ArrowIndicatorLightIcon />
              </button>
            </article>
          )}

          <article>
            <h2 className="privacy-and-data__subheader">Manage Your Profile</h2>
            <div className="privacy-and-data__container">
              <form onSubmit={(e) => e.preventDefault()}>
                {currentEditingProfile.id === users[0].id ? (
                  <>
                    <legend className="privacy-and-data__legend">
                      Allow matched identifier communications
                    </legend>
                    <div className="privacy-and-data__form-wrapper">
                      <p className="privacy-and-data__form-text">
                        Use privacy protected contact information from my Netflix account to display
                        relevant marketing on third party services. <a href="#">Learn more</a> about
                        "Matched Identifier Communications".
                      </p>
                      <Switch
                        name="communications"
                        text="Allow matched identifier communications"
                      />
                    </div>
                  </>
                ) : (
                  <p className="privacy-and-data__form-text">
                    You have the ability to opt out of sharing certain information you provide to
                    Netflix, with third parties. You are not providing any such information to
                    Netflix, but can exercise your choice below.
                  </p>
                )}

                <Divider
                  spaceSmall
                  customColor="rgba(128, 128, 128, 0.2)"
                />
                <button className="privacy-and-data__form-btn">
                  {currentEditingProfile.id === users[0].id
                    ? "Opt Out of All"
                    : "Opt Out of Data Sharing"}
                </button>
              </form>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
