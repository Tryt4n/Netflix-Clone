import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

import Magnifier from "../../icons/Magnifier";
import NotificationBell from "../../icons/NotificationBell";
import AccountIcon from "../../icons/AccountIcon";
import EditIcon from "../../icons/EditIcon";
import HelpCenterIcon from "../../icons/HelpCenterIcon";
import TransferProfileIcon from "../../icons/TransferProfileIcon";

import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./navbar.scss";

export default function Navbar() {
  const { t } = useTranslation();

  const { users, selectedUser, setSelectedUser } = useContext(UserContext);

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isNotificationsExpanded, setIsNotificationsExpanded] = useState(false);

  const location = useLocation();
  const notAllowedLocations = ["/account", "/settings", "/reportproblem"];

  function changeSelectedUser(user) {
    if (isMenuExpanded) {
      setIsMenuExpanded(false);
    }
    setSelectedUser(user);
  }

  function expandNotifications() {
    setIsMenuExpanded(false);
    setIsNotificationsExpanded(true);
  }
  function closeNotifications() {
    setIsNotificationsExpanded(false);
  }
  function closeNotificationsOnEscape(e) {
    if (e.key === "Escape") {
      closeNotifications();
    }
  }

  function expandSettings() {
    setIsNotificationsExpanded(false);
    setIsMenuExpanded(true);
  }
  function closeSettings() {
    setIsMenuExpanded(false);
  }
  function closeSettingsOnEscape(e) {
    if (e.key === "Escape") {
      closeSettings();
    }
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

            <div className="navbar__notifications-wrapper">
              <button
                aria-label="Notifications"
                aria-haspopup="true"
                aria-expanded={isNotificationsExpanded}
                aria-controls="notifications-list"
                onClick={expandNotifications}
                onMouseEnter={expandNotifications}
              >
                <span className="visually-hidden">Notifications List</span>
                <NotificationBell />
              </button>

              <div
                id="notifications-list"
                className={`navbar__notifications-list${
                  isNotificationsExpanded ? " expanded" : ""
                }`}
                onClick={closeNotifications}
                onMouseLeave={closeNotifications}
                onKeyDown={closeNotificationsOnEscape}
              >
                <ul>
                  {selectedUser.notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="navbar__notifications-list-item"
                    >
                      <a
                        href="#"
                        className="navbar__notifications-list-item-link"
                      >
                        <img
                          src={notification.image}
                          alt={notification.name}
                          className="navbar__notifications-list-item-img"
                        />
                        <div className="navbar__notifications-list-item-text-wrapper">
                          <div>
                            <span>{notification.text}</span>
                            <span>{notification.name}</span>
                          </div>
                          <time>{notification.time}</time>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        <div className="navbar__menu-wrapper">
          <button
            className="navbar__profiles-btn"
            aria-label={`${selectedUser.username} Account & Settings`}
            aria-haspopup="true"
            aria-expanded={isMenuExpanded}
            aria-controls="settings-list"
            onClick={expandSettings}
            onMouseEnter={expandSettings}
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
            id="settings-list"
            className={`navbar__menu-list${isMenuExpanded ? " expanded" : ""}`}
            onClick={closeSettings}
            onMouseLeave={closeSettings}
            onKeyDown={closeSettingsOnEscape}
          >
            <ul>
              {users.map((user) => {
                if (user.id !== selectedUser.id) {
                  return (
                    <React.Fragment key={user.id}>
                      <li>
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
              <li>
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
              <li>
                <Link tabIndex={isMenuExpanded ? 0 : -1}>
                  {!notAllowedLocations.some((path) => location.pathname.includes(path)) && (
                    <div className="navbar__icon-wrapper">
                      <TransferProfileIcon />
                    </div>
                  )}
                  <span>Transfer Profile</span>
                </Link>
              </li>
              <li>
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
              <li>
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
              onBlur={closeSettings}
            >
              Sign out of Netflix
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
