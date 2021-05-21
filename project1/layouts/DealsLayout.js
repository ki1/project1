import React, { useEffect, useMemo } from 'react';
import HeaderTags from '../components/header/HeaderTags';
import Header from '../components/header/Header';
import Colorwash from '../components/Colorwash';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../helpers/user';
import { useRouter } from 'next/router';
import { getPageTitle, getMetaDescription } from '../helpers/metadata';
import Pagination from '../components/pagination/Pagination';
import { TYPE_CATEGORY_DEAL } from '../config/text/text';
import isEmpty from 'lodash/isEmpty';

// eslint-disable-next-line sonarjs/cognitive-complexity
const Layout = ({ children, title, description, countdown, titletype }) => {
  const [
    mainDeal,
    facetedNavigation,
    location,
    navigation,
    locations,
    url,
  ] = useSelector((state) => [
    state.deals.mainDeal,
    state.deals.facetedNavigation,
    state.locations.location,
    state.navigation.list || [],
    state.locations.locations || [],
    state.deals.canonicalUrl || '',
  ]);
  const userState = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();

  const generatedTitle =
    titletype && titletype.length
      ? getPageTitle(
          facetedNavigation,
          router.asPath,
          location.shortName,
          location.name,
          navigation,
          locations,
          mainDeal.pageTitle,
          titletype,
          router.query
        )
      : '';

  let generatedDescription =
    description && description.length
      ? description
      : getMetaDescription(
          facetedNavigation,
          router.asPath,
          location.shortName,
          location.name,
          navigation,
          locations
        );

  const dispatch = useDispatch();
  useEffect(() => {
    // Check if the user is logged
    getUserProfile(userState, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let titleAux = title && title.length ? title : generatedTitle;
  if (titletype === TYPE_CATEGORY_DEAL) {
    titleAux = generatedTitle;
    if (mainDeal.title) {
      generatedDescription = mainDeal.title;
    }
  }

  if (typeof window !== 'undefined') {
    const query = new URLSearchParams(window.location.search);
    const page = query.get('page');
    if (page) {
      titleAux = `Page ${page} - ${titleAux}`;
    }
  }

  const canonicalUrl = useMemo(() => {
    const isEvergreen = router.query.slug?.includes('e');
    if (isEvergreen) {
      // expected URL-format: deal/[location]/[cat]/[sub-cat]/e/evergreen-name
      const { protocol, host } = new URL(url);
      return `${protocol}//${host}${router.asPath}`;
    } else {
      return url;
    }
  }, [router, url]);

  return (
    <>
      <HeaderTags
        title={titleAux}
        description={generatedDescription}
        canonicalUrl={canonicalUrl}
      />
      <Colorwash />
      <Header countdown={countdown} path={router.asPath} />
      <div id="main-view" className="app">
        {children}
      </div>
      {!isEmpty(mainDeal) && <Pagination />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};

Layout.defaultProps = {
  children: null,
  title: '',
  description: '',
};

export default Layout;
