import { useContext } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import UserContext from "../../context/UserContext";
import { useTranslation } from "react-i18next";

import "./commonAccountLayout.scss";

export default function CommonAccountLayout({
  children,
  pageTitle,
  sectionTitle,
  withoutHeader,
  withoutImg,
  smallSpace,
}) {
  const { t } = useTranslation();

  const { currentEditingProfile } = useContext(UserContext);

  return (
    <>
      <header>
        <h1 className="visually-hidden">{pageTitle}</h1>
        <Navbar />
      </header>

      <div className="settings-wrapper">
        <main className="settings-container">
          {!withoutHeader ? (
            <header
              className={`common-account__header${smallSpace ? " common-account__header--m1" : ""}`}
            >
              <h2 className="common-account__heading">{sectionTitle}</h2>
              {!withoutImg && (
                <img
                  className="common-account__profile-img"
                  src={currentEditingProfile.profileImage}
                  alt={`${t("profileAvatar")} ${
                    currentEditingProfile.kidsProfile ? t("Kids") : currentEditingProfile.username
                  } `}
                />
              )}
            </header>
          ) : (
            <h2 className="visually-hidden">{sectionTitle}</h2>
          )}

          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
