import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../../helpers/currency';
import { POSTAGE_AND_PACKAGING_SHORT } from '../../../config/text/text';
import classNames from 'classnames';
import ThemeContext from '../../../providers/ThemeProvider';

const PostageAndPackagingText = ({ show, deal, className, isSmall }) => {
  const theme = useContext(ThemeContext);

  if (!show || !deal.minPostagePrice) {
    return null;
  }

  return (
    <>
      <p
        className={classNames(`pp-text`, className, {
          'pp-text--small': isSmall,
        })}
      >
        {`${deal.postagePriceText || '+'} ${formatCurrency(
          deal.currency,
          deal.minPostagePrice,
          true,
          false
        )} `}
        <span className="pp-text__pp">{POSTAGE_AND_PACKAGING_SHORT}</span>
      </p>
      <style jsx>{`
        .pp-text {
          line-height: 1em;
          font-size: 12px;
          color: #777777;
          margin: 2px 0 0 0;
          font-size: 10px;
        }
        .pp-text__pp {
          font-size: 8px;
        }
        .pp-text.inline {
          display: inline;
        }
        .pp-text.invert {
          color: white;
        }
        .pp-text.margin {
          margin-bottom: 8px;
        }
        .pp-text.display-mobile {
          display: block;
        }
        .pp-text.hide-mobile {
          display: none;
        }
        @media (min-width: ${theme.breakpoints.smUp}) {
          .pp-text.display-mobile {
            display: none;
          }
          .pp-text.hide-mobile {
            display: block;
          }
        }
        @media (max-width: ${theme.breakpoints.smDown}) {
          .pp-text.mobile-invert {
            color: white;
          }
        }
      `}</style>
    </>
  );
};

PostageAndPackagingText.propTypes = {
  show: PropTypes.bool,
  deal: PropTypes.object,
  className: PropTypes.string,
  isSmall: PropTypes.bool,
};

PostageAndPackagingText.defaultProps = {
  show: false,
  deal: null,
  className: '',
  isSmall: false,
};
PostageAndPackagingText.displayName = 'PostageAndPackagingText';

export default PostageAndPackagingText;
