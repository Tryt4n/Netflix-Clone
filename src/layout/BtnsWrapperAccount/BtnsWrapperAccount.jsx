import AccountSettingsBtn from "../../components/AccountSettingsBtn/AccountSettingsBtn";

import "./btnsWrapperAccount.scss";

export default function BtnsWrapperAccount({
  btnAccentText,
  btnLightText,
  btnAccentFunction,
  btnLightFunction,
}) {
  return (
    <div className="btns-wrapper">
      <AccountSettingsBtn
        text={btnAccentText}
        currentClass="accent"
        path={"/settings/viewed"}
        onClickFunction={btnAccentFunction}
      />

      <AccountSettingsBtn
        text={btnLightText}
        currentClass="light"
        path={"/settings/viewed"}
        onClickFunction={btnLightFunction}
      />
    </div>
  );
}
