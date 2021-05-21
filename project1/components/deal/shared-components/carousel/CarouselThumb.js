import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  replaceImageServer,
  usePlaceholderImage,
} from '../../../../helpers/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../../../../providers/ThemeProvider';
import classNames from 'classnames';
import {
  DEFAULT_DEAL_IMG_HEIGHT_THUMB,
  DEFAULT_DEAL_IMG_WIDTH_THUMB,
} from '../../../../config/setup/setup';

const CarouselThumb = ({
  index,
  deal,
  image,
  selected,
  thumbWidth,
  onSelect,
  invert,
}) => {
  const theme = useContext(ThemeContext);
  const hidePlayIcon = index || !deal || !deal.video || !deal.video.videoUrl;

  return (
    <>
      <li className={classNames('thumb', { 'thumb--selected': selected })}>
        <button className="thumb__button" onClick={() => onSelect(index)}>
          {!hidePlayIcon && (
            <FontAwesomeIcon
              style={{ height: 20, width: 20 }}
              icon={faPlayCircle}
            />
          )}
          <img
            loading="lazy"
            className="thumb__image"
            src={replaceImageServer(
              deal.id,
              image,
              DEFAULT_DEAL_IMG_WIDTH_THUMB,
              DEFAULT_DEAL_IMG_HEIGHT_THUMB
            )}
            alt={image.alt}
            onError={usePlaceholderImage}
          />
        </button>
      </li>
      <style jsx>{`
        .thumb {
          position: relative;
          display: inline-block;
          cursor: pointer;
          margin: 0 3px;
        }
        .thumb__button {
          padding: 3px;
          border: 3px solid transparent;
          transition: border 0.1s;
          background-color: transparent;
        }
        .thumb--selected .thumb__button,
        .thumb__button:hover,
        .thumb__button:focus {
          border: 3px solid ${invert ? '#ffffff' : theme.colors.primary};
          outline: none;
        }
        .thumb__image {
          width: ${thumbWidth}px;
        }
        :global(.thumb svg) {
          color: ${theme.colors.dealvideoicon};
          filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
          position: absolute;
          top: 9px;
          left: 9px;
        }
        @media (prefers-reduced-motion) {
          .thumb__button {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

CarouselThumb.propTypes = {
  index: PropTypes.number,
  deal: PropTypes.object,
  image: PropTypes.object,
  selected: PropTypes.bool,
  thumbWidth: PropTypes.number,
  onSelect: PropTypes.func,
  invert: PropTypes.bool,
};

CarouselThumb.defaultProps = {
  index: 0,
  deal: {},
  image: {},
  selected: false,
  thumbWidth: 64,
  onSelect: () => false,
  invert: false,
};

export default CarouselThumb;
