import React from 'react';
import PropTypes from 'prop-types';
import CarouselImage from './CarouselImage';
import CarouselThumbs from './CarouselThumbs';

const CarouselImageBlock = ({
  currentImage,
  thumbCount,
  thumbWidth,
  setCurrentImage,
  invert,
  image,
  index,
  items,
  deal,
  dealUrl,
  onClick,
  showImageOverlays,
  showScrim,
  showSingle,
  disableClickAction,
  lazy,
}) => (
  <>
    <CarouselImage
      key={image.id || index}
      deal={deal}
      image={image}
      onClick={onClick}
      disableClickAction={disableClickAction}
      showImageOverlays={showImageOverlays}
      showScrim={showScrim}
      lazy={lazy}
      href={dealUrl}
      load={
        currentImage === index ||
        currentImage === index + 1 ||
        currentImage === index - 1 ||
        (currentImage === 0 && index === items.length - 1)
      }
    />
    {showSingle && (
      <CarouselThumbs
        selection={currentImage}
        deal={deal}
        thumbWidth={thumbWidth}
        thumbCount={thumbCount}
        onSelect={(i) => setCurrentImage(i)}
        invert={invert}
      />
    )}
  </>
);

CarouselImageBlock.propTypes = {
  currentImage: PropTypes.number,
  thumbCount: PropTypes.number,
  thumbWidth: PropTypes.number,
  setCurrentImage: PropTypes.func,
  invert: PropTypes.bool,
  image: PropTypes.object,
  index: PropTypes.number,
  items: PropTypes.array,
  deal: PropTypes.object,
  dealUrl: PropTypes.string,
  onClick: PropTypes.func,
  showImageOverlays: PropTypes.bool,
  showScrim: PropTypes.bool,
  showSingle: PropTypes.bool,
  disableClickAction: PropTypes.bool,
  lazy: PropTypes.bool,
};

export default CarouselImageBlock;
