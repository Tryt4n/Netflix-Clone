import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

import "./btnsWrapperAccount.scss";

export default function BtnsWrapperAccount({
  btnAccentText,
  btnAccentPath,
  btnAccentFunction,
  btnLightText,
  btnLightPath,
  btnLightFunction,
  disabled,
  center,
  extraSpace,
  withoutSpace,
  extraBtn,
  extraBtnText,
  extraBtnPath,
  extraBtnFunction,
}) {
  return (
    <div
      className={`btns-wrapper${center ? " btns-wrapper--center" : ""}${
        extraSpace ? " btns-wrapper--mt" : ""
      }${withoutSpace ? " btns-wrapper--m0" : ""}`}
    >
      <AccountSettingsBtn
        text={btnAccentText}
        currentClass="accent"
        path={btnAccentPath}
        onClickFunction={btnAccentFunction}
        isDisabled={disabled}
      />

      <AccountSettingsBtn
        text={btnLightText}
        currentClass="light"
        path={btnLightPath}
        onClickFunction={btnLightFunction}
      />

      {extraBtn && (
        <AccountSettingsBtn
          currentClass={extraBtn === "accent" ? "accent" : "light"}
          text={extraBtnText}
          extraBtnPath={extraBtnPath}
          path={extraBtnPath}
          onClickFunction={extraBtnFunction}
        />
      )}
    </div>
  );
}
