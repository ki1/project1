import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CarouselThumb from './CarouselThumb';

const CarouselThumbs = ({
  selection,
  deal,
  thumbWidth,
  thumbCount,
  onSelect,
  invert,
}) => {
  const [offset, setOffset] = useState();
  const ref = useRef();

  useEffect(() => {
    if (ref.current && deal.images) {
      const calcLeftOffset = () => {
        const wrapperWidth = ref.current.clientWidth - 6;
        const thumbWidthWithBorder = thumbWidth + 18;
        const widthOfAllThumbs = thumbWidthWithBorder * deal.images.length;
        const thumbsOnPage = Math.floor(wrapperWidth / thumbWidthWithBorder);
        const middle = Math.floor(wrapperWidth / thumbWidthWithBorder / 2);
        const max = widthOfAllThumbs - wrapperWidth;

        if (deal.images.length > thumbsOnPage && selection > middle) {
          const left = (selection - middle) * thumbWidthWithBorder;
          if (left > max) {
            setOffset(max);
          } else {
            setOffset(left);
          }
        } else {
          setOffset(0);
        }
      };
      calcLeftOffset();
      window.addEventListener('resize', calcLeftOffset, { passive: true });
      return () => {
        window.removeEventListener('resize', calcLeftOffset);
      };
    }
  }, [deal.images, selection, thumbWidth]);

  return (
    <>
      <div className="thumbs" ref={ref}>
        <ul className="thumbs__wrapper">
          {deal.images?.map((image, i) => {
            return (
              <CarouselThumb
                key={`thumb_${deal.id}_${i}}`}
                index={i}
                deal={deal}
                image={image}
                thumbWidth={thumbWidth}
                selected={selection === i}
                onSelect={onSelect}
                invert={invert}
              />
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        .thumbs {
          overflow: hidden;
          width: ${thumbCount &&
          (thumbWidth + 18) * thumbCount +
            6 +
            'px'}; // (thumbWidth + thumb padding/margin) * thumbCount + wrapper padding
        }
        .thumbs__wrapper {
          padding: 3px;
          margin: 0;
          white-space: nowrap;
          transition: transform 0.4s;
          transform: translate3d(-${offset}px, 0, 0);
        }
        @media (prefers-reduced-motion) {
          .thumbs__wrapper {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

CarouselThumbs.propTypes = {
  selection: PropTypes.number,
  deal: PropTypes.object,
  thumbWidth: PropTypes.number,
  thumbCount: PropTypes.number,
  onSelect: PropTypes.func,
  invert: PropTypes.bool,
};

CarouselThumbs.defaultProps = {
  selection: 0,
  deal: {},
  thumbWidth: 64,
  thumbCount: undefined,
  onSelect: () => false,
  invert: false,
};

export default CarouselThumbs;
