import React, { useContext } from 'react';
import classNames from 'classnames';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

const WelcomeText = ({ isLoggedIn, userName, extraClasses }) => {
  const theme = useContext(ThemeContext);
  const componentClass = classNames(`welcome-container ${extraClasses}`, {
    'welcome-container--hidden': !isLoggedIn || isMobile,
  });

  return (
    <div className={componentClass} aria-label="welcome text" data-qa="welcome">
      hello&nbsp;
      <span
        className="welcome-container__text--capitalize"
        aria-label="welcome user"
      >
        {userName}
      </span>
      <style jsx>{`
        .welcome-container {
          text-align: center;
          color: ${theme.colors.primary};
          font-size: 12px;
          text-transform: ${theme.text.transform};
        }
        .welcome-container--hidden {
          display: none;
        }

        .welcome-container__text--capitalize {
          text-transform: capitalize;
        }

        .margin-left-16 {
          margin-left: 16%;
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .margin-left-16 {
            margin-left: 0;
          }

          .welcome-container {
            margin-bottom: -3px;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeText;

WelcomeText.propTypes = {
  isLoggedIn: PropTypes.bool,
  userName: PropTypes.string,
};
