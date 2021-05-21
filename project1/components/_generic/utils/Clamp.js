import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Clamp = ({ lines, children, className }) => {
  return (
    <>
      <div className={classNames('clamp', className)}>{children}</div>
      <style jsx>{`
        .clamp {
          display: -webkit-box;
          -webkit-line-clamp: ${lines};
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

Clamp.propTypes = {
  lines: PropTypes.number,
};

Clamp.defaultProps = {
  lines: 4,
};

export default Clamp;
