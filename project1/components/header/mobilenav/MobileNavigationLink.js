import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import PropTypes from 'prop-types';

const MobileNavigationLink = ({ linkText, href, selected, target }) => {
  const theme = useContext(ThemeContext);
  const liClass = selected
    ? 'navigation-item navigation-item--selected'
    : 'navigation-item';

  return (
    <>
      <li className={liClass}>
        <a href={href} className="navigation-link" target={target}>
          {linkText}
        </a>
      </li>
      <style jsx>{`
        .navigation-item {
          list-style: none;
        }
        .navigation-item--selected .navigation-link {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textonprimary};
        }
        .navigation-link {
          display: block;
          height: 100%;
          width: 100%;
          color: ${theme.colors.navlink};
          padding: 5px 12px 5px 42px;
          text-transform: ${theme.text.navigation.transform};
          text-decoration: none;
          font-size: ${theme.text.navigation.size}px;
          white-space: nowrap;
        }
        .navigation-link:focus {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textonprimary};
        }
      `}</style>
    </>
  );
};

export default MobileNavigationLink;

MobileNavigationLink.propTypes = {
  linkText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  target: PropTypes.string,
};
