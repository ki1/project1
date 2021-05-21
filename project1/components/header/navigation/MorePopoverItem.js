import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';

const MorePopoverItem = ({ children, href }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <li className="more-item">
        <a className="more-item__a" href={href}>
          {children}
        </a>
      </li>
      <style jsx>{`
        .more-item {
          font-size: ${theme.text.navigation.size}px;
          text-transform: ${theme.text.navigation.transform};
          height: 26px;
        }
        .more-item__a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #111111;
          cursor: pointer;
          height: 100%;
          width: 100%;
          color: ${theme.colors.navlink};
        }
        .more-item:hover .more-item__a {
          color: ${theme.colors.navlinkactive};
        }

        @media (min-width: ${theme.breakpoints.xlUp}) {
          .more-item:nth-child(-n
              + ${theme.switches.navvisibilitycount.xl + 1}) {
            display: none;
          }
        }

        @media (min-width: ${theme.breakpoints.lgUp}) {
          .more-item:nth-child(-n
              + ${theme.switches.navvisibilitycount.lg + 1}) {
            display: none;
          }
        }

        @media (min-width: ${theme.breakpoints.mdUp}) {
          .more-item:nth-child(-n
              + ${theme.switches.navvisibilitycount.md + 1}) {
            display: none;
          }
        }

        @media (max-width: ${theme.breakpoints.smDown}) {
          .more-item {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default MorePopoverItem;
