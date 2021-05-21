import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ThemeContext from '../../providers/ThemeProvider';
import HeaderLogo from './HeaderLogo';
import WelcomeText from './WelcomeText';
import AdvertiseLink from './AdvertiseLink';
import HeaderSearch from './HeaderSearch';
import HeaderButtons from './HeaderButtons';
import HeaderFlags from './HeaderFlags';
import BurgerMenu from './HeaderBurgerMenu';

const HeaderItemsLayout = ({ navigation, path }) => {
  const theme = useContext(ThemeContext);
  const userStore = useSelector((state) => state.user);

  return (
    <div className="container">
      <div className="no-gutters">
        <div className="row top-block align-items-center">
          <div className="col text-center">
            <WelcomeText
              isLoggedIn={userStore.isAuthenticated}
              userName={userStore.username}
              extraClasses={'margin-left-16'}
            />
          </div>
          <div className="d-flex col-auto align-items-end">
            <AdvertiseLink isMobileHidden={true} />
            <div className="flag-wrapper">
              <HeaderFlags
                countryCode={process.env.NEXT_PUBLIC_COUNTRY_CODE}
                isMobileHidden={true}
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="d-md-none col">
            <BurgerMenu
              navigation={navigation}
              path={path}
              isLoggedIn={userStore.isAuthenticated}
            />
          </div>
          <div className="d-flex col-4 col-md-auto align-items-center justify-content-center text-center">
            <HeaderLogo />
          </div>
          <div className="d-flex justify-content-end col col-md-auto order-md-12">
            <HeaderButtons />
          </div>
          <div className="col-md order-md-1">
            <HeaderSearch />
          </div>
        </div>
      </div>
      <style jsx>{`
        .top-block {
          padding-top: 10px;
        }
        .flag-wrapper {
          padding: 3px 0;
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .top-block {
            padding-top: 0;
          }
          .flag-wrapper {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderItemsLayout;
