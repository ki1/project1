import {
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import HeaderNavigationLink from './HeaderNavigationLink';
import More from './More';
import MorePopover from './MorePopover';
import classNames from 'classnames';
import GiftFinder from './GiftFinder';
import { useNavigationSelection } from '../../../helpers/url';
import HeaderNavigationPopover from './HeaderNavigationPopover';
import ReactPlaceholder from 'react-placeholder';
import { getLocationShortName } from '../../../helpers/location';

const HeaderNavigation = ({ site, navigation, ssr, location, path }) => {
  const theme = useContext(ThemeContext);
  const [arrowActive, setArrowActive] = useState({ left: false, right: true });
  const selection = useNavigationSelection(navigation, path);

  const onScroll = (e) => {
    setArrowActive({
      left: e.target.scrollLeft > 0,
      right: e.target.scrollLeft < e.target.scrollWidth - e.target.offsetWidth,
    });
  };

  return (
    <>
      <div className="nav-bar">
        {/* LEFT ARROW */}
        <div
          className={classNames('scroll-arrow', 'scroll-arrow--left', {
            'scroll-arrow--active': arrowActive.left,
          })}
        >
          <FontAwesomeIcon className="arrow-right" icon={faChevronLeft} />
        </div>
        {/* CONTENT */}
        <nav className="container" onScroll={onScroll}>
          <ul className="navigation__list">
            {navigation.length === 0 && <div />}
            {navigation.map((item) => {
              return (
                <HeaderNavigationLink
                  key={item.id}
                  href={item.url}
                  popover={
                    <HeaderNavigationPopover site={site} category={item} />
                  }
                  selected={selection === item.id}
                >
                  {item.isLocal && (
                    <FontAwesomeIcon
                      className="navigation__icon"
                      icon={faMapMarkerAlt}
                    />
                  )}
                  <ReactPlaceholder
                    type="text"
                    rows={1}
                    style={{ width: 90 }}
                    ready={!item.isLocal || (item.isLocal && !ssr)}
                  >
                    {item.linkText}
                  </ReactPlaceholder>
                </HeaderNavigationLink>
              );
            })}

            <More
              popover={<MorePopover site={site} navigation={navigation} />}
            />
          </ul>

          <GiftFinder location={getLocationShortName(location)} />
        </nav>
        {/* RIGHT ARROW */}
        <div
          className={classNames('scroll-arrow', 'scroll-arrow--right', {
            'scroll-arrow--active': arrowActive.right,
          })}
        >
          <FontAwesomeIcon className="arrow-right" icon={faChevronRight} />
        </div>
      </div>

      <style jsx>{`
        .nav-bar {
          position: relative;
          background-color: ${theme.colors.navbackground};
          border-bottom: ${'1px solid' + theme.colors.navborder};
          border-top: ${'1px solid' + theme.colors.navborder};
          display: block;
          z-index: 1001;
        }
        .container {
          position: relative;
          z-index: 100;
          padding: 0 25px;
          display: flex;
        }
        .navigation__list {
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          height: 36px;
          margin: 0;
          padding: 0;
        }
        :global(.navigation__icon) {
          margin-right: 5px;
          position: relative;
          top: -1px;
          height: 14px;
          width: 14px;
        }
        .scroll-arrow {
          position: absolute;
          top: 0;
          height: 36px;
          width: 72px;
          border: none;
          align-items: center;
          z-index: 101;
          color: ${theme.colors.navlinkactive};
          animation-fill-mode: backwards;
          pointer-events: none;
          opacity: 0;
          display: flex;
        }
        .scroll-arrow--left {
          left: 0;
          background-image: linear-gradient(
            to right,
            white 25%,
            rgba(255, 255, 255, 0)
          );
          justify-content: flex-start;
          padding-left: 10px;
        }
        .scroll-arrow--right {
          right: 0;
          background-image: linear-gradient(
            to left,
            white 25%,
            rgba(255, 255, 255, 0)
          );
          justify-content: flex-end;
          padding-right: 10px;
        }
        :global(.arrow-right) {
          height: 16px;
          width: 16px;
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .container {
            padding: 0;
            overflow: auto;
          }
          .scroll-arrow {
            transition: opacity 0.2s;
          }
          .scroll-arrow--active {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderNavigation;
