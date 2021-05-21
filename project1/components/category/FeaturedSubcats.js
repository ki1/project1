import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import FeaturedSubcat from './FeaturedSubcat';
import Slider from 'react-slick';
import { generateUEID } from '../../helpers/generateID';

const FeaturedSubcats = ({ navigations }) => {
  const theme = useContext(ThemeContext);
  const primaryColorUrlencoded = encodeURIComponent(theme.colors.primary);
  const settings = {
    arrows: true,
    dots: false,
    infinite: false, // true doesn't work
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <>
      {navigations && navigations.length > 0 && (
        <>
          <div key={generateUEID()}>
            <Slider {...settings}>
              {navigations.map((subcat) => {
                return (
                  <FeaturedSubcat subcat={subcat} key={subcat.shortName} />
                );
              })}
            </Slider>
          </div>
        </>
      )}

      <style jsx global>{`
        .featured-subcategory__heading {
          color: ${theme.colors.headingtext};
          display: none;
          font-size: 16px;
        }
        @media only screen and (min-width: ${theme.breakpoints.mdUp}) {
          .featured-subcategory__heading {
            display: block;
            font-size: 22px;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.xlUp}) {
          .featured-subcategory__heading {
            display: block;
            font-size: 26px;
          }
        }
      `}</style>
      <style jsx global>{`
        .slick-list {
          padding-top: 2px;
          z-index: 9;
        }
        .slick-next,
        .slick-prev {
          z-index: 10;
        }
        .slick-next {
          right: -4px;
        }
        .slick-prev {
          left: 0px;
        }
        @media only screen and (min-width: ${theme.breakpoints.mdUp}) {
          .slick-next,
          .slick-prev {
            top: 118px;
          }
        }
        @media only screen and (min-width: ${theme.breakpoints.lgUp}) {
          .slick-next,
          .slick-prev {
            top: 156px;
          }
        }
        .slick-next:before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3Cpath fill='${primaryColorUrlencoded}' d='M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
        }
        .slick-prev:before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3Cpath fill='${primaryColorUrlencoded}' d='M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
        }
        .slick-next:before,
        .slick-prev:before {
          content: '';
          font-size: 15px;
          padding: 10px;
          height: 40px;
          width: 30px;
        }
      `}</style>
    </>
  );
};

export default FeaturedSubcats;

FeaturedSubcats.propTypes = {
  navigations: PropTypes.array.isRequired,
};
