import { useState } from "react";
import "../AccountFooter/accountFooter.scss";

export default function AccountFooter() {
  const [serviceCodeText, setServiceCodeText] = useState("Service Code");

  return (
    <footer className="account-footer">
      <h2 className="account-footer__heading">
        <a href="#">Questions? Contact us.</a>
      </h2>
      <ul className="account-footer__list">
        <li className="account-footer__list-item">
          <a href="#">Audio and Subtitles</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Media Center</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Privacy Statement</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Help Center</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Jobs</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Gift Cards</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Cookie Preferences</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Investor Relations</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Terms of Use</a>
        </li>
        <li className="account-footer__list-item">
          <a href="#">Privacy Statement</a>
        </li>
      </ul>
      <button
        className="account-footer__service-code"
        aria-label="Service Code"
        disabled={serviceCodeText === "Service Code" ? false : true}
        onClick={() => setServiceCodeText("565682")}
      >
        {serviceCodeText}
      </button>
    </footer>
  );
}
