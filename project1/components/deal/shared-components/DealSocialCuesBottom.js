import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import {
  NEW_DEAL_TODAY,
  SOCIAL_CUE_TOTAL_BOUGTH,
  SOCIAL_CUE_TOTAL_REMAINING,
} from '../../../config/text/text';
import { getLimitedAvailability, showPriceType } from '../../../helpers/deals';
import { getSocialCueMessageDealsImage } from '../../../helpers/socialCues';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { REMAINING_TEXT } from '../../../config/setup/setup';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../../helpers/currency';
import { isMobile } from 'react-device-detect';
import { SHOW_PRICE_TYPES } from '../../../config/constants/deals';

const DealSocialCuesBottom = ({
  socialCuesData,
  socialCuesExtra,
  hideBoughtCount,
  hideCue,
  children,
  discount,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  if (
    !socialCuesData ||
    (!socialCuesData.totalRemaining && !socialCuesData.totalBought)
  )
    return null;

  let socialCueMessageExtra = '';
  if (socialCuesExtra && Object.keys(socialCuesExtra).length !== 0) {
    socialCueMessageExtra = getSocialCueMessageDealsImage(socialCuesExtra);
  }

  const theme = useContext(ThemeContext);
  const socialCueMessage = getLimitedAvailability(
    socialCuesData.totalRemaining,
    socialCuesData.totalBought
  );
  const dealData = {
    discount: Math.round(socialCuesData?.discountPercentage) || null,
    price: socialCuesData?.originalPrice || null,
  };
  const priceType = showPriceType(socialCuesData, discount, false);
  const showDiscount =
    socialCuesData?.display?.discount &&
    (priceType === SHOW_PRICE_TYPES.showPrice ||
      priceType === SHOW_PRICE_TYPES.showOriginalPrice);

  const getBoughCount = () => {
    if (
      !socialCuesData ||
      !socialCuesData.display ||
      !socialCuesData.display.bought
    ) {
      return null;
    }

    if (socialCuesData.totalBought === 0) {
      return (
        <div className="social-cue__item bought-count">{NEW_DEAL_TODAY}</div>
      );
    }

    return (
      <div className="social-cue__item bought-count">
        {SOCIAL_CUE_TOTAL_BOUGTH.replace(
          '##COUNT##',
          socialCuesData.totalBought
        )}
        {showDiscount && isMobile && dealData.discount !== null && (
          <>
            <span className="save-price">Save {dealData.discount}%</span>
            <span className="originalPrice strikethrough">
              {formatCurrency(
                socialCuesData.currency,
                dealData.price,
                false,
                false
              )}
            </span>
          </>
        )}
      </div>
    );
  };

  const getBoughRemaining = () => {
    if (
      !socialCuesData ||
      !socialCuesData.display ||
      !socialCuesData.display.quantityRemaining ||
      !socialCuesData.totalRemaining
    )
      return null;
    return (
      <div className="social-cue__item totalRemaining bought-count">
        {SOCIAL_CUE_TOTAL_REMAINING.replace(
          '##COUNT##',
          socialCuesData.totalRemaining
        )}
      </div>
    );
  };

  const getSocialCue = () => {
    if (
      !socialCueMessageExtra ||
      !socialCueMessageExtra.length ||
      !socialCueMessage ||
      !socialCueMessage.length
    )
      return null;

    return (
      <div className="social-cue__item availability">
        <div className="social-text">{socialCueMessage}</div>
        <div className="social-icon">
          <FontAwesomeIcon
            style={{ fontSize: 18 }}
            icon={
              socialCueMessage.search(regExpression) > 0
                ? faHourglassEnd
                : faStopwatch
            }
          />
        </div>
      </div>
    );
  };

  const getChildren = () => {
    return (
      <>
        {React.Children.map(children, (child) => {
          const mobileClassCheck =
            child.props.className.includes('hide-mobile') && isMobile;
          if (child.props.show && !mobileClassCheck)
            return <div className="social-cue__item-child">{child}</div>;
        })}
      </>
    );
  };

  const regExpression = new RegExp(REMAINING_TEXT, 'i');
  return (
    <>
      <div className="social-cues-container__main-image__bottom">
        {!hideCue && getSocialCue()}
        {!hideBoughtCount &&
          (socialCuesData &&
          socialCuesData.display &&
          socialCuesData.display.quantityRemaining
            ? getBoughRemaining()
            : getBoughCount())}
        {getChildren()}
      </div>
      <style jsx global>{`
        .social-cue__item,
        .social-cue__item-child {
          z-index: 999;
        }
        .social-cues-container__main-image__bottom {
          width: 100%;
          position: absolute;
          bottom: 0;
          padding-left: 10px;
          pointer-events: none;
        }

        .social-cues-container__main-image__bottom .social-cue__item,
        .social-cues-container__main-image__bottom .social-cue__item-child {
          width: max-content;
          margin: 0 8px 10px 0;
          padding: 0px 10px;
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textonprimary};
          font-weight: bold;
          border-radius: 20px;
          padding-top: 2px;
          padding-bottom: 2px;
          display: inline-block;
          align-items: center;
          height: 24px;
          vertical-align: middle;
        }
        .social-cues-container__main-image__bottom
          .social-cue__item.bought-count {
          background-color: rgba(243, 243, 243, 0.9);
          border: 0;
          color: ${theme.colors.dealboughtcounttext};
          font-weight: normal;
          padding: 1px 10px;
          width: 100%;
        }
        @media (min-width: ${theme.breakpoints.smUp}) {
          .social-cues-container__main-image__bottom
            .social-cue__item.bought-count {
            border: 1px solid ${theme.colors.dealboughtcounttext};
            width: auto;
          }
        }
        .social-cues-container__main-image__bottom .social-cue__item-child {
          background-color: rgba(243, 243, 243, 0.6);
          color: ${theme.colors.dealboughtcounttext};
          font-weight: normal;
          padding: 1px 3px;
          height: 17px;
        }

        .social-cues-container__main-image__bottom
          .social-cue__item.availability {
          background-color: ${theme.colors.socialcuecolor.primary};
          color: ${theme.colors.socialcuecolor.textonprimary};
        }

        .social-text {
          margin-right: 8px;
        }

        .social-text,
        .social-icon {
          display: inline-block;
        }

        .originalPrice,
        .save-price {
          margin-left: 10px;
          position: relative;
        }

        .strikethrough:before {
          position: absolute;
          content: '';
          left -4px;
          top: 50%;
          right: 0;
          width: calc(100% + 8px);
          border-top: 1px solid;
          transform: rotate(-11deg);
        }
      `}</style>
    </>
  );
};

DealSocialCuesBottom.propTypes = {
  socialCuesData: PropTypes.object,
  socialCuesExtra: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  hideBoughtCount: PropTypes.bool,
  hideCue: PropTypes.bool,
  children: PropTypes.node,
};

DealSocialCuesBottom.defaultProps = {
  socialCuesData: {},
  socialCuesExtra: {},
  hideBoughtCount: false,
  hideCue: false,
  children: null,
};

export default DealSocialCuesBottom;
