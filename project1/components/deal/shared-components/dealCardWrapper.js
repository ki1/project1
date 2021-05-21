import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ThemeContext from '../../../providers/ThemeProvider';

const DealCardWrapper = ({ children, className }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={classNames('card', className)}>
      {children}
      <style jsx>{`
        .card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 0;
          text-align: left;
          border-radius: 10px;
          overflow: hidden;
          background-color: ${theme.colors.dealbackgroundcolor};
          box-shadow: 0 2px 5px ${theme.colors.dropshadow};
          /* fix for safari rounded overflow hidden bug https://stackoverflow.com/a/16681137 */
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        .card:hover,
        .card:focus,
        .card:active {
          curser: pointer;
        }

        .card.margin {
          margin-bottom: 20px;
        }

        .card.no-card {
          border-radius: 0;
          box-shadow: none;
          overflow: visible;
        }

        @media (max-width: ${theme.breakpoints.smDown}) {
          .card {
            width: 100%;
            border-radius: 0;
            box-shadow: none;
            margin-bottom: 5px;
          }
          .card.margin {
            margin-bottom: 5px;
          }
        }
      `}</style>
    </div>
  );
};

DealCardWrapper.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default DealCardWrapper;
