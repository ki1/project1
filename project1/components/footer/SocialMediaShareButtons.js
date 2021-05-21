import React from 'react';
import PropTypes from 'prop-types';
import { SOCIAL_MEDIA_SHARE_LINKS } from '../../config/links/links';
import SocialMediaShareButton from './SocialMediaShareButton';

const SocialMediaShareButtons = ({ site }) => {
  const buttons = SOCIAL_MEDIA_SHARE_LINKS[site];
  return (
    <>
      <div className="share-buttons">
        {buttons.map((button, i) => {
          return (
            <SocialMediaShareButton
              key={i}
              icon={button.icon}
              backgroundColor={button.backgroundColor}
              href={button.href}
              ariaLabel={button.ariaLabel}
            />
          );
        })}
      </div>
      <style jsx>{`
        .share-buttons {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

SocialMediaShareButtons.propTypes = {
  site: PropTypes.string.isRequired,
};

export default SocialMediaShareButtons;
