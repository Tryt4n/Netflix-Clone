import { useTranslation } from "react-i18next";

export default function SizeRadioInput({ textStyles, handleChange, size }) {
  const { t } = useTranslation();

  return (
    <div>
      <input
        type="radio"
        name="fs-size"
        id={`fs-${size}`}
        value={size}
        data-font-size={size}
        checked={textStyles.fontSize === size}
        onChange={(e) => handleChange(e, "fontSize")}
      />
      <label
        htmlFor={`fs-${size}`}
        className="visually-hidden"
      >
        {t(`${size}Text`)}
      </label>
    </div>
  );
}
