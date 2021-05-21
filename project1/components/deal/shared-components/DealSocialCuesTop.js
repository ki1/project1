import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ThemeContext from '../../../providers/ThemeProvider';
import classNames from 'classnames';
import { getSocialCueMessageDealsImage } from '../../../helpers/socialCues';
import {
  getLimitedAvailability,
  getSocialCueOrder,
} from '../../../helpers/deals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { REMAINING_TEXT } from '../../../config/setup/setup';
import { ORDER } from '../../../config/constants/common';
import PropTypes from 'prop-types';

const DealSocialCuesTop = ({
  dealId,
  socialCuesData,
  socialCuesAvailability,
  socialCuesBought,
  className,
  containerExtraClasses,
}) => {
  const theme = useContext(ThemeContext);
  const regExpression = new RegExp(REMAINING_TEXT, 'i');
  const deals = useSelector((state) => state.deals.deals);
  const [even, setEven] = useState(false);
  useEffect(() => {
    const deal = getSocialCueOrder({ deals, id: dealId });
    const isEven = deal?.order === ORDER.even;
    setEven(isEven);
  }, [deals, dealId]);

  if (
    (!socialCuesData || Object.keys(socialCuesData).length === 0) &&
    !socialCuesAvailability
  )
    return null;

  const socialCueMessage =
    !even && getSocialCueMessageDealsImage(socialCuesData);

  const socialCueMessage2 = getLimitedAvailability(
    socialCuesAvailability,
    socialCuesBought
  );

  if (!socialCueMessage && !socialCueMessage2) return null;

  const showCueMessageTwo =
    !socialCueMessage && socialCueMessage2 && socialCueMessage2.length && even;

  return (
    <>
      <div
        className={classNames(
          'social-cues-container__main-image__top',
          containerExtraClasses
        )}
      >
        {socialCueMessage ? (
          <div className="social-cue__item">{socialCueMessage}</div>
        ) : null}

        {showCueMessageTwo ? (
          <div
            className={classNames('social-cue__item availability', className)}
          >
            <div className="social-text">{socialCueMessage2}</div>
            <div className="social-icon">
              <FontAwesomeIcon
                style={{ fontSize: 18 }}
                icon={
                  socialCueMessage2.search(regExpression) > 0
                    ? faHourglassEnd
                    : faStopwatch
                }
              />
            </div>
          </div>
        ) : null}
      </div>
      <style jsx>{`
        .social-cues-container__main-image__top {
          width: 100%;
          position: absolute;
          display: flex;
          align-items:center;
          top: 0;
          left: 0;
          z-index: 999;
          pointer-events: none;
        }
        .social-cues-container__main-image__top.margin-top {
          top: 30px;
        }
        .social-cues-container__main-image__top .social-cue__item {
            display: flex;
            align-items: center;
            justify-content: center;
            margin 10px auto;
            text-align: center;
            background-color: ${theme.colors.primary};
            color: ${theme.colors.textonprimary};
            font-weight: bold;
            border-radius: 20px;
            padding: 2px 10px;
            height: 24px;
        }
        .social-cues-container__main-image__top .social-cue__item.position-left {
          margin: 10px;
        }

        .social-cues-container__main-image__top .social-cue__item.availability {
          background-color: ${theme.colors.socialcuecolor.primary};
          color: ${theme.colors.socialcuecolor.textonprimary};
        }
        .social-text {
          margin-right: 8px;
        }
      `}</style>
    </>
  );
};

DealSocialCuesTop.propTypes = {
  dealId: PropTypes.number,
  socialCuesData: PropTypes.object,
  socialCuesAvailability: PropTypes.number,
  socialCuesBought: PropTypes.number,
};

DealSocialCuesTop.defaultProps = {
  socialCuesData: {},
  socialCuesAvailability: 0,
  socialCuesBought: 0,
};

export default DealSocialCuesTop;
