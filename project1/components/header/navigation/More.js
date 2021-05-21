import React, { useContext, useState } from 'react';
import { MORE } from '../../../config/text/text';
import ThemeContext from '../../../providers/ThemeProvider';

const More = ({ popover }) => {
  const theme = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <li
        className="navigation-item"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className="more">
          {MORE}
          <span className="more__plus"> +</span>
        </button>
        {open && popover}
      </li>
      <style jsx>{`
        .navigation-item {
          list-style: none;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .more {
          height: calc(100% - 10px);
          color: ${theme.colors.navlink};
          background-color: ${theme.colors.navmorebackground};
          padding: 2px 10px 0 10px;
          border-bottom: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: ${theme.text.navigation.transform};
          text-decoration: none;
          font-size: ${theme.text.navigation.size}px;
          white-space: nowrap;
          font-weight: bold;
          border-radius: 4px;
          border: none;
        }
        .navigation-item:hover .more {
          color: ${theme.colors.navlinkactive};
        }
        .more__plus {
          position: relative;
          top: -1px;
          white-space: pre;
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .more {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default More;
