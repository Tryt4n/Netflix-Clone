import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import "./activityPage.scss";

import { useTranslation } from "react-i18next";

export default function ActivityPage() {
  const { t } = useTranslation();

  const { currentEditingProfile } = useContext(UserContext);
  //   console.log(currentEditingProfile);

  const watchedMovieList = currentEditingProfile.movies.map((movie) => ({
    name: movie.name,
    whenWatched: movie.whenWatched,
  }));

  const watchedSeriesList = currentEditingProfile.series.map((series) => {
    const seasonList = Object.entries(series.seasons).map(([season, episodes]) => {
      return episodes.map((episode) => ({
        seriesName: series.name,
        name: episode.name,
        season: season,
        whenWatched: episode.whenWatched,
      }));
    });

    return seasonList.flat();
  });

  const watchedList = watchedMovieList.concat(...watchedSeriesList);
  //   console.log(watchedList);

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
                <button className="activity-page__tab active">Watching</button>
                <button className="activity-page__tab">Rating</button>
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

          <ul>
            {watchedList.map((entry) => (
              <li
                key={crypto.randomUUID()}
                className="activity-page__list-item"
              >
                <time className="activity-page__list-item-date">{entry.whenWatched}</time>
                <div className="activity-page__list-item-title">
                  <a href="#">
                    {entry.seriesName
                      ? `${entry.seriesName}: Season ${entry.season}: "${entry.name}"`
                      : entry.name}
                  </a>
                </div>

                {/* <div> */}
                <a href="#">Report a problem</a>
                <div className="activity-page__list-item-hiding-btn-wrapper">
                  <button>⊘</button>
                  <span>Hide from viewing history</span>
                </div>
                {/* </div> */}
              </li>
            ))}
          </ul>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
