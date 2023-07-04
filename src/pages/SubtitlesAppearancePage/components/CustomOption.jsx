import { Option } from "@mui/base";
import { useTranslation } from "react-i18next";

export default function CustomOption({ options, attribute, tKey }) {
  const { t } = useTranslation();

  return (
    <>
      {options.map((option) => {
        const formattedOption = option.includes("-")
          ? option.replace(/-(.)/g, (_, nextChar) => nextChar.toUpperCase())
          : option;
        return (
          <Option
            key={option}
            value={option}
            {...{ [attribute]: option }}
          >
            {t(tKey ? formattedOption : option)}
          </Option>
        );
      })}
    </>
  );
}
