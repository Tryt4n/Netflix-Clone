import { useContext } from "react";
import AccountFooter from "../AccountFooter/AccountFooter";
import NavbarShort from "../NavbarShort/NavbarShort";
import UserContext from "../../context/UserContext";
import { useTranslation } from "react-i18next";

import "./commonAccountLayout.scss";

export default function CommonAccountLayout({
  children,
  pageTitle,
  sectionTitle,
  withoutHeader,
  withoutImg,
}) {
  const { t } = useTranslation();

  const { currentEditingProfile } = useContext(UserContext);

  return (
    <>
      <header>
        <h1 className="visually-hidden">{pageTitle}</h1>
        <NavbarShort />
      </header>

      <div className="settings-wrapper">
        <main className="settings-container">
          {!withoutHeader ? (
            <header className="common-account__header">
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

        <AccountFooter />
      </div>
    </>
  );
}
