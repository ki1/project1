import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ badgeContent, badgeColor, isAriaHidden = false }) => {
  return (
    <>
      <span
        className="badge"
        badge-color={badgeColor}
        aria-hidden={isAriaHidden}
      >
        {badgeContent}
      </span>
      <style jsx>{`
        .badge {
          color: #fff;
          background-color: ${badgeColor};
          display: inline-block;
          padding: 2px;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          min-width: 12px;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default Badge;

Badge.propTypes = {
  badgeContent: PropTypes.string.isRequired,
  badgeColor: PropTypes.string.isRequired,
  isAriaHidden: PropTypes.bool,
};
