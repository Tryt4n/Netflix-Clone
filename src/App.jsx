import { useContext } from "react";
import UserContext from "./context/UserContext";

import { Route, Routes } from "react-router-dom";

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

export default function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route
          // index={true}
          path="/"
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
      </Routes>
    </>
  );
}
