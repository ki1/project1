import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MediaButton from './MediaButton';
import PropTypes from 'prop-types';
import { SIGN_IN_WITH_GOOGLE } from '../../config/text/text';
import { GOOGLE_IMG } from '../../config/constants/images';
import { loadGoogleScript, gapiInit } from '../../helpers/googleService';
import { loginUser } from '../../helpers/googleServiceInternal';
import useToast from '../_generic/toast/UseToast';

const GoogleButton = ({ title }) => {
  let auth2;
  const toast = useToast();
  const [gapiReady, setGapiReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loadGoogleScript(googleInit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const googleInit = () => {
    const onGApiSuccess = (data) => {
      auth2 = data;
      setGapiReady(true);

      const element = document.getElementById('googleButton');

      const buttonClick = (googleUser) => {
        // The ID token you need to pass to your backend:
        const id_token = googleUser.getAuthResponse().id_token;

        const profile = googleUser.getBasicProfile();
        let email = profile.getEmail();

        loginUser(email, id_token, toast, auth2, dispatch);
      };

      auth2.attachClickHandler(element, {}, buttonClick);
    };
    const onGApiError = () => {
      // show a toast if we need too
    };

    gapiInit(onGApiSuccess, onGApiError);
  };

  return (
    <>
      <MediaButton
        title={title}
        img={GOOGLE_IMG}
        type="google"
        isDisabled={!gapiReady}
      />
    </>
  );
};

GoogleButton.propTypes = {
  title: PropTypes.string,
};

GoogleButton.defaultProps = {
  title: SIGN_IN_WITH_GOOGLE,
};

export default GoogleButton;
