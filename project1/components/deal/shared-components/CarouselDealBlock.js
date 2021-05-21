import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import CarouselArrow from './carousel/CarouselArrow';
import SecondaryDeal from '../secondaryDeal';
import ThemeContext from '../../../providers/ThemeProvider';

const CarouselDealBlock = ({ deals }) => {
  const theme = useContext(ThemeContext);

  if (deals.length === 0) {
    return null;
  }

  return (
    <>
      <Carousel
        infiniteLoop
        className="carousel-deal"
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
        autoPlay={true}
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
        showIndicators={false}
      >
        {deals.map((deal) => {
          return (
            <SecondaryDeal
              deal={deal}
              key={deal.id}
              extraclasses="full-width small-deal card no-card"
              isXS
              hasSocialCueTop={false}
            />
          );
        })}
      </Carousel>
      <style jsx global>{`
        .carousel-deal {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 5px ${theme.colors.dropshadow};
          padding: 0;
          /* fix for safari rounded overflow hidden bug https://stackoverflow.com/a/16681137 */
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }
        .carousel-deal :global(.carousel .slide) {
          background: transparent;
        }
        .carousel-deal :global(.flickity-prev-next-button) {
          top: 70%;
        }
        @media (max-width: ${theme.breakpoints.smDown}) {
          .carousel-deal {
            border-radius: 0;
            box-shadow: none;
          }
          .carousel-deal :global(.flickity-prev-next-button) {
            top: 50%;
          }
        }
        .carousel-deal :global(.deal-image__container) {
          position: static;
        }
      `}</style>
    </>
  );
};

CarouselDealBlock.propTypes = {
  deal: PropTypes.object,
};

CarouselDealBlock.defaultProps = {
  deal: {},
};
export default CarouselDealBlock;
