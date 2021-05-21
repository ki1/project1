import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import { UP_TO } from '../../../config/text/text';
import { SHOW_PRICE_TYPES } from '../../../config/constants/deals';
import {
  showPriceType,
  showPrice,
  getPrice,
  getText,
} from '../../../helpers/deals';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

const DealPriceSplat = ({
  discount = false,
  className,
  deal = {},
  forcePrice = true,
  visible = true,
}) => {
  const theme = useContext(ThemeContext);
  const priceType = showPriceType(deal, discount, forcePrice);
  const price = getPrice({ priceType, deal, forceDecimals: true });

  return (
    <div
      className={classNames('splat', className, {
        'splat--visible': visible,
        'splat--discount': discount,
        'splat--discount-indicative':
          priceType === SHOW_PRICE_TYPES.showDiscountIndicative,
        'splat--price': priceType !== SHOW_PRICE_TYPES.showDiscountIndicative,
      })}
    >
      <div className="splat__text">
        <p className="splat__now">{getText({ priceType, deal })}</p>
        {priceType === SHOW_PRICE_TYPES.showDiscountIndicative && (
          <p className="splat__upto">{UP_TO}</p>
        )}
        <p
          className="splat__price"
          dangerouslySetInnerHTML={{
            __html: price,
          }}
        />
        {priceType === SHOW_PRICE_TYPES.showOriginalPrice && !isMobile && (
          <p
            className="splat__original-price"
            dangerouslySetInnerHTML={{
              __html: showPrice({
                dealPrice: deal.originalPrice,
                currency: deal.currency,
                forceDecimals: true,
                pricePerPerson: false,
              }),
            }}
          />
        )}
      </div>

      <style jsx>{`
        .splat {
          width: 85px;
          height: 85px;
          overflow: hidden;
          position: absolute;
          bottom: 0;
          right: 0;
          background: url(${theme.images.dealsplat}) no-repeat;
          background-position: 7px 13px;
          background-size: 131px;
          z-index: 100;
          cursor: pointer;
          visibility: hidden;
          pointer-events: none;
        }

        .splat--visible {
          visibility: visible;
        }

        .splat__text {
          z-index: 999;
          position: absolute;
          bottom: 4px;
          right: 0;
          color: #ffffff;
          margin: 0;
          text-align: center;
          line-height: 1em;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 54px;
          min-height: 38px;
          font-size: 17px;
        }

        .splat__now {
          font-size: 0.7em;
          text-transform: uppercase;
          font-weight: bold;
          line-height: 1em;
          margin: 0;
        }

        .splat__upto {
          font-size: 0.6em;
          text-transform: uppercase;
          line-height: 1em;
          margin: 0;
        }

        .splat__price {
          font-weight: bold;
          line-height: 1.2em;
          margin: 0;
        }

        .splat__original-price {
          position: relative;
          font-size: 0.6em;
          line-height: 1em;
          margin: 0;
        }

        .splat__original-price:before {
          position: absolute;
          content: '';
          left: 0;
          top: 50%;
          right: 0;
          width: 120%;
          margin-left: -10%;
          border-top: 1px solid;
          -webkit-transform: rotate(-11deg);
          -ms-transform: rotate(-11deg);
          transform: rotate(-11deg);
        }

        .splat :global(.price__cents) {
          font-size: 0.6em;
          line-height: 0;
        }

        .splat :global(.price__pp) {
          font-size: 0.5em;
          font-weight: normal;
          vertical-align: super;
          line-height: 0;
        }

        @media (min-width: ${theme.breakpoints.smUp}) {
          .splat {
            background-position: 10px 12px;
            background-size: 100px;
          }

          .splat__text {
            font-size: 19px;
            min-height: 45px;
          }

          .top-right {
            top: 0;
            bottom: initial;
            background-position: 10px -27px;
          }
          .top-right .splat__text {
            top: 2px;
            bottom: initial;
            min-height: 51px;
          }

          .xs {
            background-position: 22px 24px;
            background-size: 80px;
          }
          .xs .splat__text {
            font-size: 16px;
            min-width: 48px;
            min-height: 38px;
          }
          .top-right.xs {
            background-position: 22px -18px;
          }
          .top-right.xs .splat__text {
            min-height: 48px;
          }
        }

        .main-deal--mobile {
          top: 0;
          bottom: initial;
          background-size: 110px;
          background-position: 0px -30px;
        }
        .main-deal--mobile .splat__text {
          top: 2px;
          bottom: initial;
          min-height: 60px;
          min-width: 60px;
          font-size: 20px;
        }

        .full {
          width: 160px;
          height: 160px;
          background-size: contain;
          background-position: 0 0;
        }
        .full .splat__text {
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
        }
        .full .splat__price {
          font-size: 32px;
        }
        .full .splat__now {
          font-size: 0.8em;
        }
        .full .splat__upto {
          font-size: 0.7em;
        }
        .full .splat__original-price {
          font-size: 1em;
        }
      `}</style>
    </div>
  );
};

DealPriceSplat.propTypes = {
  discount: PropTypes.bool,
  className: PropTypes.string,
  deal: PropTypes.object,
  forcePrice: PropTypes.bool,
  visible: PropTypes.bool,
};

export default DealPriceSplat;
