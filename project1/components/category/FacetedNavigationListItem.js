import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import Link from 'next/link';

const FacetedNavigationListItem = ({ listItem }) => {
  const theme = useContext(ThemeContext);
  let linkClass = listItem.isActive
    ? 'faceted-navigation__link faceted-navigation__link--active'
    : 'faceted-navigation__link';
  return (
    <>
      <li className="faceted-navigation__item" key={listItem.url}>
        <Link href="/deals/[...slug]" as={listItem.url} shallow={true}>
          <a className={linkClass}>{listItem.linkText}</a>
        </Link>{' '}
        ({listItem.count})
      </li>
      <style jsx>{`
        .faceted-navigation__item {
          font-size: 13px;
          line-height: 26px;
          text-align: left;
        }
        .faceted-navigation__link {
          color: ${theme.colors.primaryonwhite};
        }
        .faceted-navigation__link--active {
          font-weight: bold;
          text-decoration: underline;
        }
        @media only screen and (min-width: ${theme.breakpoints.mdUp}) {
          .faceted-navigation__item {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default FacetedNavigationListItem;

FacetedNavigationListItem.propTypes = {
  listItem: PropTypes.object.isRequired,
};
