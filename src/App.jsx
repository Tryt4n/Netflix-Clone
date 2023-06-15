import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./layout/Navbar/Navbar";
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
import PasswordConfirmationPage from "./pages/PasswordConfirmationPage/PasswordConfirmationPage";

export default function App() {
  const location = useLocation();
  const allowedPaths = ["/home", "/movies", "/latest", "/my-list", "/original-audio"];
  const showNavbar = allowedPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          index={true}
          element={<UserSelectPage />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/series"
          element={<TVShows />}
        />
        <Route
          path="/movies"
          element={<Movies />}
        />
        <Route
          path="/latest"
          element={<NewPopular />}
        />
        <Route
          path="/my-list"
          element={<MyList />}
        />
        <Route
          path="/original-audio"
          element={<BrowseLanguage />}
        />
        <Route
          path="/Kids"
          element={<Kids />}
        />
        <Route
          path="/ManageProfiles"
          element={<ManageProfilesPage />}
        />
        <Route
          path="/ManageProfiles/:id"
          element={<UserSettingsPage />}
        />
        <Route
          path="/ManageProfiles/:id/EditProfile"
          element={<EditProfile />}
        />
        <Route
          path="/Confirmation"
          element={<PasswordConfirmationPage />}
        />
      </Routes>
    </>
  );
}
