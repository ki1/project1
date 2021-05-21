import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../providers/ThemeProvider';
import {
  NO_SEARCH_RESULTS,
  NO_FILTER_RESULTS,
} from '../../../config/text/text';

const EmptySearchDeal = ({ textSearch }) => {
  const theme = useContext(ThemeContext);
  const textToShow =
    !textSearch || !textSearch.length
      ? NO_FILTER_RESULTS
      : NO_SEARCH_RESULTS.replace('##TEXT##', textSearch);
  return (
    <div className="search-results__info empty-search-wrapper">
      <div className="panel-search empty-search-content">
        <h3
          className="search-results__message"
          dangerouslySetInnerHTML={{
            __html: textToShow,
          }}
        ></h3>
      </div>
      <style jsx>{`
        .empty-search-wrapper {
          width: 100%;
          margin-top: 20px;
        }
        .panel-search {
          background: ${theme.colors.emptysearbackground};
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 24px;
          overflow: hidden;
        }
        .search-results__message {
          color: #666;
          color: ${theme.colors.emptysearchmessage}
          font-weight: 700;
          font-size: 16px;
          font-size: 1.6rem;
          width: fit-content;
          margin: 0 auto;
          text-align: justify;
        }
      `}</style>
      <style jsx global>{`
        .empty-search-wrapper
          .empty-search-content
          .search-results__message
          .search-results__term {
          color: ${theme.colors.primary};
        }
      `}</style>
    </div>
  );
};

EmptySearchDeal.propTypes = {
  textSearch: PropTypes.string,
};

EmptySearchDeal.defaultProps = {
  textSearch: '',
};

export default EmptySearchDeal;
