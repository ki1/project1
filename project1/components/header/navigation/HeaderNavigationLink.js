import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import classNames from 'classnames';

/**
 * A generic link element for the navgation bar with option popover
 * Items are hidden based on the screen width via CSS media queries.
 */
const HeaderNavigationLink = ({ children, href, popover, selected }) => {
  const theme = useContext(ThemeContext);
  const [mouseInside, setMouseInside] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // slight delay to avoid accidental triggering
    const timer = setTimeout(() => {
      setOpen(mouseInside);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [mouseInside]);

  return (
    <>
      <li
        className={classNames('navigation-item', {
          'navigation-item--selected': selected,
        })}
        onMouseEnter={() => setMouseInside(true)}
        onMouseLeave={() => setMouseInside(false)}
      >
        <a href={href} className="navigation-link">
          {children}
        </a>
        {open && popover && <div className="popover-animation">{popover}</div>}
      </li>
      <style jsx>{`
        @keyframes popover-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .navigation-item {
          list-style: none;
          align-items: center;
          display: none;
          border-top: 2px solid transparent;
          border-bottom: 2px solid transparent;
        }
        .navigation-item--selected {
          border-bottom: 2px solid ${theme.colors.navlinkactive};
        }
        .navigation-item--selected .navigation-link {
          color: ${theme.colors.navlinkactive};
        }
        .navigation-link {
          height: 100%;
          color: ${theme.colors.navlink};
          padding: 0 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: ${theme.text.navigation.transform};
          text-decoration: none;
          font-size: ${theme.text.navigation.size}px;
          white-space: nowrap;
        }
        .navigation-link:hover {
          color: ${theme.colors.navlinkactive};
        }
        .popover-animation {
          animation-fill-mode: backwards;
          animation: popover-in 0.2s;
        }

        @media (min-width: ${theme.breakpoints.xlUp}) {
          .navigation-item:nth-child(-n
              + ${theme.switches.navvisibilitycount.xl}) {
            display: flex;
          }
        }

        @media (min-width: ${theme.breakpoints.lgUp}) {
          .navigation-item:nth-child(-n
              + ${theme.switches.navvisibilitycount.lg}) {
            display: flex;
          }
        }

        @media (min-width: ${theme.breakpoints.mdUp}) {
          .navigation-item:nth-child(-n
              + ${theme.switches.navvisibilitycount.md}) {
            display: flex;
          }
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .navigation-item {
            display: flex;
          }
          .navigation-link {
            padding: 0 15px;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderNavigationLink;
