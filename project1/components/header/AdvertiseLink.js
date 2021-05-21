import React, { useContext } from 'react';
import classNames from 'classnames';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';

const AdvertiseLink = ({ isMobileHidden }) => {
  const theme = useContext(ThemeContext);
  const componentClass = classNames('advertise-link-container', {
    'advertise-link-container--hidden-mobile': isMobileHidden,
  });

  return (
    <div className={componentClass}>
      <a
        aria-label="Advertise Link"
        data-qa="advertiseLink"
        href="https://www.wowcher.co.uk/page/workwithus.html"
        target="_blank"
        rel="noreferrer noopener"
      >
        Advertise
      </a>
      <style jsx>{`
        .advertise-link-container a {
          text-align: center;
          color: ${theme.colors.primary};
          font-size: 12px;
        }

        .advertise-link-container a:hover {
          text-decoration: none;
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .advertise-link-container--hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AdvertiseLink;

AdvertiseLink.propTypes = {
  isMobileHidden: PropTypes.bool,
};
