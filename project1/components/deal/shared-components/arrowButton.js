import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ArrowButton = ({ onClick, orientation }) => {
  const theme = useContext(ThemeContext);

  const getPath = () => {
    if (orientation === 'next')
      return (
        <FontAwesomeIcon
          style={{ height: 28, width: 'auto' }}
          icon={faAngleRight}
        />
      );
    return (
      <FontAwesomeIcon
        style={{ height: 28, width: 'auto' }}
        icon={faAngleLeft}
      />
    );
  };

  const orientationClass =
    orientation && orientation === 'prev' ? 'previous' : 'next';
  const ariaLabel = orientation && orientation === 'prev' ? 'Previous' : 'Next';
  return (
    <div className="arrow-button-wrapper">
      <button
        className={`flickity-button flickity-prev-next-button ${orientationClass}`}
        type="button"
        aria-label={ariaLabel}
        onClick={() => onClick()}
      >
        {getPath()}
      </button>
      <style jsx>{`
        .flickity-prev-next-button.previous {
          border-radius: 0 100% 100% 0;
        }
        .flickity-prev-next-button.next {
          border-radius: 100% 0 0 100%;
        }
        .slider.oval-controls .flickity-prev-next-button {
          padding: 12px;
          background-color: ${theme.colors.arrowbackground};
          opacity: 0.7;
        }

        .flickity-prev-next-button {
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          background-color: ${theme.colors.arrowbackground};
          opacity: 0.4;
          z-index: 3;
        }
        .flickity-prev-next-button.next {
          right: 0px;
        }
        .flickity-prev-next-button.previous {
          left: 0px;
        }
        .flickity-prev-next-button {
          position: absolute;
          top: 50%;
          width: 28px;
          height: 44px;
          border: none;
          background-color: ${theme.colors.arrowbackground};
          opacity: 0.75;
          cursor: pointer;
        }
        button {
          font-family: Arial, Helvetica, Sans-serif;
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .flickity-prev-next-button {
            top: 40%;
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
      <style jsx global>{`
        .arrow-button-wrapper .flickity-button svg {
          color: ${theme.colors.arrowcolor};
          fill: ${theme.colors.arrowcolor};
        }
      `}</style>
    </div>
  );
};

ArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  orientation: PropTypes.string,
};

ArrowButton.defaultProps = {
  orientation: 'prev',
};

export default ArrowButton;
