import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PLEASE_WAIT } from '../../../config/text/text';

const Spinner = ({ hasMsg, msgText, isFullSceen }) => {
  return (
    <>
      <div className="animate--fade-toggle animate__speed--fast animate">
        <div
          className={classNames({
            'loader-container': true,
            'loader-container--is-full-screen': isFullSceen,
          })}
        >
          <div className="loader"></div>
          {hasMsg && (
            <div className="message">
              <em>{msgText}</em>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .animate__speed--fast {
          transition-duration: 0.12s;
        }

        .animate {
          transition-property: all;
          transition-duration: 0.3s;
          transition-timing-function: ease-in-out;
        }

        .loader-container {
          position: absolute;
          z-index: 2000;
          padding: 0;
          min-height: 160px;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
          background: hsla(0, 0%, 100%, 0.8);
          text-align: center;
        }

        .loader-container--is-full-screen {
          position: fixed;
        }

        .loader-container .loader,
        .loader-container .loader:after {
          border-radius: 50%;
          width: 10em;
          height: 10em;
        }

        .loader-container .loader {
          display: inline-block;
          font-size: 10px;
          position: relative;
          text-indent: -9999em;
          border: 1.1em solid rgba(27, 148, 228, 0.3);
          border-left-color: #1b94e4;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-animation: load8 1.1s linear infinite;
          animation: load8 1.1s linear infinite;
        }

        .loader-container .message {
          font-size: rem(16);
          margin-top: 15px;
          padding: 0 60px;
        }
        @-webkit-keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
          }
        }
        @keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
          }
        }
      `}</style>
    </>
  );
};

Spinner.propTypes = {
  hasMsg: PropTypes.bool,
  msgText: PropTypes.string,
  isFullSceen: PropTypes.bool,
};

Spinner.defaultProps = {
  hasMsg: true,
  msgText: PLEASE_WAIT,
  isFullSceen: false,
};

export default Spinner;
