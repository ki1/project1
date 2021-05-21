import React, { useState, useRef, useEffect } from 'react';
import axios from '../_generic/axiosSplunk/axiosSplunk';
import HeaderIcon from './HeaderIcon';
import WowModal from '../WowModal';
import InputForm from '../_generic/input/Input';
import ButtonForm from '../_generic/button/CTAButton';
import ConfirmationModal from '../_generic/comfirmation/ConfirmationModal';
import { validateEmail } from '../../helpers/validations';
import { ENTER_VALID_EMAIL, SIGN_UP, YOUR_EMAIL } from '../../config/text/text';
import { useSelector } from 'react-redux';
import Cookies from 'react-cookies';
import { URLSUBSCRIBE } from '../../config/setup/setup';
import COOKIES from '../../config/cookies/cookies';
import httpCommonHeaders from '../../helpers/httpCommonHeaders';
import { trackEvent } from '../../helpers/analytics';

const HeaderSubscribe = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [locations] = useSelector((state) => [state.locations]);

  const ref = useRef(null);

  const onClickIcon = (show) => {
    setEmailError('');
    setEmail('');
    setDisabled(false);
    setShowModal(show);
  };

  const confirmSubscription = () => {
    if (!validateEmail(email)) {
      return;
    }
    setShowConfirmationModal(true);
  };

  useEffect(() => {
    if (!email && !isDisabled) setDisabled(true);
    if (email && email.length > 0) {
      if (!validateEmail(email)) {
        setEmailError(ENTER_VALID_EMAIL);
        if (!isDisabled) {
          setDisabled(true);
        }
      } else {
        setEmailError('');
      }
    }

    if (!email || !email.length) setEmailError('');

    if (email && email.length && !emailError && isDisabled) setDisabled(false);
  }, [email, isDisabled, emailError]);

  const setEmailReviewed = (e) => {
    if (e.key === 'Enter' || e.keyCode == 13) {
      e.preventDefault();
      confirmSubscription();
      return;
    }
    setEmail(e.target.value);
  };
  const subscribe = () => {
    const subscriptionSource =
      'wowcher_email_cordial_national_special_04082020_2020-08-04';

    const location =
      locations && locations.location && locations.location.shortName
        ? locations.location.shortName
        : 'london';
    subscribeCall(email, location, subscriptionSource);
  };

  /**
   * A method to handle any post subscribe events
   * @param {Object} $event The successful subscribe event
   */
  const handleOnSubscribed = (data) => {
    //const redirectToDeals = !this.DealsService.isDealState;

    /*AnalyticsService.trackEvent(
      $event.newToBrand ? 'newEmailEvent' : 'repeatEmailEvent'
    );
    AnalyticsService.trackEvent('completed_subscription');*/

    // Handle CT cookie
    handleCTCookie(data.token);

    //setLocation();
    //cmpOnComplete($event);

    /* if (redirectToDeals) {
      if (this.cmpRedirectPath) {
        this.goToRedirectPath();
      } else {
        this.goToDeals();
      }
    } */
  };

  /**
   * Drop a 1-year CT cookie if the user is not logged in
   * @param {Object} autoToken the token returned by the API after subscription
   */
  const handleCTCookie = (customerToken) => {
    // ct
    if (!Cookies.load(COOKIES.customerToken))
      Cookies.save(COOKIES.customerToken, customerToken, 365);
  };

  /**
   * @param {String} message The error message to display
   */
  const notifyError = (message) => {
    //this.toastr.error(message);
    console.error(message);
  };

  const subscribeCall = (email, location, subscriptionSource) => {
    try {
      axios({
        method: 'post',
        url: URLSUBSCRIBE,
        data: {
          email,
          location,
          subscriptionSource,
        },

        headers: httpCommonHeaders(),
      })
        .then((res) => {
          trackEvent('completed_subscription');
          res.data.newEmail
            ? trackEvent('newEmailEvent')
            : trackEvent('repeatEmailEvent');
          // wowcher-win
          if (Cookies.load(COOKIES.wowcherWin) !== 'registered_user') {
            // subscribed
            Cookies.save(COOKIES.subscribed, 'Wowcher', 365);
          }

          switch (res.status) {
            case 200: {
              handleOnSubscribed(res.data);
              break;
            }
            case 400: {
              notifyError(res.data.message);
              break;
            }
            default: {
              notifyError(
                'An unexpected error occured, please try again later'
              );
              break;
            }
          }
          setShowModal(false);
          setShowConfirmationModal(false);
          return true;
        })
        .catch((err) => {
          // TODO: Show error if needed
          setShowModal(false);
          setShowConfirmationModal(false);
          return false;
        });
    } catch (err) {
      // TODO: Show error if needed
      setShowModal(false);
      setShowConfirmationModal(false);
      return false;
    }
  };

  return (
    <>
      <div ref={ref}></div>

      <WowModal
        title=""
        showModal={showModal}
        setShowModal={setShowModal}
        size="md"
        container={ref.current}
        ariaLabelledBy="id-subscribe"
        extraClasses="remove-header subscribepopup move-backward"
        backdropClassName="remove-backdrop"
      >
        <div className="subscribe-input__input-container">
          <InputForm
            onChangeFunction={setEmailReviewed}
            name={'email'}
            type="email"
            icon=""
            placeholder={YOUR_EMAIL}
            valid={!emailError}
            error={emailError.length}
            normal={!emailError.length && !email}
            errorText=""
            extraClasses="remove-header subscribe"
            inputValue={email}
          />
          <ButtonForm
            onClick={confirmSubscription}
            disabled={isDisabled}
            className="remove-header subscribe uppercase"
          >
            {SIGN_UP}
          </ButtonForm>
        </div>
      </WowModal>

      {showConfirmationModal && (
        <ConfirmationModal
          currentRef={ref.current}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          subscribe={subscribe}
        />
      )}
      <HeaderIcon
        clickMethod={() => onClickIcon(true)}
        icon="subscribe"
        isFirst={false}
        linkId="id-subscribe"
        isMobileHidden={true}
      />
      <style jsx>{`
        .subscribe-input__input-container {
          position: relative;
          height: 40px;
          display: flex;
        }
      `}</style>
    </>
  );
};

export default HeaderSubscribe;
