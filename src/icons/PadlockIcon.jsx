import { useTranslation } from "react-i18next";

export default function PadlockIcon() {
  const { t } = useTranslation();

  return (
    <svg
      aria-label={t("padlockIcon")}
      className="padlock-icon"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 8a5 5 0 0110 0v1h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2V8zm8 0v1H9V8a3 3 0 116 0zM5 11v8h14v-8H5zm6 2v4h2v-4h-2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
