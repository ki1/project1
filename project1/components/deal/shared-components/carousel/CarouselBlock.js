import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../../providers/ThemeProvider';
import { Carousel } from 'react-responsive-carousel';
import CarouselImageBlock from './CarouselImageBlock';
import CarouselVideo from './CarouselVideo';
import CarouselArrow from './CarouselArrow';
import CarouselThumbs from './CarouselThumbs';
import { useRouter } from 'next/router';
import { getUrlFromDeal } from '../../../../helpers/deals';
import { updateDod } from '../../../../helpers/analytics';

const CarouselBlock = ({
  deal = {},
  showImageOverlays = false,
  showControls = false,
  showScrim = false,
  thumbWidth = 64,
  onClick,
  thumbCount,
  isClosed = false,
  single = false,
  invert = false,
  carouselType = 'horizontalScroller',
  disableClickAction = false,
  lazy = true,
  href = null,
  showSingle = false,
}) => {
  if (Object.keys(deal).length === 0) return null;

  const theme = useContext(ThemeContext);
  const [currentImage, setCurrentImage] = useState(0);
  const hasVideo = deal.video && deal.video.videoUrl;
  const router = useRouter();
  const first = deal.images ? deal.images[0] : {};

  const dealUrl =
    href ||
    getUrlFromDeal({
      deal,
      originPath: router.asPath,
    });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    carouselType = `${carouselType}position`;
    updateDod({ carouselType: currentImage });
  }, [currentImage]);

  const renderCarouselWrapper = (items) => (
    <>
      <Carousel
        infiniteLoop
        className="wow-carousel"
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <CarouselArrow
            onClickHandler={onClickHandler}
            label={label}
            orientation="prev"
          />
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <CarouselArrow
            onClickHandler={onClickHandler}
            label={label}
            orientation="next"
          />
        )}
        showStatus={false}
        autoPlay={false}
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
        showIndicators={!hasVideo}
        selectedItem={currentImage}
        onChange={(i) => setCurrentImage(i)}
        renderIndicator={(_, isSelected) => (
          <div className={`dot ${isSelected ? 'selected' : ''}`} />
        )}
      >
        {items}
      </Carousel>
      <CarouselThumbs
        selection={currentImage}
        deal={deal}
        thumbWidth={thumbWidth}
        thumbCount={thumbCount}
        onSelect={(i) => setCurrentImage(i)}
        invert={invert}
      />
      <style jsx global>{`
        .wow-carousel .carousel .control-dots .dot {
          opacity: 1;
          box-shadow: none;
          border: 2px solid ${theme.colors.primary};
          margin: 0 3px;
          cursor: default;
        }
        .wow-carousel .dot.selected {
          background-color: ${theme.colors.primary};
        }
        @media (prefers-reduced-motion) {
          .wow-carousel .slider {
            transition: none;
          }
        }

        @media (max-width: ${theme.breakpoints.smDown}) {
          .wow-carousel .carousel .control-dots {
            bottom: -10px;
          }
        }
      `}</style>
    </>
  );

  const renderImages = (items) =>
    items.map((image, index) =>
      index === 0 && hasVideo ? (
        <CarouselVideo
          key={image.id}
          deal={deal}
          showControls={showControls}
          showScrim={showScrim}
          isClosed={isClosed}
          href={dealUrl}
        />
      ) : (
        <CarouselImageBlock
          key={image.id}
          currentImage={currentImage}
          thumbCount={thumbCount}
          thumbWidth={thumbWidth}
          setCurrentImage={setCurrentImage}
          invert={invert}
          image={image}
          index={index}
          items={items}
          deal={deal}
          dealUrl={dealUrl}
          onClick={onClick}
          showImageOverlays={showImageOverlays}
          showScrim={showScrim}
          showSingle={showSingle}
          disableClickAction={disableClickAction}
          lazy={lazy}
        />
      )
    );

  return deal.images?.length > 1 && !single
    ? renderCarouselWrapper(renderImages(deal.images))
    : renderImages([first]);
};

CarouselBlock.propTypes = {
  deal: PropTypes.object,
  showImageOverlays: PropTypes.bool,
  showControls: PropTypes.bool,
  showScrim: PropTypes.bool,
  showSingle: PropTypes.bool,
  thumbWidth: PropTypes.number,
  thumbCount: PropTypes.number,
  isClosed: PropTypes.bool,
  single: PropTypes.bool,
  invert: PropTypes.bool,
  onClick: PropTypes.func,
  disableClickAction: PropTypes.bool,
  lazy: PropTypes.bool,
  href: PropTypes.string,
};

export default CarouselBlock;
