import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GO_TO_DEAL, SHOP_ALL_DEALS } from '../../config/text/text';
import { Carousel } from 'react-responsive-carousel';
import ArrowButton from '../deal/shared-components/arrowButton';
import ThemeContext from '../../providers/ThemeProvider';
import DealPriceSplat from '../deal/shared-components/dealPriceSplat';
import {
  getCountFromBreakpoint,
  useMerchandisingModuleConfig,
  usePages,
} from '../../helpers/merchandising-module';
import { useScreenBreakpoint } from '../../helpers/screen';
import CarouselImage from '../deal/shared-components/carousel/CarouselImage';
import PrimaryButton from '../_generic/button/PrimaryButton';
import Link from 'next/link';
import { trackEvent } from '../../helpers/analytics';

/**
 *
 * @param {object} props
 * @param {string} props.path       the page we're on
 * @param {number} props.position   the position on the page **starting from 1**
 */
const MerchandisingModule = ({ path, position }) => {
  const theme = useContext(ThemeContext);

  const {
    header,
    subHeader,
    ctaLabel,
    ctaLink,
    backgroundImage,
    deals,
  } = useMerchandisingModuleConfig(path, position);
  const breakpoint = useScreenBreakpoint();
  const count = getCountFromBreakpoint(breakpoint);
  const pages = usePages(deals, count);

  // only show if we have at least 1 full page of deals
  if (pages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="module container__wrapper">
        <div className="container module__content">
          <div className="module__header">
            <div className="module__header-text">
              <h2 className="module__title">{header}</h2>
              <p className="module__subtitle">{subHeader}</p>
            </div>
            <div>
              <a href={ctaLink}>
                <PrimaryButton aria-label={SHOP_ALL_DEALS(header)}>
                  {ctaLabel}
                </PrimaryButton>
              </a>
            </div>
          </div>
          <Carousel
            infiniteLoop
            centerMode={count === 1}
            swipeable={count === 1}
            emulateTouch={count === 1}
            className="module__deals"
            renderIndicator={null}
            renderThumbs={() => null}
            showStatus={false}
            renderArrowNext={(onClick) => {
              if (pages.length === 1) {
                return null;
              } else {
                return (
                  <ArrowButton
                    orientation="next"
                    onClick={() => {
                      trackEvent('horizontal_scroll_arrow_click');
                      onClick();
                    }}
                  />
                );
              }
            }}
            renderArrowPrev={(onClick) => {
              if (pages.length === 1) {
                return null;
              } else {
                return (
                  <ArrowButton
                    orientation="prev"
                    onClick={() => {
                      trackEvent('horizontal_scroll_arrow_click');
                      onClick();
                    }}
                  />
                );
              }
            }}
          >
            {pages.map((page, i) => {
              return (
                <div className="module__page" key={`mofdule-page-${i}`}>
                  {page.map((deal) => {
                    const urlPath = deal.urlPath || deal.shareUrl || '#';

                    return (
                      <div
                        key={deal.id}
                        className="deal"
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: 10,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ position: 'relative' }}>
                          <CarouselImage
                            deal={deal}
                            image={deal.images[0]}
                            showScrim={false}
                            load={true}
                            href={urlPath}
                          />
                          <DealPriceSplat discount={true} deal={deal} />
                        </div>
                        <div
                          className="deal-info"
                          style={{
                            padding: 12,
                            textAlign: 'left',
                          }}
                        >
                          <Link href={urlPath}>
                            <a
                              className="title"
                              role="button"
                              aria-label={GO_TO_DEAL.replace(
                                '##DEAL##',
                                deal.headline
                              )}
                            >
                              <h3 style={{ margin: 0 }}>{deal.headline}</h3>
                            </a>
                          </Link>
                          {deal.display &&
                            deal.display.bought &&
                            deal.totalBought > 0 && (
                              <p className="bought-count">
                                {deal.totalBought} {deal.soldText}
                              </p>
                            )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
      <style jsx>{`
        .module {
          position: relative;
          background-color: rgb(50, 50, 50);
          background-image: url(${backgroundImage});
          background-size: cover;
          background-position: 50% 50%;
          margin-top: 20px;
        }
        .module a {
          text-decoration: none;
        }
        .module__header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 20px 0 0 0;
          width: 100%;
          z-index: 1;
          color: #ffffff;
        }
        .module__title {
          font-size: 25px;
          font-weight: normal;
          margin-bottom: 9px;
          line-height: 1em;
        }
        .module__subtitle {
          font-size: 14px;
          font-weight: normal;
          margin-bottom: 0px;
          line-height: 1em;
        }
        .cta-button {
          height: 40px;
          width: 180px;
          border-radius: 20px;
          background-color: #0000eb;
          color: #ffffff;
          border: none;
          font-weight: bold;
          font-size: 16px;
        }
        .bought-count {
          display: none;
          color: ${theme.colors.primary};
          font-weight: bold;
          margin-bottom: 0;
        }
        .module .deal {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        :global(.module__deals) {
          width: 100%;
        }
        :global(.module .slide) {
          padding: 20px 0px 29px 0px;
          background-color: transparent;
        }
        :global(.module .card) {
          width: 100% !important;
        }
        :global(.module__page) {
          display: grid !important;
          grid-template-columns: repeat(${count}, 1fr);
          grid-gap: 20px;
          height: 100%;
        }
        :global(.module .deal-info) {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        :global(.module .title) {
          font-size: 12px;
          color: #000000;
        }
        :global(.module .flickity-button) {
          background-color: white;
          top: 36%;
        }
        :global(.module .flickity-button svg) {
          color: ${theme.colors.primary};
        }
        @media only screen and (max-width: ${theme.breakpoints.xlDown}) {
          .module__content {
            width: 666px;
            padding: 0;
          }
        }
        @media only screen and (max-width: ${theme.breakpoints.mdDown}) {
          .module__content {
            width: 100%;
            max-width: 100%;
          }
          .module__header {
            flex-direction: column;
            text-align: center;
          }
          .module__header-text {
            margin-bottom: 20px;
          }
          .bought-count {
            display: block;
          }
          :global(.module .slide) {
            padding: 20px 10px 29px 10px;
            background-color: transparent;
          }
        }
        @media only screen and (max-width: ${theme.breakpoints.smDown}) {
          .module {
            margin-top: 5px;
          }
        }
      `}</style>
    </>
  );
};

export default MerchandisingModule;

MerchandisingModule.propTypes = {
  path: PropTypes.string,
  position: PropTypes.number,
};
