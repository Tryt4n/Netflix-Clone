import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";
import CustomOption from "./components/CustomOption";
import SemitransparentCheckbox from "./components/SemitransparentCheckbox";
import SizeRadioInput from "./components/SizeRadioInput";
import BtnsWrapperAccount from "../../layout/BtnsWrapperAccount/BtnsWrapperAccount";

import "./subtitlesAppearancePage.scss";
import { useTranslation } from "react-i18next";
import { Select } from "@mui/base";

export default function SubtitlesAppearancePage() {
  const { t, i18n } = useTranslation();

  const { currentEditingProfile, users, setUsers, setIsCurrentlySaved, setDisplayedSavedMessage } =
    useContext(UserContext);

  const defaultTextStyles = {
    fontFace: "block",
    fontColor: "white",
    fontColorSemitransparent: false,
    fontSize: "medium",
    shadow: "drop-shadow",
    shadowColor: "black",
    bgColor: "none",
    bgColorSemitransparent: false,
    windowColor: "none",
    windowColorSemitransparent: false,
  };

  const [textStyles, setTextStyles] = useState({
    fontFace: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.fontFace
      : defaultTextStyles.fontFace,
    fontColor: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.fontColor
      : defaultTextStyles.fontColor,
    fontColorSemitransparent: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.fontColorSemitransparent
      : defaultTextStyles.fontColorSemitransparent,
    fontSize: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.fontSize
      : defaultTextStyles.fontSize,
    shadow: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.shadow
      : defaultTextStyles.shadow,
    shadowColor: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.shadowColor
      : defaultTextStyles.shadowColor,
    bgColor: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.bgColor
      : defaultTextStyles.bgColor,
    bgColorSemitransparent: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.bgColorSemitransparent
      : defaultTextStyles.bgColorSemitransparent,
    windowColor: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.windowColor
      : defaultTextStyles.windowColor,
    windowColorSemitransparent: currentEditingProfile.textStyles
      ? currentEditingProfile.textStyles.windowColorSemitransparent
      : defaultTextStyles.windowColorSemitransparent,
  });

  const translationsMapping = {
    "maszyna do pisania": "typewriter",
    drukarska: "print",
    konsola: "console",
    blokowa: "block",
    zwykła: "casual",
    kursywa: "cursive",
    kapitaliki: "small-caps",
    biały: "white",
    czarny: "black",
    czerwony: "red",
    zielony: "green",
    niebieski: "blue",
    żółty: "yellow",
    amarantowy: "magenta",
    błękitny: "cyan",
    brak: "none",
    podniesione: "raised",
    obniżone: "depressed",
    jednolite: "uniform",
    "efekt cienia": "drop-shadow",
  };

  const colorOptions = ["white", "black", "red", "green", "blue", "yellow", "magenta", "cyan"];
  const colorOptionsWithNone = ["none", ...colorOptions];
  const fontOptions = [
    "typewriter",
    "print",
    "console",
    "block",
    "casual",
    "cursive",
    "small-caps",
  ];
  const sizeOptions = ["small", "medium", "large"];
  const shadowOptions = ["none", "raised", "depressed", "uniform", "drop-shadow"];

  function handleChange(e, propertyName) {
    if (e.key === "Enter" || e.key === " ") {
      const btnValue = e.target.innerText.toLowerCase();
      const btnValuePL = translationsMapping[btnValue];
      setTextStyles((prevState) => ({
        ...prevState,
        [propertyName]: i18n.language.includes("pl") ? btnValuePL : btnValue.replace(" ", "-"),
      }));
    } else if (e.target.type === "checkbox") {
      const { checked } = e.target;
      setTextStyles((prevState) => ({
        ...prevState,
        [propertyName]: checked,
      }));
    } else {
      const selectedAttribute = e.target.dataset[propertyName] || e.target.dataset.color;
      setTextStyles((prevState) => ({
        ...prevState,
        [propertyName]: selectedAttribute,
      }));
    }
  }

  function handleSave(reset) {
    const updatedTextStyles = reset ? textStyles : defaultTextStyles;

    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          textStyles: updatedTextStyles,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsCurrentlySaved(true);
    setDisplayedSavedMessage(t("subtitlesSavedMessage"));
  }

  return (
    <>
      <header>
        <h1 className="visually-hidden">
          {t("settings")} - {t("subtitles")}
        </h1>
        <NavbarShort />
      </header>

      <div className="subtitles settings-wrapper">
        <main className="settings-container">
          <header className="subtitles__header">
            <h2 className="subtitles__heading">{t("subtitleAppearance")}</h2>
            <img
              className="language-change__profile-img"
              src={currentEditingProfile.profileImage}
              alt={`${t("profileAvatar")} ${
                currentEditingProfile.kidsProfile ? t("Kids") : currentEditingProfile.username
              } `}
            />
          </header>
          <p className="subtitles__subheading">
            {t("changeWaySubtitlesAppear")} <em>{currentEditingProfile.username} </em>
            {t("onAllSupportedDevices")}
          </p>

          <form className="subtitles__form">
            {/* //* Visualization Text Container  */}
            <div className="subtitles__visualization-container">
              <span
                className="subtitles__visualization-wrapper"
                role="presentation"
                aria-live="assertive"
                data-window-bg-color={textStyles.windowColor}
                data-window-bg-color-semitransparent={textStyles.windowColorSemitransparent}
              >
                <span
                  className="subtitles__visualization-text"
                  role="presentation"
                  aria-live="assertive"
                  data-font-face={textStyles.fontFace}
                  data-font-color={textStyles.fontColor}
                  data-font-color-semitransparent={textStyles.fontColorSemitransparent}
                  data-font-size={textStyles.fontSize}
                  data-shadow={textStyles.shadow}
                  data-shadow-color={textStyles.shadowColor}
                  data-text-bg-color={textStyles.bgColor}
                  data-text-bg-color-semitransparent={textStyles.bgColorSemitransparent}
                >
                  {t("subtitlesText")}
                </span>
              </span>
            </div>

            <div className="subtitles__settings-container">
              <fieldset className="subtitles__settings-inner-container">
                <legend>{t("font")}</legend>
                {/* //* Font Face */}
                <Select
                  defaultValue={textStyles.fontFace}
                  slotProps={{
                    root: { className: "subtitles__settings-text-btn" },
                    listbox: { className: "subtitles__list subtitles__list--text" },
                  }}
                  data-font-face={textStyles.fontFace}
                  onChange={(e) => handleChange(e, "fontFace")}
                >
                  <CustomOption
                    options={fontOptions}
                    attribute="data-font-face"
                    tKey={true}
                  />
                </Select>
                {/* //* Text Color */}
                <Select
                  defaultValue={textStyles.fontColor}
                  slotProps={{
                    root: { className: "subtitles__settings-color-btn" },
                    listbox: { className: "subtitles__list subtitles__list--color" },
                  }}
                  data-color={textStyles.fontColor}
                  onChange={(e) => handleChange(e, "fontColor")}
                >
                  <CustomOption
                    options={colorOptions}
                    attribute="data-color"
                  />
                  <SemitransparentCheckbox
                    textStyles={textStyles}
                    handleChange={handleChange}
                    inputStyles={"fontColorSemitransparent"}
                  />
                </Select>
              </fieldset>

              {/* //* Text Size */}
              <fieldset className="subtitles__text-size-container">
                <legend>
                  {t("textSize")}: <span>{textStyles.fontSize}</span>
                </legend>
                <div className="subtitles__fs-container">
                  {sizeOptions.map((size) => (
                    <SizeRadioInput
                      key={size}
                      textStyles={textStyles}
                      handleChange={handleChange}
                      size={size}
                    />
                  ))}
                </div>
              </fieldset>

              {/* //* Text Shadow */}
              <fieldset className="subtitles__settings-inner-container">
                <legend>{t("shadow")}</legend>
                <Select
                  defaultValue={textStyles.shadow}
                  slotProps={{
                    root: { className: "subtitles__settings-text-btn" },
                    listbox: { className: "subtitles__list subtitles__list--text" },
                  }}
                  data-shadow={textStyles.shadow}
                  onChange={(e) => handleChange(e, "shadow")}
                >
                  <CustomOption
                    options={shadowOptions}
                    attribute="data-shadow"
                    tKey={true}
                  />
                </Select>
                {/* //* Shadow Color */}
                <Select
                  defaultValue={textStyles.shadowColor}
                  slotProps={{
                    root: { className: "subtitles__settings-color-btn" },
                    listbox: { className: "subtitles__list subtitles__list--color" },
                  }}
                  data-color={textStyles.shadowColor}
                  onChange={(e) => handleChange(e, "shadowColor")}
                >
                  <CustomOption
                    options={colorOptions}
                    attribute="data-color"
                  />
                </Select>
              </fieldset>

              <div className="subtitles__settings-inner-wrapper">
                <fieldset>
                  <legend>{t("background")}</legend>
                  {/* //* Text Background Color */}
                  <Select
                    defaultValue={textStyles.bgColor}
                    slotProps={{
                      root: { className: "subtitles__settings-color-btn" },
                      listbox: {
                        className:
                          "subtitles__list subtitles__list--color subtitles__list--text-bgColor",
                      },
                    }}
                    data-color={textStyles.bgColor}
                    onChange={(e) => handleChange(e, "bgColor")}
                  >
                    <CustomOption
                      options={colorOptionsWithNone}
                      attribute="data-color"
                    />
                    <SemitransparentCheckbox
                      textStyles={textStyles}
                      handleChange={handleChange}
                      inputStyles={"bgColorSemitransparent"}
                    />
                  </Select>
                </fieldset>

                <fieldset>
                  <legend>{t("window")}</legend>
                  {/* //* Background Color */}
                  <Select
                    defaultValue={textStyles.windowColor}
                    slotProps={{
                      root: { className: "subtitles__settings-color-btn" },
                      listbox: {
                        className:
                          "subtitles__list subtitles__list--color subtitles__list--window-bgColor",
                      },
                    }}
                    data-color={textStyles.windowColor}
                    onChange={(e) => handleChange(e, "windowColor")}
                  >
                    <CustomOption
                      options={colorOptionsWithNone}
                      attribute="data-color"
                    />
                    <SemitransparentCheckbox
                      textStyles={textStyles}
                      handleChange={handleChange}
                      inputStyles={"windowColorSemitransparent"}
                    />
                  </Select>
                </fieldset>
              </div>
            </div>

            <BtnsWrapperAccount
              btnAccentText={t("save")}
              btnAccentPath="/account"
              btnAccentFunction={handleSave}
              btnLightText={t("resetToDefault")}
              btnLightPath="/account"
              btnLightFunction={() => handleSave(false)}
              extraBtn="light"
              extraBtnText={t("cancel")}
              extraBtnPath="/account"
              extraSpace
            />
          </form>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
