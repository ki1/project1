import React, { useContext } from 'react';
import classNames from 'classnames';
import Badge from '../Badge';
import Icon from '../Icon';
import {
  faBars,
  faMapMarkerAlt,
  faPaperPlane,
  faUser,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';

const HeaderIcon = ({
  icon,
  isLoggedIn,
  isMobileHidden,
  badgeContent,
  clickMethod,
  isFirst,
  linkId,
  ariaHaspopup,
  ariaExpanded,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const theme = useContext(ThemeContext);
  function handleClick(event) {
    // Only handle Enter for keyboard access
    if (event.key && event.key !== 'Enter') return;

    if (clickMethod) {
      clickMethod();
    }
  }

  const getBadged = () => {
    if (!badgeContent || isNaN(badgeContent)) {
      return <></>;
    }
    return (
      <div className="header-icon__badge-wrapper">
        <Badge
          badgeContent={badgeContent}
          badgeColor={theme.colors.basketcount}
          isAriaHidden={true}
        ></Badge>
        <style jsx>{` .header-icon__badge-wrapper {
          line - height: 0;
          position: absolute;
          right: -6px;
          top: -6px;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .header - icon__badge - wrapper {
          right: -2px;
            top: -2px;
          }
        }
        `}</style>
      </div>
    );
  };

  let faIcon = faMapMarkerAlt;
  let tooltip = '';
  let ariaLabel = '';
  let dataQa = '';

  if (icon === 'burger') {
    faIcon = faBars;
    tooltip = 'Menu';
    ariaLabel = 'Menu';
    dataQa = 'mobileMenu';
  }
  if (icon === 'location') {
    faIcon = faMapMarkerAlt;
    tooltip = 'Location';
    ariaLabel = 'Change location';
    dataQa = 'changeLocation';
  }
  if (icon === 'subscribe') {
    faIcon = faPaperPlane;
    tooltip = 'Subscribe';
    ariaLabel = 'Subscribe to our Newsletter';
    dataQa = 'subscribe';
  }
  if (icon === 'login') {
    faIcon = faUser;
    tooltip = isLoggedIn ? 'Menu' : 'Login';
    ariaLabel = tooltip;
    dataQa = 'login';
  }
  if (icon === 'basket') {
    faIcon = faShoppingBasket;
    tooltip = 'Basket';
    dataQa = 'goToBasket';
    ariaLabel = !isNaN(badgeContent)
      ? `${badgeContent} Item in Basket`
      : tooltip;
  }
  const componentClass = classNames(`header-icon ${icon.toLowerCase()}`, {
    'header-icon--hidden-mobile': isMobileHidden,
    'header-icon--is-first': isFirst,
  });
  return (
    <div className={componentClass}>
      <a
        aria-label={ariaLabel}
        className="header-icon__link"
        data-qa={dataQa}
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex="0"
        id={linkId}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
      >
        {getBadged()}
        <Icon faIcon={faIcon} />
        <span className="sr-only">{ariaLabel}</span>
      </a>
      <div className="header-icon__tooltip">{tooltip}</div>
      <style jsx>{`
        .header-icon {
          font-family: ${theme.fonts.base};
          display: inline-block;
          margin-left: 10px;
          position: relative;
          text-align: center;
        }
        .header-icon--is-first {
          margin-left: 0;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          @media (pointer: fine) {
            a:hover + .header-icon__tooltip {
              display: block;
            }
          }
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .header-icon--hidden-mobile {
            display: none;
          }
        }

        .header-icon__tooltip {
          color: ${theme.colors.primary};
          display: none;
          font-size: 12px;
          top: 100%;
          left: 50%;
          position: absolute;
          transform: translateX(-50%);
        }
        .header-icon__link {
          display: block;
          border: none;
          line-height: 20px;
          height: 20px;
          width: 20px;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .header-icon__link {
            border: solid;
            border-radius: 32px;
            border-color: ${theme.colors.primary};
            line-height: 27px;
            height: 32px;
            width: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderIcon;

HeaderIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  isMobileHidden: PropTypes.bool,
  badgeContent: PropTypes.string,
  clickMethod: PropTypes.func,
  isFirst: PropTypes.bool,
  linkId: PropTypes.string,
  ariaHaspopup: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ariaExpanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

HeaderIcon.defaultProps = {
  isLoggedIn: false,
  isMobileHidden: false,
  badgeContent: '',
  isFirst: false,
  linkId: '',
  ariaHaspopup: null,
  ariaExpanded: null,
};
