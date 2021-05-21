import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../providers/ThemeProvider';

const emptyDeal = ({ extraClasses }) => {
  const theme = useContext(ThemeContext);
  return (
    <div className={`emptydeal ${extraClasses}`}>
      <style jsx>{`
        .emptydeal {
          margin: 0;
          padding: 0;
          border-radius: 10px;
          width: 100%;
          height: 100%;
          background-color: ${theme.colors.emptydeal};
        }
        .small-deal {
          width: 350px;
          height: 306px;
        }
        @media (max-width: ${theme.breakpoints.mdUp}) {
          .emptydeal {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

emptyDeal.propTypes = {
  extraClasses: PropTypes.string,
};

emptyDeal.defaultProps = {
  extraClasses: '',
};

export default emptyDeal;
