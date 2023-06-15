import "./accountSettingsBtn.scss";

export default function AccountSettingsBtn({ text, currentClass, onClickFunction }) {
  return (
    <button
      className={`account-settings-btn account-settings-btn--${currentClass}`}
      onClick={onClickFunction}
    >
      {text}
    </button>
  );
}
