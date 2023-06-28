import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

import "./activityPage.scss";

import moment from "moment/moment";
import { useTranslation } from "react-i18next";

export default function ActivityPage() {
  const { t } = useTranslation();

  const { currentEditingProfile, watchingActivity, setWatchingActivity } = useContext(UserContext);
  const [visibleMovieItems, setVisibleMovieItems] = useState(20);
  const [visibleRatingItems, setVisibleRatingItems] = useState(20);

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

  //* Rating
  const ratingMoviesList = currentEditingProfile.movies
    .filter((movie) => movie.rating)
    .map((movie) => ({
      name: movie.name,
      rating: movie.rating,
      ratingDate: movie.ratingDate,
      ratingDateDetail: moment(movie.whenWatched, "DD.MM.YYYY").toDate(),
    }));

  const ratingSeriesList = currentEditingProfile.series
    .filter((series) => series.rating)
    .map((series) => ({
      name: series.name,
      rating: series.rating,
      ratingDate: series.ratingDate,
      ratingDateDetail: moment(series.ratingDate, "DD.MM.YYYY").toDate(),
    }));

  const ratingList = ratingMoviesList.concat(...ratingSeriesList);
  ratingList.sort((a, b) => moment(b.ratingDateDetail).diff(a.ratingDateDetail));
  const totalRatingItems = ratingList.length;
  console.log(ratingList);
  //////////////////////////////////////////////////////////////////////////////////////////*

  const handleLoadMore = () => {
    if (watchingActivity === "watching") {
      setVisibleMovieItems((prevState) => Math.min(prevState + 20, totalMovieItems));
    } else if (watchingActivity === "rating") {
      setVisibleRatingItems((prevState) => Math.min(prevState + 20, totalRatingItems));
    } else return;
  };

  // console.log(watchedList);

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

          {/* <ul>
            {watchedList.slice(0, visibleMovieItems).map((entry) => (
              <li
                key={crypto.randomUUID()}
                className="activity-page__list-item"
              >
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

                <a href="#">Report a problem</a>
                <div className="activity-page__list-item-hiding-btn-wrapper">
                  <button>⊘</button>
                  <span>Hide from viewing history</span>
                </div>
              </li>
            ))}
          </ul> */}
          <ul>
            {watchingActivity === "watching" ? (
              <>
                {watchedList.slice(0, visibleMovieItems).map((entry) => (
                  <li
                    key={crypto.randomUUID()}
                    className="activity-page__list-item"
                  >
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

                    <a href="#">Report a problem</a>
                    <div className="activity-page__list-item-hiding-btn-wrapper">
                      <button>⊘</button>
                      <span>Hide from viewing history</span>
                    </div>
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
                      dateTime={entry.ratingDateDetail}
                      className="activity-page__list-item-date"
                    >
                      {entry.ratingDate}
                    </time>
                    <div className="activity-page__list-item-title">
                      <a href="#">{entry.name}</a>
                    </div>
                    <div>
                      <button>1</button>
                      <button>2</button>
                      <button>3</button>
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
                isDisabled={visibleMovieItems >= totalMovieItems ? true : false}
                onClickFunction={handleLoadMore}
                key={watchingActivity === "watching" ? "watching" : "rating"}
              />
              <AccountSettingsBtn
                text={t("Back to Your Account")}
                currentClass="light"
                path={"/account"}
              />
            </div>
            <div className="activity-page__">
              <button className="activity-page__operating-btn">Hide all</button>
              <button className="activity-page__operating-btn">Download all</button>
            </div>
          </div>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
