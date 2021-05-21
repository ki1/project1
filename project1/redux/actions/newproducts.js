import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import { NEWPRODUCTS } from '../../config/constants/action-types';
import { NEW_PRODUCTS_LINK } from '../../config/links/links';
import { getAppPlatform } from '../../helpers/device';

export const setNewProducts = (specialEvent, canonicalUrl, deals, ssr) => (
  dispatch
) => {
  return dispatch({
    type: NEWPRODUCTS.SET_NEWPRODUCTS,
    specialEvent,
    canonicalUrl,
    deals,
    ssr,
  });
};

export const getNewProducts = (location = london, ssr = false) => async (
  dispatch
) => {
  const url = NEW_PRODUCTS_LINK.replace('##location##', location);
  try {
    const data = await axios(url, {
      method: 'GET',
      withCredentials: !ssr, // if ssr is true credentials needs to be false
      headers: {
        brand: process.env.NEXT_PUBLIC_BRAND,
        'country-code': process.env.NEXT_PUBLIC_COUNTRY_CODE || 'gb',
        'app-platform': getAppPlatform(),
        webapp: true,
      },
    });

    dispatch(
      setNewProducts(
        data.data.specialEvent || {},
        data.data.canonicalUrl || '',
        data.data.deals || [],
        ssr
      )
    );
    return true;
  } catch (err) {
    // TODO: Show the error if needed
    return false;
  }
};
