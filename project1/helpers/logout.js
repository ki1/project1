import Cookies from 'react-cookies';
import COOKIES from '../config/cookies/cookies';
import { trackEvent } from './analytics';
import { logoutUser, resetUser } from '../redux/actions/users';
import { resetBasket } from '../redux/actions/basket';
import { AN_ERROR_OCCURED } from '../config/text/text';
import { ANGULAR_LOGOUT } from '../config/links/links';
import { redirectToURL } from './url';
import commonCookiesOptions from '../helpers/commonCookiesOptions';

export const Logout = async (e, toast, dispatch, setShowModal) => {
  e.preventDefault();

  if (Cookies.load(COOKIES.basketToken))
    Cookies.remove(COOKIES.basketToken, {
      domain: `.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
      path: '/',
    });

  Cookies.remove(COOKIES.userLoggedIn);
  Cookies.remove(COOKIES.userEmail);

  // TODO: workaround for partial release.
  // we don't need it for final release
  // eslint-disable-next-line sonarjs/no-redundant-boolean
  if (process.env.NEXT_PUBLIC_RELEASE_TWICK_LOGOUT === 'true') {
    Cookies.save(COOKIES.logoutURL, window.location.href, commonCookiesOptions);
    redirectToURL(ANGULAR_LOGOUT);
    return;
  }
  // end of workaround

  try {
    await logoutUser();
    setShowModal && setShowModal(false);
    trackEvent('log_out');
    dispatch(resetUser());
    dispatch(resetBasket());
  } catch (err) {
    toast.addToast(err.message || AN_ERROR_OCCURED, 'toast-error');
  }
};
