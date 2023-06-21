import React, { useContext, useRef, useState } from "react";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import NavbarShort from "../../layout/NavbarShort/NavbarShort";

import UserContext from "../../context/UserContext";

import "./restrictionPage.scss";
import { useTranslation } from "react-i18next";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

import CloseIcon from "../../icons/CloseIcon";

import moviesData from "../../../server/data.json";

export default function RestrictionPage() {
  const { t, i18n } = useTranslation();

  const { currentEditingProfile, users, setUsers } = useContext(UserContext);

  const [isConfirmationPasswordValid, setIsConfirmationPasswordValid] = useState(true);
  const [passwordConfirmationPassed, setPasswordConfirmationPassed] = useState(false);
  const [selectedRating, setSelectedRating] = useState(currentEditingProfile.maturityRating);
  const [searchedBlockedValue, setSearchedBlockedValue] = useState("");
  const [listOfBlockedMovies, setListOfBlockedMovies] = useState(
    currentEditingProfile.blockedMovies !== undefined ? currentEditingProfile.blockedMovies : []
  );
  const confirmationPasswordInputRef = useRef(null);
  const blockedInputRef = useRef(null);
  const ratings = [
    { id: "all", label: t("all") },
    { id: "7+", label: "7+" },
    { id: "10+", label: "10+" },
    { id: "13+", label: "13+" },
    { id: "16+", label: "16+" },
    { id: "18+", label: "18+" },
  ];

  //* List of movies in the searching list excluding those that are already blocked
  const filteredMovies = moviesData.filter(
    (item) =>
      !listOfBlockedMovies.some((blockedItem) => blockedItem.name === item.name) &&
      //* Searching by movie name
      (item.name.toLowerCase().includes(searchedBlockedValue.toLowerCase()) ||
        //* Searching by movie cast
        item.cast.some((actor) => actor.toLowerCase().includes(searchedBlockedValue.toLowerCase())))
  );

  function goNext() {
    if (confirmationPasswordInputRef.current.value === "") {
      setIsConfirmationPasswordValid(false);
    }

    if (confirmationPasswordInputRef.current.value !== "") {
      setIsConfirmationPasswordValid(true);
      setPasswordConfirmationPassed(true);
    }
  }

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.id);
  };

  function changeRestriction() {
    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          maturityRating: selectedRating,
          blockedMovies: listOfBlockedMovies,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  }

  function getIndex(id) {
    return ratings.findIndex((rating) => rating.id === id);
  }

  function handleConfirmationOnKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (confirmationPasswordInputRef.current.value !== "") {
        setIsConfirmationPasswordValid(true);
        setPasswordConfirmationPassed(true);
        changeRestriction();
      } else {
        setIsConfirmationPasswordValid(false);
      }
    }
  }

  function clearInput(ref) {
    if (ref.current.value.length > 0) {
      setSearchedBlockedValue("");
    }
  }

  function addToBlockedList(item) {
    setListOfBlockedMovies((prevState) => [...prevState, item]);
    clearInput(blockedInputRef);
  }

  function removeFromBlockedList(item) {
    setListOfBlockedMovies((prevState) => prevState.filter((blockedItem) => blockedItem !== item));
  }

  return (
    <>
      <header>
        <h2 className="visually-hidden">
          {`${t("viewingRestrictions")} - ${
            passwordConfirmationPassed ? t("settings") : t("passwordConfirmation")
          }`}
        </h2>
        <NavbarShort />
      </header>
      <div className="restriction-confirmation">
        <main className="restriction-confirmation__content-container">
          <header className="restriction-confirmation__header">
            <h1 className="restriction-confirmation__heading">{t("viewingRestrictions")}</h1>
            <img
              className="restriction-confirmation__profile-img"
              src={currentEditingProfile?.profileImage}
              alt={`${t("profileAvatar")} ${currentEditingProfile?.username}`}
            />
          </header>
          {!passwordConfirmationPassed && (
            <section>
              <h2 className="restriction-confirmation__password-subheading">
                {t("viewingRestrictionsDescription")} {currentEditingProfile?.username}
                {i18n.language === "en" ? `'s ${t("profile")}` : ""}.
              </h2>

              <div className="restriction-confirmation__input-wrapper">
                <form
                  className="restriction-confirmation__password-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label
                    htmlFor="confirmation-password"
                    className="visually-hidden"
                  >
                    {t("passwordConfirmation")}
                  </label>
                  <input
                    className={`restriction-confirmation__password-input${
                      !isConfirmationPasswordValid ? " invalid" : ""
                    }`}
                    type="password"
                    name="confirmation-password"
                    id="confirmation-password"
                    ref={confirmationPasswordInputRef}
                    required
                    aria-invalid={!isConfirmationPasswordValid}
                    aria-errormessage="password-confirmation-error-text"
                    onKeyDown={handleConfirmationOnKeyDown}
                  />
                  {!isConfirmationPasswordValid && (
                    <span
                      id="password-confirmation-error-text"
                      className="restriction-confirmation__password-warning-message"
                      aria-live="assertive"
                    >
                      {t("passwordRequired")}
                    </span>
                  )}
                </form>
                <a
                  href="#"
                  className="restriction-confirmation__password-forgot-link"
                >
                  {t("forgotPassword")}
                </a>
              </div>
            </section>
          )}

          {passwordConfirmationPassed && (
            <>
              <section>
                <h2 className="restriction-confirmation__subheading">
                  {t("profileMaturityRatingFor")} {currentEditingProfile.username}
                </h2>
                <p className="restriction-confirmation__description-text">
                  {selectedRating === "18+" ? (
                    t("showTitles-18+")
                  ) : (
                    <>
                      {t("showTitlesRated")}{" "}
                      <strong>
                        {selectedRating === "all" ? t("all") : selectedRating}
                        {t("andBelow")}
                      </strong>
                      {t("forThisProfile")}.
                    </>
                  )}
                </p>

                <div className="restriction-confirmation__inputs-container">
                  {ratings.map((rating, index) => {
                    const isChecked = selectedRating === rating.id;
                    const isBeforeChecked = getIndex(selectedRating) > index;

                    const classes = ["restriction-confirmation__line"];
                    if (isChecked || isBeforeChecked) {
                      classes.push("active");
                    }

                    return (
                      <React.Fragment key={rating.id}>
                        <span
                          className={`${classes.join(" ")} ${
                            rating.id === "all" ? " restriction-confirmation__line--first" : ""
                          }`}
                          role="presentation"
                        ></span>

                        <div className="restriction-confirmation__restriction-input-wrapper">
                          <label
                            htmlFor={rating.id}
                            className={`restriction-confirmation__restriction-label${
                              isChecked || isBeforeChecked ? " active" : ""
                            }`}
                            data-tooltip={`${
                              rating.id === "all" ? t("withoutRestrictions") : t("recommendedFor")
                            } ${
                              rating.id !== "all"
                                ? `${t("ages")} ${rating.id.replace("+", "")} ${t("andUp")}`
                                : ""
                            }`}
                          >
                            {rating.label}
                          </label>
                          <input
                            type="radio"
                            name="rating-radio"
                            id={rating.id}
                            className={`restriction-confirmation__restriction-input ${
                              isChecked ? "active" : ""
                            }`}
                            checked={isChecked}
                            onChange={handleRatingChange}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}

                  <span
                    className={`restriction-confirmation__line restriction-confirmation__line--last${
                      selectedRating === "18+" ? " active" : ""
                    }`}
                    role="presentation"
                  ></span>
                </div>
              </section>

              <hr className="restriction-confirmation__divider" />

              <section>
                <h2 className="restriction-confirmation__subheading">
                  {t("titlesRestrictionFor")} {currentEditingProfile.username}
                </h2>
                <p className="restriction-confirmation__description-text">
                  {t("titlesRestrictionForDescription")}
                </p>
                <form
                  className="restriction-confirmation__form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label
                    htmlFor="video-restriction"
                    className="visually-hidden"
                  >
                    {t("titlesRestrictionInputLabel")}
                  </label>
                  <input
                    className="restriction-confirmation__blocked-videos-input"
                    type="text"
                    name="video-restriction"
                    id="video-restriction"
                    placeholder={t("titlesRestrictionInputPlaceholder")}
                    autoComplete="off"
                    ref={blockedInputRef}
                    value={searchedBlockedValue}
                    onChange={(e) => setSearchedBlockedValue(e.target.value)}
                  />
                  {searchedBlockedValue !== "" && (
                    <button
                      className="restriction-confirmation__clear-input-btn"
                      aria-label={t("clearInput")}
                      onClick={() => clearInput(blockedInputRef)}
                    >
                      <CloseIcon />
                    </button>
                  )}
                  {searchedBlockedValue.length >= 3 && filteredMovies.length > 0 && (
                    <ul className="restriction-confirmation__searching-movies-list">
                      {filteredMovies.map((item) => (
                        <li
                          key={item.name}
                          className="restriction-confirmation__searching-movies-list-item"
                        >
                          <button
                            className="restriction-confirmation__searching-movies-list-item-btn"
                            aria-label={t("searchingBlockedMoviesBtnLabel")}
                            onClick={() => addToBlockedList(item)}
                          >
                            {item.name} ({item.productionYear})
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {listOfBlockedMovies?.length > 0 && (
                    <ul>
                      {listOfBlockedMovies.map((item) => (
                        <li
                          key={item.name}
                          className="restriction-confirmation__blocked-list-item"
                        >
                          <span className="restriction-confirmation__blocked-list-item-text">
                            {item.name}
                          </span>
                          <button
                            className="restriction-confirmation__blocked-list-item-delete-btn"
                            aria-label={"blockedMoviesListBtnLabel"}
                            onClick={() => removeFromBlockedList(item)}
                          >
                            <CloseIcon />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
              </section>
            </>
          )}

          <nav
            className="restriction-confirmation__buttons-container"
            aria-label={t("secondaryNavigation")}
          >
            <h2 className="visually-hidden">{t("secondaryNavigation")}</h2>
            <AccountSettingsBtn
              text={passwordConfirmationPassed ? t("save") : t("continue")}
              currentClass="accent"
              onClickFunction={passwordConfirmationPassed ? changeRestriction : goNext}
              path={passwordConfirmationPassed ? "/account" : ""}
            />
            <AccountSettingsBtn
              text={t("cancel")}
              currentClass="light"
              path={"/account"}
            />
          </nav>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
