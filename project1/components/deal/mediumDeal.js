/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import { GO_TO_DEAL, VIEW } from '../../config/text/text';
import { useSelector } from 'react-redux';
import {
  getUrlFromDeal,
  hidePrice,
  showPostage,
  useDealImpresssion,
} from '../../helpers/deals';
import useRestoreScroll from '../../helpers/useRestoreScroll';
import EmptyDeal from './shared-components/emptyDeal';
import SocialCueTop from './shared-components/DealSocialCuesTop';
import SocialCuesBottom from './shared-components/DealSocialCuesBottom';
import DealPriceSplat from './shared-components/dealPriceSplat';
import PostageAndPackagingText from './shared-components/PostageAndPackagingText';
import Clamp from '../_generic/utils/Clamp';
import { useRouter } from 'next/router';
import CarouselBlock from './shared-components/carousel/CarouselBlock';
import { PAGE_TYPE_NAME } from '../../redux/reducers/pagetype';
import PrimaryButton from '../_generic/button/PrimaryButton';
import DealCardWrapper from './shared-components/dealCardWrapper';

const MediumDeal = ({
  deal = null,
  socialcues = null,
  extraclasses = '',
  filtersURL,
}) => {
  const theme = useContext(ThemeContext);
  const [ssr, pageType] = useSelector((state) => [
    state.deals.ssr,
    state.pagetype.pageType,
  ]);
  const router = useRouter();

  if (!deal || Object.keys(deal).length === 0) return <EmptyDeal />;

  const headLineAux = deal.headline ? hidePrice(deal.headline, ssr) : '';

  const location = useSelector((state) => state.locations.location.shortName);
  const componentRef = useRef(null);
  useDealImpresssion({ dealId: deal.id, componentRef, location });

  const dealUrlPath = getUrlFromDeal({
    deal,
    originPath:
      filtersURL === undefined || filtersURL === ''
        ? router.asPath
        : filtersURL,
  });
  const hasPostage = showPostage(deal, true, false);
  const discount = pageType !== PAGE_TYPE_NAME.LOCATION;

  const [, setScrollData] = useRestoreScroll();

  return (
    <>
      <div
        ref={componentRef}
        className={`medium-deal ${extraclasses}`}
        id={`deal_${deal.id}`}
        onClick={() =>
          setScrollData({ url: window.location.href, dealId: deal.id })
        }
      >
        <DealCardWrapper>
          <div className="image-container">
            <SocialCueTop
              socialCuesData={socialcues}
              socialCuesAvailability={deal.totalRemaining || 0}
              socialCuesBought={deal.totalBought || 0}
              dealId={deal.id}
            />
            <CarouselBlock
              deal={deal}
              showScrim={true}
              showImageOverlays={true}
              single={true}
            />
            <SocialCuesBottom
              socialCuesData={deal}
              socialCuesExtra={socialcues}
              discount={discount}
            />
            <DealPriceSplat discount={discount} deal={deal} />
          </div>
          <Link href="/deal/[...slug]" as={dealUrlPath}>
            <a className="deal-info">
              <div className="deal-title">
                <Clamp lines={hasPostage ? 2 : 3}>
                  <h3 className="headline">{headLineAux}</h3>
                </Clamp>
                <PostageAndPackagingText
                  show={hasPostage}
                  deal={deal}
                  className="mobile-invert"
                />
              </div>
              <PrimaryButton
                ariaLabel={GO_TO_DEAL.replace('##DEAL##', deal.headline)}
              >
                {VIEW}
              </PrimaryButton>
            </a>
          </Link>
        </DealCardWrapper>
      </div>

      <style jsx>{`
        :global(.medium-deal) {
          width: 353.33px;
          height: 306px;
        }
        .image-container {
          position: relative;
        }
        .deal-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
          width: 100%;
          padding: 0 10px;
          text-decoration: none;
        }
        .deal-title {
          flex-grow: 1;
        }
        .headline {
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          color: ${theme.colors.dealtext};
        }
        .medium-deal :global(.card) {
          width: 100%;
          height: 100%;
        }
        .medium-deal :global(.primary-button) {
          min-width: 96px;
          width: 96px;
          margin-left: 10px;
        }

        @media (max-width: ${theme.breakpoints.xlDown}) {
          :global(.medium-deal) {
            width: 323px;
            height: 290px;
          }
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .medium-deal {
            width: 273px;
            height: 256px;
          }
        }

        @media (max-width: ${theme.breakpoints.smDown}) {
          :global(.medium-deal) {
            width: 100% !important;
            height: auto !important;
          }
          .deal-info {
            position: absolute;
            bottom: 0;
          }
          .deal-info {
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            padding-bottom: 36px;
            padding-left: 10px;
            width: calc(100% - 90px);
          }
          .headline {
            color: ${theme.colors.dealmobiletitle};
            font-size: 16px;
            line-height: normal;
            font-weight: bold;
          }
          .medium-deal :global(.card) {
            width: 100%;
            height: auto;
            margin-bottom: 0;
          }
          .medium-deal :global(.primary-button) {
            display: none;
          }
          .medium-deal :global(.bought-count) {
            position: absolute;
            padding: 0;
            margin: 0;
            bottom: 10px;
            background-color: transparent;
            color: white;
          }
        }
      `}</style>
    </>
  );
};

MediumDeal.propTypes = {
  deal: PropTypes.object,
  socialcues: PropTypes.object,
  extraclasses: PropTypes.string,
  filtersURL: PropTypes.string,
};

export default MediumDeal;
