import { Link } from "react-router-dom";

import "./navbarShort.scss";

import { useTranslation } from "react-i18next";

export default function NavbarShort() {
  const { t } = useTranslation();

  return (
    <nav className="navbar-bg">
      <h2 className="visually-hidden">{t("navigation")}</h2>
      <Link
        to="/"
        className="navbar-logo-link"
      >
        <img
          className="netflix-logo"
          src="/images/logos/netflix-logo.svg"
          alt="Netflix Logo"
        />
      </Link>
    </nav>
  );
}
