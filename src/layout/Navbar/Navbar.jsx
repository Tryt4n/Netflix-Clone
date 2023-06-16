import { NavLink, Link } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../../context/UserContext";

import "./navbar.scss";

export default function Navbar() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <nav>
      <h1 className="visually-hidden">Netflix Clone</h1>
      <NavLink to="/">
        <img
          className="netflix-logo"
          src="./images/logos/netflix-logo.svg"
          alt="Netflix Logo"
        />
      </NavLink>
      <ul aria-label="Main Navigation">
        <li>
          <NavLink
            to="/"
            // className={({ isActive }) => {
            //   return "active";
            // }}
          >
            Home
          </NavLink>
          {/* <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                color: "red",
              };
            }}
          >
            Home
          </NavLink> */}
        </li>
        <li>
          <NavLink to="/series">Tv Shows</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/latest">New & Popular</NavLink>
        </li>
        <li>
          <NavLink to="/my-list">My List</NavLink>
        </li>
        <li>
          <NavLink to="/original-audio">Browse by Languages</NavLink>
        </li>
      </ul>

      <div aria-label="Secondary Navigation">
        <div>
          <button
            type="button"
            aria-label="Search"
          >
            <span className="visually-hidden">searchbox</span>
            <img
              src="./images/icons/magnifier.svg"
              alt="magnifier icon"
            />
          </button>
        </div>

        <Link to="/kids">Kids</Link>

        <div>
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Notifications"
          >
            <span className="visually-hidden">Notifications</span>
            <img
              src="./images/icons/notification-bell.svg"
              alt="notifications icon"
            />
          </button>
          <div role="menu"></div>
        </div>

        <div>
          <button
            type="button"
            aria-label={`${user.username} Accounts & Settings`}
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="visually-hidden">Accounts Dropdown</span>
            <img
              src={user.profileImage}
              alt=""
            />
            <span
              className="caret"
              role="presentation"
            ></span>
          </button>
          <div role="menu"></div>
        </div>
      </div>
    </nav>
  );
}
