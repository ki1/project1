import React, { useContext, useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import DealCardWrapper from './shared-components/dealCardWrapper';
import { GO_TO_DEAL, VIEW } from '../../config/text/text';
import { useSelector } from 'react-redux';
import {
  getUrlFromDeal,
  hidePrice,
  showPostage,
  useDealImpresssion,
} from '../../helpers/deals';
import DealButton from './shared-components/dealButton';
import EmptyDeal from './shared-components/emptyDeal';
import DealMobileScrim from './shared-components/dealMobileScrim';
import SocialCueTop from './shared-components/DealSocialCuesTop';
import DealPriceSplat from './shared-components/dealPriceSplat';
import { replaceImageServer, usePlaceholderImage } from '../../helpers/image';
import PostageAndPackagingText from './shared-components/PostageAndPackagingText';
import Clamp from '../_generic/utils/Clamp';
import { useRouter } from 'next/router';
import SocialCuesBottom from './shared-components/DealSocialCuesBottom';
import { PAGE_TYPE_NAME } from '../../redux/reducers/pagetype';
import classNames from 'classnames';

const SecondaryDeal = ({
  deal,
  socialcues,
  extraclasses,
  isXS,
  hasSocialCueTop,
  splatClass,
}) => {
  const [ssr, pageType, location] = useSelector((state) => [
    state.deals.ssr,
    state.pagetype.pageType,
    state.locations.location.shortName,
  ]);
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const componentRef = useRef(null);
  useDealImpresssion({ dealId: deal.id, componentRef, location });

  if (!deal || Object.keys(deal).length === 0) return <EmptyDeal />;

  const dealUrlPath = getUrlFromDeal({
    deal,
    originPath: router.asPath,
  });
  const headLineAux = deal.headline ? hidePrice(deal.headline, ssr) : '';
  const hasPostage = showPostage(deal, true, false);
  const isViewAll = deal.promoType;
  const discount = pageType !== PAGE_TYPE_NAME.LOCATION;

  return (
    <div ref={componentRef}>
      <DealCardWrapper
        className={`secondary-deal deal_item ${extraclasses}`}
        id={`deal_${deal.id}`}
      >
        <div className="deal-info-container row">
          {isViewAll && (
            <div className="deal-viewall__header">
              <h3 className="deal-viewall__text">{deal.promoType.title}</h3>
              <a className="deal-viewall__link" href={deal.promoType.link}>
                {deal.promoType.linkName}
              </a>
            </div>
          )}
          <div className="deal-info">
            <div className="deal-title">
              <Link href="/deal/[...slug]" as={dealUrlPath}>
                <a
                  role="button"
                  aria-label={GO_TO_DEAL.replace('##DEAL##', deal.headline)}
                >
                  <Clamp lines={isViewAll ? 2 : 3}>
                    <h3>{headLineAux}</h3>
                  </Clamp>
                  <PostageAndPackagingText
                    show={hasPostage}
                    deal={deal}
                    className="mobile-invert display-mobile"
                  />
                </a>
              </Link>
            </div>
          </div>
          {!isXS && (
            <div className="deal-button justify-content">
              <div className="button-view">
                <DealButton
                  type="button"
                  urlPath={dealUrlPath}
                  className="full-width"
                  asPath="/deal/[...slug]"
                >
                  {VIEW}
                </DealButton>
              </div>
            </div>
          )}
        </div>
        <div className="deal-image__container row">
          <div className="shared-deal-image__container">
            <DealPriceSplat
              className={classNames(splatClass, { xs: isXS })}
              price={deal.discountPercentage}
              currency={deal.currency}
              ssr={ssr}
              discount={discount}
              priceIndicative={deal.priceIndicative}
              deal={deal}
            />
            {hasSocialCueTop && (
              <SocialCueTop
                className="position-left"
                socialCuesData={socialcues}
                socialCuesAvailability={deal.totalRemaining || 0}
                socialCuesBought={deal.totalBought || 0}
                dealId={deal.id}
              />
            )}
            <SocialCuesBottom
              socialCuesData={deal}
              hideCue={true}
              discount={discount}
            >
              <PostageAndPackagingText
                show={hasPostage}
                deal={deal}
                className="mobile-invert hide-mobile"
                isSmall={true}
              />
            </SocialCuesBottom>
            <Link href="/deal/[...slug]" as={dealUrlPath}>
              <a className="deal-image__link">
                <img
                  key={deal.images?.[0].id}
                  src={replaceImageServer(deal.id, deal.images?.[0])}
                  alt={deal.images?.[0].alt}
                  onError={usePlaceholderImage}
                />
              </a>
            </Link>
          </div>
          <DealMobileScrim />
        </div>
        <style jsx>{`
          .deal-viewall__header {
            display: flex;
            align-items: center;
            width: 100%;
            padding-left: 11px;
            padding-right: 11px;
            border-bottom: 1px solid ${theme.colors.primary};
            background-color: ${theme.colors.primarypale};
            min-height: 22px;
          }
          .deal-viewall__text {
            color: ${theme.colors.primary};
            margin-bottom: 0;
            font-size: 15px;
          }
          .deal-viewall__link {
            margin-left: auto;
            display: block;
            font-size: 13px;
          }
          .deal-image__container {
            width: 100%;
            z-index: 1;
            bottom: ${isViewAll ? '-24px' : '0px'};
          }

          .deal-extra-container {
            z-index: 2;
            height: 70%;
            position: relative;
          }

          .deal-info-container {
            min-height: 65px;
            width: 100%;
            box-sizing: content-box;
            padding: 0;
            flex-direction: column;
          }

          .row {
            margin: 0px;
          }

          .deal-info {
            padding: 0;
            padding-left: 11px;
            padding-right: 11px;
            display: flex;
            align-items: center;
            width: ${isViewAll ? '100%' : 'auto'};
            flex-grow: 1;
          }

          .deal-info a h3 {
            font-size: ${isXS ? '14px' : '16px'};
            font-weight: bold;
            margin: 0;
            color: ${theme.colors.dealtext};
            //max-width: 245px;
          }

          .deal-info .deal-title {
            width: ${isViewAll ? '100%' : 'auto'};
          }

          .deal-info a {
            text-decoration: none;
          }

          .deal-info .deal-subtitle {
            margin: 0;
            font-size: 14px;
            line-height: 1.2;
            color: #000000;
            text-decoration: none;
            color: ${theme.colors.dealtext};
            font-size: 14px;
          }

          .deal-info .deal-info-container .deal-info {
            margin-top: 10px;
          }

          .deal-button {
            padding: 0;
          }

          .justify-content {
            position: absolute;
            bottom: 0;
            width: calc(100% - 90px);
            z-index: 10;
            padding-left: 10px;
            padding-right: 0;
            padding-bottom: 36px;
          }
          .deal-info .deal-title h3 {
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            color: ${theme.colors.dealtext};
          }

          .button-view {
            position: absolute;
            right: 7px;
            height: 48px;
            width: 30%;
          }

          .shared-deal-image__container {
            position: relative;
            height: ${isXS ? 'auto' : '234px'};
          }

          .shared-deal-image__container .shared-deal--extra-container {
            position: relative;
            bottom: 24px;
          }

          .shared-deal-image__container img {
            width: 100%;
          }

          .social-cues-container__main-image__top {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
            display: none;
          }

          .social-cues-container__main-image__top .social-cue__item {
            width: 50%;
            margin: 10px;
            text-align: center;
            background-color: ${theme.colors.primary};
            color: ${theme.colors.textonprimary};
            font-weight: bold;
            border-radius: 10px;
          }

          .deal-image__container
            :global(.social-cues-container__main-image__bottom) {
            bottom: 15px;
          }

          @media (max-width: ${theme.breakpoints.mdDown}) {
            // 768
            .shared-deal-image__container {
              width: 100%;
              height: auto;
            }
            .deal-info a h3 {
              max-width: 70%;
            }

            .button-view {
              bottom: 17px;
            }
          }
          .deal-image__link {
            display: block;
          }

          @media (max-width: ${theme.breakpoints.smDown}) {
            .deal-info-container {
              min-height: 0;
            }
            .deal-info {
              position: absolute;
              bottom: 0;
              width: 100%;
              z-index: 10;
              padding-left: 10px;
              padding-right: 0;
              padding-bottom: 36px;
            }
            .deal-info .deal-title h3 {
              color: ${theme.colors.dealmobiletitle};
              font-size: 16px;
              line-height: normal;
              font-weight: bold;
              max-width: 78%;
            }
            .button-view {
              display: none;
            }
            .shared-deal-image__container {
              width: 100%;
              height: fit-content;
            }
            .deal-viewall__header {
              border-top: 1px solid ${theme.colors.primary};
              border-bottom: none;
            }
            .deal-image__container
              :global(.social-cues-container__main-image__bottom) {
              bottom: 0;
            }
          } // 575
        `}</style>
        <style jsx global>{`
          .shared-deal-image__container .carousel:nth-child(2) {
            position: inherit;
          }

          .secondary-deal {
            position: relative;
            width: 350px;
            //height: 306px;
          }

          .secondary-deal.full-width {
            width: 100%;
            //min-height: 220px;
          }

          .shared-deal-image__container .carousel-root {
            //height: 100%;
          }
          .shared-deal-image__container .carousel .thumbs-wrapper {
            position: absolute;
            bottom: 0px;
            margin: 0px;
            max-width: 46%;
          }
          .shared-deal-image__container .carousel ul.thumbs {
            padding-inline-start: 0px;
            cursor: pointer;
            margin-bottom: 0px;
          }
          .shared-deal-image__container .carousel .thumb {
            width: 64px !important;
            height: auto;
          }
          .shared-deal-image__container .carousel .thumb.selected,
          .carousel .thumb {
            cursor: pointer;
          }
          .shared-deal-image__container .carousel .thumbs-wrapper {
            z-index: 4;
            margin-left: 10px;
          }
          .shared-deal-image__container .carousel .thumb.selected,
          .shared-deal-image__container .carousel .thumb:hover {
            border: 3px solid ${theme.colors.primary};
          }
          .shared-deal-image__container .carousel .control-dots li {
            box-shadow: none;
            opacity: 1;
            border: 2px solid ${theme.colors.primary};
          }
          .shared-deal-image__container .carousel .control-dots li.selected {
            background-color: ${theme.colors.primary};
          }

          .card.small-deal {
            //height: 214px;
            margin: 0;
          }

          .secondary-deal
            .social-cues-container__main-image__bottom
            .social-cue__item {
            display: none;
          }
          .secondary-deal
            .social-cues-container__main-image__bottom
            .social-cue__item-child {
            display: block;
          }

          .secondary-deal .social-cues-container__main-image__top {
            display: none;
          }

          @media (max-width: ${theme.breakpoints.xlDown}) {
            //1199.98px
            // Not Ipad but too small for xl deal + small deal in the same row
            .secondary-deal {
              width: 326px;
              //height: 263px !important;
              margin-bottom: 0 !important;
            }
            .secondary-deal.full-width {
              width: 100%;
            }
            .shared-deal-image__container .carousel .thumb {
              width: 60px !important;
              height: auto;
            }
            .secondary-deal .deal-image__container {
              bottom: 0 !important;
            }
          }

          @media (max-width: ${theme.breakpoints.mdDown}) {
            .secondary-deal {
              //height: 233px !important;
              margin-bottom: 0 !important;
            }
          }

          @media (max-width: ${theme.breakpoints.smDown}) {
            // 575
            .card.secondary-deal {
              border-radius: 0;
              width: 100% !important;
              height: auto;
              margin-bottom: 5px !important;
            }
            .shared-deal-image__container .carousel .thumbs-wrapper {
              display: none;
            }
            .shared-deal-image__container .social-cues-container__info {
              display: none;
            }
            .shared-deal-image__container
              .social-cues-container__main-image__bottom
              .bought-count {
              background-color: transparent !important;
              color: white !important;
            }
            .shared-deal-image__container
              .social-cues-container__main-image__bottom
              .social-cue__item.availability {
              display: none;
            }
            .card.secondary-deal {
              border-radius: 0;
              height: auto !important;
              width: 100%;
              display: inline-block;
            }
            .card.secondary-deal img {
              display: block;
            }
            .social-cues-container__main-image__bottom .social-cue__item {
              padding: 0 !important;
              margin: 0 !important;
            }
            .secondary-deal .social-cues-container__main-image__top {
              display: flex;
              justify-content: center;
            }
            .secondary-deal
              .social-cues-container__main-image__bottom
              .social-cue__item {
              display: block;
            }
            .secondary-deal
              .social-cues-container__main-image__bottom
              .social-cue__item-child {
              display: none;
            }
            .card.small-deal {
              //height: 214px;
              margin-bottom: 5px !important;
            }
            .secondary-deal .shared-deal-image__container {
              height: auto;
            }
            .secondary-deal .deal-image__container {
              position: relative;
            }
          }
        `}</style>
      </DealCardWrapper>
    </div>
  );
};

SecondaryDeal.propTypes = {
  deal: PropTypes.object,
  socialcues: PropTypes.object,
  extraclasses: PropTypes.string,
  hasSocialCueTop: PropTypes.bool,
  splatClass: PropTypes.string,
};

SecondaryDeal.defaultProps = {
  deal: null,
  socialcues: null,
  extraclasses: '',
  hasSocialCueTop: true,
  splatClass: 'top-right',
};

export default SecondaryDeal;
