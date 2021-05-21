import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import { cutArray } from '../../helpers/deals';
import { MAX_CATEGORY_DEALS_BLOCK } from '../../config/setup/setup';
import EmptySearchDeal from './shared-components/emptySearchDeal';
import BlockWithOneFeaturedDeal from './shared-components/blockWithOneFeaturedDeal';
import MerchandisingModule from '../category/MerchandisingModule';
import { useRouter } from 'next/router';
import { DESKTOP_NUMBER_OF_PAGES } from '../../config/links/links.js';
import { hashCode } from '../../helpers/hash';

const getEmptySearchDeal = (loaded, emptyFilters) => {
  if (loaded && emptyFilters) return <EmptySearchDeal />;
  return null;
};

const BottomDeals = ({
  deals,
  showEmptyMessage,
  filterDeals,
  loaded,
  emptyFilters,
  pageInitial,
}) => {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  if (!showEmptyMessage && (!deals || !deals.length)) return null;

  const cutDealsArray = cutArray(
    filterDeals && filterDeals.length ? filterDeals : deals,
    MAX_CATEGORY_DEALS_BLOCK
  );

  const getCutDeals = () => {
    if (!cutDealsArray || !cutDealsArray.length) return null;
    return cutDealsArray.map((item, index) => {
      const auxId = item && item[0] && item[0].id ? item[0].id : hashCode();
      return (
        <Fragment key={`bottom_fragment_${index}_${auxId}}`}>
          <div className="bottom-deals container deals-products-list">
            <BlockWithOneFeaturedDeal deals={item} position={index} />
          </div>
          {/* Merchandise Row */}
          <MerchandisingModule path={router.asPath} position={index + 1} />

          {index % DESKTOP_NUMBER_OF_PAGES !== 0 && (
            <div
              className="track"
              id={`${
                parseInt(pageInitial) +
                Math.round(index / DESKTOP_NUMBER_OF_PAGES)
              }`}
            >
              &nbsp;
            </div>
          )}
        </Fragment>
      );
    });
  };

  return (
    <>
      <div className="bottom-deals container deals-products-list">
        <div className="row cols bottom-deals-block empty-text">
          {getEmptySearchDeal(loaded, emptyFilters)}
        </div>
      </div>
      {getCutDeals()}
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
BottomDeals.propTypes = {
  showEmptyMessage: PropTypes.bool,
  deals: PropTypes.arrayOf(PropTypes.object),
  filterDeals: PropTypes.arrayOf(PropTypes.object),
  loaded: PropTypes.bool,
  emptyFilters: PropTypes.bool,
};
BottomDeals.defaultProps = {
  showEmptyMessage: false,
  filterDeals: [],
  loaded: false,
  emptyFilters: false,
};
export default BottomDeals;
