import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThemeContext from '../providers/ThemeProvider';
import PropTypes from 'prop-types';

import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const Icon = ({ faIcon, size, color }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <span className="icon-container">
        <FontAwesomeIcon icon={faIcon} />
      </span>
      <style jsx>{`
        .icon-container {
          color: ${color || theme.colors.primary};
          font-size: ${size || '17px'};
          margin: 0 auto;
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .icon-container {
            font-size: calc(((${size || '17px'}) * 2.5) / 2);
          }
        }
      `}</style>
    </>
  );
};

export default Icon;

Icon.propTypes = {
  faIcon: PropTypes.object.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};
