import React from 'react';
import PropTypes from 'prop-types';

const ImageOverlays = ({ show, image }) => {
  if (!show || !image || !image.imageOverlays) return null;

  const { left, right } = image.imageOverlays.reduce(
    (out, overlay) => {
      if (overlay.brand === (process.env.NEXT_PUBLIC_BRAND || 'wowcher')) {
        if (overlay.position === 'LEFT') {
          out.left.push(overlay);
        }
        if (overlay.position === 'RIGHT') {
          out.right.push(overlay);
        }
      }
      return out;
    },
    { left: [], right: [] }
  );

  return (
    <>
      <div className="image-overlays">
        <div className="image-overlays__content image-overlays__content--left">
          {left.map((binary, i) => {
            return (
              <img
                loading="lazy"
                className="image-overlays__image"
                key={`binary-left-${binary.url}-${i}`}
                src={binary.url}
                alt=""
              />
            );
          })}
        </div>
        <div className="image-overlays__content image-overlays__content--right">
          {right.map((binary, i) => {
            return (
              <img
                loading="lazy"
                className="image-overlays__image"
                key={`binary-right-${binary.url}-${i}`}
                src={binary.url}
                alt=""
              />
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .image-overlays {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        .image-overlays__content {
          position: absolute;
          top: 0;
          width: 45%;
          padding-top: 12%;
        }
        .image-overlays__content--left {
          left: 0;
        }
        .image-overlays__content--right {
          right: 0;
        }
        .image-overlays__image {
          max-width: 100%;
          height: auto !important;
        }
      `}</style>
    </>
  );
};

ImageOverlays.propTypes = {
  show: PropTypes.bool,
  image: PropTypes.object,
};

ImageOverlays.defaultProps = {
  show: false,
  image: {},
};

export default ImageOverlays;
