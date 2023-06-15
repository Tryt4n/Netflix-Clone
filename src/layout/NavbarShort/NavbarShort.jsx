import { Link } from "react-router-dom";

import "./navbarShort.scss";

export default function NavbarShort() {
  return (
    <nav className="navbar-bg">
      <Link to="/">
        <img
          className="netflix-logo"
          src="./images/logos/netflix-logo.svg"
          alt="Netflix Logo"
        />
      </Link>
    </nav>
  );
}
