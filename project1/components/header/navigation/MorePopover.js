import React, { useContext } from 'react';
import { MORE_POPOVER_LINKS } from '../../../config/links/links';
import { MORE_CATEGORIES, MORE_OPTIONS } from '../../../config/text/text';
import ThemeContext from '../../../providers/ThemeProvider';
import DownloadAppLinks from '../../footer/DownloadAppLinks';
import MorePopoverItem from './MorePopoverItem';

const MorePopover = ({ site, navigation }) => {
  const links = MORE_POPOVER_LINKS[site];
  const theme = useContext(ThemeContext);

  return (
    <>
      <ul className="navigation-more__list">
        <h3 className="navigation-more__header">{MORE_CATEGORIES}</h3>
        {navigation?.map((item) => {
          return (
            <MorePopoverItem key={item.id} href={item.url}>
              {item.linkText}
            </MorePopoverItem>
          );
        })}
        <h3 className="navigation-more__header">{MORE_OPTIONS}</h3>
        {links.map((link) => {
          return (
            <MorePopoverItem key={link.href} href={link.href}>
              {link.text}
            </MorePopoverItem>
          );
        })}
        <DownloadAppLinks site={site} inline={true} />
      </ul>

      <style jsx>{`
        @keyframes popover-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .navigation-more__list {
          padding: 10px;
          list-style: none;
          display: block;
          position: absolute;
          top: 100%;
          right: 0;
          width: 300px;
          border: 1px solid #aaaaaa;
          border-radius: 4px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
          background-color: white;
          animation-fill-mode: backwards;
          animation: popover-in 0.2s;
        }
        .navigation-more__header {
          color: ${theme.colors.navmoreheader};
          font-size: ${theme.text.navigation.size}px;
          text-transform: ${theme.text.navigation.transform};
          font-weight: bold;
          margin: 10px 0;
        }
        .navigation-more__header:first-child {
          margin-top: 0;
        }
      `}</style>
    </>
  );
};

export default MorePopover;
