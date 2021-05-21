import React, { useContext, useState, useEffect } from 'react';
import axios from '../../../components/_generic/axiosSplunk/axiosSplunk';
import { useRouter } from 'next/router';
import { validateEmail } from '../../../helpers/validations';
import { redirectToURL } from '../../../helpers/url';
import Cookies from 'react-cookies';
import {
  URLSUBSCRIBE,
  DEFAULT_LOCATION,
  SUBSCRIPTION_SOURCE,
  COOKIE_SUBSCRIBED_EXPIRES,
} from '../../../config/setup/setup';
import COOKIES from '../../../config/cookies/cookies';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import WowModal from '../../WowModal';
import useToast from '../../_generic/toast/UseToast';
import { setLocation } from '../../../redux/actions/locations';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../../../providers/ThemeProvider';
import classNames from 'classnames';
import HeaderLogo from '../../header/HeaderLogo';
import {
  GO_TO_DEALS,
  SUBSCRIBE_LEGAL_TEXT,
  TOASTRMSG,
  AND,
  LOGIN,
  SAVE_80_WHERE_YOU_LIVE,
  CLOSE,
  SUBSCRIPTION_EMAIL_IS_REQUIRED,
} from '../../../config/text/text';
import LoginGoogle from '../../mediaButtons/GoogleButton';
import { LINK_LOGIN } from '../../../config/links/links';
import Spinner from '../../_generic/spinner/spinner';
import httpCommonHeaders from '../../../helpers/httpCommonHeaders';
import { trackEvent } from '../../../helpers/analytics';

// eslint-disable-next-line sonarjs/cognitive-complexity
const SubscribeModal = ({ showModal, setShowModal, isLightBox }) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const toast = useToast();
  const [email, setEmail] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [locationAux, setSelectLocation] = useState(
    DEFAULT_LOCATION[process.env.NEXT_PUBLIC_SITE].shortName
  );
  const [fieldonfocus, setOnFocus] = useState(false);
  const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb';
  const [locations] = useSelector((state) => [state.locations.locations]);
  const [location] = useSelector((state) => [state.locations.location]);
  const [isAuthenticated] = useSelector((state) => [
    state.user.isAuthenticated,
  ]);
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  /* eslint-disable jsx-a11y/no-onchange */
  /* eslint-disable react-hooks/exhaustive-deps */
  /* eslint-disable no-shadow */
  useEffect(() => {
    // Update select default with the value in redux
    if (location && location.shortName && location.shortName !== locationAux) {
      setSelectLocation(location.shortName);
    }
  }, [location]);

  //subscription call
  const subscribe = () => {
    if (!validateEmail(email)) {
      setShowError(true);
    } else {
      subscribeCall(email, locationAux, SUBSCRIPTION_SOURCE);
    }
  };
  const goToLogin = () => {
    redirectToURL(LINK_LOGIN, router);
  };
  const changeEmail = (evt) => {
    setEmail(evt.target.value);
    if (showError) setShowError(false);
  };

  const subscribeCall = (email, locationAux, subscriptionSource) => {
    try {
      setShowSpinner(true);
      axios({
        method: 'post',
        url: URLSUBSCRIBE,
        withCredentials: true,
        data: {
          email,
          location: locationAux,
          subscriptionSource,
        },

        headers: httpCommonHeaders(),
        validateStatus: false,
      })
        .then((res) => {
          setShowSpinner(false);
          trackEvent('completed_subscription');
          res.data.newEmail
            ? trackEvent('newEmailEvent')
            : trackEvent('repeatEmailEvent');
          // wowcher-win
          if (Cookies.load(COOKIES.wowcherWin) !== 'registered_user') {
            // subscribed
            Cookies.save(
              COOKIES.subscribed,
              'Wowcher',
              COOKIE_SUBSCRIBED_EXPIRES
            );
          }

          // eslint-disable-next-line promise/always-return
          switch (res.status) {
            case 200: {
              handleOnSubscribed(res.data);
              setShowModal(false);
              break;
            }
            case 400: {
              notifyError(res.data.message || TOASTRMSG);
              break;
            }
            default: {
              notifyError(TOASTRMSG);
              break;
            }
          }
          return true;
        })
        .catch(() => {
          setShowSpinner(false);
          // Show error if is needed
          notifyError(TOASTRMSG);
          return false;
        });
    } catch (err) {
      // Show error if is needed
      notifyError(TOASTRMSG);
      return false;
    }
  };

  /**
   * @param {String} message The error message to display
   */
  const notifyError = (message) => {
    toast.addToast(message, 'toast-error', 'top-right');
  };

  const handleOnSubscribed = (data) => {
    // Handle CT cookie
    handleCTCookie(data.token);
  };

  /**
   * Drop a 1-year CT cookie if the user is not logged in
   * @param {Object} autoToken the token returned by the API after subscription
   */
  const handleCTCookie = (customerToken) => {
    // ct
    if (!Cookies.load(COOKIES.customerToken))
      Cookies.save(COOKIES.customerToken, customerToken, 365);

    const newLocation = locations.find((locationObj) => {
      if (locationObj.shortName === locationAux) {
        return locationObj;
      }
    });

    dispatch(setLocation(newLocation, true));
  };

  const modalExtraClasses = classNames(
    `lightbox remove-header with-animation no-body-padding fullscreen-mobile`,
    {
      'lightbox-modal': isLightBox,
    }
  );

  const inputClassNames = classNames(`form-control field__email ng-valid`);

  const componentClass = classNames(`subscribeModal-container`, {
    'green-input': validateEmail(email),
    'red-input': !validateEmail(email) && fieldonfocus,
    'grey-input': !fieldonfocus && !validateEmail(email),
  });

  if (isAuthenticated) return null;
  return (
    <WowModal
      showModal={showModal}
      setShowModal={setShowModal}
      backdrop="static"
      size="sm"
      ariaLabelledBy="id-subscribe-modal"
      extraClasses={modalExtraClasses}
      backdropClassName="over-backdrop9999"
      centered={true}
    >
      <div className="popeye-wrapper popeye-modal-container__subscribe-modal">
        <div className="popeye-modal">
          <div className={componentClass}>
            {showSpinner && <Spinner />}
            <div className="form-group">
              <div className="header-bar row">
                <div className="logo-container col-8">
                  <HeaderLogo
                    // reversed={true}
                    both={true}
                    width="100px"
                    height="auto"
                    align="left"
                  />
                </div>

                <div className="buttons-section">
                  <button
                    className="close-modal"
                    onClick={() => goToLogin()}
                    onKeyPress={() => goToLogin()}
                  >
                    {LOGIN}
                  </button>
                  {isLightBox && (
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowModal(false)}
                      onKeyPress={() => setShowModal(false)}
                    >
                      <span aria-hidden="true">X</span>
                      <span className="sr-only">{CLOSE}</span>
                    </button>
                  )}
                </div>
              </div>

              <p className="center-align visible-xs">
                {SAVE_80_WHERE_YOU_LIVE}
              </p>
              {showError && (
                <div className="alert alert__error animate--collapse-toggle animate">
                  {SUBSCRIPTION_EMAIL_IS_REQUIRED}
                </div>
              )}
              <div className="subscribe-dropdown-container">
                <select
                  className="subscribe-dropdown"
                  onChange={(evt) => setSelectLocation(evt.target.value)}
                  defaultValue={locationAux}
                  data-qa="selectLocation"
                >
                  {locations.map((loc) => {
                    if (loc.countryCode === countryCode) {
                      return (
                        <option value={loc.shortName} key={loc.shortName}>
                          {loc && loc.name ? loc.name : ''}
                        </option>
                      );
                    }
                  })}
                </select>
                <div className="icon-container map-marker">
                  <Icon
                    faIcon={faMapMarkerAlt}
                    color={theme.colors.primary}
                    size="24px"
                  />
                </div>
              </div>

              <p className="center-align">{AND}</p>

              <div className="subscribe-form__google-sign-in-container">
                <LoginGoogle />
              </div>

              <div className="text-divider text-divider--or"></div>

              <div className="email-input-container">
                <input
                  type="text"
                  className={inputClassNames}
                  placeholder="Enter your email address"
                  name="email"
                  data-qa="enterEmail"
                  onChange={(evt) => changeEmail(evt)}
                  required
                  onFocus={() => setOnFocus(true)}
                  onBlur={() => setOnFocus(false)}
                />
                <div className="icon-container">
                  <Icon
                    faIcon={faEnvelope}
                    color={theme.colors.primary}
                    size="24px"
                  />
                </div>
              </div>

              <div className="justify legal-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: SUBSCRIBE_LEGAL_TEXT[process.env.NEXT_PUBLIC_BRAND],
                  }}
                ></div>
              </div>

              <button
                className="submit"
                type="submit"
                onClick={() => subscribe()}
              >
                {GO_TO_DEALS}
              </button>
            </div>

            <div className="overlay"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .popeye-modal {
          min-height: 680px;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
        }
        .overlay-wrapper {
          z-index: 9999999;
          background-color: red;
          color: black;
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
        .overlay {
          background-color: #000000;
          filter: opacity(0.6);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .subscribeModal-container {
          background-image: url(${theme.images.lightbox.subscribe});
          background-size: cover;
          background-repeat: no-repeat;
          padding: 20px;
          width: 100vw;
          height: 100vh;
          color: #ffffff;
          position: relative;
          font-family: ${theme.fonts.base};
        }

        .header-bar {
          width: 100%;
          margin-bottom: 20px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
        }

        .header-bar .close {
          position: absolute;
          top: 5px;
          opacity: 0.6;
          font-size: 1.3rem;

          font-family: Arial, Helvetica, sans-serif;
          font-weight: lighter;
          color: gray;
          text-size-adjust: 70%;
          font-size: 18px;
        }

        .form-group {
          position: relative;
          z-index: 99;
        }

        .subscribe-dropdown-container,
        .email-input-container {
          position: relative;
          margin-bottom: 20px;
        }

        .icon-container {
          position: absolute;
          left: 0;
          top: 0;
          margin: 4px 0 0 10px;
        }

        .icon-container.map-marker {
          margin: 6px 0 0 12px;
        }

        .subscribe-dropdown,
        .field__email {
          width: 100%;
          font-size: 16px;
          color: #4d4d4d;
          // padding: 12px 6px 12px 45px;
          border-radius: 6px;
          border: 1px solid #c7c7c7;
          appearence: none;
          background-color: #ffffff;
          margin: 0;
          text-indent: 42px;
          height: 46px;
        }

        .subscribe-dropdown::-ms-expand {
          display: none;
        }

        .subscribe-dropdown {
          word-wrap: normal;
          -webkit-appearance: none;
          -moz-appearance: none;
          -o-appearance: none;
          appearance: none;
          text-overflow: '';
        }

        .subscribe-dropdown-container::after {
          content: '';
          pointer-events: none;
          position: absolute;
          top: 20px;
          right: 10px;
          bottom: auto;
          left: auto;
          width: 0;
          height: 0;
          border-left: 6px solid rgba(0, 0, 0, 0);
          border-right: 6px solid rgba(0, 0, 0, 0);
          border-top: 6px solid #c7c7c7;
        }

        .center-align {
          text-align: center;
        }

        .justify {
          text-align: justify;
          font-size: 14px;
          line-height: 1.4rem;
        }

        .close-modal {
          border: 1px solid ${theme.colors.primary};
          color: ${theme.colors.lightboxbuttoncolor};
          background: ${theme.colors.lightboxbuttonbackground};
          font-size: 18px;
          margin: 0;
          padding: 0;
          max-height: 38px;
          margin-top: 13px;
          text-transform: ${theme.text.lightbox};
          padding: 5px 10px;
          border-radius: 4px;
          border-bottom: ${theme.colors.lightboxbuttonborderbottom};
        }

        .submit {
          width: 100%;
          font-size: 24px;
          text-transform: ${theme.text.lightbox};
          background: ${theme.colors.lightboxsubmitbuttonbackground};
          border-bottom: ${theme.colors.lightboxsubmitbuttonborder};
          color: #ffffff;
          border-radius: 5px;
          border: 0;
          padding: 10px;
        }
        .green-input select,
        .green-input input {
          border-color: ${theme.colors.lightboxgreenborders};
        }
        .red-input input {
          border-color: ${theme.colors.lightboxredborders};
        }
        .grey-input input {
          border-color: ${theme.colors.lightboxgrayborders};
        }

        .animate {
          transition-property: all;
          transition-duration: 0.3s;
          transition-timing-function: ease-in-out;
        }
        .alert__error {
          padding: 10px;
          text-align: center;
          border: 1px solid #af1512;
          background: #f49a99;
          color: #af1512;
          margin-bottom: 10px;
        }

        .legal-text {
          padding-bottom: 10px;
          line-height: 1.4;
          font-weight: 100;
        }
        .modal-backdrop {
          z-index: 9999;
        }
        .text-divider {
          color: black;
          position: relative;
          margin: 15px 0;
          text-align: center;
        }
        .text-divider--or:after {
          content: 'Or';
        }
        .text-divider:after {
          background-color: #f6f6f6;
          border: 1px solid #fff;
          padding: 0 12px;
          border-radius: 3px;
          font-size: 12px;
          position: relative;
          z-index: 2;
        }
        .text-divider:before {
          content: '';
          border-top: 1px solid #fff;
          display: block;
          width: 100%;
          position: absolute;
          top: 50%;
          z-index: 1;
        }
        @media (max-width: ${theme.breakpoints.mdUp}) {
          .popeye-wrapper {
            width: 100%;
          }
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          //768
          .overlay {
            border-radius: 6px;
          }
          .text-divider:before {
            border-top: 1px solid #979797;
          }
          .alert__error {
            padding: 6px;
          }
          .visible-xs {
            display: none;
          }
          .overlay {
            filter: none;
            background-color: inherit;
          }

          .popeye-modal {
            border-radius: 6px;
            background-image: url(${theme.images.lightbox.popeye});
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding-left: 20px;
            padding-right: 20px;
            background-color: transparent;
            height: 100%;
          }

          .subscribeModal-container {
            position: relative;
            max-width: 340px;
            background-image: none;
            background-color: #ffffff;
            border-radius: 6px;
            color: black;
            outline: 0;
            padding: 16px 20px;
            height: auto;
            border: ${theme.colors.lightboxcontainerborder};
            box-shadow: ${theme.colors.lightboxcontainerboxshadow};
            border: 1px solid #ffffff;
            height: 100%;
          }

          @media (min-width: ${theme.breakpoints.lgUp}) {
            //992px
            .subscribeModal-container {
              max-width: 370px;
              min-height: 580px;
              height: fit-content;
            }
          }
        } // 768
      `}</style>
      <style jsx global>{`
        .modal.lightbox-modal .modal-dialog-centered {
          height: 100%;
        }
        .modal.lightbox-modal .modal-content {
          height: 100%;
        }

        .modal.lightbox-modal.no-rounded-corners .model-content {
          border-radius: 6px;
        }
        .modal.lightbox .logo-container img {
          width: 100%;
          max-width: 100px;
        }
        .modal.lightbox-modal .close-modal {
          margin-right: 30px;
        }
        .modal.lightbox .legal-text a {
          color: ${theme.colors.Lightboxlegaltextcolor};
        }
        .modal.lightbox {
          z-index: 99999;
        }
        .over-backdrop9999 {
          z-index: 9999;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          //768
          .modal.lightbox .legal-text a {
            color: ${theme.colors.lightboxlegaltextcolor768};
          }
          .modal.lightbox .model-content {
            border-radius: 0px;
          }
        }
        @media (min-width: ${theme.breakpoints.smUp}) {
          //576px
          .modal.lightbox .modal-sm {
            width: 90%;
            max-width: 920px;
            height: auto;
          }
          .modal.lightbox .modal-content {
            background-color: transparent;
          }
        }
      `}</style>
      <style jsx global>{`
        .subscribe-form__google-sign-in-container a.media-button.google {
          width: 100%;
          border-radius: 3px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
        }
        .subscribe-form__google-sign-in-container a.media-button.google:hover {
          box-shadow: 5px 5px 4px 0 rgba(0, 0, 0, 0.4);
        }
        .subscribe-form__google-sign-in-container
          a.media-button.google
          .media-button__text {
          font-size: 16px;
        }
      `}</style>
    </WowModal>
  );
};

SubscribeModal.propTypes = {
  onChangeFunction: PropTypes.func.isRequired,
  isLightBox: PropTypes.bool,
};

SubscribeModal.defaultProps = {
  onChangeFunction: () => {},
  isLightBox: false,
};

export default SubscribeModal;
