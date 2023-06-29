import { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import LikeIcon from "../../icons/LikeIcon";
import LikeIconFilled from "../../icons/LikeIconFilled";
import SuperLikeIcon from "../../icons/SuperLikeIcon";
import SuperLikeIconFilled from "../../icons/SuperLikeIconFilled";
import DislikeIcon from "../../icons/DislikeIcon";
import DislikeIconFilled from "../../icons/DislikeIconFilled";

import "./activityPage.scss";

import moment from "moment/moment";
import { useTranslation } from "react-i18next";

export default function ActivityPage() {
  const { t } = useTranslation();

  const { currentEditingProfile, watchingActivity, setWatchingActivity, users, setUsers } =
    useContext(UserContext);
  const [visibleMovieItems, setVisibleMovieItems] = useState(20);
  const [visibleRatingItems, setVisibleRatingItems] = useState(20);
  const [deletedItems, setDeletedItems] = useState([]);
  const [isBtnHideAllDisabled, setIsBtnHideAllDisabled] = useState(false);

  //* Rating
  const [ratingList, setRatingList] = useState([]);
  const sortedRatingList = useMemo(() => {
    //* Sorted ratingList
    return [...currentEditingProfile.ratings].sort((a, b) => {
      const dateA = moment(a.ratingDate, "DD.MM.YYYY");
      const dateB = moment(b.ratingDate, "DD.MM.YYYY");
      return dateB - dateA;
    });
  }, [currentEditingProfile.ratings]);

  useEffect(() => {
    setRatingList(sortedRatingList);
  }, [sortedRatingList]);

  const totalRatingItems = ratingList.length;
  //////////////////////////////////////////////////////////////////////////////////////////*

  //* Watching
  const watchedMovieList = currentEditingProfile.movies.map((movie) => ({
    name: movie.name,
    whenWatched: movie.whenWatched,
    whenWatchedDetail: moment(movie.whenWatched, "DD.MM.YYYY").toDate(),
  }));

  const watchedSeriesList = currentEditingProfile.series.map((series) => {
    const seasonList = Object.entries(series.seasons).map(([season, episodes]) => {
      return episodes.map((episode) => ({
        seriesName: series.name,
        name: episode.name,
        season: season,
        whenWatched: episode.whenWatched,
        whenWatchedDetail: moment(episode.whenWatched, "DD.MM.YYYY").toDate(),
      }));
    });

    return seasonList.flat();
  });

  const watchedList = watchedMovieList.concat(...watchedSeriesList);
  watchedList.sort((a, b) => moment(b.whenWatchedDetail).diff(a.whenWatchedDetail));
  const totalMovieItems = watchedList.length;
  //////////////////////////////////////////////////////////////////////////////////////////*

  function handleDeleteFromViewed(entry) {
    setDeletedItems((prevState) => [...prevState, entry.name]);

    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        const updatedMovies = user.movies.filter((movie) => movie.name !== entry.name);
        const updatedSeries = user.series
          .map((series) => {
            const updatedSeasons = Object.entries(series.seasons).reduce(
              (acc, [season, episodes]) => {
                const updatedEpisodes = episodes.filter((episode) => episode.name !== entry.name);
                if (updatedEpisodes.length > 0) {
                  acc[season] = updatedEpisodes;
                }
                return acc;
              },
              {}
            );

            if (Object.keys(updatedSeasons).length > 0) {
              return {
                ...series,
                seasons: updatedSeasons,
              };
            }
            return null;
          })
          .filter(Boolean);

        return {
          ...user,
          movies: updatedMovies,
          series: updatedSeries,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  }

  function handleDeleteWholeSeries(entry) {
    const deletingSeriesName = entry.seriesName;
    const deletedEpisodes = [];

    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        const updatedSeries = user.series.filter((series) => {
          if (series.name === deletingSeriesName) {
            Object.values(series.seasons).forEach((season) => {
              season.forEach((episode) => {
                deletedEpisodes.push(episode.name);
              });
            });
            return false; //* Deleting whole series
          }
          return true; //* Keeping the rest of the series
        });

        return {
          ...user,
          series: updatedSeries,
        };
      }

      return user;
    });

    setUsers(updatedUsers);
    setDeletedItems((prevState) => [...prevState, ...deletedEpisodes]);
  }

  function handleDeleteAllViewingHistory() {
    setDeletedItems((prevState) => {
      const allItems = [
        ...prevState,
        ...currentEditingProfile.movies.map((movie) => movie.name),
        ...currentEditingProfile.series.flatMap((series) =>
          Object.values(series.seasons).flatMap((season) => season.map((episode) => episode.name))
        ),
      ];
      return allItems;
    });

    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          movies: [],
          series: [],
        };
      }
      return user;
    });

    setIsBtnHideAllDisabled(true);
    setUsers(updatedUsers);
  }

  function handleRatingChange(entry, newRating) {
    const updatedRatingList = ratingList.map((ratingEntry) => {
      if (ratingEntry.name === entry.name && ratingEntry.ratingDate === entry.ratingDate) {
        if (ratingEntry.rating === newRating) {
          return null; //* Item deletion
        } else {
          return {
            ...ratingEntry,
            rating: newRating,
            ratingDate: moment().format("DD.MM.YYYY"),
          };
        }
      }
      return ratingEntry;
    });

    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          ratings: updatedRatingList.filter((entry) => entry !== null),
        };
      }
      return user;
    });

    setRatingList(updatedRatingList.filter((entry) => entry !== null)); //* Item deletion
    setUsers(updatedUsers);
  }

  function handleLoadMore() {
    if (watchingActivity === "watching") {
      setVisibleMovieItems((prevState) => Math.min(prevState + 20, totalMovieItems));
    } else if (watchingActivity === "rating") {
      setVisibleRatingItems((prevState) => Math.min(prevState + 20, totalRatingItems));
    } else return;
  }

  function reset() {
    setVisibleMovieItems(20);
    setVisibleRatingItems(20);
    setDeletedItems([]);
    setIsBtnHideAllDisabled(false);
  }

  return (
    <>
      <header>
        <h1 className="visually-hidden">Activity Settings Page</h1>
        <NavbarShort />
      </header>
      <div className="activity-page">
        <main className="settings-container">
          <header className="activity-page__header-container">
            <div>
              <h2 className="activity-page__heading">
                Activity for {currentEditingProfile.username}
              </h2>
              <div className="activity-page__tabs-container">
                <button
                  className={`activity-page__tab${
                    watchingActivity === "watching" ? " active" : ""
                  }`}
                  onClick={() => setWatchingActivity("watching")}
                  disabled={watchingActivity === "watching"}
                >
                  Watching
                </button>
                <button
                  className={`activity-page__tab${watchingActivity === "rating" ? " active" : ""}`}
                  onClick={() => setWatchingActivity("rating")}
                  disabled={watchingActivity === "rating"}
                >
                  Rating
                </button>
              </div>
            </div>
            <img
              className="language-change__profile-img"
              src={currentEditingProfile.profileImage}
              alt={`${t("profileAvatar")} ${
                currentEditingProfile.kidsProfile ? t("Kids") : currentEditingProfile.username
              } `}
            />
          </header>

          {watchingActivity === "watching" && totalMovieItems <= 0 && (
            <strong className="activity-page__warning-empty">There is no watch history.</strong>
          )}
          {watchingActivity === "rating" && totalRatingItems <= 0 && (
            <strong className="activity-page__warning-empty">
              There are no rated movies or series.
            </strong>
          )}

          <ul>
            {watchingActivity === "watching" ? (
              <>
                {watchedList.slice(0, visibleMovieItems).map((entry) => (
                  <li
                    key={crypto.randomUUID()}
                    className="activity-page__list-item"
                  >
                    {!deletedItems.includes(entry.name) ? (
                      <>
                        <time
                          dateTime={entry.whenWatchedDetail}
                          className="activity-page__list-item-date"
                        >
                          {entry.whenWatched}
                        </time>
                        <div className="activity-page__list-item-title">
                          <a href="#">
                            {entry.seriesName
                              ? `${entry.seriesName}: Season ${entry.season}: "${entry.name}"`
                              : entry.name}
                          </a>
                        </div>

                        <a
                          href="#"
                          className="activity-page__list-item-report-text"
                        >
                          Report a problem
                        </a>
                        <div className="activity-page__list-item-hiding-btn-wrapper">
                          <button
                            className="activity-page__list-item-remove-btn"
                            onClick={() => handleDeleteFromViewed(entry)}
                          >
                            ⊘
                          </button>
                          <span>Hide from viewing history</span>
                        </div>
                      </>
                    ) : (
                      <div className="activity-page__list-item-delete-container">
                        <p className="activity-page__list-item-delete-text">
                          Within 24 hours,{" "}
                          <strong>
                            {entry.seriesName
                              ? `${entry.seriesName}: Season ${entry.season}: "${entry.name}"`
                              : entry.name}
                          </strong>{" "}
                          will no longer appear in the Netflix service as a title you have watched
                          and will no longer be used to make recommendations to you, unless you
                          watch it again. <a href="#">Learn more.</a>
                        </p>
                        {entry.seriesName && (
                          <button
                            href="#"
                            className="activity-page__list-item-delete-btn"
                            onClick={() => handleDeleteWholeSeries(entry)}
                          >
                            Hide series?
                          </button>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </>
            ) : (
              <>
                {ratingList.slice(0, visibleRatingItems).map((entry) => (
                  <li
                    key={crypto.randomUUID()}
                    className="activity-page__list-item"
                  >
                    <time
                      dateTime={entry.ratingDate}
                      className="activity-page__list-item-date"
                    >
                      {entry.ratingDate}
                    </time>
                    <div className="activity-page__list-item-title">
                      <a href="#">{entry.name}</a>
                    </div>
                    <div className="activity-page__list-item-btn-rating-container">
                      <button
                        className="activity-page__rating-btn"
                        data-rating="dislike"
                        aria-label={
                          entry.rating === "dislike"
                            ? "Already rated: thumbs down (click to remove rating)"
                            : "Rate Thumbs Down"
                        }
                        onClick={() => handleRatingChange(entry, "dislike")}
                      >
                        {entry.rating === "dislike" ? <DislikeIconFilled /> : <DislikeIcon />}
                        <span className="visually-hidden">Dislike</span>
                      </button>
                      <button
                        className="activity-page__rating-btn"
                        data-rating="like"
                        aria-label={
                          entry.rating === "like"
                            ? "Already rated: thumbs up (click to remove rating)"
                            : "Rate Thumbs Up"
                        }
                        onClick={() => handleRatingChange(entry, "like")}
                      >
                        {entry.rating === "like" ? <LikeIconFilled /> : <LikeIcon />}
                        <span className="visually-hidden">Like</span>
                      </button>
                      <button
                        className="activity-page__rating-btn"
                        data-rating="superlike"
                        aria-label={
                          entry.rating === "superlike"
                            ? "Already rated: two thumbs up (click to remove rating)"
                            : "Rate Two Thumbs Up"
                        }
                        onClick={() => handleRatingChange(entry, "superlike")}
                      >
                        {entry.rating === "superlike" ? <SuperLikeIconFilled /> : <SuperLikeIcon />}
                        <span className="visually-hidden">Superlike</span>
                      </button>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>

          <div className="activity-page__btns-wrapper">
            <div>
              <AccountSettingsBtn
                text={t("Show More")}
                currentClass="accent"
                isDisabled={
                  watchingActivity === "watching"
                    ? visibleMovieItems >= totalMovieItems
                    : visibleRatingItems >= totalRatingItems
                }
                onClickFunction={handleLoadMore}
                key={watchingActivity === "watching" ? "watching" : "rating"}
              />

              <AccountSettingsBtn
                text={t("Back to Your Account")}
                currentClass="light"
                path={"/account"}
                onClickFunction={reset}
              />
            </div>
            {watchingActivity === "watching" && totalMovieItems > 0 && (
              <div>
                <button
                  className="activity-page__operating-btn"
                  onClick={handleDeleteAllViewingHistory}
                  disabled={isBtnHideAllDisabled}
                >
                  Hide all
                </button>
                <button className="activity-page__operating-btn">Download all</button>
              </div>
            )}
          </div>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
