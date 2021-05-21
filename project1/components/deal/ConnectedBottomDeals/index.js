import React, { Fragment, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../providers/ThemeProvider';
import { cutArray } from '../../../helpers/deals';
import useRestoreScroll from '../../../helpers/useRestoreScroll';
import { MAX_CATEGORY_DEALS_BLOCK, URLDEAL } from '../../../config/setup/setup';
// import EmptySearchDeal from '.././shared-components/emptySearchDeal';
import BlockWithOneFeaturedDeal from '.././shared-components/blockWithOneFeaturedDeal';
import MerchandisingModule from '../../category/MerchandisingModule';
import { useSWRInfinite } from 'swr';
import { useRouter } from 'next/router';
import LoadMore from './LoadMore';
import { fetchDeals, getApiPath } from './helpers';

const RETRY_TIMEOUT_LIST = [
  150,
  250,
  250,
  500,
  500,
  500,
  750,
  750,
  750,
  1000,
  1000,
  1000,
  1250,
  1250,
  1500,
  1500,
];

const ConnectedBottomDeals = ({ evergreenDealId = null }) => {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const scrollRetriesRef = useRef(0);
  const [scrollData, setScrollData] = useRestoreScroll();
  const scopeSWRResponse = useRef({});
  const getKeyCallBack = (pageNr, previousPageData) => {
    const urlObj = getApiPath(window.location.href, evergreenDealId);
    if (previousPageData && !previousPageData.length) return null;
    urlObj.searchParams.set('page', pageNr);
    return `${URLDEAL}/${urlObj.path}?${urlObj.searchParams.toString()}`;
  };

  const { data: deals, setSize, isValidating, size } = useSWRInfinite(
    getKeyCallBack,
    fetchDeals,
    {
      initialSize: 1,
      dedupingInterval: 600,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    scopeSWRResponse.current = {
      size: size,
      isValidating: isValidating,
    };
  }, [size, isValidating]);

  useEffect(() => {
    const handleComplete = () => {
      if (scrollData?.url !== window.location.href) return;
      const dealCardElement = document.querySelector(
        `#deal_${scrollData.dealId}`
      );
      if (dealCardElement) {
        dealCardElement.scrollIntoView({ block: 'center', inline: 'center' });
        setScrollData(null);
        scrollRetriesRef.current = 0;
        setTimeout(() => {
          // Image rendering issue, forced hack to trigger the scroll to rerender the images
          window.scrollTo(window.scrollX, window.scrollY - 1);
        }, 500);
      } else {
        if (scrollRetriesRef.current <= RETRY_TIMEOUT_LIST.length) {
          ++scrollRetriesRef.current;
          setTimeout(
            handleComplete,
            RETRY_TIMEOUT_LIST[scrollRetriesRef.current]
          );
        } else {
          // Reset
          scrollRetriesRef.current = 0;
        }
      }
    };
    handleComplete();
  }, [router.asPath, scrollData, setScrollData]);

  const handleLoadMore = () => {
    // scoping issue hence we are using ref to resolve this issue
    !scopeSWRResponse.current.isValidating &&
      setSize((currentSize) => {
        return currentSize + 1;
      });
  };

  const renderDeals = () => {
    if (!deals?.length) return null;
    const sectionedDeals = cutArray(deals.flat(), MAX_CATEGORY_DEALS_BLOCK);
    const dealsInBlocks = sectionedDeals.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="bottom-deals container deals-products-list">
            <BlockWithOneFeaturedDeal deals={item} position={index} />
          </div>
          {/* Merchandise Row */}
          <MerchandisingModule path={router.asPath} position={index + 1} />
        </Fragment>
      );
    });

    return (
      <div>
        {dealsInBlocks}
        {dealsInBlocks.length ? <LoadMore onTrigger={handleLoadMore} /> : null}
      </div>
    );
  };

  return (
    <>
      {renderDeals()}
      <style jsx>{`
        .empty-text {
          width: 100%;
        }
      `}</style>
      <style jsx global>{`
        .container-wrapper .container .bottom-deals-block.sequence-blocks .medium-deal {
          margin-top: 20px;
        }
        .bottom-deals.deals-products-list .bottom-deals-block .main-deal {
          margin-bottom: 0px !important;
        }
        .bottom-deals.deals-products-list .sequence-of-3 {
          margin-top: 0px !important;
        }
        .ipad-row .medium-deal:first-child {
          margin-top: 20px;
        }
        .bottom-deals.deals-products-list .medium-deals-block {
          width: 100%;
        }
        .bottom-deals.deals-products-list .sequence-of-3 {
          margin-top: 20px;
          width: 100%;
        }
        .bottom-deals.deals-products-list .full-row {
          width: 100%;
          margin-bottom: 20px;
        }
        .bottom-deals.deals-products-list .row-display {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .bottom-deals.deals-products-list .cols-display {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .bottom-deals.deals-products-list .cols {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .bottom-deals.deals-products-list .bottom-deals-block.sequence-blocks .item {
          margin-bottom: 20px;
        }
        .bottom-deals.deals-products-list .nowrap {
          flex-wrap: nowrap;
        }
        // iPad
        @media (max-width: ${theme.breakpoints.xlDown}) {
          // 1199
          .ipad-row .medium-deal:last-child {
            margin-top: 20px;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .main-deal {
            padding-right: 0px;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .main-deal {
            width: 100%;
            margin-bottom: 0px;
            //margin-bottom: 20px;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals { width: 100%; height: auto;}
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .ipad-row {
            flex-direction: row;
            margin-bottom: 0px;
            width: 666px;
            margin: 0 auto;
          }
          .bottom-deals.deals-products-list .bottom-deals-block.sequence-blocks {
            width: 666px !important;
            margin: 0 auto;
          }
          .bottom-deals.deals-products-list .sequence-of-3 {
            margin-bottom: 0px;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .deal { width: 50%}
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .deal { width: 50% !important; height: 250px;}
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .deal :nth-child(even) {margin-left: 10px;}
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .deal :nth-child(odd) {margin-right: 10px;}
        } // 1199
        // Mobile
        @media (max-width: ${theme.breakpoints.mdDown}) { // 768
          .bottom-deals.deals-products-list .container {
            padding: 0px;
          }
          .bottom-deals.deals-products-list .row {
            padding-left: 0px;
            padding-right: 0px;
            margin-left: 0px;
            margin-right: 0px;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .item { height: 300px; !important}
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .deal { width: 100% !important; height: 300px !important}
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .ipad-row { flex-direction: column; }
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .ipad-row {
            width: 566px !important;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .bottom-deals.deals-products-list .bottom-deals-block.sequence-blocks {
            width: 566px !important;
          }
          .bottom-deals.deals-products-list .bottom-deals-block.sequence-blocks  .bottom-deal-item  {width: 100%;}
          .bottom-deals.deals-products-list .bottom-deals-block  .bottom-deal-item { width: 100%; }
          .bottom-deals.deals-products-list .bottom-deals-block .item { height: auto;}
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .deal:first-child { margin-bottom: 20px;}
          .bottom-deals-block.sequence-blocks {
            width: 566px;
          }
          .empty-medium-deal2 {
            display: none !important;
          }
        }
        @media (max-width: ${theme.breakpoints.smDown}) {
          .bottom-deals.deals-products-list .bottom-deals-block.sequence-blocks {
            width: 100% !important;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .ipad-row {
            width: 100% !important;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .ipad-row .medium-deal{
            margin-top: 20px;
          }
          .cols-display .ipad-row,
          .bottom-deals-block .side-deals .ipad-row {
            width: 100% !important;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .ipad-row {
            margin: 0;
          }
          .empty-medium-deal {
            display: none !important;
          }
          .bottom-deals.deals-products-list .bottom-deals-block .side-deals .ipad-row .medium-deal,
          .container-wrapper .container .bottom-deals-block.sequence-blocks .medium-deal {
            margin-top: 5px;
          }
        }
      `}</style>
    </>
  );
};

ConnectedBottomDeals.propTypes = {
  evergreenDealId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ConnectedBottomDeals;
