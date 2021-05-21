import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { getSubCatsWithPicture } from '../../helpers/facetedNavigation';
import FeaturedSubcats from './FeaturedSubcats';
import { useRouter } from 'next/router';
import ThemeContext from '../../providers/ThemeProvider';

const FeaturedSubcatsContainer = () => {
  const [facetedNavigation] = useSelector((state) => [
    state.deals.facetedNavigation,
  ]);

  const theme = useContext(ThemeContext);
  const router = useRouter();
  const path = router.asPath;

  const parsed = getSubCatsWithPicture(facetedNavigation, path);
  const resultNavigations = parsed && parsed.length > 0 ? parsed : [];

  if (resultNavigations.length === 0) {
    return null;
  }

  return (
    <>
      <div className="featured-subcategory">
        {resultNavigations && (
          <FeaturedSubcats navigations={resultNavigations} />
        )}
      </div>
      <style jsx>{`
        .featured-subcategory {
          position: relative;
          width: 100%;
          margin: 5px 0;
        }
        @media (min-width: ${theme.breakpoints.smDown}) {
          .featured-subcategory {
            margin: 20px 0 0 0;
          }
        }
        @media (min-width: ${theme.breakpoints.xlDown}) {
          .featured-subcategory {
            margin: 40px 0 0 0;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedSubcatsContainer;
