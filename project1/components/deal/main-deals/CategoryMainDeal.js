import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../providers/ThemeProvider';
import { useSelector } from 'react-redux';
import {
  useSocialCues,
  getUrlFromDeal,
  hidePrice,
  showPostage,
  useIsExpressBuy,
  useDealImpresssion,
} from '../../../helpers/deals';
import EmptyDeal from '../shared-components/emptyDeal';
import CarouselBlock from '../shared-components/carousel/CarouselBlock';
import DealPriceSplat from '../shared-components/dealPriceSplat';
import SocialCueTop from '../shared-components/DealSocialCuesTop';
import { GO_TO_DEAL, VIEW } from '../../../config/text/text';
import PostageAndPackagingText from '../shared-components/PostageAndPackagingText';
import SocialCuesBottom from '../shared-components/DealSocialCuesBottom';
import Clamp from '../../_generic/utils/Clamp';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CategoryMainDeal = ({ deal, extraclasses }) => {
  const theme = useContext(ThemeContext);
  const ssr = useSelector((state) => state.deals.ssr);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isExpressBuy = useIsExpressBuy(deal.id, isAuthenticated);
  const socialCuesData = useSocialCues(deal.id);

  const location = useSelector((state) => state.locations.location.shortName);
  const componentRef = useRef(null);
  useDealImpresssion({ dealId: deal.id, componentRef, location });

  if (!deal || Object.keys(deal).length === 0) return <EmptyDeal />;

  const title = deal.title ? hidePrice(deal.title, ssr) : '';
  const headline = deal.headline ? hidePrice(deal.headline, ssr) : '';
  const hasPostage = showPostage(deal, false, true);
  const dealUrlPath = getUrlFromDeal({
    deal,
    originPath: router.asPath,
  });

  return (
    <>
      <div
        className={`card cat-main-deal deal_item ${extraclasses}`}
        ref={componentRef}
      >
        <div className="cat-main-deal__header">
          <Link href="/deal/[...slug]" as={dealUrlPath}>
            <a
              className="cat-main-deal__header-text"
              role="button"
              aria-label={GO_TO_DEAL.replace('##DEAL##', deal.headline)}
            >
              <Clamp lines={hasPostage ? 3 : 4}>
                <h3 className="cat-main-deal__title">{headline}</h3>
                <p className="cat-main-deal__subtitle">{title}</p>
              </Clamp>
              <PostageAndPackagingText
                show={hasPostage}
                deal={deal}
                className="mobile-invert display-mobile"
              />
            </a>
          </Link>
          <div className="cat-main-deal__header-buttons">
            <Link href="/deal/[...slug]" as={dealUrlPath}>
              <a
                className="cat-main-deal__view-button"
                role="button"
                aria-label={GO_TO_DEAL.replace('##DEAL##', deal.headline)}
              >
                {VIEW}
              </a>
            </Link>
          </div>
        </div>
        <div className="cat-main-deal__image">
          <SocialCueTop
            socialCuesData={socialCuesData}
            socialCuesAvailability={deal.totalRemaining || 0}
            socialCuesBought={deal.totalBought || 0}
          />
          <DealPriceSplat
            className={isExpressBuy ? 'top-left' : 'top-right'}
            deal={deal}
            forcePrice={true}
            visible={!ssr}
          />
          <CarouselBlock
            showImageOverlays={true}
            deal={deal}
            showScrim={true}
            lazy={false}
          />
          <SocialCuesBottom
            socialCuesData={deal}
            socialCuesExtra={socialCuesData}
            hideCue={true}
            discount={false}
          >
            <PostageAndPackagingText
              show={hasPostage}
              deal={deal}
              className="mobile-invert hide-mobile"
            />
          </SocialCuesBottom>
        </div>
      </div>
      <style jsx>{`
        .cat-main-deal {
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
          display: flex;
          flex-direction: column;
        }
        .cat-main-deal__header {
          width: 100%;
          display: flex;
          align-items: center;
          min-height: 92px;
        }
        .cat-main-deal__header-text {
          flex-grow: 1;
          color: inherit;
          text-decoration: none;
          padding: 0 8px;
        }
        .cat-main-deal__title,
        .cat-main-deal__subtitle {
          margin: 0;
        }
        .cat-main-deal__title {
          font-size: 16px;
        }
        .cat-main-deal__header-buttons {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 8px;
        }
        .cat-main-deal__view-button {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 18px;
          font-weight: bold;
          background-color: ${theme.colors.dealviewbutton};
          text-transform: uppercase;
          padding: 0.7rem 1rem;
          border-radius: 2rem;
          border: none;
          outline: none;
          text-decoration: none;
          width: 96px;
        }
        .cat-main-deal__bought-count {
          display: none;
          margin: 0;
        }
        .cat-main-deal__image {
          position: relative;
        }
        :global(.cat-main-deal .thumbs) {
          position: absolute;
          bottom: 38px;
          left: 0;
          width: 100%;
        }
        :global(.cat-main-deal .control-dots) {
          position: absolute;
          bottom: 0;
          margin: 20px 20px 20px 0;
          margin: 10px 0;
          pointer-events: none;
        }
        :global(.cat-main-deal .carousel__image--single) {
          width: 100%;
        }

        @media (max-width: ${theme.breakpoints.smDown}) {
          .cat-main-deal {
            border-radius: 0;
          }
          .cat-main-deal__header {
            position: absolute;
            bottom: 0;
            z-index: 2;
            color: white;
            padding-bottom: 36px;
            min-height: 0;
            max-width: 78%;
          }
          .cat-main-deal__header-text {
            padding-top: 0;
            padding-bottom: 0;
          }
          .cat-main-deal__header-buttons {
            display: none;
          }
          .cat-main-deal__subtitle {
            display: none;
          }
          :global(.cat-main-deal .bought-count) {
            position: absolute;
            bottom: 10px;
            background-color: transparent !important;
            color: white !important;
            padding: 0;
            margin: 0;
          }
          :global(.cat-main-deal .thumbs) {
            display: none;
          }
          :global(.cat-main-deal .control-dots) {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

CategoryMainDeal.propTypes = {
  deal: PropTypes.object,
  extraclasses: PropTypes.string,
};

CategoryMainDeal.defaultProps = {
  deal: null,
  extraclasses: '',
};

export default CategoryMainDeal;
