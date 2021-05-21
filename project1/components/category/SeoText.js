import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../providers/ThemeProvider';
import ReactPlaceholder from 'react-placeholder';

const SeoText = ({ text, title }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <div className="seo-container">
        <h1 className="seo-title">
          <ReactPlaceholder
            type="text"
            rows={1}
            style={{ width: 90 }}
            ready={title}
          >
            {title}
          </ReactPlaceholder>
        </h1>
        <div className="seo-text">
          <ReactPlaceholder type="text" rows={6} ready={text}>
            {text}
          </ReactPlaceholder>
        </div>
      </div>
      <style jsx>{`
        .seo-container {
          position: relative;
        }
        .seo-title {
          color: ${theme.colors.headingtext};
          font-size: 22px;
          line-height: 22px;
          margin-bottom: 10px;
          padding: 16px 16px 0px 16px;
          text-align: left;
          text-transform: capitalize;
        }
        .seo-text {
          color: ${theme.colors.bodytext};
          font-size: 11px;
          margin-bottom: 15px;
          padding: 0px 16px;
          text-align: left;
          line-height: 1.3em;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .seo-title {
            font-size: 26px;
            line-height: 26px;
            padding: 15px 15px 0px 15px;
          }
          .seo-text {
            font-size: 16px;
            margin-bottom: 15px;
            padding: 0px 15px;
          }
        }
        @media (min-width: ${theme.breakpoints.xlUp}) {
          .seo-text {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default SeoText;

SeoText.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
