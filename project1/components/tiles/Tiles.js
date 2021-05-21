import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ThemeContext from '../../providers/ThemeProvider';
import Link from 'next/link';
import { usePlaceholderImage } from '../../helpers/image';

const Tiles = () => {
  const [tiles] = useSelector((state) => [state.tiles.tiles]);
  const theme = useContext(ThemeContext);
  if (!tiles || tiles?.length === 0) return null;
  return (
    <>
      <div id="giftingtilesContainer" className="tiles">
        {tiles.map((tile, index) => {
          if (index > 4) return;
          return (
            <div key={index} className="tile__item">
              <Link href={tile.linkUrl}>
                <a>
                  <picture>
                    <source
                      srcSet={tile.desktopImgUrl}
                      media={`(min-width: ${theme.breakpoints.mdUp})`}
                    />
                    <img
                      className="tile__image"
                      src={tile.mobileImgUrl}
                      alt={tile.name}
                      onError={usePlaceholderImage}
                    />
                  </picture>
                </a>
              </Link>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .tiles {
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          margin: 0 -5px;
          width: 100%;
        }
        @media (min-width: ${theme.breakpoints.smUp}) {
          .tiles {
            margin: 20px -5px;
          }
        }
        .tile__item {
          flex-basis: 0px;
          flex-grow: 1;
          margin: 2px;
          text-align: center;
        }
        @media (min-width: ${theme.breakpoints.smUp}) {
          .tile__item {
            margin: 0 5px;
          }
        }
        .tile__image {
          max-width: 100%;
          max-height: 153px;
        }
        @media (min-width: ${theme.breakpoints.smUp}) {
          .tile__image {
            max-height: 265px;
          }
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .tile__image {
            max-height: 270px;
          }
        }
      `}</style>
    </>
  );
};

export default Tiles;
