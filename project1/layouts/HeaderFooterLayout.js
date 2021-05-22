import React, { useEffect } from 'react';
import HeaderTags from '../components/header/HeaderTags';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Colorwash from '../components/Colorwash';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../helpers/user';
import { useRouter } from 'next/router';
import { getLocationShortName } from '../helpers/location';
import { getPageTitle, getMetaDescription } from '../helpers/metadata';
import Pagination from '../components/pagination/Pagination';

const Layout = ({ children, title, description, countdown, titletype }) => {
  const [
    facetedNavigation,
    location,
    navigation,
    locations,
  ] = useSelector((state) => [
    state.deals.facetedNavigation,
    state.locations.location,
    state.navigation.list || [],
    state.locations.locations || [],
  ]);
  const userState = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();
  const shortName = getLocationShortName(location);

  // TODO: created different ways to get the title dinamically
  // We get the title from the facetedNavigation if titled is empty
  const generatedTitle =
    titletype && titletype.length
      ? getPageTitle(
          facetedNavigation,
          router.asPath,
          location.shortName,
          location.name,
          navigation,
          locations
        )
      : '';

  const generatedDescription =
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
  });

  // if title is empty titletype let us know how to get the title
  const titleAux = title && title.length ? title : generatedTitle;

  return (
    <>
      <HeaderTags title={titleAux} description={generatedDescription} />
      <Colorwash />
      <Header countdown={countdown} path={router.asPath} />
      <div id="main-view" className="app">
        {children}
      </div>
      <Pagination />
      <Footer
        site={process.env.NEXT_PUBLIC_SITE}
        isSecurePage={false}
        locationShortName={shortName}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  titletype: PropTypes.string,
};

Layout.defaultProps = {
  children: null,
  title: '',
  description: '',
  titletype: '',
};

export default Layout;
