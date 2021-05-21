import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import { LINK_GIFT_FINDER } from '../../../config/links/links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { GIFT_FINDER } from '../../../config/text/text';

const GiftFinder = ({ location }) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <div className="gift-finder">
        <a href={LINK_GIFT_FINDER(location)} className="gift-finder__link">
          <FontAwesomeIcon className="navigation__icon" icon={faGift} />
          <span>{GIFT_FINDER}</span>
        </a>
      </div>
      <style jsx>{`
        .gift-finder {
          display: flex;
        }
        .gift-finder__link {
          height: 100%;
          padding: 2px 5px 0 5px;
          border-bottom: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: ${theme.text.navigation.transform};
          text-decoration: none;
          font-size: ${theme.text.navigation.size}px;
          white-space: nowrap;
          color: ${theme.colors.headergiftfindertext};
          background-color: ${theme.colors.headergiftfinderbackground};
          padding: 2px 10px 0 10px;
        }
      `}</style>
    </>
  );
};

export default GiftFinder;
