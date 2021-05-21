import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_CATEGORY_DEALS } from '../../../config/text/text';
import ThemeContext from '../../../providers/ThemeProvider';
import { getDealPreviews } from '../../../redux/actions/navigation';
import HeaderNavigationDealCard from './DealCard';
import { hashCode } from '../../../helpers/hash';

const HeaderNavigationPopover = ({ site, category }) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const previews = useSelector((state) => state.navigation.previews);
  const deals = useMemo(() => previews[category.url], [previews, category.url]);
  const totalDealsCount = category.subNavigations.reduce((out, item) => {
    if (item.count > 0) {
      out += item.count;
    }
    return out;
  }, 0);

  useEffect(() => {
    // if we haven't got the deals yet -- try, if no deals returned it will be null so only retry on undefined
    if (deals === undefined) {
      dispatch(getDealPreviews(category.url, 4));
    }
  }, [dispatch, category.url, deals]);

  // we only show the popover if there is a sub navigation to show
  if (category.subNavigations.length === 0) {
    return null;
  }

  return (
    <>
      <div className="navigation-popover">
        <div className="navigation-popover__column">
          <a className="navigation-popover__link" href={category.url}>
            {ALL_CATEGORY_DEALS(category.linkText)}{' '}
            {totalDealsCount > 0 && `(${totalDealsCount})`}
          </a>
        </div>
        <div className="navigation-popover__column">
          <ul className="navigation-popover__list">
            <a
              className="navigation-popover__link navigation-popover__link--small-only"
              href={category.url}
            >
              {ALL_CATEGORY_DEALS(category.linkText)}{' '}
              {totalDealsCount > 0 && `(${totalDealsCount})`}
            </a>
            {category.subNavigations.map((item, i) => {
              return (
                <li key={`HNP_li_${i}_${hashCode()}`}>
                  <a className="navigation-popover__link" href={item.url}>
                    {item.linkText} {item.count && `(${item.count})`}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navigation-popover__column navigation-popover__deals">
          {deals &&
            deals.map((deal) => {
              return (
                <div
                  key={`HNP_dealcard_${deal.id}_${hashCode()}`}
                  className="navigation-popover__inner"
                >
                  <HeaderNavigationDealCard site={site} deal={deal} />
                </div>
              );
            })}
          {!deals &&
            [null, null, null, null].map((_, i) => {
              return (
                <div
                  key={`HNP_deal_card_${i}_${hashCode()}`}
                  className="deal-card--placeholder"
                />
              );
            })}
        </div>
      </div>

      <style jsx>{`
        @keyframes popover-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .navigation-popover {
          display: flex;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
          background-color: white;
          animation-fill-mode: backwards;
          animation: popover-in 0.2s;
          padding: 15px;
        }
        .navigation-popover__column {
          padding: 0 15px;
          border-right: 1px solid #cccccc;
          flex-grow: 1;
          flex-basis: 0;
        }
        .navigation-popover__list {
          list-style: none;
          padding: 0;
        }
        .navigation-popover__column:first-child {
          padding-left: 0;
        }
        .navigation-popover__column:last-child {
          border-right: none;
          padding-right: 0;
        }
        .navigation-popover__link {
          color: #000000;
        }
        .navigation-popover__link--small-only {
          display: none;
        }
        .navigation-popover__link:hover {
          color: ${theme.colors.navlinkactive};
        }
        .navigation-popover__deals {
          align-item: top;
          display: flex;
          flex-wrap: wrap;
          min-width: 600px;
          padding: 0 8px;
          margin-top: -15px;
          width: 600px;
        }
        .navigation-popover__inner {
          display: flex;
          padding: 15px 7px 0;
          width: 50%;
        }
        .deal-card--placeholder {
          width: 100%;
          padding-bottom: 66.9%;
          background-color: #eeeeee;
        }

        @media (max-width: ${theme.breakpoints.xlDown}) {
          .navigation-popover__link--small-only {
            display: block;
          }
          .navigation-popover__column:first-child {
            display: none;
          }
          .navigation-popover__column:nth-child(2) {
            padding-left: 0;
          }
        }
        @media (max-width: ${theme.breakpoints.lgDown}) {
          .navigation-popover__deals {
            width: 525px;
            min-width: 525px;
          }
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .navigation-popover {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderNavigationPopover;
