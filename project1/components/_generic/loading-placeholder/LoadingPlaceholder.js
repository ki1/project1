import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';

const LoadingPlaceholder = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="loading-placeholder">
      <div className="loading-placeholder__outer-container">
        <div className="loading-placeholder__container">
          <div className="loading-placeholder__side">
            <div className="loading-placeholder__box">
              <div className="loading-placeholder__swiper" />
            </div>
            <div className="loading-placeholder__box">
              <div className="loading-placeholder__swiper" />
            </div>
            <div className="loading-placeholder__box">
              <div className="loading-placeholder__swiper" />
            </div>
          </div>
          <div className="loading-placeholder__main">
            <div className="loading-placeholder__box">
              <div className="loading-placeholder__swiper" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .loading-placeholder {
            height: 100px;
            width: 100%;
            position: relative;
          }

          .loading-placeholder__outer-container {
            position: fixed;
            width: 100%;
          }

          .loading-placeholder__container {
            width: 75%;
            margin: auto;
            display: flexbox;
            padding-top: 40px;
          }

          .loading-placeholder__box {
            background-color: #fff;
            width: 100%;
            padding-top: 86%;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            margin: 20px 0;
          }

          .loading-placeholder__swiper {
            background: linear-gradient(
              45deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0) 40%,
              rgba(255, 255, 255, 1) 50%,
              rgba(0, 0, 0, 0) 60%,
              rgba(0, 0, 0, 0) 100%
            );
            animation: ease-in-out 1.5s loading-placeholder__shimmer infinite;
            height: 200%;
            width: 200%;
            top: -10%;
            left: 0;
            position: absolute;
            z-index: 1;
          }

          .loading-placeholder__box:before {
            background-color: #f0f0f0;
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 23%;
          }

          @keyframes loading-placeholder__shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .loading-placeholder__box:after {
            background-color: #f0f0f0;
            content: '';
            display: block;
            position: absolute;
            top: 82%;
            left: 70%;
            right: 5%;
            bottom: 5%;
            border-radius: 40px;
          }

          .loading-placeholder__main {
            display: none;
          }

          .loading-placeholder__side {
            width: 100%;
          }

          @media (min-width: ${theme.breakpoints.mdUp}) {
            .loading-placeholder__container {
              max-width: 1110px;
            }

            .loading-placeholder__main {
              width: 70%;
              padding: 0 12px;
              display: block;
            }

            .loading-placeholder__side {
              width: 30%;
              padding: 0 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPlaceholder;
