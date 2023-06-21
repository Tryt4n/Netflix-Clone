import { useContext } from "react";
import UserContext from "../../context/UserContext";

import { useTranslation } from "react-i18next";

import "./checkboxLight.scss";

export default function CheckboxLight({ data }) {
  const { t } = useTranslation();

  const { users, setUsers } = useContext(UserContext);

  function changeAnimationCheckboxStatus() {
    const updatedUsers = users.map((user) => {
      if (user.username === data.username) {
        return {
          ...user,
          reduceAnimationsOnTV: !data.reduceAnimationsOnTV,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  }

  return (
    <>
      <input
        type="checkbox"
        name={`animation-on-tv${data.id}`}
        id={`animation-on-tv${data.id}`}
        checked={data.reduceAnimationsOnTV}
        onChange={() => changeAnimationCheckboxStatus()}
        className="checkbox-light"
      />
      <label
        htmlFor={`animation-on-tv${data.id}`}
        className="checkbox-light-label"
      >
        {t("animationCheckboxLabel")}
      </label>
    </>
  );
}
