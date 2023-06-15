import { useState } from "react";
import { useTranslation } from "react-i18next";

import "../AccountFooter/accountFooter.scss";

export default function AccountFooter() {
  const { t } = useTranslation();

  const [serviceCodeText, setServiceCodeText] = useState("Service Code");

  return (
    <footer className="account-footer">
      <h2 className="account-footer__heading">
        <a href="#">{t("contactUs")}</a>
      </h2>
      <ul className="account-footer__list">
        <li className="account-footer__list-item">
          <a href="#">{t("audioAndSubtitle")}</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">{t("helpCenter")}</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">{t("giftCards")}</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">{t("investorRelations")}</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">{t("mediaCenter")}</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">{t("jobs")}</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">{t("cookiePreferences")}</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">{t("termsOfUse")}</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">{t("privacyStatement")}</a>
        </li>
      </ul>
      <button
        className="account-footer__service-code"
        aria-label={t("serviceCode")}
        disabled={serviceCodeText === "Service Code" ? false : true}
        onClick={() => setServiceCodeText("565682")}
      >
        {t("serviceCode")}
      </button>
    </footer>
  );
}
