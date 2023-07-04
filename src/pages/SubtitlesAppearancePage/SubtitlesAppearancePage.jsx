import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

import NavbarShort from "../../layout/NavbarShort/NavbarShort";
import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";
import AccountFooter from "../../layout/AccountFooter/AccountFooter";

import "./subtitlesAppearancePage.scss";
import { useTranslation } from "react-i18next";
import { Option, Select } from "@mui/base";

export default function SubtitlesAppearancePage() {
  const { t } = useTranslation();

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

  function handleChange(e, propertyName) {
    if (e.key === "Enter" || e.key === " ") {
      const btnValue = e.target.innerText.toLowerCase().replace(" ", "-");
      console.log(btnValue);
      setTextStyles((prevState) => ({
        ...prevState,
        [propertyName]: btnValue,
      }));
      console.log(btnValue);
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
    setDisplayedSavedMessage("Your subtitle appearance preferences have been updated.");
  }

  // useEffect(() => {
  //   console.log(textStyles);
  // }, [textStyles]);

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
            {t("changeWaySubtitlesAppear")} {currentEditingProfile.username}{" "}
            {t("onAllSupportedDevices")}
          </p>

          <form className="subtitles__form">
            <div className="subtitles__visualization-container">
              <span
                className="subtitles__visualization-wrapper"
                data-window-bg-color={textStyles.windowColor}
                data-window-bg-color-semitransparent={textStyles.windowColorSemitransparent}
              >
                <span
                  className="subtitles__visualization-text"
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
                  <Option
                    value="typewriter"
                    data-font-face="typewriter"
                  >
                    {t("typewriter")}
                  </Option>
                  <Option
                    value="print"
                    data-font-face="print"
                  >
                    {t("print")}
                  </Option>
                  <Option
                    value="console"
                    data-font-face="console"
                  >
                    {t("console")}
                  </Option>
                  <Option
                    value="block"
                    data-font-face="block"
                  >
                    {t("block")}
                  </Option>
                  <Option
                    value="casual"
                    data-font-face="casual"
                  >
                    {t("casual")}
                  </Option>
                  <Option
                    value="cursive"
                    data-font-face="cursive"
                  >
                    {t("cursive")}
                  </Option>
                  <Option
                    value="small-caps"
                    data-font-face="small-caps"
                  >
                    {t("smallCaps")}
                  </Option>
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
                  <Option
                    value="white"
                    data-color="white"
                  >
                    {t("white")}
                  </Option>
                  <Option
                    value="black"
                    data-color="black"
                  >
                    {t("black")}
                  </Option>
                  <Option
                    value="red"
                    data-color="red"
                  >
                    {t("red")}
                  </Option>
                  <Option
                    value="green"
                    data-color="green"
                  >
                    {t("green")}
                  </Option>
                  <Option
                    value="blue"
                    data-color="blue"
                  >
                    {t("blue")}
                  </Option>
                  <Option
                    value="yellow"
                    data-color="yellow"
                  >
                    {t("yellow")}
                  </Option>
                  <Option
                    value="magenta"
                    data-color="magenta"
                  >
                    {t("magenta")}
                  </Option>
                  <Option
                    value="cyan"
                    data-color="cyan"
                  >
                    {t("cyan")}
                  </Option>
                  <div className="subtitles__list-checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="text-color-transparency"
                      id="text-color-transparency"
                      className="checkbox-light"
                      checked={textStyles.fontColorSemitransparent}
                      onChange={(e) => handleChange(e, "fontColorSemitransparent")}
                    />
                    <label htmlFor="text-color-transparency">{t("Semitransparent")}</label>
                  </div>
                </Select>
              </fieldset>

              {/* //* Text Size */}
              <fieldset className="subtitles__text-size-container">
                <legend>
                  {t("textSize")}: <span>{textStyles.fontSize}</span>
                </legend>
                <div className="subtitles__fs-container">
                  <div>
                    <input
                      type="radio"
                      name="fs-size"
                      id="fs-small"
                      value="small"
                      data-font-size="small"
                      checked={textStyles.fontSize === "small"}
                      onChange={(e) => handleChange(e, "fontSize")}
                    />
                    <label
                      htmlFor="fs-small"
                      className="visually-hidden"
                    >
                      {t("smallText")}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="fs-size"
                      id="fs-medium"
                      value="medium"
                      data-font-size="medium"
                      checked={textStyles.fontSize === "medium"}
                      onChange={(e) => handleChange(e, "fontSize")}
                    />
                    <label
                      htmlFor="fs-medium"
                      className="visually-hidden"
                    >
                      {t("mediumText")}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="fs-size"
                      id="fs-bold"
                      value="Large"
                      data-font-size="large"
                      checked={textStyles.fontSize === "large"}
                      onChange={(e) => handleChange(e, "fontSize")}
                    />
                    <label
                      htmlFor="fs-bold"
                      className="visually-hidden"
                    >
                      {t("largeText")}
                    </label>
                  </div>
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
                  <Option
                    value="none"
                    data-shadow="none"
                  >
                    {t("none")}
                  </Option>
                  <Option
                    value="raised"
                    data-shadow="raised"
                  >
                    {t("raised")}
                  </Option>
                  <Option
                    value="depressed"
                    data-shadow="depressed"
                  >
                    {t("depressed")}
                  </Option>
                  <Option
                    value="uniform"
                    data-shadow="uniform"
                  >
                    {t("uniform")}
                  </Option>
                  <Option
                    value="drop-shadow"
                    data-shadow="drop-shadow"
                  >
                    {t("dropShadow")}
                  </Option>
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
                  <Option
                    value="white"
                    data-color="white"
                  >
                    {t("white")}
                  </Option>
                  <Option
                    value="black"
                    data-color="black"
                  >
                    {t("black")}
                  </Option>
                  <Option
                    value="red"
                    data-color="red"
                  >
                    {t("red")}
                  </Option>
                  <Option
                    value="green"
                    data-color="green"
                  >
                    {t("green")}
                  </Option>
                  <Option
                    value="blue"
                    data-color="blue"
                  >
                    {t("blue")}
                  </Option>
                  <Option
                    value="yellow"
                    data-color="yellow"
                  >
                    {t("yellow")}
                  </Option>
                  <Option
                    value="magenta"
                    data-color="magenta"
                  >
                    {t("magenta")}
                  </Option>
                  <Option
                    value="cyan"
                    data-color="cyan"
                  >
                    {t("cyan")}
                  </Option>
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
                    <Option
                      value="none"
                      data-color="none"
                    >
                      {t("none")}
                    </Option>
                    <Option
                      value="white"
                      data-color="white"
                    >
                      {t("white")}
                    </Option>
                    <Option
                      value="black"
                      data-color="black"
                    >
                      {t("black")}
                    </Option>
                    <Option
                      value="red"
                      data-color="red"
                    >
                      {t("red")}
                    </Option>
                    <Option
                      value="green"
                      data-color="green"
                    >
                      {t("green")}
                    </Option>
                    <Option
                      value="blue"
                      data-color="blue"
                    >
                      {t("blue")}
                    </Option>
                    <Option
                      value="yellow"
                      data-color="yellow"
                    >
                      {t("yellow")}
                    </Option>
                    <Option
                      value="magenta"
                      data-color="magenta"
                    >
                      {t("magenta")}
                    </Option>
                    <Option
                      value="cyan"
                      data-color="cyan"
                    >
                      {t("cyan")}
                    </Option>
                    <div className="subtitles__list-checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="background-transparency"
                        id="background-transparency"
                        className="checkbox-light"
                        checked={textStyles.bgColorSemitransparent}
                        onChange={(e) => handleChange(e, "bgColorSemitransparent")}
                      />
                      <label htmlFor="background-transparency">{t("semitransparent")}</label>
                    </div>
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
                    <Option
                      value="none"
                      data-color="none"
                    >
                      {t("none")}
                    </Option>
                    <div>
                      <Option
                        value="white"
                        data-color="white"
                      >
                        {t("white")}
                      </Option>
                      <Option
                        value="black"
                        data-color="black"
                      >
                        {t("black")}
                      </Option>
                      <Option
                        value="red"
                        data-color="red"
                      >
                        {t("red")}
                      </Option>
                      <Option
                        value="green"
                        data-color="green"
                      >
                        {t("green")}
                      </Option>
                      <Option
                        value="blue"
                        data-color="blue"
                      >
                        {t("blue")}
                      </Option>
                      <Option
                        value="yellow"
                        data-color="yellow"
                      >
                        {t("yellow")}
                      </Option>
                      <Option
                        value="magenta"
                        data-color="magenta"
                      >
                        {t("magenta")}
                      </Option>
                      <Option
                        value="cyan"
                        data-color="cyan"
                      >
                        {t("cyan")}
                      </Option>
                    </div>
                    <div className="subtitles__list-checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="window-transparency"
                        id="window-transparency"
                        className="checkbox-light"
                        checked={textStyles.windowColorSemitransparent}
                        onChange={(e) => handleChange(e, "windowColorSemitransparent")}
                      />
                      <label htmlFor="window-transparency">{t("semitransparent")}</label>
                    </div>
                  </Select>
                </fieldset>
              </div>
            </div>

            <div className="subtitles__form-btns-wrapper">
              <AccountSettingsBtn
                text={t("save")}
                currentClass="accent"
                path={"/account"}
                onClickFunction={handleSave}
              />

              <AccountSettingsBtn
                text={"Reset to default"}
                currentClass="light"
                path={"/account"}
                onClickFunction={() => handleSave(false)}
              />

              <AccountSettingsBtn
                text={"Cancel"}
                currentClass="light"
                path={"/account"}
              />
            </div>
          </form>
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
