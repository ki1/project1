/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import { useSelector } from 'react-redux';
import { GO_TO_DEAL, VIEW } from '../../config/text/text';
import { useRouter } from 'next/router';
import { MAX_TITLE_DEAL_SIZE } from '../../config/setup/setup';
import {
  textOverflow,
  useSocialCues,
  hidePrice,
  getUrlFromDeal,
  useDealImpresssion,
  showPostage,
} from '../../helpers/deals';
import EmptyDeal from './shared-components/emptyDeal';
import SocialCueTop from './shared-components/DealSocialCuesTop';
import SocialCuesBottom from './shared-components/DealSocialCuesBottom';
import SocialCueDealInfo from './shared-components/DealSocialCuesInfo';
import DealPriceSplat from './shared-components/dealPriceSplat';
import CarouselBlock from './shared-components/carousel/CarouselBlock';
import PostageAndPackagingText from './shared-components/PostageAndPackagingText';
import { PAGE_TYPE_NAME } from '../../redux/reducers/pagetype';
import useRestoreScroll from '../../helpers/useRestoreScroll';

const XLDealCard = ({ deal = null, socialcues = null, filtersURL }) => {
  const router = useRouter();
  const [ssr, pageType] = useSelector((state) => [
    state.deals.ssr,
    state.pagetype.pageType,
  ]);
  const theme = useContext(ThemeContext);

  if (!deal || Object.keys(deal).length === 0) return <EmptyDeal />;

  const socialCuesData = useSocialCues(deal.id);
  const headLineAux = deal.headline ? hidePrice(deal.headline, ssr) : '';
  const dealTitle = deal.title ? hidePrice(deal.title, ssr) : '';
  const dealUrlPath = getUrlFromDeal({
    deal,
    originPath:
      filtersURL === '' || filtersURL === undefined
        ? router.asPath
        : filtersURL,
  });
  const withVideo = deal.video && deal.video.videoUrl ? 'withvideo' : '';

  const location = useSelector((state) => state.locations.location.shortName);
  const componentRef = useRef(null);
  const discount = pageType !== PAGE_TYPE_NAME.LOCATION;
  const hasPostage = showPostage(deal, true, false);
  useDealImpresssion({ dealId: deal.id, componentRef, location });

  const [, setScrollData] = useRestoreScroll();

  return (
    <div
      className={`card xl-deal deal_item ${withVideo}`}
      id={`deal_${deal.id}`}
      ref={componentRef}
      onClick={() =>
        setScrollData({ url: window.location.href, dealId: deal.id })
      }
    >
      <div className="deal-image__container">
        <div className="shared-deal-image__container">
          <SocialCueTop
            socialCuesData={socialcues || socialCuesData}
            socialCuesAvailability={deal.totalRemaining || 0}
            socialCuesBought={deal.totalBought || 0}
          />
          <CarouselBlock
            showImageOverlays={true}
            deal={deal}
            thumbWidth={54}
            showScrim={true}
            showSingle={deal.images?.length === 1}
          />
          <div className="shared-deal--extra-container">
            <SocialCuesBottom
              socialCuesData={deal}
              socialCuesExtra={socialcues || socialCuesData}
              discount={discount}
            />
            <DealPriceSplat deal={deal} discount={discount} visible={!ssr} />
          </div>
          <div className="deal-info-container row">
            <div className="deal-info">
              <div className="deal-title">
                <Link href="/deal/[...slug]" as={dealUrlPath}>
                  <a
                    role="button"
                    aria-label={GO_TO_DEAL.replace('##DEAL##', deal.headline)}
                  >
                    <h3>{textOverflow(headLineAux, MAX_TITLE_DEAL_SIZE)}</h3>
                  </a>
                </Link>
              </div>
              <div className="deal-text">
                <span className="deal-subtitle">{textOverflow(dealTitle)}</span>
                <PostageAndPackagingText
                  show={hasPostage}
                  deal={deal}
                  className="mobile-invert"
                />
              </div>
            </div>
            <div className="deal-button row justify-content">
              <SocialCueDealInfo socialCuesData={deal} />
              <div className="button-view">
                <Link href="/deal/[...slug]" as={dealUrlPath}>
                  <a
                    role="button"
                    aria-label={GO_TO_DEAL.replace('##DEAL##', deal.headline)}
                  >
                    <div className="button-wrapper">
                      <div className="button-text">{VIEW}</div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card.xl-deal {
          margin-top: 20px !important;
        }

        :global(.xl-deal .control-dots) {
          pointer-events: none;
        }

        .card {
          margin: 0;
          padding: 0;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border-radius: 10px;
          overflow: hidden;
          transition: color 0.15s ease, border-color 0.15s ease;
          position: relative;
          background-color: ${theme.colors.dealbackgroundcolor};
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }

        .card.xl-deal {
          width: 727px;
          height: 632px;
        }

        .card:hover,
        .card:focus,
        .card:active {
          curser: pointer;
        }

        .card .deal-image__container {
          position: absolute;
          top: 0px;
          height: 100%;
          width: 100%;
          z-index: 1;
        }

        .card .deal-extra-container {
          z-index: 2;
          height: 70%;
          position: relative;
        }

        .card .deal-info-container {
          width: 100%;
          padding: 0;
          flex-grow: 1;
          position: relative;
        }

        .row {
          margin: 0px;
        }

        .card .deal-info {
          padding: 0;
          padding-left: 11px;
          padding-right: 11px;
          margin-top: 7px;
        }

        .card .deal-info .deal-text {
          width: 86%;
        }

        .card .deal-info a h3 {
          font-size: 19px;
          font-weight: bold;
          margin: 0;
          color: ${theme.colors.dealtext};
        }

        .card .deal-info a {
          text-decoration: none;
        }

        .card .deal-info .deal-subtitle {
          margin: 0;
          font-size: 14px;
          line-height: 1.2;
          color: #000000;
          text-decoration: none;
          color: ${theme.colors.dealtext};
          font-size: 14px;
        }

        .card .deal-info .deal-info-container .deal-info {
          margin-top: 10px;
        }

        .card .deal-button {
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 0;
        }

        .card .deal-button a .button-wrapper {
          height: 100%;
          cursor: pointer;
        }

        .card .deal-button a .button-text {
          background-color: ${theme.colors.dealviewbutton};
          display: block;
          text-align: center;
          color: #ffffff;
          font-weight: bold;
          font-size: 18px;
          border-radius: 2rem;
          padding: 0 1rem;
          text-decoration: none;
          width: 96px;
          text-transform: uppercase;
          margin-top: 34px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 39px;
        }

        .justify-content {
          position: absolute;
          bottom: 0px;
          width: 100%;
        }

        .button-view {
          position: absolute;
          right: 14px;
          bottom: 40px;
          height: 48px;
        }

        .shared-deal-image__container {
          display: flex;
          flex-direction: column;
          position: relative;
          height: 100%;
        }

        .shared-deal-image__container .shared-deal--extra-container {
          position: relative;
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
        }

        .social-cues-container__main-image__top .social-cue__item {
          width: 50%;
          margin: 10px auto;
          text-align: center;
          font-weight: bold;
          border-radius: 10px;
        }

        @media (max-width: ${theme.breakpoints.xlDown}) {
          //1199.98px
          // Not Ipad but too small for xl deal + small deal in the same row
          .card.xl-deal {
            width: 666px;
            height: 574px;
            margin: 0 auto;
          }
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          // 768
          .card.xl-deal {
            width: 100%;
            // height: auto;
          }
          .button-view {
            bottom: 80px;
          }
        }

        @media (max-width: ${theme.breakpoints.smDown}) {
          // 575
          .card.xl-deal {
            border-radius: 0;
            height: auto;
          }

          .deal-image__container {
            position: relative !important;
          }

          .card .deal-info {
            position: absolute;
            bottom: 0;
            padding-bottom: 36px;
            width: 82%;
          }

          .card .deal-price {
            padding-left: 10px;
          }

          .card .deal-text,
          .card .now-text,
          .card .now-price {
            display: none;
          }

          .card .deal-info .deal-title h3 {
            color: ${theme.colors.dealmobiletitle};
            font-size: 16px;
            line-height: normal;
            font-weight: bold;
            margin-left: 10px;
          }
          .button-view {
            display: none;
          }
          .card .deal-info {
            padding-left: 0px;
            padding-right: 0px;
          }
        } // 575
      `}</style>
      <style jsx global>{`
        .card.xl-deal .single-image__image {
          width: 100%;
          height: auto;
        }
        .shared-deal-image__container .carousel:nth-child(2) {
          // position: absolute;
          position: inherit;
        }

        .xl-deal {
          position: relative;
        }

        .card.xl-deal .thumbs {
          position: absolute;
          bottom: 0px;
          margin: 0px;
          max-width: 46%;
          z-index: 1;
        }
        .card.xl-deal .slide {
          background-color: #ffffff;
        }

        @media (max-width: ${theme.breakpoints.xlDown}) {
          //1199.98px
          // Not Ipad but too small for xl deal + small deal in the same row
          .card.xl-deal .single-image__image {
            width: 100%;
            height: auto;
          }
          .card.xl-deal .carousel-root .carousel .slider-wrapper {
            max-height: 427px;
          }
          .shared-deal-image__container .carousel .thumb {
            width: 60px !important;
            height: auto;
          }
        } //1199.98px

        @media (max-width: ${theme.breakpoints.smDown}) {
          // 575
          .card.xl-deal .single-image__image {
            width: 100%;
            height: auto;
          }
          .card.xl-deal .carousel-root .carousel .slider-wrapper {
            //max-height: 335px;
          }
          .shared-deal-image__container .thumbs {
            display: none;
          }
          .shared-deal-image__container .social-cues-container__info {
            display: none;
          }
          .shared-deal-image__container
            .social-cues-container__main-image__bottom
            .bought-count {
            position: absolute;
            bottom: 10px;
            color: white;
            background: none;
            margin: 0;
            padding: 0;
          }

          .shared-deal-image__container
            .social-cues-container__main-image__bottom
            .social-cue__item.availability {
            display: none;
          }
        } // 575
      `}</style>
    </div>
  );
};

XLDealCard.propTypes = {
  deal: PropTypes.object,
  socialcues: PropTypes.object,
  filtersURL: PropTypes.string,
};

export default XLDealCard;
