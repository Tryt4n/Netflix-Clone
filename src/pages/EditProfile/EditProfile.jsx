import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import UserContext from "../../context/UserContext";

import "./editProfile.scss";
import Slider from "../../components/Slider/Slider";

export default function EditProfile() {
  const params = useParams();

  const { users, iconsData } = useContext(UserContext);
  const currentUser = users.find((user) => user.username === params.id);

  return (
    <div className="edit-profile">
      <header className="edit-profile__header">
        <div className="edit-profile__heading-wrapper">
          <Link
            className="edit-profile__go-back-link"
            to={`/ManageProfiles/${params.id}`}
            aria-label="Go Back"
          >
            <svg
              aria-hidden="true"
              width="13.496"
              height="11.21"
              fill="currentColor"
            >
              <g
                id="Arrow_Icon"
                data-name="Arrow Icon"
                transform="translate(0 -41.674)"
              >
                <g
                  id="Group_7"
                  data-name="Group 7"
                  transform="translate(0 41.674)"
                >
                  <path
                    id="Path_21"
                    data-name="Path 21"
                    d="M12.737,46.22l.021,0H3.727L6.566,43.38a.746.746,0,0,0,0-1.048l-.442-.442a.739.739,0,0,0-1.043,0L.215,46.755a.744.744,0,0,0,0,1.047l4.867,4.867a.74.74,0,0,0,1.043,0l.442-.442a.731.731,0,0,0,.215-.521.709.709,0,0,0-.215-.512L3.7,48.332h9.052a.765.765,0,0,0,.749-.757V46.95A.75.75,0,0,0,12.737,46.22Z"
                    transform="translate(0 -41.674)"
                  />
                </g>
              </g>
            </svg>
          </Link>
          <hgroup>
            <h1 className="edit-profile__heading">Edit Profile</h1>
            <p className="edit-profile__subheading">Choose a profile icon.</p>
          </hgroup>
        </div>
        <div className="edit-profile__heading-wrapper">
          <em className="edit-profile__username-text">{currentUser.username}</em>
          <img
            className="edit-profile__user-img"
            src={currentUser.profilImage}
            alt={`${currentUser.username} Profile Image`}
          />
        </div>
      </header>

      <main>
        <h2 className="visually-hidden">Select Profile Image</h2>
        <ul className="edit-profile__list">
          {iconsData.map((list) => (
            <li
              className="edit-profile__list-item"
              key={list.name}
            >
              <h3
                className="edit-profile__slider-heading"
                aria-label={list.titleSrc && `${list.name}`}
              >
                {list.titleSrc ? (
                  <div className="edit-profile__title-img">
                    <img
                      src={list.titleSrc}
                      alt={list.name}
                    />
                  </div>
                ) : (
                  list.name
                )}
              </h3>
              <Slider data={list} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
