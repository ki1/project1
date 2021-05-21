import React, { useEffect } from 'react';
import HeaderIcon from './HeaderIcon';

import { useDispatch, useSelector } from 'react-redux';
import { getBasket } from '../../redux/actions/basket';

// import { useRouter } from 'next/router';
import { LINK_CHECKOUT } from '../../config/links/links';
import COOKIES from '../../config/cookies/cookies';
import HeaderLocation from './HeaderLocation';
import HeaderSubscribe from './HeaderSubscribe';
import HeaderLogin from './HeaderLogin';
import Cookies from 'react-cookies';
import { redirectToURL } from '../../helpers/url';

const HeaderButtons = () => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.basket.quantity);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    dispatch(getBasket(isAuthenticated));
  }, [dispatch, isAuthenticated]);

  const moveToPage = () => {
    // bt
    const bt = Cookies.load(COOKIES.basketToken);
    if (bt) {
      redirectToURL(`${LINK_CHECKOUT}${bt}`);
      return;
    }
    redirectToURL(LINK_CHECKOUT);
  };

  return (
    <>
      <HeaderLocation
        brand={process.env.NEXT_PUBLIC_BRAND}
        site={process.env.NEXT_PUBLIC_SITE}
        countryCode={process.env.NEXT_PUBLIC_COUNTRY_CODE}
      />
      <HeaderSubscribe />
      <HeaderLogin />
      <HeaderIcon
        icon="basket"
        badgeContent={quantity}
        clickMethod={() => moveToPage()}
      ></HeaderIcon>
    </>
  );
};

export default HeaderButtons;
