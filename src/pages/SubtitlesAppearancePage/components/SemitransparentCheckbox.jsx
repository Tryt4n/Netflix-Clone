import { useTranslation } from "react-i18next";

export default function SemitransparentCheckbox({ textStyles, handleChange, inputStyles }) {
  const { t } = useTranslation();

  return (
    <div className="subtitles__list-checkbox-wrapper">
      <input
        type="checkbox"
        name="text-color-transparency"
        id="text-color-transparency"
        className="checkbox-light"
        checked={textStyles[inputStyles]}
        onChange={(e) => handleChange(e, `${inputStyles}`)}
      />
      <label htmlFor="text-color-transparency">{t("Semitransparent")}</label>
    </div>
  );
}
