import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import "./subtitlesAppearancePage.scss";
import { useTranslation } from "react-i18next";
import { Option, Select } from "@mui/base";
import useSelect from "@mui/base/useSelect";

export default function SubtitlesAppearancePage() {
  const { t } = useTranslation();

  const { currentEditingProfile } = useContext(UserContext);

  console.log(useSelect);

  return (
    <>
      <header>
        <h1 className="visually-hidden">Settings - Subtitles</h1>
        <NavbarShort />
      </header>

      <div className="subtitles settings-wrapper">
        <main className="settings-container">
          <header className="subtitles__header">
            <h2 className="subtitles__heading">Subtitle Appearance</h2>
            <img
              className="language-change__profile-img"
              src={currentEditingProfile.profileImage}
              alt={`${t("profileAvatar")} ${
                currentEditingProfile.kidsProfile ? t("Kids") : currentEditingProfile.username
              } `}
            />
          </header>
          <p className="subtitles__subheading">
            Change the way subtitles appear for {currentEditingProfile.username} on all supported
            devices.
          </p>

          <form className="subtitles__form">
            <div className="subtitles__visualization-container">
              <span>These settings affect subtitles on all supported devices.</span>
            </div>

            <div className="subtitles__settings-container">
              <fieldset className="subtitles__settings-inner-container">
                <legend>Font</legend>
                <Select
                  defaultValue="block"
                  slotProps={{
                    root: { className: "subtitles__settings-text-btn" },
                    // popper: { className: "subtitles__list-container" },
                    listbox: { className: "subtitles__list subtitles__list--text" },
                  }}
                >
                  <Option value="typewriter">typewriter</Option>
                  <Option value="print">print</Option>
                  <Option value="console">console</Option>
                  <Option value="block">block</Option>
                  <Option value="casual">casual</Option>
                  <Option value="cursive">cursive</Option>
                  <Option value="small-caps">small caps</Option>
                </Select>
                <Select
                  defaultValue="white"
                  slotProps={{
                    root: { className: "subtitles__settings-color-btn" },
                    listbox: { className: "subtitles__list subtitles__list--color" },
                  }}
                >
                  <Option value="white">white</Option>
                  <Option value="black">black</Option>
                  <Option value="red">red</Option>
                  <Option value="green">green</Option>
                  <Option value="blue">blue</Option>
                  <Option value="yellow">yellow</Option>
                  <Option value="magenta">magenta</Option>
                  <Option value="cyan">cyan</Option>
                  <div>
                    <input
                      type="checkbox"
                      name="font-color-transparency"
                      id="font-color-transparency"
                      tabIndex={0}
                    />
                    <label htmlFor="font-color-transparency">Semitransparent</label>
                  </div>
                </Select>
              </fieldset>

              <fieldset>
                <legend>Text Size: Medium</legend>
              </fieldset>

              <fieldset className="subtitles__settings-inner-container">
                <legend>Shadow</legend>
                <Select
                  defaultValue="drop-shadow"
                  slotProps={{
                    root: { className: "subtitles__settings-text-btn" },
                    listbox: { className: "font-select__list" },
                  }}
                >
                  <Option value="none">none</Option>
                  <Option value="raised">raised</Option>
                  <Option value="depressed">depressed</Option>
                  <Option value="uniform">uniform</Option>
                  <Option value="drop-shadow">drop shadow</Option>
                </Select>
                <Select
                  defaultValue="black"
                  slotProps={{
                    root: { className: "subtitles__settings-color-btn" },
                    listbox: { className: "font-select__list" },
                  }}
                >
                  <Option value="white">white</Option>
                  <Option value="black">black</Option>
                  <Option value="red">red</Option>
                  <Option value="green">green</Option>
                  <Option value="blue">blue</Option>
                  <Option value="yellow">yellow</Option>
                  <Option value="magenta">magenta</Option>
                  <Option value="cyan">cyan</Option>
                </Select>
              </fieldset>

              <div>
                <fieldset>
                  <legend>Background</legend>
                </fieldset>

                <fieldset>
                  <legend>Window</legend>
                </fieldset>
              </div>
            </div>

            <div className="subtitles__form-btns-wrapper">
              <AccountSettingsBtn
                text={t("save")}
                currentClass="accent"
                path={"/account"}
                // isDisabled={
                //   watchingActivity === "watching"
                //     ? visibleMovieItems >= totalMovieItems
                //     : visibleRatingItems >= totalRatingItems
                // }
                // onClickFunction={handleLoadMore}
                // key={watchingActivity === "watching" ? "watching" : "rating"}
              />

              <AccountSettingsBtn
                text={"Reset to default"}
                currentClass="light"
                path={"/account"}
                // onClickFunction={reset}
              />

              <AccountSettingsBtn
                text={"Cancel"}
                currentClass="light"
                path={"/account"}
                // onClickFunction={reset}
              />
            </div>
          </form>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
