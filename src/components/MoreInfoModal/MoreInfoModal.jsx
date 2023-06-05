import { useEffect, useRef, useState } from "react";

import "./moreInfoModal.scss";

export default function MoreInfoModal({ isLearnMoreModalOpen, setIsLearnMoreModalOpen }) {
  const [modalStep, setModalStep] = useState(1);

  const learnMoreModalRef = useRef(null);

  useEffect(() => {
    if (isLearnMoreModalOpen) {
      if (!learnMoreModalRef.current.open) {
        learnMoreModalRef.current.showModal();
        setModalStep(1);
      }
    } else {
      learnMoreModalRef.current.close();
      setModalStep(1);
    }
  }, [isLearnMoreModalOpen]);

  function closeModal() {
    learnMoreModalRef.current.close();
    setIsLearnMoreModalOpen(false);
    setModalStep(1);
  }

  function closeModalOnBackdropClick(e) {
    const dialogDimensions = e.target.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  }

  const handleBackClick = () => {
    if (modalStep > 1) {
      setModalStep(modalStep - 1);
    }
  };

  const handleNextClick = () => {
    if (modalStep < 3) {
      setModalStep(modalStep + 1);
    }
  };

  return (
    <dialog
      className="learn-more-modal"
      ref={learnMoreModalRef}
      onClick={(e) => closeModalOnBackdropClick(e)}
    >
      <div className="learn-more-modal__wrapper">
        <button
          className="learn-more-modal__close-btn"
          onClick={() => closeModal()}
          aria-label="Close Modal"
        >
          <svg
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <section className="learn-more-modal__step-container">
          {/* //* Step 1 */}
          {modalStep === 1 && (
            <>
              <img
                className="learn-more-modal__profil-img"
                src="/images/profiles/sassyCat-img.jpg"
                alt="SassyCat Profil Avatar"
              />
              <span>Alex</span>
              <span className="learn-more-modal__nick-wrapper">
                <svg
                  className="learn-more-modal__nick-icon"
                  aria-hidden="true"
                  width="24"
                  height="24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.767749 7.68811C0.932447 5.05293 3.1177 3 5.75801 3H18.2424C20.8827 3 23.068 5.05293 23.2327 7.68811L23.7327 15.6881C23.9126 18.5666 21.6265 21 18.7424 21H18.2794C15.896 21 13.8439 19.3177 13.3765 16.9806L13.1804 16H10.82L10.6239 16.9806C10.1565 19.3177 8.1044 21 5.72099 21H5.25801C2.3739 21 0.0878432 18.5666 0.267749 15.6881L0.767749 7.68811ZM5.75801 5C4.17382 5 2.86267 6.23176 2.76385 7.81286L2.26385 15.8129C2.15591 17.54 3.52755 19 5.25801 19H5.72099C7.15103 19 8.38228 17.9906 8.66273 16.5883L9.01963 14.8039L9.1804 14H10.0002H14.0002H14.82L14.9808 14.8039L15.3377 16.5883C15.6181 17.9906 16.8494 19 18.2794 19H18.7424C20.4729 19 21.8445 17.54 21.7366 15.8129L21.2366 7.81287C21.1377 6.23176 19.8266 5 18.2424 5H5.75801ZM6.00021 9V7H8.00021V9H10.0002V11H8.00021V13H6.00021V11H4.00021V9H6.00021ZM18.0002 8C18.0002 8.55228 17.5525 9 17.0002 9C16.4479 9 16.0002 8.55228 16.0002 8C16.0002 7.44772 16.4479 7 17.0002 7C17.5525 7 18.0002 7.44772 18.0002 8ZM15.0002 11C15.5525 11 16.0002 10.5523 16.0002 10C16.0002 9.44772 15.5525 9 15.0002 9C14.4479 9 14.0002 9.44772 14.0002 10C14.0002 10.5523 14.4479 11 15.0002 11ZM18.0002 12C18.0002 12.5523 17.5525 13 17.0002 13C16.4479 13 16.0002 12.5523 16.0002 12C16.0002 11.4477 16.4479 11 17.0002 11C17.5525 11 18.0002 11.4477 18.0002 12ZM19.0002 11C19.5525 11 20.0002 10.5523 20.0002 10C20.0002 9.44772 19.5525 9 19.0002 9C18.4479 9 18.0002 9.44772 18.0002 10C18.0002 10.5523 18.4479 11 19.0002 11Z"
                    fill="currentColor"
                  ></path>
                </svg>
                SassyCat
              </span>
              <h4 className="learn-more-modal__header">Your name in games</h4>
              <p className="learn-more-modal__text">
                Your game handle represents you across Netflix Games.
              </p>
            </>
          )}

          {/* //* Step  */}
          {modalStep === 2 && (
            <>
              <ul className="learn-more-modal__actions-list">
                <li className="learn-more-modal__actions-list-item">
                  <svg
                    width="24"
                    height="24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.767749 7.68811C0.932447 5.05293 3.1177 3 5.75801 3H18.2424C20.8827 3 23.068 5.05293 23.2327 7.68811L23.7327 15.6881C23.9126 18.5666 21.6265 21 18.7424 21H18.2794C15.896 21 13.8439 19.3177 13.3765 16.9806L13.1804 16H10.82L10.6239 16.9806C10.1565 19.3177 8.1044 21 5.72099 21H5.25801C2.3739 21 0.0878432 18.5666 0.267749 15.6881L0.767749 7.68811ZM5.75801 5C4.17382 5 2.86267 6.23176 2.76385 7.81286L2.26385 15.8129C2.15591 17.54 3.52755 19 5.25801 19H5.72099C7.15103 19 8.38228 17.9906 8.66273 16.5883L9.01963 14.8039L9.1804 14H10.0002H14.0002H14.82L14.9808 14.8039L15.3377 16.5883C15.6181 17.9906 16.8494 19 18.2794 19H18.7424C20.4729 19 21.8445 17.54 21.7366 15.8129L21.2366 7.81287C21.1377 6.23176 19.8266 5 18.2424 5H5.75801ZM6.00021 9V7H8.00021V9H10.0002V11H8.00021V13H6.00021V11H4.00021V9H6.00021ZM18.0002 8C18.0002 8.55228 17.5525 9 17.0002 9C16.4479 9 16.0002 8.55228 16.0002 8C16.0002 7.44772 16.4479 7 17.0002 7C17.5525 7 18.0002 7.44772 18.0002 8ZM15.0002 11C15.5525 11 16.0002 10.5523 16.0002 10C16.0002 9.44772 15.5525 9 15.0002 9C14.4479 9 14.0002 9.44772 14.0002 10C14.0002 10.5523 14.4479 11 15.0002 11ZM18.0002 12C18.0002 12.5523 17.5525 13 17.0002 13C16.4479 13 16.0002 12.5523 16.0002 12C16.0002 11.4477 16.4479 11 17.0002 11C17.5525 11 18.0002 11.4477 18.0002 12ZM19.0002 11C19.5525 11 20.0002 10.5523 20.0002 10C20.0002 9.44772 19.5525 9 19.0002 9C18.4479 9 18.0002 9.44772 18.0002 10C18.0002 10.5523 18.4479 11 19.0002 11Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span>SassyCat wants to play</span>
                </li>
                <li className="learn-more-modal__actions-list-item">
                  <svg
                    width="24"
                    height="24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.4961 16.8648L12 17.1587L12.5039 16.8648L13.4429 16.317L19.9503 21.001H4.04967L10.5571 16.317L11.4961 16.8648ZM22 20.0121L15.3339 15.2139L22 11.3253V20.0121ZM24 10.1587V9.00098L23.0739 8.3835L12.5547 1.36988C12.2188 1.1459 11.7812 1.1459 11.4453 1.36988L0.926103 8.3835L0 9.00098V10.1587V21.001C0 21.1447 0.0151608 21.2849 0.0439705 21.42C0.0881772 21.6274 0.16452 21.8228 0.267537 22.0009C0.334313 22.1164 0.412297 22.2245 0.5 22.3239C0.737957 22.5935 1.04747 22.7985 1.39881 22.909C1.58857 22.9688 1.79052 23.001 2 23.001H22C22.2095 23.001 22.4114 22.9688 22.6012 22.909C22.9525 22.7985 23.262 22.5935 23.5 22.3239C23.5877 22.2245 23.6657 22.1164 23.7325 22.0009C23.8355 21.8228 23.9118 21.6274 23.956 21.42C23.9848 21.2849 24 21.1447 24 21.001V10.1587ZM12 3.40379L21.151 9.5052L12.9961 14.2622L12 14.8433L11.0039 14.2622L2.84901 9.5052L12 3.40379ZM2 20.0121V11.3253L8.66609 15.2139L2 20.0121ZM10.4951 9.3478L9.75642 11.7362C9.72941 11.8235 9.82753 11.8961 9.90308 11.8446L12 10.4173L14.0969 11.8446C14.1725 11.8961 14.2706 11.8235 14.2436 11.7362L13.5049 9.3478L15.2971 8.01871C15.3683 7.9659 15.3367 7.85334 15.2483 7.84578C14.5113 7.78268 13.7571 7.74065 12.9889 7.72116L12.0908 5.24985C12.06 5.16503 11.94 5.16503 11.9092 5.24985L11.0111 7.72116C10.2429 7.74065 9.48866 7.78269 8.75166 7.84578C8.66332 7.85334 8.63173 7.9659 8.70295 8.01871L10.4951 9.3478Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span>Sr1acha sent an invite</span>
                </li>
                <li className="learn-more-modal__actions-list-item">
                  <svg
                    width="24"
                    height="24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.00011 8C5.00011 6.34315 6.34326 5 8.00011 5C9.65697 5 11.0001 6.34315 11.0001 8C11.0001 9.65685 9.65697 11 8.00011 11C6.34326 11 5.00011 9.65685 5.00011 8ZM8.00011 3C5.23869 3 3.00011 5.23858 3.00011 8C3.00011 10.7614 5.23869 13 8.00011 13C10.7615 13 13.0001 10.7614 13.0001 8C13.0001 5.23858 10.7615 3 8.00011 3ZM23.2072 10.2071L18.7072 14.7071L18.0001 15.4142L17.293 14.7071L14.793 12.2071L16.2072 10.7929L18.0001 12.5858L21.793 8.79289L23.2072 10.2071ZM7.09913 17C4.61095 17 2.46867 18.7563 1.98069 21.1961L0.0195312 20.8039C0.694473 17.4292 3.65759 15 7.09913 15H8.90109C12.3426 15 15.3057 17.4292 15.9807 20.8039L14.0195 21.1961C13.5316 18.7563 11.3893 17 8.90109 17H7.09913Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span>S0uless currently online</span>
                </li>
              </ul>
              <h4 className="learn-more-modal__header">Play with others</h4>
              <p className="learn-more-modal__text">
                Your unique game handle will be used when you play with other members.
              </p>
            </>
          )}

          {/* //* Step 3 */}
          {modalStep === 3 && (
            <>
              <ul className="learn-more-modal__place-list">
                <li className="learn-more-modal__place-list-item learn-more-modal__place-list-item--first">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#a1)">
                      <path
                        d="m17.762 18.619-3.38 12.612a.667.667 0 0 1-1.22.161l-2.024-3.505-3.505 2.023a.667.667 0 0 1-.978-.75l3.38-12.612 7.727 2.07Z"
                        fill="url(#b1)"
                      ></path>
                      <path
                        d="m21.966 16.548 3.38 12.612a.667.667 0 0 1-.978.75l-3.505-2.023-2.024 3.505a.667.667 0 0 1-1.221-.161l-3.38-12.612 7.728-2.07Z"
                        fill="url(#c1)"
                      ></path>
                      <path
                        d="M14.542 1.799c.577-1.24 2.339-1.24 2.915 0a1.608 1.608 0 0 0 2.381.637c1.12-.784 2.645.097 2.525 1.458a1.608 1.608 0 0 0 1.743 1.743c1.361-.12 2.242 1.406 1.457 2.525-.574.819-.269 1.958.638 2.38 1.24.577 1.24 2.339 0 2.915a1.608 1.608 0 0 0-.638 2.381c.785 1.12-.096 2.645-1.457 2.525a1.608 1.608 0 0 0-1.743 1.743c.12 1.361-1.406 2.242-2.525 1.457a1.608 1.608 0 0 0-2.38.638c-.577 1.24-2.34 1.24-2.916 0a1.608 1.608 0 0 0-2.38-.638c-1.12.785-2.645-.096-2.525-1.457a1.608 1.608 0 0 0-1.743-1.743c-1.361.12-2.242-1.406-1.458-2.525.575-.819.27-1.958-.637-2.38-1.24-.577-1.24-2.34 0-2.916a1.608 1.608 0 0 0 .637-2.38c-.784-1.12.097-2.645 1.458-2.525a1.608 1.608 0 0 0 1.743-1.743c-.12-1.361 1.405-2.242 2.524-1.458.82.575 1.96.27 2.381-.637Z"
                        fill="url(#d1)"
                      ></path>
                      <circle
                        cx="16"
                        cy="12"
                        r="7.333"
                        fill="url(#e1)"
                      ></circle>
                      <circle
                        cx="16"
                        cy="12"
                        r="7.333"
                        fill="url(#f1)"
                      ></circle>
                      <circle
                        cx="16"
                        cy="12"
                        r="7.333"
                        stroke="url(#g1)"
                        strokeWidth="1.333"
                      ></circle>
                      <path
                        d="M15.578 16.334V9.938l-1.908.527V8.822l3.804-.996v8.508h-1.896Z"
                        fill="#D2F1FF"
                      ></path>
                    </g>
                    <defs>
                      <linearGradient
                        id="b1"
                        x1="9.378"
                        y1="31.556"
                        x2="12.484"
                        y2="19.965"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#2A2ACF"></stop>
                        <stop
                          offset="1"
                          stopColor="#222275"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="c1"
                        x1="21.174"
                        y1="31.944"
                        x2="18.068"
                        y2="20.353"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#2A2ACF"></stop>
                        <stop
                          offset="1"
                          stopColor="#3F54FF"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="d1"
                        x1="13.5"
                        y1="25.333"
                        x2="13.5"
                        y2="-1.333"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#2A2ACF"></stop>
                        <stop
                          offset="1"
                          stopColor="#3F54FF"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="e1"
                        x1="14.5"
                        y1="20"
                        x2="14.5"
                        y2="4"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#3F54FF"></stop>
                        <stop
                          offset="1"
                          stopColor="#29AAFF"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="f1"
                        x1="16"
                        y1="5.6"
                        x2="16"
                        y2="18.4"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#222275"></stop>
                        <stop
                          offset="1"
                          stopColor="#1D30CC"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="g1"
                        x1="16"
                        y1="4"
                        x2="16"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFA10B"></stop>
                        <stop
                          offset="1"
                          stopColor="#FFCA45"
                        ></stop>
                      </linearGradient>
                      <clipPath id="a1">
                        <path
                          fill="#fff"
                          d="M0 0h32v32H0z"
                        ></path>
                      </clipPath>
                    </defs>
                  </svg>
                  <span>SassyCat</span>
                </li>
                <li className="learn-more-modal__place-list-item learn-more-modal__place-list-item--second">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6144_299992)">
                      <path
                        d="M17.7621 18.6189L14.3826 31.2312C14.2289 31.8049 13.4583 31.9063 13.1613 31.392L11.1376 27.8868L7.6325 29.9105C7.11814 30.2075 6.5015 29.7343 6.65522 29.1606L10.0347 16.5483L17.7621 18.6189Z"
                        fill="url(#paint0_linear_6144_299992)"
                      ></path>
                      <path
                        d="M21.9657 16.5481L25.3451 29.1604C25.4989 29.7341 24.8822 30.2072 24.3679 29.9103L20.8627 27.8866L18.839 31.3917C18.5421 31.9061 17.7715 31.8046 17.6177 31.2309L14.2383 18.6187L21.9657 16.5481Z"
                        fill="url(#paint1_linear_6144_299992)"
                      ></path>
                      <path
                        d="M14.5422 1.79855C15.1189 0.559387 16.8807 0.559387 17.4574 1.79855V1.79855C17.8796 2.7057 19.019 3.01099 19.8382 2.43646V2.43646C20.9572 1.65166 22.483 2.53257 22.3628 3.89406V3.89406C22.2748 4.89076 23.1089 5.72484 24.1056 5.63688V5.63688C25.4671 5.51672 26.348 7.0425 25.5632 8.1615V8.1615C24.9887 8.98069 25.294 10.1201 26.2011 10.5422V10.5422C27.4403 11.1189 27.4403 12.8807 26.2011 13.4574V13.4574C25.294 13.8796 24.9887 15.019 25.5632 15.8382V15.8382C26.348 16.9572 25.4671 18.483 24.1056 18.3628V18.3628C23.1089 18.2748 22.2748 19.1089 22.3628 20.1056V20.1056C22.483 21.4671 20.9572 22.348 19.8382 21.5632V21.5632C19.019 20.9887 17.8796 21.294 17.4574 22.2011V22.2011C16.8807 23.4403 15.1189 23.4403 14.5422 22.2011V22.2011C14.1201 21.294 12.9807 20.9887 12.1615 21.5632V21.5632C11.0425 22.348 9.51672 21.4671 9.63688 20.1056V20.1056C9.72484 19.1089 8.89076 18.2748 7.89406 18.3628V18.3628C6.53257 18.483 5.65166 16.9572 6.43646 15.8382V15.8382C7.01099 15.019 6.7057 13.8796 5.79855 13.4574V13.4574C4.55939 12.8807 4.55939 11.1189 5.79855 10.5422V10.5422C6.7057 10.1201 7.01099 8.98069 6.43646 8.1615V8.1615C5.65166 7.0425 6.53257 5.51672 7.89406 5.63688V5.63688C8.89076 5.72484 9.72484 4.89076 9.63688 3.89406V3.89406C9.51672 2.53257 11.0425 1.65166 12.1615 2.43646V2.43646C12.9807 3.01099 14.1201 2.7057 14.5422 1.79855V1.79855Z"
                        fill="url(#paint2_linear_6144_299992)"
                      ></path>
                      <circle
                        cx="16"
                        cy="12"
                        r="7.33333"
                        fill="url(#paint3_linear_6144_299992)"
                      ></circle>
                      <circle
                        cx="16"
                        cy="12"
                        r="7.33333"
                        fill="url(#paint4_linear_6144_299992)"
                      ></circle>
                      <circle
                        cx="16"
                        cy="12"
                        r="7.33333"
                        stroke="url(#paint5_linear_6144_299992)"
                        strokeWidth="1.33333"
                      ></circle>
                      <circle
                        cx="16"
                        cy="12"
                        r="7.33333"
                        stroke="url(#paint6_linear_6144_299992)"
                        strokeWidth="1.33333"
                      ></circle>
                      <path
                        d="M12.89 16.3335V14.7975L16.142 11.9535C16.502 11.6415 16.75 11.3815 16.886 11.1735C17.022 10.9655 17.09 10.7335 17.09 10.4775C17.09 10.1975 16.99 9.9615 16.79 9.7695C16.59 9.5775 16.306 9.4815 15.938 9.4815C15.578 9.4815 15.286 9.5695 15.062 9.7455C14.838 9.9135 14.698 10.1335 14.642 10.4055H12.818C12.89 9.8935 13.062 9.4455 13.334 9.0615C13.614 8.6695 13.978 8.3615 14.426 8.1375C14.882 7.9135 15.398 7.8015 15.974 7.8015C16.566 7.8015 17.09 7.9135 17.546 8.1375C18.002 8.3535 18.362 8.6615 18.626 9.0615C18.89 9.4535 19.022 9.9135 19.022 10.4415C19.022 11.0015 18.87 11.4895 18.566 11.9055C18.262 12.3135 17.87 12.7175 17.39 13.1175L15.506 14.6895H19.094V16.3335H12.89Z"
                        fill="#FFDDF6"
                      ></path>
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_6144_299992"
                        x1="9.37791"
                        y1="31.5564"
                        x2="12.4837"
                        y2="19.9653"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E50A14"></stop>
                        <stop
                          offset="1"
                          stopColor="#7D2889"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_6144_299992"
                        x1="21.1736"
                        y1="31.9444"
                        x2="18.0677"
                        y2="20.3533"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E50A14"></stop>
                        <stop
                          offset="1"
                          stopColor="#F76981"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_6144_299992"
                        x1="13.4998"
                        y1="25.3332"
                        x2="13.4998"
                        y2="-1.3335"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E50A14"></stop>
                        <stop
                          offset="1"
                          stopColor="#F76981"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_6144_299992"
                        x1="14.5"
                        y1="20"
                        x2="14.5"
                        y2="4"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#3F54FF"></stop>
                        <stop
                          offset="1"
                          stopColor="#29AAFF"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_6144_299992"
                        x1="16"
                        y1="5.6"
                        x2="16"
                        y2="18.4"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#7D2889"></stop>
                        <stop
                          offset="1"
                          stopColor="#E50A14"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_6144_299992"
                        x1="16"
                        y1="4"
                        x2="16"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E6E6E6"></stop>
                        <stop
                          offset="1"
                          stopColor="#F9F9F9"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_6144_299992"
                        x1="16"
                        y1="4"
                        x2="16"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFA10B"></stop>
                        <stop
                          offset="1"
                          stopColor="#FFCA45"
                        ></stop>
                      </linearGradient>
                      <clipPath id="clip0_6144_299992">
                        <rect
                          width="32"
                          height="32"
                          fill="white"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Sr1acha</span>
                </li>
                <li className="learn-more-modal__place-list-item learn-more-modal__place-list-item--third">
                  <svg
                    width="32"
                    height="32"
                    opacity="0.4"
                  >
                    <g clipPath="url(#clip0_6144_299998)">
                      <path
                        d="M17.7621 18.6189L14.3826 31.2312C14.2289 31.8049 13.4583 31.9063 13.1613 31.392L11.1376 27.8868L7.6325 29.9105C7.11814 30.2075 6.5015 29.7343 6.65522 29.1606L10.0347 16.5483L17.7621 18.6189Z"
                        fill="url(#paint0_linear_6144_299998)"
                      ></path>
                      <path
                        d="M21.9657 16.5481L25.3451 29.1604C25.4989 29.7341 24.8822 30.2072 24.3679 29.9103L20.8627 27.8866L18.839 31.3917C18.5421 31.9061 17.7715 31.8046 17.6177 31.2309L14.2383 18.6187L21.9657 16.5481Z"
                        fill="url(#paint1_linear_6144_299998)"
                      ></path>
                      <path
                        d="M14.5422 1.79855C15.1189 0.559387 16.8807 0.559387 17.4574 1.79855V1.79855C17.8796 2.7057 19.019 3.01099 19.8382 2.43646V2.43646C20.9572 1.65166 22.483 2.53257 22.3628 3.89406V3.89406C22.2748 4.89076 23.1089 5.72484 24.1056 5.63688V5.63688C25.4671 5.51672 26.348 7.0425 25.5632 8.1615V8.1615C24.9887 8.98069 25.294 10.1201 26.2011 10.5422V10.5422C27.4403 11.1189 27.4403 12.8807 26.2011 13.4574V13.4574C25.294 13.8796 24.9887 15.019 25.5632 15.8382V15.8382C26.348 16.9572 25.4671 18.483 24.1056 18.3628V18.3628C23.1089 18.2748 22.2748 19.1089 22.3628 20.1056V20.1056C22.483 21.4671 20.9572 22.348 19.8382 21.5632V21.5632C19.019 20.9887 17.8796 21.294 17.4574 22.2011V22.2011C16.8807 23.4403 15.1189 23.4403 14.5422 22.2011V22.2011C14.1201 21.294 12.9807 20.9887 12.1615 21.5632V21.5632C11.0425 22.348 9.51672 21.4671 9.63688 20.1056V20.1056C9.72484 19.1089 8.89076 18.2748 7.89406 18.3628V18.3628C6.53257 18.483 5.65166 16.9572 6.43646 15.8382V15.8382C7.01099 15.019 6.7057 13.8796 5.79855 13.4574V13.4574C4.55939 12.8807 4.55939 11.1189 5.79855 10.5422V10.5422C6.7057 10.1201 7.01099 8.98069 6.43646 8.1615V8.1615C5.65166 7.0425 6.53257 5.51672 7.89406 5.63688V5.63688C8.89076 5.72484 9.72484 4.89076 9.63688 3.89406V3.89406C9.51672 2.53257 11.0425 1.65166 12.1615 2.43646V2.43646C12.9807 3.01099 14.1201 2.7057 14.5422 1.79855V1.79855Z"
                        fill="url(#paint2_linear_6144_299998)"
                      ></path>
                      <circle
                        cx="16"
                        cy="12"
                        r="7.33333"
                        fill="url(#paint3_linear_6144_299998)"
                        stroke="url(#paint4_linear_6144_299998)"
                        strokeWidth="1.33333"
                      ></circle>
                      <path
                        d="M16.022 16.5135C15.078 16.5135 14.322 16.3015 13.754 15.8775C13.186 15.4455 12.842 14.8575 12.722 14.1135H14.594C14.682 14.3535 14.85 14.5375 15.098 14.6655C15.354 14.7935 15.654 14.8575 15.998 14.8575C16.342 14.8575 16.634 14.7775 16.874 14.6175C17.122 14.4575 17.246 14.2015 17.246 13.8495C17.246 13.5375 17.126 13.3055 16.886 13.1535C16.646 12.9935 16.342 12.9135 15.974 12.9135H14.918V11.3175H15.902C16.254 11.3175 16.538 11.2335 16.754 11.0655C16.97 10.8895 17.078 10.6575 17.078 10.3695C17.078 10.0575 16.966 9.8295 16.742 9.6855C16.518 9.5335 16.23 9.4575 15.878 9.4575C15.558 9.4575 15.286 9.5255 15.062 9.6615C14.838 9.7895 14.69 9.9615 14.618 10.1775H12.794C12.962 9.4575 13.322 8.8815 13.874 8.4495C14.426 8.0175 15.138 7.8015 16.01 7.8015C16.546 7.8015 17.038 7.9015 17.486 8.1015C17.934 8.2935 18.29 8.5735 18.554 8.9415C18.826 9.3095 18.962 9.7455 18.962 10.2495C18.962 10.6575 18.854 11.0175 18.638 11.3295C18.422 11.6415 18.11 11.8735 17.702 12.0255C18.182 12.1775 18.546 12.4335 18.794 12.7935C19.042 13.1535 19.166 13.5535 19.166 13.9935C19.166 14.5215 19.026 14.9735 18.746 15.3495C18.474 15.7255 18.098 16.0135 17.618 16.2135C17.146 16.4135 16.614 16.5135 16.022 16.5135Z"
                        fill="#A60A5E"
                      ></path>
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_6144_299998"
                        x1="9.37791"
                        y1="31.5564"
                        x2="12.4837"
                        y2="19.9653"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFCA45"></stop>
                        <stop
                          offset="0.494355"
                          stopColor="#FFA10B"
                        ></stop>
                        <stop
                          offset="1"
                          stopColor="#D02983"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_6144_299998"
                        x1="21.1736"
                        y1="31.9444"
                        x2="18.0677"
                        y2="20.3533"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFA10B"></stop>
                        <stop
                          offset="1"
                          stopColor="#FFEB73"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_6144_299998"
                        x1="13.4998"
                        y1="25.3332"
                        x2="13.4998"
                        y2="-1.3335"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFA10B"></stop>
                        <stop
                          offset="1"
                          stopColor="#FFCA45"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_6144_299998"
                        x1="16"
                        y1="18.6667"
                        x2="16"
                        y2="5.33333"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFCA45"></stop>
                        <stop
                          offset="1"
                          stopColor="#FFA10B"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_6144_299998"
                        x1="16"
                        y1="4"
                        x2="16"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FF661D"></stop>
                        <stop
                          offset="1"
                          stopColor="#CE3A00"
                        ></stop>
                      </linearGradient>
                      <clipPath id="clip0_6144_299998">
                        <rect
                          width="32"
                          height="32"
                          fill="white"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span>S0uless</span>
                </li>
              </ul>
              <h4 className="learn-more-modal__header">Climb the leaderboards</h4>
              <p className="learn-more-modal__text">
                Your game handle will allow you to see where you are on leaderboards.
              </p>
            </>
          )}
        </section>

        <nav className="learn-more-modal__navigation">
          <h4 className="visually-hidden">Modal Navigation</h4>
          {modalStep !== 1 ? (
            <div>
              <button
                className="learn-more-modal__btn learn-more-modal__btn--back"
                onClick={handleBackClick}
              >
                Back
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <div
            className="learn-more-modal__dot-container"
            aria-hidden="true"
          >
            <span className={`learn-more-modal__dot${modalStep === 1 ? " active" : ""}`}></span>
            <span className={`learn-more-modal__dot${modalStep === 2 ? " active" : ""}`}></span>
            <span className={`learn-more-modal__dot${modalStep === 3 ? " active" : ""}`}></span>
          </div>
          <div className="btn-next-wrapper">
            <button
              className="learn-more-modal__btn learn-more-modal__btn--next"
              onClick={modalStep === 3 ? closeModal : handleNextClick}
            >
              {modalStep === 3 ? "Done" : "Next"}
            </button>
          </div>
        </nav>
      </div>
    </dialog>
  );
}
