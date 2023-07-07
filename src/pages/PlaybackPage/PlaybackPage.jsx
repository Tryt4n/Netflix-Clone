import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";

import CheckboxAccount from "../../components/CheckboxAccount/CheckboxAccount";
import Divider from "../../components/Divider/Divider";
import BtnsWrapperAccount from "../../layout/BtnsWrapperAccount/BtnsWrapperAccount";
import CommonAccountLayout from "../../layout/CommonAccountLayout/CommonAccountLayout";

import { useTranslation } from "react-i18next";
import "./playbackPage.scss";

export default function PlaybackPage() {
  const { t } = useTranslation();

  const { currentEditingProfile, users, setUsers, setIsCurrentlySaved, setDisplayedSavedMessage } =
    useContext(UserContext);

  const [autoplayNext, setAutoPlayNext] = useState(currentEditingProfile.autoplayNext);
  const [autoplayPreviews, setAutoPlayPreviews] = useState(currentEditingProfile.autoplayPreviews);
  const [dataUsage, setDataUsage] = useState(currentEditingProfile.dataUsage);

  function handleSave() {
    const updatedUsers = users.map((user) => {
      if (user.username === currentEditingProfile.username) {
        return {
          ...user,
          autoplayNext: autoplayNext,
          autoplayPreviews: autoplayPreviews,
          dataUsage: dataUsage,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsCurrentlySaved(true);
    setDisplayedSavedMessage(t("playbackSavedMessage"));
  }

  return (
    <CommonAccountLayout
      pageTitle={`${t("settings")} - ${t("playback")}`}
      sectionTitle={t("playbackSettings")}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="playback__subheading">
            {t("autoplayControls")}
            {t("for")} {currentEditingProfile.username}
          </legend>
          <CheckboxAccount
            name="autoplay-next"
            checked={autoplayNext}
            onChangeFunction={() => setAutoPlayNext(!autoplayNext)}
            text={t("autoplayControlsNext")}
          />

          <CheckboxAccount
            name="autoplay-previous"
            checked={autoplayPreviews}
            onChangeFunction={() => setAutoPlayPreviews(!autoplayPreviews)}
            text={t("autoplayControlsPrev")}
          />
        </fieldset>

        <Divider />

        <fieldset>
          <legend className="playback__subheading">{t("dataUsage")}</legend>
          <CheckboxAccount
            radio
            name="data-usage"
            id="auto"
            checked={dataUsage === "auto" ? true : false}
            onChangeFunction={setDataUsage}
            text={t("auto")}
            textSmall={t("autoDescription")}
          />

          <CheckboxAccount
            radio
            name="data-usage"
            id="low"
            checked={dataUsage === "low" ? true : false}
            onChangeFunction={setDataUsage}
            text={t("low")}
            textSmall={t("lowDescription")}
          />

          <CheckboxAccount
            radio
            name="data-usage"
            id="medium"
            checked={dataUsage === "medium" ? true : false}
            onChangeFunction={setDataUsage}
            text={t("medium")}
            textSmall={t("mediumDescription")}
          />

          <CheckboxAccount
            radio
            name="data-usage"
            id="high"
            checked={dataUsage === "high" ? true : false}
            onChangeFunction={setDataUsage}
            text={t("high")}
            textSmall={t("highDescription")}
          />
        </fieldset>

        <BtnsWrapperAccount
          btnAccentText={t("save")}
          btnAccentPath="/account"
          btnAccentFunction={handleSave}
          btnLightText={t("cancel")}
          btnLightPath="/account"
          center
        />
      </form>
    </CommonAccountLayout>
  );
}
