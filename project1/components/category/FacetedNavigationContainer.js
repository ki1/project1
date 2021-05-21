import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import FacetedNavigation from './FacetedNavigation';
import {
  parseFacetedNavigation,
  getDefaultSeoText,
} from '../../helpers/facetedNavigation';
import { useScreenBreakpoint } from '../../helpers/screen';
import { useRouter } from 'next/router';
import SeoText from './SeoText';
import ThemeContext from '../../providers/ThemeProvider';
import Expander, { TYPE_ABSOLUTE } from '../_generic/expander/Expander';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CarouselDealBlock from '../deal/shared-components/CarouselDealBlock';
import { PAGE_TYPE_NAME } from '../../redux/reducers/pagetype';
import { FEATURED_DEALS_LOADED } from '../../redux/reducers/deals';
import {
  DEALS_PROMO_TYPES,
  SEO_LOCATION_TEXT,
  SITE_NAME,
} from '../../config/setup/setup';
import { trackEvent, updatePersistentProp } from '../../helpers/analytics';

/* eslint-disable-next-line sonarjs/cognitive-complexity */
const FacetedNavigationContainer = ({ isDealPage }) => {
  const theme = useContext(ThemeContext);
  const [
    facetedNavigation,
    location,
    locations,
    navigation,
    recommendedDeals,
    newProductDeals,
    recentlyViewedDeals,
    featuredDealsLoaded,
    pageType,
  ] = useSelector((state) => [
    state.deals.facetedNavigation,
    state.locations.location,
    state.locations.locations,
    state.navigation.list || [],
    state.deals.recommendedDeals,
    state.deals.newProductDeals,
    state.deals.recentlyViewedDeals,
    state.deals.featuredDealsLoaded,
    state.pagetype.pageType,
  ]);

  const router = useRouter();
  const path = router.asPath;

  const isLocation = pageType === PAGE_TYPE_NAME.LOCATION;
  const isShop = pageType === PAGE_TYPE_NAME.SHOP;

  const parsed = parseFacetedNavigation(
    facetedNavigation,
    path,
    location.shortName,
    navigation
  );
  const resultNavigations =
    parsed && parsed.navigations ? parsed.navigations : [];
  const resultLinkText =
    parsed && parsed.defaultItem && parsed.defaultItem.linkText
      ? parsed.defaultItem.linkText
      : '';
  const resultLinkTextCount =
    parsed && parsed.defaultItem && parsed.defaultItem.count
      ? `(${parsed.defaultItem.count})`
      : '';
  const resultToggleTitle = `${resultLinkText} ${resultLinkTextCount}`;
  let seoTextTitle = parsed?.defaultItem?.categoryName ?? resultLinkText;
  const categorySeoText = parsed && parsed.text ? parsed.text : '';
  let seoText =
    parsed && parsed.defaultItem && parsed.defaultItem.text
      ? parsed.defaultItem.text
      : categorySeoText;

  if (isLocation) {
    seoTextTitle =
      locations.find(
        (item) => item.shortName.toLowerCase() === router.query.slug[0]
      )?.name ?? ' ';
    seoText = SEO_LOCATION_TEXT.replace(/##LOCATION##/gm, seoTextTitle).replace(
      /##SITE_NAME##/gm,
      SITE_NAME[theme.label.replace('-', '').toLowerCase()]
    );
  }

  // if no text present in WPS/SEO we use a default text
  if (!seoText || !seoText.length) {
    seoText = getDefaultSeoText(facetedNavigation);
  }

  const [height, setHeight] = useState(75);
  const breakpoint = useScreenBreakpoint(true);
  useEffect(() => {
    switch (breakpoint) {
      case 'xs': {
        setHeight(75);
        break;
      }
      case 'sm': {
        setHeight(!isShop && !isLocation ? 75 : 218);
        break;
      }
      case 'md': {
        setHeight(263);
        break;
      }
      case 'lg': {
        setHeight(263);
        break;
      }
      case 'xl': {
        setHeight(220);
        break;
      }
      default: {
        setHeight(220);
        break;
      }
    }
  }, [breakpoint, isShop, isLocation]);

  const recentDeals = recentlyViewedDeals.slice(0, 4).map((deal) => {
    deal.promoType = DEALS_PROMO_TYPES().recentlyViewed;
    return deal;
  });

  const newDeals = newProductDeals.slice(0, 4).map((deal) => {
    deal.promoType = DEALS_PROMO_TYPES(
      `/deal/${!isShop ? location.shortName : 'london'}/special/new-products`
    ).newProducts;
    return deal;
  });
  const recommendDeals = recommendedDeals.slice(0, 4).map((deal) => {
    deal.promoType = DEALS_PROMO_TYPES().recommended;
    return deal;
  });

  useEffect(() => {
    if (featuredDealsLoaded === FEATURED_DEALS_LOADED.COMPLETE) {
      const trackedData = [...recentDeals, ...newDeals, ...recommendDeals];
      updatePersistentProp(
        'promoCarouselDeals',
        trackedData.map((deal) => {
          return { id: deal.id, promoType: deal.promoType.title };
        })
      );
      trackEvent('promo_carousel');
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [featuredDealsLoaded]);

  useEffect(() => {
    const propUpdateOnUnload = () => {
      updatePersistentProp('promoCarouselDeals');
    };

    window.addEventListener('beforeunload', propUpdateOnUnload);
    return () => {
      window.removeEventListener('beforeunload', propUpdateOnUnload);
    };
  }, []);

  const { carouselOne, carouselTwo } = useMemo(() => {
    if (isLocation || (isShop && breakpoint === 'xs')) {
      return {
        carouselOne: [...recommendDeals, ...recentDeals, ...newDeals],
        carouselTwo: [],
      };
    }

    if (isShop) {
      return {
        carouselOne: recommendDeals,
        carouselTwo: [...recentDeals, ...newDeals],
      };
    }

    return {
      carouselOne: [],
      carouselTwo: [],
    };
  }, [recommendDeals, recentDeals, newDeals, breakpoint, isShop, isLocation]);

  return (
    <>
      {!isShop && (
        <div
          className={classNames('seo-nav-container', {
            'seo-nav-container--mobile-only': isDealPage,
          })}
        >
          <div
            className={classNames('promo-block', {
              'subcat-block': !isShop && !isLocation,
            })}
          >
            {!isDealPage && (
              <Expander
                bgcolor={theme.colors.navbackground}
                initHeight={height}
                breakpoint={breakpoint}
                zindex={1000}
                type={TYPE_ABSOLUTE}
              >
                <SeoText text={seoText} title={seoTextTitle} />
              </Expander>
            )}

            {(isDealPage || pageType === PAGE_TYPE_NAME.CATEGORY) && (
              <FacetedNavigation
                navigations={resultNavigations}
                toggleText={resultToggleTitle}
              />
            )}
            {isLocation && <CarouselDealBlock deals={carouselOne} />}
          </div>
        </div>
      )}
      {isShop && (
        <div className="promo-block">
          <CarouselDealBlock deals={carouselOne} />
          <CarouselDealBlock deals={carouselTwo} />
        </div>
      )}
      <style jsx>{`
        .seo-nav-container {
          padding-top: 1px;
          position: relative;
          width: 100%;
          min-height: 450px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .promo-block {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .seo-nav-container--mobile-only {
          display: none;
          padding: 10px;
        }
        .promo-block {
          flex-direction: column;
        }
        .promo-block :global(.carousel-deal:first-child) {
          margin-bottom: 20px;
        }
        :global(.seo-nav-container--mobile-only .faceted-navigation__list) {
          background-color: white !important;
          border: 1px solid #aaaaaa;
        }
        @media (max-width: ${theme.breakpoints.xlDown}) {
          .promo-block {
            flex-direction: row;
            align-items: flex-start;
          }
          .promo-block :global(.carousel-deal) {
            width: calc(50% - 10px);
          }
          .promo-block :global(.carousel-deal:first-child) {
            margin-bottom: 0;
          }
          .promo-block :global(.expander-container),
          .promo-block :global(.faceted-navigation__container) {
            width: calc(50% - 10px);
          }
          .promo-block :global(.expander-closed) {
            margin-bottom: 0;
          }
          .seo-nav-container {
            min-height: 0;
          }
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .seo-nav-container {
            background-color: transparent;
          }
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .subcat-block {
            display: block;
          }
          .subcat-block :global(.expander-container) {
            width: 100%;
          }
          .subcat-block :global(.faceted-navigation__container) {
            width: 100%;
          }
          .seo-nav-container :global(.expander-container .absolute) {
            position: relative;
          }
          .seo-nav-container :global(.expander-container .spacer) {
            height: auto;
          }
        }
        @media (max-width: ${theme.breakpoints.smDown}) {
          .promo-block {
            display: block;
          }
          .seo-nav-container {
            justify-content: unset;
            height: 100%;
            min-height: inherit;
          }
          .seo-nav-container--mobile-only {
            display: block;
            height: auto;
          }
          .promo-block :global(.carousel-deal) {
            width: 100%;
          }
          .promo-block :global(.expander-container) {
            width: 100%;
          }
          .promo-block :global(.faceted-navigation__container) {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

FacetedNavigationContainer.propTypes = {
  isDealPage: PropTypes.bool,
};
FacetedNavigationContainer.defaultProps = {
  isDealPage: false,
};

export default FacetedNavigationContainer;
