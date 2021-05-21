import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import Link from 'next/link';

const FeaturedSubcat = ({ subcat }) => {
  const theme = useContext(ThemeContext);
  const headingClass = subcat.isActive
    ? 'featured-subcategory__text featured-subcategory__text--active'
    : 'featured-subcategory__text';
  return (
    <>
      <Link href="/deals/[...slug]" as={subcat.url} shallow={true}>
        <a>
          <div className="featured-subcategory__circle"></div>
          <h2 className={headingClass}>{subcat.linkText}</h2>
        </a>
      </Link>
      <style jsx>{`
        .featured-subcategory__circle {
          background-image: url('${subcat.imageUrl}');
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-color: ${theme.colors.navbackground};
          border-style: solid;
          border-width: 4.5px;
          border-radius: 100%;
          margin: 0 auto;
          height: 68px;
          width: 68px;
        }
        .featured-subcategory__text {
          color: ${theme.colors.primary};
          font-size: 11px;
          font-weight: normal;
          padding: 0;
          margin: 5px auto;
          text-align: center;
        }
        .featured-subcategory__text--active {
          font-weight: bold;
          text-decoration: underline;
        }
        @media only screen and (min-width: ${theme.breakpoints.mdUp}) {
          .featured-subcategory__circle {
            border-width: 6px;
            height: 105px;
            width: 105px;
          }
          .featured-subcategory__text {
            font-size: 12px;
            padding: 0 20px;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.xlUp}) {
          .featured-subcategory__circle {
            border-width: 7px;
            width: 140px;
            height: 140px;
          }
          .featured-subcategory__text {
            font-size: 16px;
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedSubcat;

FeaturedSubcat.propTypes = {
  subcat: PropTypes.object.isRequired,
};
