import { GOOGLE_ID } from '../config/social/config';

const CLIENT_ID =
  GOOGLE_ID[process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev'][
    process.env.NEXT_PUBLIC_SITE || 'wowcher'
  ];

export const loadGoogleScript = (callback) => {
  const existingScript = document.getElementById('googleAPI');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.id = 'googleAPI';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

export const gapiInit = async (handler, errorHandler) => {
  window.gapi.load('auth2', async () => {
    window.gapi.auth2
      .init({
        client_id: CLIENT_ID,
        cookiepolicy: 'single_host_origin',
      })
      .then(handler, errorHandler)
      .catch(errorHandler);
  });
};

export const logoutGoogle = async (auth2) => {
  await auth2.signOut();
  auth2.disconnect();
};
