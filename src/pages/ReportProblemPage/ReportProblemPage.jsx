import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import TextareaAutosize from "react-textarea-autosize";

import "./reportProblemPage.scss";

import { useTranslation } from "react-i18next";

export default function ReportProblemPage() {
  const { t } = useTranslation();

  const { reportedMovie, removeReportedMovie, setIsReported } = useContext(UserContext);

  useEffect(() => {
    setIsReported(false);
  }, []);

  function reportProblem() {
    setIsReported(true);
  }

  function reset() {
    removeReportedMovie();
  }

  return (
    <>
      <header>
        <h1 className="visually-hidden">{t("problemsPage")}</h1>
        <NavbarShort />
      </header>

      <div className="settings-wrapper">
        <main className="settings-container report-problem">
          <header>
            <h2 className="report-problem__heading">{t("problemsWatching")}</h2>
            <p className="report-problem__subheading">
              {reportedMovie.seriesName
                ? `${reportedMovie.seriesName} - ${t("season")} ${reportedMovie.season}: "${
                    reportedMovie.name
                  }"`
                : reportedMovie.name}
            </p>
          </header>

          <div className="report-problem__wrapper">
            <img
              src={reportedMovie.verticalImage}
              alt={`${reportedMovie.seriesName ? reportedMovie.seriesName : reportedMovie.name} ${t(
                "image"
              )}`}
              className="report-problem__image"
            />
            <form className="report-problem__form">
              <legend>{t("checkAllApply")}</legend>

              <div className="report-problem__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="mislabeledMovie"
                  id="mislabeledMovie"
                  className="checkbox-light"
                />
                <label
                  htmlFor="mislabeledMovie"
                  className="report-problem__checkbox-label"
                >
                  <span>{t("mislabeledMovie")}</span>
                  <small>({t("mislabeledMovieSubheading")})</small>
                </label>
              </div>

              <div className="report-problem__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="videoProblems"
                  id="videoProblems"
                  className="checkbox-light"
                />
                <label
                  htmlFor="videoProblems"
                  className="report-problem__checkbox-label"
                >
                  <span>{t("videoProblems")}</span>
                  <small>({t("videoProblemsSubheading")})</small>
                </label>
              </div>

              <div className="report-problem__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="soundProblems"
                  id="soundProblems"
                  className="checkbox-light"
                />
                <label
                  htmlFor="soundProblems"
                  className="report-problem__checkbox-label"
                >
                  <span>{t("soundProblems")}</span>
                  <small>({t("soundProblemsSubheading")})</small>
                </label>
              </div>

              <div className="report-problem__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="subtitlesProblems"
                  id="subtitlesProblems"
                  className="checkbox-light"
                />
                <label
                  htmlFor="subtitlesProblems"
                  className="report-problem__checkbox-label"
                >
                  <span>{t("subtitlesProblems")}</span>
                  <small>({t("subtitlesProblemsSubheading")})</small>
                </label>
              </div>

              <div className="report-problem__textarea-wrapper">
                <label
                  htmlFor="comments"
                  className="report-problem__textarea-label"
                >
                  {t("anyMoreDetails")}
                </label>
                <TextareaAutosize
                  name="comments"
                  id="comments"
                  minRows={4}
                  className="report-problem__textarea"
                />
              </div>

              <div className="report-problem__btns-wrapper">
                <AccountSettingsBtn
                  text={t("reportProblem")}
                  currentClass="accent"
                  path={"/settings/viewed"}
                  onClickFunction={() => reportProblem()}
                />

                <AccountSettingsBtn
                  text={t("cancel")}
                  currentClass="light"
                  path={"/settings/viewed"}
                  onClickFunction={reset}
                />
              </div>
            </form>
          </div>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
