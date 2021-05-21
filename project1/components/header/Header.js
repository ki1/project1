import React, { useContext, useEffect } from 'react';
import HeaderItemsLayout from './HeaderItemsLayout';
import ThemeContext from '../../providers/ThemeProvider';
import HeaderNavigation from './navigation/HeaderNavigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNavigation,
  showDefaultNavigation,
} from '../../redux/actions/navigation';
import CountDown from './countdown/CountDown';
import { COUNTDOWN_BRAND, DEFAULT_LOCATION } from '../../config/setup/setup';
import Cookies from 'react-cookies';
import COOKIES from '../../config/cookies/cookies';
import PropTypes from 'prop-types';
import MobileAppBanner from './MobileAppBanner';

const Header = ({ countdown, path }) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [location, navigation, ssr] = useSelector((state) => [
    state.locations.location,
    state.navigation.list || [],
    state.navigation.ssr,
  ]);

  useEffect(() => {
    if (!ssr) {
      return;
    }

    const locationCookie = Cookies.load(COOKIES.location);
    if (
      !locationCookie ||
      locationCookie.shortName ===
        DEFAULT_LOCATION[process.env.NEXT_PUBLIC_SITE].shortName
    ) {
      // we get the default back from ssr so show right away
      dispatch(showDefaultNavigation());
    } else {
      // otherwise get location specific nav
      dispatch(getNavigation(locationCookie));
    }
  }, [dispatch, ssr]);

  const getCountDown = () => {
    if (countdown && COUNTDOWN_BRAND[process.env.NEXT_PUBLIC_SITE])
      return <CountDown />;
    return null;
  };

  return (
    <>
      <header className="header">
        <MobileAppBanner site={process.env.NEXT_PUBLIC_SITE} />
        <div className="items">
          <HeaderItemsLayout
            navigation={navigation}
            location={location}
            path={path}
          />
        </div>
        <HeaderNavigation
          site={process.env.NEXT_PUBLIC_SITE}
          navigation={navigation}
          ssr={ssr}
          location={location}
          path={path}
        />
        {getCountDown()}
      </header>
      <style jsx>{`
        .items {
          background-color: ${theme.colors.headerbackground};
        }
        .margin-right-30 {
          margin-right: 30%;
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .header {
            position: sticky;
            top: 0;
            z-index: 1020;
          }
          .margin-right-30 {
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
};

Header.propTypes = {
  countdown: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Header.defaultProps = {
  countdown: null,
};

export default Header;
