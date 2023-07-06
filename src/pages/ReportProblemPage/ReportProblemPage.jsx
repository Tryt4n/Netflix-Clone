import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import TextareaAutosize from "react-textarea-autosize";
import CheckboxAccount from "../../components/CheckboxAccount/CheckboxAccount";
import BtnsWrapperAccount from "../../layout/BtnsWrapperAccount/BtnsWrapperAccount";

import "./reportProblemPage.scss";

import { useTranslation } from "react-i18next";

export default function ReportProblemPage() {
  const { t } = useTranslation();

  const { reportedMovie, removeReportedMovie, setIsReported } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsReported(false);
    if (reportedMovie.name === undefined) {
      navigate("/account");
    }
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
            <form onSubmit={(e) => e.preventDefault()}>
              <legend className="report-problem__legend">{t("checkAllApply")}</legend>

              <CheckboxAccount
                name="mislabeledMovie"
                text={t("mislabeledMovie")}
                textSmall={t("mislabeledMovieSubheading")}
              />

              <CheckboxAccount
                name="videoProblems"
                text={t("videoProblems")}
                textSmall={t("videoProblemsSubheading")}
              />

              <CheckboxAccount
                name="soundProblems"
                text={t("soundProblems")}
                textSmall={t("soundProblemsSubheading")}
              />

              <CheckboxAccount
                name="subtitlesProblems"
                text={t("subtitlesProblems")}
                textSmall={t("subtitlesProblemsSubheading")}
              />

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

              <BtnsWrapperAccount
                btnAccentText={t("reportProblem")}
                btnAccentFunction={reportProblem}
                btnAccentPath="/settings/viewed"
                btnLightText={t("cancel")}
                btnLightFunction={reset}
                btnLightPath="/settings/viewed"
              />
            </form>
          </div>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
