import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./footer.scss";

export default function Footer() {
  const { t } = useTranslation();

  const [serviceCodeText, setServiceCodeText] = useState("Service Code");

  const accountLinksText = [
    "audioAndSubtitle",
    "helpCenter",
    "giftCards",
    "investorRelations",
    "mediaCenter",
    "jobs",
    "cookiePreferences",
    "termsOfUse",
    "privacyStatement",
  ];

  return (
    <footer className="account-footer">
      <h2 className="account-footer__heading">
        <a href="#">{t("contactUs")}</a>
      </h2>
      <ul className="account-footer__list">
        {accountLinksText.map((link) => (
          <li
            key={link}
            className="account-footer__list-item"
          >
            <a href="#">{t(`${link}`)}</a>
          </li>
        ))}
      </ul>
      <button
        className="account-footer__service-code"
        aria-label={t("serviceCode")}
        disabled={serviceCodeText === "Service Code" ? false : true}
        onClick={() => setServiceCodeText("565682")}
      >
        {serviceCodeText}
      </button>
    </footer>
  );
}
