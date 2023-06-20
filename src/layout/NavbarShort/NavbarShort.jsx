import { Link } from "react-router-dom";

import "./navbarShort.scss";

export default function NavbarShort() {
  return (
    <>
      <header>
        <nav className="navbar-bg">
          <h2 className="visually-hidden">Navigation</h2>
          <Link to="/">
            <img
              className="netflix-logo"
              src="./images/logos/netflix-logo.svg"
              alt="Netflix Logo"
            />
          </Link>
        </nav>
      </header>
    </>
  );
}
