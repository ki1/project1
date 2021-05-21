import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import FacetedNavigationListItem from './FacetedNavigationListItem';

const FacetedNavigationList = ({ navigations }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <ul className="faceted-navigation__items">
        {navigations.map((navItem) => {
          return (
            <FacetedNavigationListItem listItem={navItem} key={navItem.url} />
          );
        })}
      </ul>

      <style jsx>{`
        .faceted-navigation__items {
          background-color: white;
          height: 186px;
          list-style: none;
          margin: 0;
          overflow-y: auto;
          padding: 0 10px;
        }

        @media (min-width: ${theme.breakpoints.smUp}) {
          .faceted-navigation__items {
            height: 220px;
            padding: 15px 17px;
          }
        }

        @media (min-width: ${theme.breakpoints.mdUp}) {
          .faceted-navigation__items {
            border-radius: 10px;
            height: 263px;
          }
        }

        @media (min-width: ${theme.breakpoints.xlUp}) {
          .faceted-navigation__items {
            height: 220px;
          }
        }
      `}</style>
    </>
  );
};

export default FacetedNavigationList;

FacetedNavigationList.propTypes = {
  navigations: PropTypes.array.isRequired,
};
