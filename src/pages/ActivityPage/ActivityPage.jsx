import { Link } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../../context/UserContext";

import CommonAccountLayout from "../../layout/CommonAccountLayout/CommonAccountLayout";
import BtnsWrapperAccount from "../../layout/BtnsWrapperAccount/BtnsWrapperAccount";

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

  const {
    currentEditingProfile,
    watchingActivity,
    setWatchingActivity,
    users,
    setUsers,
    reportedMovie,
    setReportedMovie,
    isReported,
  } = useContext(UserContext);
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
    verticalImage: movie.verticalImage,
    id: movie.id,
    whenWatched: movie.whenWatched,
    whenWatchedDetail: moment(movie.whenWatched, "DD.MM.YYYY").toDate(),
  }));

  const watchedSeriesList = currentEditingProfile.series.map((series) => {
    const seasonList = Object.entries(series.seasons).map(([season, episodes]) => {
      return episodes.map((episode) => ({
        seriesName: series.name,
        verticalImage: series.verticalImage,
        id: episode.id,
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

  function reportMovie(entry) {
    setReportedMovie(entry);
  }

  function handleLoadMore() {
    if (watchingActivity === "watching") {
      setVisibleMovieItems((prevState) => Math.min(prevState + 20, totalMovieItems));
    } else if (watchingActivity === "rating") {
      setVisibleRatingItems((prevState) => Math.min(prevState + 20, totalRatingItems));
    } else return;
  }

  const downloadListAsTxt = () => {
    const textContent = watchedList
      .map((item) => {
        if (item.seriesName) {
          return `${item.seriesName}: ${t("season")} ${item.season}: ${item.name}, "${
            item.whenWatched
          }"`;
        } else {
          return `${item.name}, "${item.whenWatched}"`;
        }
      })
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "watched_list.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  function reset() {
    setVisibleMovieItems(20);
    setVisibleRatingItems(20);
    setDeletedItems([]);
    setIsBtnHideAllDisabled(false);
    setReportedMovie({});
  }

  const CustomHeader = () => {
    return (
      <div>
        <h2 className="activity-page__heading">
          {t("activityFor")} {currentEditingProfile.username}
        </h2>
        <div
          className="activity-page__tabs-container"
          role="tablist"
        >
          <button
            className={`activity-page__tab${watchingActivity === "watching" ? " active" : ""}`}
            onClick={() => setWatchingActivity("watching")}
            disabled={watchingActivity === "watching"}
            role="tab"
            aria-selected={watchingActivity === "watching" ? true : false}
          >
            {t("watching")}
          </button>
          <button
            className={`activity-page__tab${watchingActivity === "rating" ? " active" : ""}`}
            onClick={() => setWatchingActivity("rating")}
            disabled={watchingActivity === "rating"}
            role="tab"
            aria-selected={watchingActivity === "rating" ? true : false}
          >
            {t("rating")}
          </button>
        </div>
      </div>
    );
  };

  return (
    <CommonAccountLayout
      pageTitle={t("activityPage")}
      sectionTitle={<CustomHeader />}
    >
      {watchingActivity === "watching" && totalMovieItems <= 0 && (
        <strong className="activity-page__warning-empty">{t("noWatchHistory")}</strong>
      )}
      {watchingActivity === "rating" && totalRatingItems <= 0 && (
        <strong className="activity-page__warning-empty">{t("noRatingMovies")}</strong>
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
                          ? `${entry.seriesName}: ${t("season")} ${entry.season}: "${entry.name}"`
                          : entry.name}
                      </a>
                    </div>

                    <Link
                      to={`/reportproblem/${entry.id}`}
                      className={`activity-page__list-item-report-text${
                        isReported && reportedMovie.id === entry.id ? " reported" : ""
                      }`}
                      onClick={() => reportMovie(entry)}
                      disabled={isReported && reportedMovie.id === entry.id}
                    >
                      {isReported && reportedMovie.id === entry.id
                        ? t("problemReported")
                        : t("problemReport")}
                    </Link>
                    <div className="activity-page__list-item-hiding-btn-wrapper">
                      <button
                        className="activity-page__list-item-remove-btn"
                        onClick={() => handleDeleteFromViewed(entry)}
                        aria-label={t("removeFromViewed")}
                        aria-describedby={`history-tooltip-${entry.id}`}
                        aria-haspopup="true"
                        aria-controls={`history-tooltip-${entry.id}`}
                      >
                        ⊘
                      </button>
                      <span
                        id={`history-tooltip-${entry.id}`}
                        aria-live=""
                      >
                        {t("hideFromViewingHistory")}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="activity-page__list-item-delete-container">
                    <p className="activity-page__list-item-delete-text">
                      {t("within24Hours")},{" "}
                      <strong>
                        {entry.seriesName
                          ? `${entry.seriesName}: ${t("season")} ${entry.season}: "${entry.name}"`
                          : entry.name}
                      </strong>{" "}
                      {t("willNoLongerAppear")} <a href="#">{t("learnMore")}</a>.
                    </p>
                    {entry.seriesName && (
                      <button
                        href="#"
                        className="activity-page__list-item-delete-btn"
                        onClick={() => handleDeleteWholeSeries(entry)}
                      >
                        {t("hideSeries")}
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
                      entry.rating === "dislike" ? t("alreadyRateDislike") : t("rateDislike")
                    }
                    onClick={() => handleRatingChange(entry, "dislike")}
                  >
                    {entry.rating === "dislike" ? <DislikeIconFilled /> : <DislikeIcon />}
                    <span className="visually-hidden">{t("dislike")}</span>
                  </button>
                  <button
                    className="activity-page__rating-btn"
                    data-rating="like"
                    aria-label={entry.rating === "like" ? t("alreadyRateLike") : t("rateLike")}
                    onClick={() => handleRatingChange(entry, "like")}
                  >
                    {entry.rating === "like" ? <LikeIconFilled /> : <LikeIcon />}
                    <span className="visually-hidden">{t("like")}</span>
                  </button>
                  <button
                    className="activity-page__rating-btn"
                    data-rating="superlike"
                    aria-label={
                      entry.rating === "superlike" ? t("alreadyRateSuperlike") : t("rateSuperlike")
                    }
                    onClick={() => handleRatingChange(entry, "superlike")}
                  >
                    {entry.rating === "superlike" ? <SuperLikeIconFilled /> : <SuperLikeIcon />}
                    <span className="visually-hidden">{t("superlike")}</span>
                  </button>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>

      <div className="activity-page__btns-wrapper">
        <BtnsWrapperAccount
          btnAccentText={t("showMore")}
          btnAccentFunction={handleLoadMore}
          btnLightText={t("backToAccount")}
          btnLightPath="/account"
          btnLightFunction={reset}
          withoutSpace
          disabled={
            watchingActivity === "watching"
              ? visibleMovieItems >= totalMovieItems
              : visibleRatingItems >= totalRatingItems
          }
        />
        {watchingActivity === "watching" && totalMovieItems > 0 && (
          <div>
            <button
              className="activity-page__operating-btn"
              onClick={handleDeleteAllViewingHistory}
              disabled={isBtnHideAllDisabled}
            >
              {t("hideAll")}
            </button>
            <button
              className="activity-page__operating-btn"
              onClick={downloadListAsTxt}
            >
              {t("downloadAll")}
            </button>
          </div>
        )}
      </div>
    </CommonAccountLayout>
  );
}
