import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import NewPopular from "./pages/NewPopular";
import MyList from "./pages/MyList";
import BrowseLanguage from "./pages/BrowseLanguages";
import Kids from "./pages/Kids";
import UserSelectPage from "./pages/UserSelectPage/UserSelectPage";
import ManageProfilesPage from "./pages/ManageProfilesPage/ManageProfilesPage";
import UserSettingsPage from "./pages/UserSettingsPage/UserSettingsPage";
import EditProfile from "./pages/EditProfile/EditProfile";
import AccountPage from "./pages/AccountPage/AccountPage";
import RestrictionPage from "./pages/RestrictionPage/RestrictionPage";
import LanguageChangePage from "./pages/LanguageChangePage/LanguageChangePage";
import PINCodePage from "./pages/PINCodePage/PINCodePage";
import ActivityPage from "./pages/ActivityPage/ActivityPage";
import ReportProblemPage from "./pages/ReportProblemPage/ReportProblemPage";
import SubtitlesAppearancePage from "./pages/SubtitlesAppearancePage/SubtitlesAppearancePage";
import PlaybackPage from "./pages/PlaybackPage/PlaybackPage";
import CommunicationPage from "./pages/CommunicationPage/CommunicationPage";
import PrivacyAndDataPage from "./pages/PrivacyAndDataPage/PrivacyAndDataPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          index={true}
          element={<UserSelectPage />}
        />
        <Route
          path="home"
          element={<Home />}
        />
        <Route
          path="series"
          element={<TVShows />}
        />
        <Route
          path="movies"
          element={<Movies />}
        />
        <Route
          path="latest"
          element={<NewPopular />}
        />
        <Route
          path="my-list"
          element={<MyList />}
        />
        <Route
          path="original-audio"
          element={<BrowseLanguage />}
        />
        <Route
          path="Kids"
          element={<Kids />}
        />
        <Route
          path="ManageProfiles"
          element={<ManageProfilesPage />}
        />
        <Route
          path="ManageProfiles/:id"
          element={<UserSettingsPage />}
        />
        <Route
          path="ManageProfiles/:id/EditProfile"
          element={<EditProfile />}
        />
        <Route
          path="Account"
          element={<AccountPage />}
        />
        <Route path="settings">
          <Route
            path="viewing-restriction"
            element={<RestrictionPage />}
          />
          <Route
            path="language"
            element={<LanguageChangePage />}
          />
          <Route
            path="lock"
            element={<PINCodePage />}
          />
          <Route
            path="viewed"
            element={<ActivityPage />}
          />
          <Route
            path="subtitles"
            element={<SubtitlesAppearancePage />}
          />
          <Route
            path="playback"
            element={<PlaybackPage />}
          />
          <Route
            path="communicationPreference"
            element={<CommunicationPage />}
          />
          <Route
            path="privacy"
            element={<PrivacyAndDataPage />}
          />
        </Route>
        <Route
          path="reportproblem/:id"
          element={<ReportProblemPage />}
        />
      </Routes>
    </>
  );
}
