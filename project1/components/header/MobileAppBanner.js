import React, { useContext, useState } from 'react';
import ThemeContext from '../../providers/ThemeProvider';
import {
  LINK_APPLE_APP_STORE,
  LINK_GOOGLE_PLAY_STORE,
  APP_BANNER_DEEPLINK_APPLE,
  APP_BANNER_DEEPLINK_ANDROID,
} from '../../config/links/links';
import {
  APP_BANNER_APPLE,
  APP_BANNER_GOOGLE,
  APP_BANNER_TITLE,
  APP_BANNER_AUTHOR,
  APP_BANNER_PRICE,
  APP_BANNER_GET,
  APP_BANNER_OPEN,
  APP_BANNER_PRICE_SUFFIX_APPLE,
  APP_BANNER_PRICE_SUFFIX_ANDROID,
} from '../../config/text/text';
import { APP_BANNER_ICON } from '../../config/constants/images';
import { faTimes, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';
import Cookies from 'react-cookies';
import COOKIES from '../../config/cookies/cookies';
import { trackEvent } from '../../helpers/analytics';
import commonCookiesOptions from '../../helpers/commonCookiesOptions';
import { BRAND_WOWCHER } from '../../config/setup/setup';
import useDeferredRender from '../../helpers/useDeferredRender';
import { isLightPage } from '../../helpers/browser';

const MobileAppBanner = () => {
  const theme = useContext(ThemeContext);
  const shouldRender = useDeferredRender();
  const [isClosed, setIsClosed] = useState(() => {
    return !!Cookies.load(COOKIES.smartbannerClosed);
  });

  const setCookie = () => {
    const expires = new Date();
    // two days
    expires.setDate(expires.getDate() + 2);
    Cookies.save(COOKIES.smartbannerClosed, 'true', {
      ...commonCookiesOptions,
      expires,
    });
  };

  let platform = '';
  if (typeof window !== 'undefined') {
    const nua = window.navigator.userAgent;
    let result = '';
    if (/iPhone|iPod/i.test(nua)) {
      result = APP_BANNER_APPLE;
    }
    if (/Android/i.test(nua)) {
      result = APP_BANNER_GOOGLE;
    }
    platform = result;
  }

  if (!shouldRender || platform === '' || isClosed) return null;

  const imgHeight = process.env.NEXT_PUBLIC_BRAND === BRAND_WOWCHER ? 60 : 62;
  const imgWidth = process.env.NEXT_PUBLIC_BRAND === BRAND_WOWCHER ? 60 : 73;

  let appLink = '';
  let deepLink = '';
  let price = APP_BANNER_PRICE;

  if (platform === APP_BANNER_APPLE) {
    appLink = LINK_APPLE_APP_STORE[process.env.NEXT_PUBLIC_SITE];
    deepLink = APP_BANNER_DEEPLINK_APPLE[process.env.NEXT_PUBLIC_SITE];
    price += APP_BANNER_PRICE_SUFFIX_APPLE;
  }

  if (platform === APP_BANNER_GOOGLE) {
    appLink = LINK_GOOGLE_PLAY_STORE[process.env.NEXT_PUBLIC_SITE];
    deepLink = APP_BANNER_DEEPLINK_ANDROID[process.env.NEXT_PUBLIC_SITE];
    price += APP_BANNER_PRICE_SUFFIX_ANDROID;
  }

  /**
   * Handles the open button click event
   * Track event and go to location
   */
  const onCloseClick = () => {
    setCookie();
    trackEvent('smartbanner_close', { platform });
    setIsClosed(true);
  };

  /**
   * Handles the open button click event
   * Track event and go to location
   */
  const onOpenAppClick = (event) => {
    event.preventDefault();
    trackEvent('smartbanner_open_app', { platform });
    window.location.href = deepLink;
  };

  return (
    !isLightPage() && (
      <div>
        <div className="smartbanner">
          <button
            aria-label="close"
            className="smartbanner__close-button"
            onClick={onCloseClick}
          >
            <Icon faIcon={faTimes} size="14px" color="none" />
          </button>

          <div className="smartbanner__info-wrapper">
            <img
              className="smartbanner__icon"
              src={APP_BANNER_ICON[process.env.NEXT_PUBLIC_SITE]}
              alt={APP_BANNER_TITLE[process.env.NEXT_PUBLIC_SITE]}
              height={imgHeight}
              width={imgWidth}
            />
            <div className="smartbanner__info">
              <div className="smartbanner__info-brand">
                {APP_BANNER_TITLE[process.env.NEXT_PUBLIC_SITE]}
              </div>
              <div className="smartbanner__info-author">
                {APP_BANNER_AUTHOR}
              </div>
              <div className="smartbanner__info-stars">
                <Icon faIcon={faStar} size="11px" color="none" />
                <Icon faIcon={faStar} size="11px" color="none" />
                <Icon faIcon={faStar} size="11px" color="none" />
                <Icon faIcon={faStar} size="11px" color="none" />
                <Icon faIcon={faStarHalf} size="11px" color="none" />
              </div>
              <div className="smartbanner__info-price">{price}</div>
            </div>
          </div>

          <div className="smartbanner__cta-wrapper">
            <a className="smartbanner__cta" href={appLink}>
              {APP_BANNER_GET}
            </a>
            <a
              role="button"
              href="#"
              className="smartbanner__cta-open"
              onClick={onOpenAppClick}
            >
              {APP_BANNER_OPEN}
            </a>
          </div>
        </div>
        <style jsx>{`
          .smartbanner {
            display: table;
            width: 100%;
            height: 83px;

            background: ${theme.colors.navbackground};
            border-bottom: 1px solid #d2d2d2;
            line-height: 1;
          }
          .smartbanner__close-button {
            border: 0;
            display: table-cell;
            vertical-align: middle;
            position: relative;
            height: 83px;
            width: 30px;
            padding: 10px;
          }
          .smartbanner__info-wrapper {
            display: table-cell;
            vertical-align: middle;
            line-height: 1.4;
          }
          .smartbanner__cta-wrapper {
            display: table-cell;
            vertical-align: middle;
            width: 100px;
            text-align: center;
          }
          .smartbanner__cta,
          .smartbanner__cta-open {
            display: block;
            color: #1474fc;
            line-height: 26px;
            font-size: 16px;
          }
          .smartbanner__icon {
            display: inline-block;
            margin-right: 5px;
            vertical-align: unset;
          }
          .smartbanner__info {
            display: inline-block;
          }
          .smartbanner__icon {
            border-radius: 15px;
          }
          .smartbanner__info-title {
            font-size: 14px;
          }
          .smartbanner__info-author {
            font-size: 11px;
          }
          .smartbanner__info-stars {
            font-size: 11px;
            color: #ef9b3c;
          }
          .smartbanner__info-price {
            font-size: 11px;
          }
          @media (min-width: ${theme.breakpoints.smUp}) {
            .smartbanner {
              display: none;
            }
          }
        `}</style>
      </div>
    )
  );
};

export default MobileAppBanner;
