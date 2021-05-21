import React, { useContext } from 'react';
import { SPLAT } from '../../../config/constants/images';
import { formatCurrency } from '../../../helpers/currency';
import ThemeContext from '../../../providers/ThemeProvider';
import { replaceImageServer } from '../../../helpers/image';
import { makeUrlAbsolute } from '../../../helpers/url';
import classNames from 'classnames';

const HeaderNavigationDealCard = ({ site, deal }) => {
  const theme = useContext(ThemeContext);
  const image = replaceImageServer(deal.id, deal.images[0]);
  const urlPath = makeUrlAbsolute(
    deal.urlPath ? deal.urlPath : deal.shareUrl || '#'
  );
  const price = formatCurrency(deal.currency, deal.price, false, true);

  return (
    <>
      <a className="deal-card" href={urlPath} aria-label={deal.headline}>
        <img alt={deal.headline} className="deal-card__image" src={image} />
        <div className="deal-card__scrim">
          <h2 className="deal-card__headline">{deal.headline}</h2>
          {deal.discount > 0 && (
            <div className="deal-card__prices">
              <p className="deal-card__deal-price">
                Save {deal.priceIndicative && 'up to '}
                {deal.discountPercentage}%
              </p>
              <p className="deal-card__original-price">
                {formatCurrency(deal.currency, deal.originalPrice, false, true)}
              </p>
            </div>
          )}
        </div>
        <div
          className={classNames('deal-card__splat', {
            'deal-card__splat--livingsocial': site !== 'wowcher',
          })}
          style={{
            backgroundImage: `url(${
              SPLAT[process.env.NEXT_PUBLIC_BRAND || 'wowcher']
            })`,
          }}
        >
          <p className="deal-card__splat-text deal-card__price-text">
            {deal.priceText}
          </p>
          <p className="deal-card__splat-text deal-card__price">
            {price.split('.')[0]}
            <span className="deal-card__splat-pence">
              {price.split('.')[1] ? `.${price.split('.')[1]}` : ''}
            </span>
          </p>
        </div>
      </a>

      <style jsx>{`
        .deal-card {
          width: 100%;
          background-color: #eeeeee;
          position: relative;
          overflow: hidden;
          padding-bottom: 66.9%;
        }
        .deal-card:hover {
          outline: 2px solid ${theme.colors.navlinkactive};
        }
        .deal-card__image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1;
          background-color: #eeeeee;
        }
        .deal-card__scrim {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 2;
          background-image: linear-gradient(transparent, #333333);
          padding: 40px 85px 10px 10px;
          color: #ffffff;
        }
        .deal-card__headline {
          font-weight: bold;
          text-shadow: 0 0 3px #333333;
          font-size: 14px;
          margin-bottom: ${deal.discount > 0 ? '5px' : '0'};
        }
        .deal-card__splat {
          position: absolute;
          bottom: -70px;
          right: -65px;
          padding: 0px 70px 73px 25px;
          width: 140px;
          height: 140px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;
          background-size: contain;
          background-position: 50% 50%;
          background-repeat: no-repeat;
        }
        .deal-card__splat--livingsocial {
          bottom: -20px;
          right: -10px;
          padding: 0px 15px 23px 10px;
          width: 75px;
          height: 75px;
          align-items: center;
        }
        .deal-card__prices {
          display: flex;
          align-items: center;
          font-size: 12px;
        }
        .deal-card__deal-price,
        .deal-card__original-price {
          position: relative;
          margin: 0;
          margin-right: 20px;
        }
        .deal-card__splat-pence {
          font-size: 0.6em;
        }
        .deal-card__original-price:after {
          content: '';
          width: calc(100% + 6px);
          height: 1px;
          background-color: #ffffff;
          position: absolute;
          top: calc(50% - 0.5px);
          left: -3px;
          transform-origin: 50% 50%;
          transform: rotateZ(-10deg);
        }
        .deal-card__splat-text {
          color: #ffffff;
          margin: 0;
          line-height: 1em;
          text-transform: ${theme.text.navigation.transform};
        }
        .deal-card__price-text {
          font-size: 12px;
        }
        .deal-card__price {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default HeaderNavigationDealCard;
