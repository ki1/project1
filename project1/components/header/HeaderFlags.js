import React, { useContext } from 'react';
import classNames from 'classnames';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';
import {
  LINK_LIVINGSOCIAL,
  LINK_LIVINGSOCIAL_IE,
} from '../../config/links/links';

const HeaderFlags = ({ countryCode, isMobileHidden }) => {
  const theme = useContext(ThemeContext);
  const ukFlag = theme.images.flags.headerflaguk;
  const ieFlag = theme.images.flags.headerflagie;

  const componentClass = classNames('flag-container', {
    'flag-container--hidden': !theme.switches.showFlags,
    'flag-container--hidden-mobile': isMobileHidden,
  });

  return (
    <div
      className={componentClass}
      aria-label="Country Selection"
      data-qa="countrySelection"
    >
      <a href={LINK_LIVINGSOCIAL_IE[process.env.NEXT_PUBLIC_ENVIRONMENT]}>
        <img
          loading="lazy"
          src={`${ieFlag}`}
          alt="Ireland Flag select"
          aria-label="IE Flag"
          data-qa="irelandFlagSelection"
          className={`flag ${countryCode === 'ie' ? 'active' : ''}`}
        />
      </a>

      <a href={LINK_LIVINGSOCIAL[process.env.NEXT_PUBLIC_ENVIRONMENT]}>
        <img
          loading="lazy"
          src={`${ukFlag}`}
          alt="UK Flag select"
          aria-label="UK Flag"
          data-qa="ukFlagSelection"
          className={`flag ${countryCode === 'gb' ? 'active' : ''}`}
        />
      </a>

      <style jsx>{`
        .flag-container {
          text-align: center;
          color: ${theme.colors.primary};
          font-size: 12px;
          text-transform: ${theme.text.transform};
        }

        .flag-container .flag {
          width: 46px;
          margin-left: 10px;
        }

        .flag-container .flag.active {
          border: 1px solid ${theme.colors.primary};
          padding: 2px;
          border-radius: 5px;
        }

        .flag-container--hidden {
          display: none;
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .flag-container--hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderFlags;

HeaderFlags.propTypes = {
  countryCode: PropTypes.oneOf(['gb', 'ie']),
};
