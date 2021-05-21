import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { getLimitedAvailabilityOnly } from '../../../helpers/deals';

const DealSocialCuesInfo = ({ socialCuesData }) => {
  if (!socialCuesData || !socialCuesData.totalRemaining) return <></>;

  const theme = useContext(ThemeContext);

  const socialCueMessage = getLimitedAvailabilityOnly(
    socialCuesData.totalRemaining
  );
  return (
    <>
      <div className="social-cues-container__info">
        {socialCueMessage && socialCueMessage.length ? (
          <div className="social-cue__item availability">
            <div className="social-text">{socialCueMessage}</div>
            <div className="social-icon">
              <FontAwesomeIcon
                style={{ height: 32, width: 'auto', marginTop: 4 }}
                icon={faStopwatch}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <style jsx>{`
        .social-cues-container__info {
          position: relative;
          left: 50%;
        }

        .social-cues-container__info .social-cue__item {
          display: flex;
          max-width: 146px;
        }
        .social-cues-container__info .social-text {
          text-align: left;
          font-size: 16px;
          line-height: 1.2;
        }

        .social-cues-container__info .availability {
          min-height: 70px;
          background-color: ${theme.colors.dealavailability};
          color: ${theme.colors.textonprimary};
          font-weight: bold;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          text-align: center;
          padding-left: 16px;
          padding-right: 12px;
          padding-top: 6px;
          // position: absolute;
          // bottom: 0px;
        }
      `}</style>
    </>
  );
};

export default DealSocialCuesInfo;
