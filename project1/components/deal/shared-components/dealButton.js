import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { redirectToURL } from '../../../helpers/url';
import ThemeContext from '../../../providers/ThemeProvider';

const DealButton = ({
  type,
  children,
  urlPath,
  asPath = '',
  style,
  className,
  ariaLabel,
}) => {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  const handleOnClick = () => {
    if (asPath.length) {
      redirectToURL(asPath, router, urlPath);
    } else {
      redirectToURL(urlPath, router);
    }
  };

  return (
    <>
      <button
        type={type || 'button'}
        style={style}
        onClick={handleOnClick}
        className={classNames('primary-button', className)}
        aria-label={ariaLabel}
      >
        {children}
      </button>

      <style jsx>{`
        .primary-button {
          background-color: ${theme.colors.dealviewbutton};
          display: block;
          text-align: center;
          color: #ffffff;
          font-weight: bold;
          font-size: 18px;
          border-radius: 2rem;
          border: none;
          padding: 0 1rem;
          text-decoration: none;
          width: 160px;
          text-transform: uppercase;
          flex: 1;
          margin-top: 10px;
          padding-top: 7px;
          padding-bottom: 7px;
          outline: none;
        }
        .primary-button.full-width {
          width: 100%;
        }
        .primary-button.compact {
          flex: initial;
          width: initial;
          min-width: 120px;
          padding-left: 20px;
          padding-right: 20px;
          height: 40px;
          margin-top: 0;
        }
        .primary-button.inverse-button {
          background-color: #ffffff;
          color: ${theme.colors.dealviewbutton};
        }
      `}</style>
    </>
  );
};

DealButton.propTypes = {
  type: PropTypes.string,
  urlPath: PropTypes.string,
  asPath: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DealButton;
