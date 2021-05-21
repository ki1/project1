import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import { SCROLLER } from '../../config/constants/action-types';
import { SCROLLER_CONFIGURATION_LINK } from '../../config/links/links';
import { getAppPlatform } from '../../helpers/device';
import { siteToApiBrand } from '../../helpers/merchandising-module';

export const setScroller = (config, ssr) => (dispatch) => {
  return dispatch({ type: SCROLLER.SET_SCROLLER, config, ssr });
};

export const getScrollerConfiguration = (ssr = false) => async (dispatch) => {
  const url = SCROLLER_CONFIGURATION_LINK.replace(
    '##brand##',
    siteToApiBrand(process.env.NEXT_PUBLIC_SITE)
  );
  try {
    const data = await axios(url, {
      method: 'GET',
      // withCredentials is true if ssr is false
      withCredentials: !ssr,
      headers: {
        brand: process.env.NEXT_PUBLIC_BRAND,
        'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
        'app-platform': getAppPlatform(),
        webapp: true,
      },
    });

    if (!data || !data.data || !data.data.body) {
      return false;
    }
    dispatch(setScroller(data.data.body, ssr));
    return data.data.body;
  } catch (err) {
    // TODO: Show the error if needed
    return false;
  }
};
