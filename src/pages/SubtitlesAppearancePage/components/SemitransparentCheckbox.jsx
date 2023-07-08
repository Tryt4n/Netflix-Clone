import { useTranslation } from "react-i18next";

export default function SemitransparentCheckbox({ textStyles, handleChange, inputStyles, id }) {
  const { t } = useTranslation();

  return (
    <div className="subtitles__list-checkbox-wrapper">
      <input
        type="checkbox"
        name={`text-color-transparency-${id}`}
        id={`text-color-transparency-${id}`}
        className="checkbox-account"
        checked={textStyles[inputStyles]}
        onChange={(e) => handleChange(e, `${inputStyles}`)}
      />
      <label htmlFor={`text-color-transparency-${id}`}>{t("semitransparent")}</label>
    </div>
  );
}
