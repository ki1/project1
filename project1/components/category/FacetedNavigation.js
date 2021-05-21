import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import FacetedNavToggle from './FacetedNavToggle';
import FacetedNavigationList from './FacetedNavigationList';
import Accordion from 'react-bootstrap/Accordion';

const FacetedNavigation = ({ navigations, toggleText }) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      {navigations && navigations.length > 0 && (
        <div className="faceted-navigation__container">
          <div className="faceted-navigation__list faceted-navigation__list--mobile">
            <Accordion>
              <FacetedNavToggle
                buttonText={toggleText}
                eventKey="NAV_KEY"
                isExpander={true}
              />
              <Accordion.Collapse eventKey="NAV_KEY">
                <FacetedNavigationList navigations={navigations} />
              </Accordion.Collapse>
            </Accordion>
          </div>
          <div className="faceted-navigation__list faceted-navigation__list--desktop">
            <FacetedNavigationList navigations={navigations} />
          </div>
        </div>
      )}
      <style jsx>{`
        .faceted-navigation__container {
          position: relative;
          width: 100%;
        }
        .faceted-navigation__list {
          background-color: ${theme.colors.navbackground};
          border-radius: 10px;
        }
        .faceted-navigation__list--mobile {
          display: block;
          padding: 5px 18px 5px 18px;
          width: 100%;
          border-radius: 0;
        }
        .faceted-navigation__list--desktop {
          display: none;
          box-shadow: ${theme.colors.dropshadow} 0 3px 6px;
        }
        @media only screen and (min-width: ${theme.breakpoints.mdUp}) {
          .faceted-navigation__list--mobile {
            display: none;
          }
          .faceted-navigation__list--desktop {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default React.memo(FacetedNavigation);

FacetedNavigation.propTypes = {
  navigations: PropTypes.array.isRequired,
  toggleText: PropTypes.string,
};
