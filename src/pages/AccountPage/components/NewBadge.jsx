import { useTranslation } from "react-i18next";

export default function NewBadge({ accent }) {
  const { t, i18n } = useTranslation();

  return (
    <span
      className={`account__new-badge${accent ? " account__new-badge--accent" : ""}`}
      aria-label={t("badge")}
    >
      {i18n.language === "pl" ? t("newBadge") : t("new")}
    </span>
  );
}
