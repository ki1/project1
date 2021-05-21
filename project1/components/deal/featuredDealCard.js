import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import { useSelector } from 'react-redux';
import { GO_TO_DEAL, FEATURED_DEAL_TITLE, VIEW } from '../../config/text/text';
import DealButton from './shared-components/dealButton';
import { MAX_TITLE_DEAL_SIZE } from '../../config/setup/setup';
import {
  textOverflow,
  useSocialCues,
  hidePrice,
  getUrlFromDeal,
} from '../../helpers/deals';
import EmptyDeal from './shared-components/emptyDeal';
import SocialCueTop from './shared-components/DealSocialCuesTop';
import SocialCuesBottom from './shared-components/DealSocialCuesBottom';
import SocialCueDealInfo from './shared-components/DealSocialCuesInfo';
import DealPriceSplat from './shared-components/dealPriceSplat';
import CarouselBlock from './shared-components/carousel/CarouselBlock';
import { useRouter } from 'next/router';

const FeaturedDealCard = ({ deal, socialcues }) => {
  const ssr = useSelector((state) => state.deals.ssr);
  const theme = useContext(ThemeContext);
  const router = useRouter();

  if (!deal || Object.keys(deal).length === 0) return <EmptyDeal />;

  const socialCuesData = useSocialCues(deal.id);
  const headLineAux = deal.headline ? hidePrice(deal.headline, ssr) : '';
  const dealTitle = deal.title ? hidePrice(deal.title, ssr) : '';
  const dealUrlPath = getUrlFromDeal({
    deal,
    originPath: router.asPath,
  });
  const withVideo = deal.video && deal.video.videoUrl ? 'withvideo' : '';
  return (
    <div
      className={`card featured-deal deal_item ${withVideo}`}
      id={`deal_${deal.id}`}
    >
      <div className="deal-main-title-container">
        <div className="deal-main-title">{FEATURED_DEAL_TITLE}</div>
      </div>
      <div className="deal-image__container">
        <div className="shared-deal-image__container">
          <SocialCueTop
            socialCuesData={socialcues || socialCuesData}
            socialCuesAvailability={deal.totalRemaining || 0}
            socialCuesBought={deal.totalBought || 0}
            containerExtraClasses="margin-top"
          />
          <CarouselBlock
            showImageOverlays={true}
            showScrim={true}
            deal={deal}
            thumbWidth={54}
            invert
          />
          <div className="shared-deal--extra-container">
            <SocialCuesBottom
              socialCuesData={deal}
              socialCuesExtra={socialcues || socialCuesData}
              discount={true}
            />
            <DealPriceSplat deal={deal} discount={true} visible={!ssr} />
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
              </div>
            </div>
            <div className="deal-button row justify-content">
              <SocialCueDealInfo socialCuesData={deal} />
              <div className="button-view">
                <DealButton
                  type="button"
                  urlPath={dealUrlPath}
                  className="inverse-button"
                  asPath="/deal/[...slug]"
                >
                  {VIEW}
                </DealButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          margin: 0;
          padding: 0;
          text-align: left;
          color: #ffffff;
          text-decoration: none;
          border-radius: 10px;
          overflow: hidden;
          transition: color 0.15s ease, border-color 0.15s ease;
          position: relative;
          background-color: ${theme.colors.primary};
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }

        .card .deal-main-title-container {
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 9;
        }

        .card .deal-main-title-container .deal-main-title {
          background-color: ${theme.colors.primary};
          display: table;
          color: #ffffff;
          margin: 0 auto;
          padding: 4px 50px;
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .card.featured-deal {
          width: 727px;
          height: 632px;
          margin-top: 20px !important;
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
          width: 95%;
          margin: 1% 2.5%;
          z-index: 1;
        }

        .card .deal-extra-container {
          z-index: 2;
          height: 70%;
          position: relative;
        }

        .card .deal-info-container {
          height: 100%;
          width: 100%;
          box-sizing: content-box;
          padding: 0;
        }

        .row {
          margin: 0px;
        }

        .card .deal-info {
          padding: 0;
          padding-left: 11px;
          padding-right: 11px;
          margin-top: 5px;
        }

        .card .deal-info a h3 {
          font-size: 19px;
          font-weight: bold;
          margin: 0;
          color: #ffffff;
        }

        .card .deal-info a {
          text-decoration: none;
        }

        .card .deal-info .deal-subtitle {
          margin: 0;
          font-size: 14px;
          line-height: 1.2;
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
        }

        .card .deal-info .deal-info-container .deal-info {
          margin-top: 10px;
        }

        .card .deal-button {
          padding: 0;
        }

        .card .deal-button a .button-wrapper {
          height: 100%;
          cursor: pointer;
          display: flex;
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
          width: 160px;
          text-transform: uppercase;
          flex: 1;
          margin-top: 10px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          height: 35px;
        }

        .justify-content {
          position: absolute;
          bottom: 0px;
          width: 100%;
        }

        .button-view {
          position: absolute;
          right: 14px;
          bottom: 16px;
          height: 48px;
        }

        .shared-deal-image__container {
          position: relative;
          height: 100%;
          // max-height: 482px;
        }

        .shared-deal-image__container .shared-deal--extra-container {
          position: relative;
        }

        .shared-deal-image__container img {
          width: 100%;
        }

        @media (max-width: ${theme.breakpoints.xlDown}) {
          //1199.98px
          // Not Ipad but too small for xl deal + small deal in the same row
          .card.featured-deal {
            width: 666px;
            height: 574px;
            margin: 0 auto;
          }
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          // 768
          .card.featured-deal {
            width: 100%;
            // height: auto;
          }
          .button-view {
            bottom: 80px;
          }
        }

        @media (max-width: ${theme.breakpoints.smDown}) {
          // 575
          .card.featured-deal {
            border-radius: 0;
            height: auto;
          }

          .deal-image__container {
            position: relative !important;
          }

          .card .deal-info .deal-title h3 {
            color: #ffffff;
            font-size: 16px;
            line-height: normal;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .button-view {
            display: none;
          }

          .card .deal-info {
            position: absolute;
            bottom: 0;
            padding-bottom: 36px;
            width: 82%;
          }

          .card .deal-text,
          .card .now-text,
          .card .now-price {
            display: none;
          }
        } // 575
      `}</style>
      <style jsx global>{`
        .card.featured-deal .single-image__image {
          max-height: 483px;
          width: 100%;
          height: auto;
        }
        .card.featured-deal
          .shared-deal-image__container
          .carousel:nth-child(2) {
          // position: absolute;
          position: inherit;
        }

        .featured-deal {
          position: relative;
        }

        .card.featured-deal .shared-deal-image__container .carousel-root {
          //height: 100%;
        }
        .carousel .control-prev.control-arrow,
        .carousel .control-next.control-arrow {
          display: none;
        }

        .card.featured-deal
          .shared-deal-image__container
          .carousel-root
          .carousel-slider {
          // height: 100%;
          border-radius: 10px;
        }
        .card.featured-deal .thumbs {
          position: absolute;
          bottom: 9px;
          margin: 0px;
          max-width: 46%;
        }

        @media (max-width: ${theme.breakpoints.xlDown}) {
          //1199.98px
          // Not Ipad but too small for xl deal + small deal in the same row
          .card.featured-deal .single-image__image {
            max-height: 427px;
            width: 100%;
            height: auto;
          }
          .card.featured-deal .carousel-root .carousel .slider-wrapper {
            max-height: 427px;
            border-radius: 10px;
          }
          .card.featured-deal .shared-deal-image__container .carousel .thumb {
            width: 60px !important;
            height: auto;
          }
        } //1199.98px

        @media (max-width: ${theme.breakpoints.smDown}) {
          // 575
          .card.featured-deal .single-image__image {
            width: 100%;
            height: auto;
          }
          .card.featured-deal .shared-deal-image__container .thumbs {
            display: none;
          }
          .card.featured-deal
            .shared-deal-image__container
            .social-cues-container__info {
            display: none;
          }
          .card.featured-deal
            .shared-deal-image__container
            .social-cues-container__main-image__bottom
            .bought-count {
            position: absolute;
            bottom: 10px;
          }

          .card.featured-deal
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

FeaturedDealCard.propTypes = {
  deal: PropTypes.object,
  socialcues: PropTypes.object,
};

FeaturedDealCard.defaultProps = {
  deal: null,
  socialcues: null,
};

export default FeaturedDealCard;
