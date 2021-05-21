import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ThemeContext from '../../providers/ThemeProvider';
import { getPopupWindowParams } from '../../helpers/share';

const SocialMediaShareButton = ({
  className,
  icon,
  href,
  backgroundColor,
  ariaLabel,
  popup,
}) => {
  const theme = useContext(ThemeContext);

  const size = icon.iconName === 'instagram' ? 23 : 20;

  const onClick = (e) => {
    if (popup) {
      e.preventDefault();
      window.open(href, 'share-popup', getPopupWindowParams());
    }
  };

  return (
    <>
      <a
        className={classNames('share-button', className)}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <FontAwesomeIcon icon={icon} style={{ height: size, width: size }} />
      </a>
      <style jsx>{`
        .share-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          background-color: ${backgroundColor};
          width: 30px;
          height: 30px;
          margin-right: 15px;
          border-radius: 4px;
        }
        .share-button.compact {
          margin-right: 4px;
        }
        .share-button.margin {
          margin-bottom: 4px;
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .share-button.mobile-friendly {
            height: 48px;
            width: 48px;
            margin-right: 8px;
          }
          :global(.share-button.mobile-friendly svg) {
            transform: scale(1.5);
          }
        }
        .share-button:last-child {
          margin-right: 0;
        }
      `}</style>
    </>
  );
};

SocialMediaShareButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object,
  href: PropTypes.string,
  backgroundColor: PropTypes.string,
  ariaLabel: PropTypes.string,
  popup: PropTypes.bool,
};

export default SocialMediaShareButton;
