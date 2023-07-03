import { useContext, useState } from "react";
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
    if (e.target.type === "checkbox") {
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
                  These settings affect subtitles on all supported devices.
                </span>
              </span>
            </div>

            <div className="subtitles__settings-container">
              <fieldset className="subtitles__settings-inner-container">
                <legend>Font</legend>
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
                    typewriter
                  </Option>
                  <Option
                    value="print"
                    data-font-face="print"
                  >
                    print
                  </Option>
                  <Option
                    value="console"
                    data-font-face="console"
                  >
                    console
                  </Option>
                  <Option
                    value="block"
                    data-font-face="block"
                  >
                    block
                  </Option>
                  <Option
                    value="casual"
                    data-font-face="casual"
                  >
                    casual
                  </Option>
                  <Option
                    value="cursive"
                    data-font-face="cursive"
                  >
                    cursive
                  </Option>
                  <Option
                    value="small-caps"
                    data-font-face="small-caps"
                  >
                    small caps
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
                    white
                  </Option>
                  <Option
                    value="black"
                    data-color="black"
                  >
                    black
                  </Option>
                  <Option
                    value="red"
                    data-color="red"
                  >
                    red
                  </Option>
                  <Option
                    value="green"
                    data-color="green"
                  >
                    green
                  </Option>
                  <Option
                    value="blue"
                    data-color="blue"
                  >
                    blue
                  </Option>
                  <Option
                    value="yellow"
                    data-color="yellow"
                  >
                    yellow
                  </Option>
                  <Option
                    value="magenta"
                    data-color="magenta"
                  >
                    magenta
                  </Option>
                  <Option
                    value="cyan"
                    data-color="cyan"
                  >
                    cyan
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
                    <label htmlFor="text-color-transparency">Semitransparent</label>
                  </div>
                </Select>
              </fieldset>

              {/* //* Text Size */}
              <fieldset className="subtitles__text-size-container">
                <legend>
                  Text Size: <span>{textStyles.fontSize}</span>
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
                      Small Text
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
                      Medium Text
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
                      Large Text
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* //* Text Shadow */}
              <fieldset className="subtitles__settings-inner-container">
                <legend>Shadow</legend>
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
                    none
                  </Option>
                  <Option
                    value="raised"
                    data-shadow="raised"
                  >
                    raised
                  </Option>
                  <Option
                    value="depressed"
                    data-shadow="depressed"
                  >
                    depressed
                  </Option>
                  <Option
                    value="uniform"
                    data-shadow="uniform"
                  >
                    uniform
                  </Option>
                  <Option
                    value="drop-shadow"
                    data-shadow="drop-shadow"
                  >
                    drop shadow
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
                    white
                  </Option>
                  <Option
                    value="black"
                    data-color="black"
                  >
                    black
                  </Option>
                  <Option
                    value="red"
                    data-color="red"
                  >
                    red
                  </Option>
                  <Option
                    value="green"
                    data-color="green"
                  >
                    green
                  </Option>
                  <Option
                    value="blue"
                    data-color="blue"
                  >
                    blue
                  </Option>
                  <Option
                    value="yellow"
                    data-color="yellow"
                  >
                    yellow
                  </Option>
                  <Option
                    value="magenta"
                    data-color="magenta"
                  >
                    magenta
                  </Option>
                  <Option
                    value="cyan"
                    data-color="cyan"
                  >
                    cyan
                  </Option>
                </Select>
              </fieldset>

              <div className="subtitles__settings-inner-wrapper">
                <fieldset>
                  <legend>Background</legend>
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
                      none
                    </Option>
                    <Option
                      value="white"
                      data-color="white"
                    >
                      white
                    </Option>
                    <Option
                      value="black"
                      data-color="black"
                    >
                      black
                    </Option>
                    <Option
                      value="red"
                      data-color="red"
                    >
                      red
                    </Option>
                    <Option
                      value="green"
                      data-color="green"
                    >
                      green
                    </Option>
                    <Option
                      value="blue"
                      data-color="blue"
                    >
                      blue
                    </Option>
                    <Option
                      value="yellow"
                      data-color="yellow"
                    >
                      yellow
                    </Option>
                    <Option
                      value="magenta"
                      data-color="magenta"
                    >
                      magenta
                    </Option>
                    <Option
                      value="cyan"
                      data-color="cyan"
                    >
                      cyan
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
                      <label htmlFor="background-transparency">Semitransparent</label>
                    </div>
                  </Select>
                </fieldset>

                <fieldset>
                  <legend>Window</legend>
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
                      none
                    </Option>
                    <div>
                      <Option
                        value="white"
                        data-color="white"
                      >
                        white
                      </Option>
                      <Option
                        value="black"
                        data-color="black"
                      >
                        black
                      </Option>
                      <Option
                        value="red"
                        data-color="red"
                      >
                        red
                      </Option>
                      <Option
                        value="green"
                        data-color="green"
                      >
                        green
                      </Option>
                      <Option
                        value="blue"
                        data-color="blue"
                      >
                        blue
                      </Option>
                      <Option
                        value="yellow"
                        data-color="yellow"
                      >
                        yellow
                      </Option>
                      <Option
                        value="magenta"
                        data-color="magenta"
                      >
                        magenta
                      </Option>
                      <Option
                        value="cyan"
                        data-color="cyan"
                      >
                        cyan
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
                      <label htmlFor="window-transparency">Semitransparent</label>
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
