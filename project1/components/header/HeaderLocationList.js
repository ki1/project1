import React, { useContext } from 'react';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';
import { COUNTRY_NAME, DISMISS } from '../../config/text/text';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BRAND_LIVINGSOCIAL, DEFAULT_LOCATION } from '../../config/setup/setup';
import HeaderFlags from './HeaderFlags';
import { getLocationShortName } from '../../helpers/location';

const HeaderLocationList = ({
  brand,
  site,
  locations,
  selection,
  countryCode,
  onSelectLocation,
  onCancel,
}) => {
  const theme = useContext(ThemeContext);

  const onClickItem = (e, location) => {
    e.preventDefault();
    onSelectLocation(location);
  };

  const locationList = locations
    .filter((loc) => {
      return loc.countryCode === countryCode;
    })
    .map(function (loc) {
      const isSelected = loc.shortName === getLocationShortName(selection);
      const linkClass = isSelected
        ? 'location-select__link location-select__link--selected'
        : 'location-select__link';
      return (
        <li className="location-select__item" key={loc.id}>
          <a
            href="#"
            className={linkClass}
            onClick={(e) => onClickItem(e, loc)}
          >
            {loc.name}
          </a>
          <style jsx>{`
            .location-select__link {
              display: block;
              width: 100%;
              border: none;
              background-color: transparent;
              color: ${theme.colors.headerlocationtext};
              cursor: pointer;
              display: block;
              line-height: 40px;
              padding: 0 10px;
              text-align: left;
            }
            .location-select__link:hover {
              text-decoration: underline;
            }
            .location-select__link:focus,
            .location-select__link--selected {
              background-color: ${theme.colors.headerlocationbackgroundactive};
              color: ${theme.colors.headerlocationtextactive};
              outline: none;
            }
            @media (min-width: ${theme.breakpoints.mdUp}) {
              .location-select__link {
                line-height: 30px;
                padding: 0 5px;
              }
            }
          `}</style>
        </li>
      );
    });

  return (
    <>
      <div className="your-location__sticky">
        <div className="your-location__dismiss">
          <button
            className="your-location__dismiss-button"
            aria-label={DISMISS}
            onClick={onCancel}
          >
            <span>{DISMISS}</span>
            <FontAwesomeIcon
              className="your-location__icon"
              icon={faTimesCircle}
              size="xs"
            />
          </button>
        </div>
        <div className="your-location">
          Your location is{' '}
          <span className="your-location__name">
            {(selection && selection.name) ||
              DEFAULT_LOCATION[process.env.NEXT_PUBLIC_SITE || 'wowcher'].name}
          </span>
        </div>
        <p className="location-select__country-name">{COUNTRY_NAME[site]}</p>
      </div>
      <ul className="location-select">{locationList}</ul>
      {brand === BRAND_LIVINGSOCIAL && (
        <div className="your-location__flags">
          <HeaderFlags countryCode={countryCode} />
        </div>
      )}
      <style jsx>{`
        .your-location__sticky {
          padding: 10px 10px 15px 20px;
          background-color: #ffffff;
          position: sticky;
          top: 0;
          border-radius: 4px;
        }
        .your-location {
          display: block;
          text-align: center;
          margin-bottom: 10px;
        }
        .your-location__name {
          color: ${theme.colors.primaryonwhite};
          font-size: 18px;
          font-weight: bold;
          display: block;
        }
        .location-select__country-name {
          font-weight: bold;
          margin: 0;
        }
        .location-select {
          column-count: 2;
          list-style-type: none;
          margin-bottom: 0;
          padding: 0 10px 10px 10px;
          vertical-align: top;
        }
        .your-location__dismiss {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
        .your-location__dismiss-button {
          border: none;
          background-color: transparent;
          color: rgb(150, 150, 150);
          padding: 0;
        }
        :global(.your-location__icon) {
          height: 14px;
          width: 14px;
          margin-left: 4px;
        }
        .your-location__flags {
          display: flex;
          justify-content: flex-end;
          padding: 12px 0;
          position: sticky;
          bottom: 0;
          background-color: #ffffff;
          border-radius: 4px;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .your-location__sticky {
            padding: 10px 15px 15px 15px;
          }
          .your-location__sticky {
            position: relative;
          }
          .your-location {
            display: none;
          }
          .your-location__dismiss {
            display: none;
          }
          .location-select {
            column-count: 3;
          }
          .your-location__flags {
            position: relative;
          }
        }
        @media (min-width: ${theme.breakpoints.lgUp}) {
          .location-select {
            column-count: 5;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderLocationList;

HeaderLocationList.propTypes = {
  brand: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  locations: PropTypes.array,
  selection: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  countryCode: PropTypes.string,
  onSelectLocation: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
