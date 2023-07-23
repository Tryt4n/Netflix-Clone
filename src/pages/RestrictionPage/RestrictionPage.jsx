import React, { useContext, useRef, useState } from "react";
import UserContext from "../../context/UserContext";
import { useTranslation } from "react-i18next";

import Divider from "../../components/Divider/Divider";
import CheckboxAccount from "../../components/CheckboxAccount/CheckboxAccount";
import PasswordConfirmation from "../../layout/PasswordConfirmation/PasswordConfirmation";
import BtnsWrapperAccount from "../../layout/BtnsWrapperAccount/BtnsWrapperAccount";
import CommonAccountLayout from "../../layout/CommonAccountLayout/CommonAccountLayout";

import CloseIcon from "../../icons/CloseIcon";

import moviesData from "../../../server/data.json";
import "./restrictionPage.scss";

export default function RestrictionPage() {
  const { t } = useTranslation();

  const {
    currentEditingProfile,
    users,
    setUsers,
    setIsCurrentlySaved,
    setDisplayedSavedMessage,
    passwordConfirmationPassed,
    resetPasswordConfirmationSettings,
    languageCodes,
  } = useContext(UserContext);

  const [selectedRating, setSelectedRating] = useState(currentEditingProfile.maturityRating);
  const [searchedBlockedValue, setSearchedBlockedValue] = useState("");
  const [listOfBlockedMovies, setListOfBlockedMovies] = useState(
    currentEditingProfile.blockedMovies !== undefined ? currentEditingProfile.blockedMovies : []
  );
  const [isForKidsProfile, setIsForKidsProfile] = useState(currentEditingProfile?.kidsProfile);
  const blockedInputRef = useRef(null);

  const ratings = [
    { id: "all", label: t("all") },
    { id: "7+", label: "7+" },
    { id: "10+", label: "10+" },
    { id: "13+", label: "13+" },
    { id: "16+", label: "16+" },
    { id: "18+", label: "18+" },
  ];
  const allowedRatingsForKidsProfile = ["all", "7+", "10+"];

  const currentProfileLanguageCode = languageCodes[currentEditingProfile.language];

  //* List of movies in the searching list excluding those that are already blocked
  const filteredMovies = moviesData.filter((item) => {
    const translatedNames = Object.values(item.translation.name); //* Get all translated movie names
    //* Searching by movie name in any language
    const translatedValue = translatedNames.find((name) =>
      name.toLowerCase().includes(searchedBlockedValue.toLowerCase())
    );

    return (
      !listOfBlockedMovies.some((blockedItem) => translatedNames.includes(blockedItem.name)) &&
      (translatedValue ||
        //* Searching by movie cast
        item.cast.some((actor) => actor.toLowerCase().includes(searchedBlockedValue.toLowerCase())))
    );
  });

  function handleRatingChange(e) {
    setSelectedRating(e.target.id);

    if (!allowedRatingsForKidsProfile.includes(e.target.id)) {
      setIsForKidsProfile(false);
    }
  }

  function handleRatingChangeForKidsProfile() {
    setSelectedRating("10+");
    setIsForKidsProfile(!isForKidsProfile);
  }

  function changeRestriction() {
    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          maturityRating: selectedRating,
          blockedMovies: listOfBlockedMovies,
          kidsProfile: isForKidsProfile === true ? true : false,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setIsCurrentlySaved(true);
    setDisplayedSavedMessage(`${t("viewingRestrictions")} ${t("saved")}.`);
    resetPasswordConfirmationSettings();
  }

  function getIndex(id) {
    return ratings.findIndex((rating) => rating.id === id);
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

  function handleKeyboardNavigationOnSearchingList(e) {
    e.preventDefault();

    const firstListElement =
      e.currentTarget.parentElement.parentElement.firstChild.querySelector("button");
    const lastListElement =
      e.currentTarget.parentElement.parentElement.lastChild.querySelector("button");

    if (e.key === "Escape") {
      clearInput(blockedInputRef);
      blockedInputRef.current.focus();
    } else if (e.key === "ArrowDown") {
      const nextListElement =
        e.currentTarget.parentElement.nextElementSibling?.querySelector("button");
      if (nextListElement) {
        nextListElement.focus();
      } else {
        firstListElement.focus();
      }
    } else if (e.key === "ArrowUp") {
      const previousListElement =
        e.currentTarget.parentElement.previousElementSibling?.querySelector("button");
      if (previousListElement) {
        previousListElement.focus();
      } else {
        lastListElement.focus();
      }
    } else if (e.key === "Home") {
      firstListElement.focus();
    } else if (e.key === "End") {
      lastListElement.focus();
    } else if (e.key === "Enter") {
      e.currentTarget.click();
      blockedInputRef.current.focus();
    } else if (e.key === "Tab") {
      if (e.shiftKey) {
        const previousListElement =
          e.currentTarget.parentElement.previousElementSibling?.querySelector("button");
        if (previousListElement) {
          previousListElement.focus();
        } else {
          blockedInputRef.current.focus();
        }
      } else {
        const nextListElement =
          e.currentTarget.parentElement.nextElementSibling?.querySelector("button");
        if (nextListElement) {
          nextListElement.focus();
        } else {
          clearInput(blockedInputRef);
        }
      }
    }
  }

  function handleKeyboardNavigationOnBlockedList(e) {
    e.preventDefault();
    if (blockedInputRef.current.value !== "") {
      clearInput(blockedInputRef);
    }

    const firstListElement =
      e.currentTarget.parentElement.parentElement.firstChild.querySelector("button");
    const lastListElement =
      e.currentTarget.parentElement.parentElement.lastChild.querySelector("button");
    console.log(lastListElement);

    if (e.key === "ArrowDown") {
      const nextListElement =
        e.currentTarget.parentElement.nextElementSibling?.querySelector("button");
      if (nextListElement) {
        nextListElement.focus();
      } else {
        firstListElement.focus();
      }
    } else if (e.key === "ArrowUp") {
      const previousListElement =
        e.currentTarget.parentElement.previousElementSibling?.querySelector("button");
      if (previousListElement) {
        previousListElement.focus();
      } else {
        lastListElement.focus();
      }
    } else if (e.key === "Home") {
      firstListElement.focus();
    } else if (e.key === "End") {
      lastListElement.focus();
    } else if (e.key === "Enter") {
      e.currentTarget.click();
    } else if (e.key === "Tab") {
      if (e.shiftKey) {
        const previousListElement =
          e.currentTarget.parentElement.previousElementSibling?.querySelector("button");
        if (previousListElement) {
          previousListElement.focus();
        } else {
          blockedInputRef.current.focus();
        }
      } else {
        const nextListElement =
          e.currentTarget.parentElement.nextElementSibling?.querySelector("button");
        if (nextListElement) {
          nextListElement.focus();
        } else {
          const nextFocusableElement =
            e.currentTarget.parentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector(
              "a"
            );
          nextFocusableElement.focus();
        }
      }
    }
  }

  return (
    <CommonAccountLayout
      pageTitle={`${t("viewingRestrictions")} - ${
        passwordConfirmationPassed ? t("settings") : t("passwordConfirmation")
      }`}
      sectionTitle={t("viewingRestrictions")}
    >
      <PasswordConfirmation textDescription={t("viewingRestrictionsDescription")} />

      {passwordConfirmationPassed && (
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend className="restriction-confirmation__subheading">
              {t("profileMaturityRatingFor")} {currentEditingProfile.username}
            </legend>
            {currentEditingProfile.defaultKidsProfile === true && (
              <div className="restriction-confirmation__default-kids-profile-information">
                <em>{t("defaultKidsProfileInformation")}</em>
              </div>
            )}
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
                        className={`radio-account restriction-confirmation__restriction-input ${
                          isChecked ? "active" : ""
                        }`}
                        checked={isChecked}
                        disabled={
                          currentEditingProfile.defaultKidsProfile === true &&
                          !allowedRatingsForKidsProfile.includes(rating.id)
                        }
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
          </fieldset>

          <Divider />

          {currentEditingProfile.id !== users[0].id &&
            !currentEditingProfile.defaultKidsProfile && (
              <>
                <fieldset>
                  <legend className="restriction-confirmation__subheading">
                    {t("kidsProfile")}
                  </legend>
                  <CheckboxAccount
                    name="kids-profile"
                    checked={isForKidsProfile}
                    onChangeFunction={handleRatingChangeForKidsProfile}
                    text={t("displayTitlesForKids")}
                  />
                </fieldset>
                <Divider />
              </>
            )}

          <fieldset>
            <legend className="restriction-confirmation__subheading">
              {t("titlesRestrictionFor")} {currentEditingProfile.username}
              <p className="restriction-confirmation__description-text">
                {t("titlesRestrictionForDescription")}
              </p>
            </legend>
            <div className="restriction-confirmation__form">
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
                        onKeyDown={(e) => handleKeyboardNavigationOnSearchingList(e)}
                      >
                        {item.translation.name[currentProfileLanguageCode]
                          ? item.translation.name[currentProfileLanguageCode]
                          : item.translation.name.en}
                        {" ("}
                        {item.productionYear}
                        {")"}
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
                        onKeyDown={(e) => handleKeyboardNavigationOnBlockedList(e)}
                      >
                        <CloseIcon />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </fieldset>

          <BtnsWrapperAccount
            btnAccentText={t("save")}
            btnAccentPath="/account"
            btnAccentFunction={changeRestriction}
            btnLightText={t("cancel")}
            btnLightPath="/account"
            btnLightFunction={resetPasswordConfirmationSettings}
            center
            extraSpace
          />
        </form>
      )}
    </CommonAccountLayout>
  );
}
