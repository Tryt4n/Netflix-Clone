import { useTranslation } from "react-i18next";

import "./checkboxLight.scss";

export default function CheckboxLight({ data }) {
  const { t } = useTranslation();

  return (
    <>
      <input
        type="checkbox"
        name={`animation-on-tv${data.id}`}
        id={`animation-on-tv${data.id}`}
        className="checkbox-light"
      />
      <label
        htmlFor={`animation-on-tv${data.id}`}
        className="checkbox-light-label"
      >
        {t("animationCheckboxLabel")}
      </label>
    </>
  );
}
