import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

import Magnifier from "../../icons/Magnifier";
import NotificationBell from "../../icons/NotificationBell";
import AccountIcon from "../../icons/AccountIcon";
import EditIcon from "../../icons/EditIcon";
import HelpCenterIcon from "../../icons/HelpCenterIcon";
import TransferProfileIcon from "../../icons/TransferProfileIcon";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./navbar.scss";

export default function Navbar() {
  const { t } = useTranslation();

  const { users, selectedUser, setSelectedUser } = useContext(UserContext);

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const notAllowedLocations = ["/account", "/settings/*", "/reportproblem"];

  //* if user isn't selected then redirect to UserSelectPage
  useEffect(() => {
    if (Object.keys(selectedUser).length === 0) {
      navigate("/");
    }
  }, []);

  function changeSelectedUser(user) {
    if (isMenuExpanded) {
      setIsMenuExpanded(false);
    }
    setSelectedUser(user);
  }

  return (
    <nav className="navbar">
      <h2 className="visually-hidden">{t("navigation")}</h2>

      <div className="navbar__nav-list-wrapper">
        <Link
          to={Object.keys(selectedUser).length === 0 ? "/" : "/home"}
          className="navbar-logo-link"
        >
          <img
            className="netflix-logo"
            src="/images/logos/netflix-logo.svg"
            alt="Netflix Logo"
          />
        </Link>
        {!notAllowedLocations.some((path) => location.pathname.includes(path)) && (
          <ul className="navbar__nav-list">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/series">TV Shows</NavLink>
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
        )}
      </div>

      <div className="navbar__secondary-wrap">
        {!notAllowedLocations.some((path) => location.pathname.includes(path)) && (
          <>
            <button aria-label="Search">
              <span className="visually-hidden">Searchbar</span>
              <Magnifier />
            </button>
            <button
              aria-label="Notifications"
              aria-haspopup="true"
              aria-expanded="false"
              onFocus={() => setIsMenuExpanded(false)}
            >
              <span className="visually-hidden">Notifications List</span>
              <NotificationBell />
            </button>
          </>
        )}

        <div className="navbar__menu-wrapper">
          <button
            className="navbar__profiles-btn"
            aria-haspopup="true"
            aria-expanded={isMenuExpanded}
            aria-label={`${selectedUser.username} Account & Settings`}
            onMouseEnter={() => setIsMenuExpanded(true)}
            onTouchMove={() => setIsMenuExpanded(true)}
            onFocus={() => setIsMenuExpanded(true)}
          >
            <img
              src={selectedUser.profileImage}
              alt={`${selectedUser.username} ${t("avatar")}`}
              className="navbar__profile-img"
            />
            <span
              className="caret"
              role="presentation"
            ></span>
          </button>

          <div
            className={`navbar__menu-list${isMenuExpanded ? " expanded" : ""}`}
            role="menu"
            onMouseLeave={() => setIsMenuExpanded(false)}
            onTouchEnd={() => setIsMenuExpanded(false)}
          >
            <ul role="list">
              {users.map((user) => {
                if (user.id !== selectedUser.id) {
                  return (
                    <React.Fragment key={user.id}>
                      <li role="listitem">
                        <Link
                          className="navbar__profile-link"
                          onClick={() => changeSelectedUser(user)}
                          tabIndex={isMenuExpanded ? 0 : -1}
                        >
                          <img
                            src={user.profileImage}
                            alt={`${user.username} ${t("avatar")}`}
                            className="navbar__profile-img"
                          />
                          <span>{user.username}</span>
                        </Link>
                      </li>
                    </React.Fragment>
                  );
                }
              })}
              <li role="listitem">
                <Link
                  to="/ManageProfiles"
                  tabIndex={isMenuExpanded ? 0 : -1}
                >
                  {!notAllowedLocations.some((path) => location.pathname.includes(path)) && (
                    <div className="navbar__icon-wrapper">
                      <EditIcon />
                    </div>
                  )}
                  <span>Manage Profiles</span>
                </Link>
              </li>
              <li role="listitem">
                <Link tabIndex={isMenuExpanded ? 0 : -1}>
                  {!notAllowedLocations.some((path) => location.pathname.includes(path)) && (
                    <div className="navbar__icon-wrapper">
                      <TransferProfileIcon />
                    </div>
                  )}
                  <span>Transfer Profile</span>
                </Link>
              </li>
              <li role="listitem">
                <Link
                  to="/account"
                  tabIndex={isMenuExpanded ? 0 : -1}
                >
                  {!notAllowedLocations.some((path) => location.pathname.includes(path)) && (
                    <div className="navbar__icon-wrapper">
                      <AccountIcon />
                    </div>
                  )}
                  <span>Account</span>
                </Link>
              </li>
              <li role="listitem">
                <Link tabIndex={isMenuExpanded ? 0 : -1}>
                  {!notAllowedLocations.some((path) => location.pathname.includes(path)) && (
                    <div className="navbar__icon-wrapper">
                      <HelpCenterIcon />
                    </div>
                  )}
                  <span>Help Center</span>
                </Link>
              </li>
            </ul>
            <a
              href="#"
              className="navbar__menu-list-item-sign-out"
              onBlur={() => setIsMenuExpanded(false)}
            >
              Sign out of Netflix
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
