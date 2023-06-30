import { Link } from "react-router-dom";
import "./accountSettingsBtn.scss";

export default function AccountSettingsBtn({
  text,
  currentClass,
  onClickFunction,
  path,
  isDisabled,
  btnRef,
}) {
  return (
    <>
      {path ? (
        <Link
          to={path}
          className={`account-settings-btn account-settings-btn--${currentClass}`}
          onClick={onClickFunction}
          ref={btnRef}
        >
          {text}
        </Link>
      ) : (
        <button
          className={`account-settings-btn account-settings-btn--${currentClass}`}
          onClick={onClickFunction}
          disabled={isDisabled}
        >
          {text}
        </button>
      )}
    </>
  );
}
