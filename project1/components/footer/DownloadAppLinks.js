import React from 'react';
import PropTypes from 'prop-types';
import {
  APPLE_APP_STORE_LOGO,
  GOOGLE_PLAY_LOGO,
} from '../../config/constants/images';
import {
  APPLE_APP_STORE_ARIA_LABEL,
  GOOGLE_PLAY_ARIA_LABEL,
} from '../../config/text/text';
import DownloadAppLink from './DownloadAppLink';
import {
  LINK_APPLE_APP_STORE,
  LINK_GOOGLE_PLAY_STORE,
} from '../../config/links/links';
import classNames from 'classnames';

const DownloadAppLinks = ({ site, inline }) => {
  return (
    <>
      <div
        className={classNames('download-links', {
          'download-links--inline': inline,
        })}
      >
        <DownloadAppLink
          src={APPLE_APP_STORE_LOGO}
          href={LINK_APPLE_APP_STORE[site]}
          alt={APPLE_APP_STORE_ARIA_LABEL}
          ariaLabel={APPLE_APP_STORE_ARIA_LABEL}
          inline={inline}
        />
        <DownloadAppLink
          src={GOOGLE_PLAY_LOGO}
          href={LINK_GOOGLE_PLAY_STORE[site]}
          alt={GOOGLE_PLAY_ARIA_LABEL}
          ariaLabel={GOOGLE_PLAY_ARIA_LABEL}
          inline={inline}
        />
      </div>
      <style>{`
    .download-links--inline {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    `}</style>
    </>
  );
};

DownloadAppLinks.propTypes = {
  site: PropTypes.string.isRequired,
};

export default DownloadAppLinks;
