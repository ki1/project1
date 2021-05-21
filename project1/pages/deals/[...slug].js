import React, { useEffect, useContext, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import DealsLayout from '../../layouts/DealsLayout';
import SecondaryDeal from '../../components/deal/secondaryDeal';
import { TYPE_CATEGORY_DEALS } from '../../config/text/text';
import {
    NUMBER_OF_SECONDARY_DEALS_ON_CATEGORY,
    TIMEOUT_CHECK_404,
    PAGE_CACHE_AGE_SEC,
} from '../../config/setup/setup';
import { wrapper } from '../../redux/store/store';
import { getDealInfo } from '../../helpers/ssr';
import ThemeContext from '../../providers/ThemeProvider';
// import Filters from '../../components/filters/filters';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import FacetedNavigationContainer from '../../components/category/FacetedNavigationContainer';
import FeaturedSubcatsContainer from '../../components/category/FeaturedSubcatsContainer';
import BottomDeals from '../../components/deal/bottomDeals';
import CategoryMainDeal from '../../components/deal/main-deals/CategoryMainDeal';
import { resetFilters } from '../../redux/actions/filters';
import { getTiles } from '../../redux/actions/tiles';
import { isFilter } from '../../helpers/filters';

import Tiles from '../../components/tiles/Tiles';
import { getBasket } from '../../redux/actions/basket';
import { useVideoScroll } from '../../helpers/video';
import { trackPage } from '../../helpers/analytics';
import ConnectedBottomDeals from '../../components/deal/ConnectedBottomDeals/index';

/* eslint-disable-next-line sonarjs/cognitive-complexity */
const Deals = () => {
    const router = useRouter();
    const [
        mainDeal,
        deals,
        secondary_deals,
        ssr,
        tiles,
        nomoredeals,
        filterDeals,
    ] = useSelector((state) => [
        state.deals.mainDeal,
        state.deals.deals,
        state.deals.secondary_deals,
        state.deals.ssr,
        state.tiles,
        state.deals.nomore,
        state.filters,
    ]);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const location = useSelector((state) => state.locations.location);
    const { pageType } = useSelector((state) => state.pagetype);
    const theme = useContext(ThemeContext);
    const currentNumTiles = tiles?.tiles?.length || 0;

    const dispatch = useDispatch();
    const [pageNotFound, setPageNotFound] = useState(false);
    const [previousAsPath, setRouterAsPath] = useState('');

    const lastPage = useRef(0);
    const pageInitial = useRef(0);

    const updateLastPage = (defaultValue = 0) => {
        lastPage.current = defaultValue;
    };
    const updateInitialPage = (defaultValue = 0) => {
        pageInitial.current = defaultValue;
    };
    const noMoreFiltersData = useRef(false);
    const noMoreDealsData = useRef(false);
    const updateNoMoreFilters = (defaultValue = 0) => {
        noMoreFiltersData.current = defaultValue;
    };
    const updateNoMoreDeals = (defaultValue = 0) => {
        noMoreDealsData.current = defaultValue;
    };

    useVideoScroll();

    // Dont use useState for this parameters
    let fCategory = useRef('');
    let fLocation = useRef('');
    let fSubCategory = useRef('');
    let fSortby = useRef('');
    let fPriceMin = useRef('');
    let fPriceMax = useRef('');


    useEffect(() => {
        if (filterDeals.nomore === noMoreFiltersData.current) return;

        updateNoMoreFilters(filterDeals.nomore);
    }, [filterDeals]);

    useEffect(() => {
        if (nomoredeals === noMoreDealsData.current) return;
        updateNoMoreDeals(nomoredeals);
    }, [nomoredeals]);

    useEffect(() => {
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        if (previousAsPath === router.asPath.split('?')[0].toLowerCase()) {
            // we ignore if only the parameters are differents
            return;
        }
        setRouterAsPath(router.asPath.split('?')[0].toLowerCase());
        if (!isFilter(router.query)) {
            dispatch(resetFilters());
        }

        const queryAux = new URLSearchParams(window.location.search);
        const page = queryAux.has('page') ? parseInt(queryAux.get('page')) : 0;
        dispatch(
            getDealInfo({
                query: {
                    ...router.query,
                    page,
                },
                secondaryDealsCount: NUMBER_OF_SECONDARY_DEALS_ON_CATEGORY,
            })
        );
        updateInitialPage(0);

        dispatch(getTiles(router.query.slug, tiles.apiUrl, currentNumTiles));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    useEffect(() => {
        setTimeout(() => {
            if (
                !ssr &&
                (!mainDeal || Object.keys(mainDeal).length === 0) &&
                (!deals || !deals.length)
            ) {
                setPageNotFound(true);
            }
        }, TIMEOUT_CHECK_404);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [ssr]);

    useEffect(() => {
        try {
            // Get Basket token
            dispatch(getBasket(isAuthenticated));
        } catch (err) {
            // TODO: Show error message if needed
            // console.log(err);
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        trackPage(
            {
                dealData: mainDeal,
                dealId: mainDeal.id,
                dealLocation: router.query.slug[0],
                products: `;${mainDeal.id};;`,
                location: { shortName: location.shortName, name: location.name },
            },
            pageType
        );


    }, []);

    const [isFirstPage] = useState(!router.query['page']);

    if (pageNotFound) {
        // Import only if needed
        const DynamicComponent = dynamic(() =>
            import('../../components/errors/Form404Block')
        );
        return <DynamicComponent statusCode={404} />;
    }
    return (
        <div className="cat-page container-wrapper">
            {isFirstPage && (
                <>
                    <div>
                        {/* Special events */}
                        <Tiles />
                        {/* Breadcrumb + Main Deal + side menu + hero deals */}

                            <BreadCrumb />
                            <FacetedNavigationContainer />
                            <CategoryMainDeal deal={mainDeal} />


                            <div>
                                    {secondary_deals.map((deal) => {
                                        return (
                                            <SecondaryDeal
                                                deal={deal}
                                                key={deal.id}
                                                extraclasses={'full-width small-deal'}
                                                isXS={true}
                                            />
                                        );
                                    })}
                            </div>


                        <FeaturedSubcatsContainer />
                    </div>

                </>
            )}
            {/* Bottom deals*/}
            {/* only render the bottom deals for ssr */}
            {ssr && (
                <BottomDeals
                    deals={deals}
                    filterDeals={
                        filterDeals && filterDeals.deals ? filterDeals.deals : []
                    }
                    loaded={
                        filterDeals && filterDeals.loaded ? filterDeals.loaded : false
                    }
                    emptyFilters={filterDeals && filterDeals.empty ? true : false}
                    pageInitial={pageInitial.current}
                />
            )}
            <ConnectedBottomDeals />

            <style jsx>{`
        //
      `}</style>
            <style jsx global>{`
       //
      `}</style>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store, req, query, res }) => {
        // Get Navigation, Locations and Deals
        await store
            .dispatch(
                getDealInfo({
                    query,
                    ssr: true,
                    secondaryDealsCount: NUMBER_OF_SECONDARY_DEALS_ON_CATEGORY,
                })
            )
            .catch((err) => {
                // console.log only visible in Server Side
                console.log(`getDealInfo error: ${err}`);
            });

        res.setHeader('Cache-Control', `public, max-age=${PAGE_CACHE_AGE_SEC}`);
        return { props: { url: req.url } };
    }
);

// Title can not be created here, so we assign a title type
Deals.titletype = TYPE_CATEGORY_DEALS;
// Use the HeaderFooter Layout
Deals.layout = DealsLayout;
// Show the countdown timer
Deals.countdown = true;

export default Deals;
