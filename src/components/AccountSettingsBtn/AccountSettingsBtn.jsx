import { Link } from "react-router-dom";
import "./accountSettingsBtn.scss";

export default function AccountSettingsBtn({ text, currentClass, onClickFunction, path }) {
  return (
    <>
      {path ? (
        <Link
          to={path}
          className={`account-settings-btn account-settings-btn--${currentClass}`}
          onClick={onClickFunction}
        >
          {text}
        </Link>
      ) : (
        <button
          className={`account-settings-btn account-settings-btn--${currentClass}`}
          onClick={onClickFunction}
        >
          {text}
        </button>
      )}
    </>
  );
}
